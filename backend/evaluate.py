"""
backend/evaluate.py

Independent Evaluation Script for AI-Based Crop Disease Detection Model.
Computes objective classification metrics (Accuracy, Precision, Recall, F1-Score,
and Confusion Matrix) against an external labeled test dataset.

Academic Integrity Compliance:
- Never treats individual image prediction confidence as model accuracy.
- Does not invent or simulate benchmark accuracy figures without running actual evaluation.
"""

import os
import sys
import json
import argparse
import logging
from pathlib import Path
from typing import List, Tuple

os.environ["KERAS_BACKEND"] = "tensorflow"
import numpy as np
from PIL import Image
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

from app.predictor import PlantDiseasePredictor, TARGET_IMAGE_SIZE

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("model_evaluator")


def parse_arguments():
    parser = argparse.ArgumentParser(
        description="Evaluate the trained Plant Disease Detection model against a labeled test dataset."
    )
    parser.add_argument(
        "--test_dir",
        type=str,
        default=None,
        help="Path to labeled test dataset directory organized by class subfolders: test_dir/<class_name>/*.jpg",
    )
    parser.add_argument(
        "--output_dir",
        type=str,
        default="evaluation_results",
        help="Directory to save evaluation reports and confusion matrix (default: evaluation_results)",
    )
    parser.add_argument(
        "--batch_size",
        type=int,
        default=32,
        help="Batch size for batched evaluation forward pass (default: 32)",
    )
    return parser.parse_args()


def load_dataset_samples(test_dir: Path, valid_classes: List[str]) -> Tuple[List[Path], List[int]]:
    """Discovers labeled image files organized by class directory."""
    image_paths = []
    labels = []
    class_to_idx = {cls_name: i for i, cls_name in enumerate(valid_classes)}

    valid_extensions = {".jpg", ".jpeg", ".png"}

    for class_folder in test_dir.iterdir():
        if not class_folder.is_dir():
            continue

        class_name = class_folder.name
        if class_name not in class_to_idx:
            logger.warning(f"Skipping folder '{class_name}': not found in model's 25 supported classes.")
            continue

        class_idx = class_to_idx[class_name]
        for img_file in class_folder.iterdir():
            if img_file.suffix.lower() in valid_extensions:
                image_paths.append(img_file)
                labels.append(class_idx)

    return image_paths, labels


def evaluate(test_dir_str: str, output_dir_str: str, batch_size: int = 32):
    test_dir = Path(test_dir_str)
    if not test_dir.exists() or not test_dir.is_dir():
        logger.error(f"Provided test directory does not exist: {test_dir.resolve()}")
        sys.exit(1)

    logger.info("Initializing predictor and loading trained model...")
    predictor = PlantDiseasePredictor.get_instance()
    if not predictor.is_loaded:
        logger.error(f"Could not load model: {predictor.load_error}")
        sys.exit(1)

    classes = predictor.classes
    logger.info(f"Scanning test dataset at: {test_dir.resolve()}...")
    image_paths, true_labels = load_dataset_samples(test_dir, classes)

    if len(image_paths) == 0:
        logger.error(
            f"No valid test images found in {test_dir}. "
            "Ensure the directory contains class subfolders matching model class names."
        )
        sys.exit(1)

    logger.info(f"Discovered {len(image_paths)} test images across classes.")

    predicted_labels = []
    batch_tensors = []
    batch_indices = []

    total_images = len(image_paths)
    logger.info(f"Running inference in batches of {batch_size}...")

    for i, img_path in enumerate(image_paths):
        try:
            with open(img_path, "rb") as f:
                img_bytes = f.read()
            tensor = predictor.preprocess_image(img_bytes)
            batch_tensors.append(tensor[0])
            batch_indices.append(i)
        except Exception as err:
            logger.warning(f"Skipping corrupt or unreadable image {img_path.name}: {err}")
            continue

        if len(batch_tensors) == batch_size or i == total_images - 1:
            batch_arr = np.array(batch_tensors, dtype=np.float32)
            preds = predictor.model.predict(batch_arr, verbose=0)
            pred_classes = np.argmax(preds, axis=1)
            predicted_labels.extend(pred_classes.tolist())
            batch_tensors = []

    # Calculate actual metrics
    true_subset = [true_labels[idx] for idx in batch_indices]
    accuracy = accuracy_score(true_subset, predicted_labels)
    report_dict = classification_report(
        true_subset,
        predicted_labels,
        target_names=[classes[i] for i in sorted(list(set(true_subset)))],
        output_dict=True,
        zero_division=0,
    )
    report_text = classification_report(
        true_subset,
        predicted_labels,
        target_names=[classes[i] for i in sorted(list(set(true_subset)))],
        zero_division=0,
    )
    conf_mat = confusion_matrix(true_subset, predicted_labels)

    # Print summary
    print("\n" + "=" * 70)
    print("               MODEL EVALUATION RESULTS REPORT")
    print("=" * 70)
    print(f"Total Evaluated Images:  {len(true_subset)}")
    print(f"Overall Accuracy:        {accuracy * 100:.2f}%")
    print("-" * 70)
    print(report_text)
    print("=" * 70)

    # Save to disk
    out_path = Path(output_dir_str)
    out_path.mkdir(parents=True, exist_ok=True)

    metrics_file = out_path / "evaluation_metrics.json"
    with open(metrics_file, "w", encoding="utf-8") as f:
        json.dump(
            {
                "total_samples": len(true_subset),
                "accuracy": float(accuracy),
                "macro_avg_f1": float(report_dict.get("macro avg", {}).get("f1-score", 0.0)),
                "weighted_avg_f1": float(report_dict.get("weighted avg", {}).get("f1-score", 0.0)),
                "detailed_report": report_dict,
            },
            f,
            indent=2,
        )

    conf_mat_file = out_path / "confusion_matrix.csv"
    np.savetxt(conf_mat_file, conf_mat, delimiter=",", fmt="%d")

    logger.info(f"Evaluation report saved to: {metrics_file.resolve()}")
    logger.info(f"Confusion matrix saved to:  {conf_mat_file.resolve()}")


def main():
    args = parse_arguments()

    if not args.test_dir:
        print("\n" + "=" * 75)
        print("          AI-BASED CROP DISEASE DETECTION - MODEL EVALUATOR")
        print("=" * 75)
        print("STATUS: No external labeled test dataset directory specified.")
        print()
        print("To run empirical evaluation on an independent test dataset:")
        print("  1. Prepare a folder structured by class name, for example:")
        print("     test_dataset/")
        print("       |-- Apple___Apple_scab/")
        print("       |     |-- leaf_01.jpg")
        print("       |-- Tomato___Early_blight/")
        print("       |     |-- leaf_02.jpg")
        print("       +-- ... (25 classes)")
        print()
        print("  2. Run this script pointing to that directory:")
        print("     python evaluate.py --test_dir <path_to_test_dataset>")
        print()
        print("Academic Integrity Notice:")
        print("  Model accuracy must be computed on a real, labeled test split.")
        print("  Confidence scores for individual demo predictions are NOT accuracy metrics.")
        print("=" * 75 + "\n")
        sys.exit(0)

    evaluate(args.test_dir, args.output_dir, args.batch_size)


if __name__ == "__main__":
    main()
