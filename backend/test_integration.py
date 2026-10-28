"""
backend/test_integration.py

Comprehensive End-to-End System Integration Test Suite
Tests:
- Health check endpoint
- Supported classes endpoint
- Multipart leaf image inference with real Keras model
- Error rejection on corrupted files
- Error rejection on unsupported file types
- Latency and schema compliance
"""

import io
import sys
import requests
from PIL import Image

API_URL = "http://127.0.0.1:8000"

def run_tests():
    passed = 0
    total = 6
    print("\n" + "=" * 65)
    print("      AI-BASED CROP DISEASE DETECTION - INTEGRATION TEST SUITE")
    print("=" * 65)

    # Test 1: GET /health
    print("\n[TEST 1] Checking GET /health...")
    try:
        res = requests.get(f"{API_URL}/health", timeout=5)
        assert res.status_code == 200, f"Expected 200, got {res.status_code}"
        data = res.json()
        assert data["status"] == "healthy", "Expected status: healthy"
        assert data["model_loaded"] is True, "Expected model_loaded: True"
        assert data["class_count"] == 25, f"Expected 25 classes, got {data['class_count']}"
        print(f"  [OK] PASSED: Model loaded, {data['class_count']} classes verified ({data['model_architecture']}).")
        passed += 1
    except Exception as e:
        print(f"  [FAIL] Test 1: {e}")

    # Test 2: GET /classes
    print("\n[TEST 2] Checking GET /classes...")
    try:
        res = requests.get(f"{API_URL}/classes", timeout=5)
        assert res.status_code == 200, f"Expected 200, got {res.status_code}"
        data = res.json()
        assert data["total_classes"] == 25, f"Expected 25 classes, got {data['total_classes']}"
        assert len(data["grouped_by_crop"]) == 5, f"Expected 5 crops, got {len(data['grouped_by_crop'])}"
        print(f"  [OK] PASSED: 25 classes grouped across 5 crops: {list(data['grouped_by_crop'].keys())}.")
        passed += 1
    except Exception as e:
        print(f"  [FAIL] Test 2: {e}")

    # Test 3: POST /predict with valid leaf image
    print("\n[TEST 3] Running inference on valid synthetic leaf image (POST /predict)...")
    try:
        img = Image.new("RGB", (224, 224), color=(46, 125, 50))
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        buf.seek(0)
        files = {"file": ("test_healthy_leaf.png", buf, "image/png")}

        res = requests.post(f"{API_URL}/predict", files=files, timeout=10)
        assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
        data = res.json()

        assert "predicted_class" in data
        assert "crop" in data
        assert "disease" in data
        assert "confidence" in data
        assert "top_classes" in data
        assert len(data["top_classes"]) == 5
        assert data["is_mock"] is False

        print(f"  [OK] PASSED: Prediction generated in {data.get('latency_ms')} ms:")
        print(f"       - Predicted: {data['predicted_class']}")
        print(f"       - Crop:      {data['crop']}")
        print(f"       - Condition: {data['disease']}")
        print(f"       - Score:     {data['confidence_percentage']}%")
        passed += 1
    except Exception as e:
        print(f"  [FAIL] Test 3: {e}")

    # Test 4: POST /api/v1/predict alias
    print("\n[TEST 4] Testing API versioning alias (POST /api/v1/predict)...")
    try:
        img = Image.new("RGB", (224, 224), color=(139, 69, 19))
        buf = io.BytesIO()
        img.save(buf, format="JPEG")
        buf.seek(0)
        files = {"file": ("test_blight_sample.jpg", buf, "image/jpeg")}

        res = requests.post(f"{API_URL}/api/v1/predict", files=files, timeout=10)
        assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
        data = res.json()
        assert data["crop"] != ""
        print(f"  [OK] PASSED: /api/v1/predict returned prediction: {data['crop']} - {data['disease']} ({data['confidence_percentage']}%).")
        passed += 1
    except Exception as e:
        print(f"  [FAIL] Test 4: {e}")

    # Test 5: Rejection of unsupported file extension (.txt)
    print("\n[TEST 5] Validating rejection of unsupported file type (.pdf / .txt)...")
    try:
        bad_buf = io.BytesIO(b"Non-image text file payload")
        files = {"file": ("document.txt", bad_buf, "text/plain")}
        res = requests.post(f"{API_URL}/predict", files=files, timeout=5)
        assert res.status_code == 400, f"Expected 400 Bad Request, got {res.status_code}"
        assert "Unsupported file extension" in res.json().get("detail", "")
        print(f"  [OK] PASSED: Server rejected .txt with 400: '{res.json().get('detail')}'.")
        passed += 1
    except Exception as e:
        print(f"  [FAIL] Test 5: {e}")

    # Test 6: Rejection of corrupted image data
    print("\n[TEST 6] Validating rejection of corrupted image payload...")
    try:
        corrupted_buf = io.BytesIO(b"\x89PNG\r\n\x1a\nCorruptedHeaderTrashBytes\x00\x00")
        files = {"file": ("corrupted.png", corrupted_buf, "image/png")}
        res = requests.post(f"{API_URL}/predict", files=files, timeout=5)
        assert res.status_code == 400, f"Expected 400 Bad Request, got {res.status_code}"
        assert "Invalid or corrupted image file" in res.json().get("detail", "")
        print(f"  [OK] PASSED: Server rejected corrupted image with 400: '{res.json().get('detail')}'.")
        passed += 1
    except Exception as e:
        print(f"  [FAIL] Test 6: {e}")

    print("\n" + "=" * 65)
    print(f"TEST SUMMARY: {passed}/{total} TESTS PASSED")
    print("=" * 65 + "\n")
    if passed < total:
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
