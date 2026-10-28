import os
import sys
import json
import numpy as np

# Ensure Keras backend is TensorFlow
os.environ["KERAS_BACKEND"] = "tensorflow"

model_path = os.path.join("backend", "plant_disease_model_package", "final_plant_disease_model.keras")
classes_path = os.path.join("backend", "plant_disease_model_package", "plant_disease_classes.json")

print(f"1. Checking file existence:")
print(f"   Model file exists: {os.path.exists(model_path)} ({os.path.getsize(model_path):,} bytes)")
print(f"   Classes file exists: {os.path.exists(classes_path)} ({os.path.getsize(classes_path):,} bytes)")

print("\n2. Reading classes JSON:")
with open(classes_path, "r", encoding="utf-8") as f:
    class_labels = json.load(f)

print(f"   Total classes in JSON: {len(class_labels)}")
print("   First 5 classes:", class_labels[:5])
print("   Last 5 classes:", class_labels[-5:])

print("\n3. Loading Keras Model:")
import keras
print(f"   Keras version: {keras.__version__}")
model = keras.models.load_model(model_path)
print("   Model loaded successfully!")
print(f"   Model type: {type(model)}")
print(f"   Input shape: {model.input_shape}")
print(f"   Output shape: {model.output_shape}")

# Model summary / layers
print("\n4. Model Layers Summary:")
for idx, layer in enumerate(model.layers):
    print(f"   Layer [{idx}] {layer.name} ({layer.__class__.__name__}): input={getattr(layer, 'input_shape', 'N/A')}, output={getattr(layer, 'output_shape', 'N/A')}")

# Test dummy input
print("\n5. Testing Forward Pass:")
dummy_input = np.zeros((1, 224, 224, 3), dtype=np.float32)
output = model.predict(dummy_input, verbose=0)
print(f"   Output shape from forward pass: {output.shape}")
print(f"   Sum of output probabilities: {np.sum(output):.6f}")
print(f"   Min val: {np.min(output):.6f}, Max val: {np.max(output):.6f}")

# Check class count match
if output.shape[-1] == len(class_labels):
    print(f"   SUCCESS: Model output dimension ({output.shape[-1]}) matches class count ({len(class_labels)}) exactly!")
else:
    print(f"   MISMATCH: Model output dimension ({output.shape[-1]}) does NOT match class count ({len(class_labels)})!")
