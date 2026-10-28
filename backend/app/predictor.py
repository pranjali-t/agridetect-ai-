"""
backend/app/predictor.py

Core inference engine for the Plant Disease Detection System.
Loads the trained MobileNetV2 Keras model once at application startup
and provides validated, thread-safe predictions on uploaded leaf imagery.
"""

import os
import time
import json
import logging
from pathlib import Path
from typing import Dict, Any, List, Optional
import numpy as np
from PIL import Image, UnidentifiedImageError

# Ensure Keras uses TensorFlow backend
os.environ["KERAS_BACKEND"] = "tensorflow"

import keras
from .disease_info import get_disease_details

logger = logging.getLogger("plant_disease_detector")

# Model configuration constants
TARGET_IMAGE_SIZE = (224, 224)
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/jpg"}
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}

# Resolve paths reliably relative to this file
CURRENT_DIR = Path(__file__).resolve().parent
BACKEND_DIR = CURRENT_DIR.parent
MODEL_PACKAGE_DIR = BACKEND_DIR / "plant_disease_model_package"

MODEL_FILE_PATH = MODEL_PACKAGE_DIR / "final_plant_disease_model.keras"
CLASSES_FILE_PATH = MODEL_PACKAGE_DIR / "plant_disease_classes.json"


class PlantDiseasePredictor:
    """
    Singleton service managing the trained Keras model and class mappings.
    Loads weights once at application startup.
    """
    _instance: Optional["PlantDiseasePredictor"] = None

    def __init__(self):
        self.model: Optional[keras.Model] = None
        self.classes: List[str] = []
        self.is_loaded: bool = False
        self.load_error: Optional[str] = None
        self._load_model_and_classes()

    @classmethod
    def get_instance(cls) -> "PlantDiseasePredictor":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def _load_model_and_classes(self) -> None:
        """Loads and validates the Keras model and JSON class list from disk."""
        try:
            logger.info("Initializing PlantDiseasePredictor...")

            # 1. Verify existence of class labels
            if not CLASSES_FILE_PATH.exists():
                raise FileNotFoundError(f"Class labels file not found at: {CLASSES_FILE_PATH}")

            with open(CLASSES_FILE_PATH, "r", encoding="utf-8") as f:
                self.classes = json.load(f)

            if not isinstance(self.classes, list) or len(self.classes) == 0:
                raise ValueError("plant_disease_classes.json must contain a non-empty JSON list of class strings.")

            logger.info(f"Loaded {len(self.classes)} classes from {CLASSES_FILE_PATH.name}")

            # 2. Verify existence of model file
            if not MODEL_FILE_PATH.exists():
                raise FileNotFoundError(f"Trained model not found at: {MODEL_FILE_PATH}")

            logger.info(f"Loading Keras model from {MODEL_FILE_PATH} (Keras v{keras.__version__})...")
            start_time = time.perf_counter()
            self.model = keras.models.load_model(str(MODEL_FILE_PATH))
            elapsed = time.perf_counter() - start_time
            logger.info(f"Model loaded successfully in {elapsed:.2f} seconds.")

            # 3. Verify architecture input/output shapes
            input_shape = getattr(self.model, "input_shape", None)
            output_shape = getattr(self.model, "output_shape", None)
            logger.info(f"Verified Model Input Shape: {input_shape}, Output Shape: {output_shape}")

            if output_shape and output_shape[-1] != len(self.classes):
                raise ValueError(
                    f"Model output dimension ({output_shape[-1]}) does not match class count ({len(self.classes)})"
                )

            # 4. Warm-up forward pass to initialize computation graph
            warmup_tensor = np.zeros((1, TARGET_IMAGE_SIZE[0], TARGET_IMAGE_SIZE[1], 3), dtype=np.float32)
            self.model.predict(warmup_tensor, verbose=0)
            logger.info("Model warm-up forward pass completed successfully.")

            self.is_loaded = True
            self.load_error = None

        except Exception as e:
            logger.exception("Failed to initialize PlantDiseasePredictor:")
            self.is_loaded = False
            self.load_error = str(e)
            self.model = None

    def preprocess_image(self, image_bytes: bytes) -> np.ndarray:
        """
        Validates, converts, resizes, and normalizes image bytes for model inference.

        Returns:
            np.ndarray: Normalized 4D tensor of shape (1, 224, 224, 3) in range [-1.0, 1.0].
        Raises:
            ValueError: If the file is corrupted, empty, or not a valid image.
        """
        if not image_bytes or len(image_bytes) == 0:
            raise ValueError("Empty image payload received.")

        try:
            import io
            image = Image.open(io.BytesIO(image_bytes))
            # Verify file integrity
            image.verify()
            # Reopen after verify() because verify() moves the read pointer
            image = Image.open(io.BytesIO(image_bytes))
        except (UnidentifiedImageError, OSError, Exception) as err:
            raise ValueError(f"Invalid or corrupted image file: {str(err)}")

        # Convert all color spaces (RGBA, Grayscale, CMYK) to standard RGB
        if image.mode != "RGB":
            image = image.convert("RGB")

        # Resize to exact model target dimension (224, 224) using high-quality bilinear interpolation
        image = image.resize(TARGET_IMAGE_SIZE, resample=Image.Resampling.BILINEAR)

        # Convert to numpy array of float32
        arr = np.array(image, dtype=np.float32)

        # Standard MobileNetV2 normalization: scale [0, 255] to [-1.0, 1.0]
        # Formula: (x / 127.5) - 1.0
        normalized = (arr / 127.5) - 1.0

        # Expand batch dimension -> (1, 224, 224, 3)
        return np.expand_dims(normalized, axis=0)

    def predict(self, image_bytes: bytes, top_k: int = 5) -> Dict[str, Any]:
        """
        Runs real model inference on an uploaded image.

        Args:
            image_bytes: Raw byte contents of the uploaded leaf image.
            top_k: Number of candidate class probabilities to return (default 5).

        Returns:
            Dict[str, Any] containing predicted class, crop, disease, confidence,
            top classes distribution, symptoms, advisory, and execution metrics.
        """
        if not self.is_loaded or self.model is None:
            raise RuntimeError(f"Model is not loaded or failed to initialize: {self.load_error}")

        start_time = time.perf_counter()

        # Preprocess input image into tensor
        input_tensor = self.preprocess_image(image_bytes)

        # Execute model forward pass
        raw_predictions = self.model.predict(input_tensor, verbose=0)
        probabilities = raw_predictions[0]  # shape: (25,)

        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)

        # Determine predicted top class
        predicted_index = int(np.argmax(probabilities))
        confidence_float = float(probabilities[predicted_index])
        raw_class_name = self.classes[predicted_index]

        # Retrieve botanical and pathological details from knowledge base
        details = get_disease_details(raw_class_name)

        # Build top-K class probability breakdown
        top_indices = np.argsort(probabilities)[::-1][:top_k]
        top_classes = []
        for idx in top_indices:
            cls_name = self.classes[idx]
            cls_details = get_disease_details(cls_name)
            top_classes.append({
                "index": int(idx),
                "raw_class": cls_name,
                "label": f"{cls_details['crop']} - {cls_details['disease']}",
                "confidence": float(probabilities[idx]),
                "confidence_percent": round(float(probabilities[idx]) * 100, 2),
            })

        return {
            "predicted_class": raw_class_name,
            "crop": details["crop"],
            "scientific_name": details.get("scientific_name", ""),
            "disease": details["disease"],
            "is_healthy": details["is_healthy"],
            "causal_agent": details["causal_agent"],
            "confidence": confidence_float,
            "confidence_percentage": round(confidence_float * 100, 2),
            "symptoms": details["symptoms"],
            "advisory": details["advisory"],
            "top_classes": top_classes,
            "latency_ms": latency_ms,
            "is_mock": False,
            "model_version": "MobileNetV2-PlantVillage-25",
        }
