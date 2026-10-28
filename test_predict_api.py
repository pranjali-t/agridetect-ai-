import io
import requests
from PIL import Image

API_URL = "http://127.0.0.1:8000"

print("1. Testing GET /health...")
res = requests.get(f"{API_URL}/health")
print("   Status:", res.status_code, res.json())

print("\n2. Testing GET /classes...")
res = requests.get(f"{API_URL}/classes")
print("   Status:", res.status_code, "Total classes:", res.json()["total_classes"])

print("\n3. Testing POST /predict with a generated leaf sample...")
# Create a test green leaf-like image (224x224 RGB PNG)
img = Image.new("RGB", (224, 224), color=(46, 125, 50))
buf = io.BytesIO()
img.save(buf, format="PNG")
buf.seek(0)

files = {"file": ("test_leaf.png", buf, "image/png")}
res = requests.post(f"{API_URL}/predict", files=files)
print("   Status:", res.status_code)
pred = res.json()
print("   Predicted Class:", pred.get("predicted_class"))
print("   Crop:", pred.get("crop"))
print("   Disease:", pred.get("disease"))
print("   Confidence:", pred.get("confidence_percentage"), "%")
print("   Top classes count:", len(pred.get("top_classes", [])))
print("   Latency:", pred.get("latency_ms"), "ms")

print("\n4. Testing POST /api/v1/predict alias...")
buf.seek(0)
files = {"file": ("test_leaf_v1.jpg", buf, "image/jpeg")}
res = requests.post(f"{API_URL}/api/v1/predict", files=files)
print("   Status:", res.status_code, "Crop:", res.json().get("crop"))

print("\n5. Testing invalid file extension rejection (e.g. .txt)...")
invalid_buf = io.BytesIO(b"Not an image")
files = {"file": ("sample.txt", invalid_buf, "text/plain")}
res = requests.post(f"{API_URL}/predict", files=files)
print("   Status (expected 400):", res.status_code, "Detail:", res.json().get("detail"))

print("\n6. Testing corrupted image rejection...")
corrupt_buf = io.BytesIO(b"corrupted binary data not a real jpg")
files = {"file": ("bad_image.jpg", corrupt_buf, "image/jpeg")}
res = requests.post(f"{API_URL}/predict", files=files)
print("   Status (expected 400):", res.status_code, "Detail:", res.json().get("detail"))
