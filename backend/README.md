# AI-Based Crop Disease Detection System - Backend (FastAPI + Keras 3)

This directory houses the Python FastAPI backend and machine learning inference microservice for the **AI-Based Crop Disease Detection System**.

The backend serves a fine-tuned **MobileNetV2** Convolutional Neural Network (CNN) saved in Keras 3 format (`final_plant_disease_model.keras`), classifying foliar images into **25 disease categories** across Apple, Corn (Maize), Grape, Potato, and Tomato crops.

---

## 🏗️ Architecture

```text
backend/
├── app/
│   ├── __init__.py           # Package marker
│   ├── main.py               # FastAPI application, lifespan startup, CORS, API routes
│   ├── predictor.py          # Singleton model loader, image preprocessing, inference
│   └── disease_info.py       # Agronomic knowledge base (symptoms, causal agents, advisories)
├── plant_disease_model_package/
│   ├── final_plant_disease_model.keras   # Trained Keras 3 CNN model weights
│   └── plant_disease_classes.json        # 25 verified class label strings
├── evaluate.py               # Independent evaluation script for labeled test sets
├── test_integration.py       # Automated integration test suite
├── requirements.txt          # Production dependencies
└── README.md                 # Backend documentation & setup guide
```

---

## 🌾 Supported Crops & 25 Disease Classes

| Crop | Classes Monitored |
| :--- | :--- |
| **Apple** (4) | `Apple___Apple_scab`, `Apple___Black_rot`, `Apple___Cedar_apple_rust`, `Apple___healthy` |
| **Corn (Maize)** (4) | `Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot`, `Corn_(maize)___Common_rust_`, `Corn_(maize)___Northern_Leaf_Blight`, `Corn_(maize)___healthy` |
| **Grape** (4) | `Grape___Black_rot`, `Grape___Esca_(Black_Measles)`, `Grape___Leaf_blight_(Isariopsis_Leaf_Spot)`, `Grape___healthy` |
| **Potato** (3) | `Potato___Early_blight`, `Potato___Late_blight`, `Potato___healthy` |
| **Tomato** (10) | `Tomato___Bacterial_spot`, `Tomato___Early_blight`, `Tomato___Late_blight`, `Tomato___Leaf_Mold`, `Tomato___Septoria_leaf_spot`, `Tomato___Spider_mites Two-spotted_spider_mite`, `Tomato___Target_Spot`, `Tomato___Tomato_Yellow_Leaf_Curl_Virus`, `Tomato___Tomato_mosaic_virus`, `Tomato___healthy` |

---

## ⚙️ Windows Setup Instructions (PowerShell)

### Step 1: Ensure Python 3.11 is Installed
```powershell
py -3.11 --version
```

### Step 2: Create / Activate the Virtual Environment
```powershell
# Navigate to project root
cd "c:\Users\pranj\Downloads\plant disease detection"

# Create Python 3.11 virtual environment in backend/venv
py -3.11 -m venv backend/venv

# Activate virtual environment
.\backend\venv\Scripts\Activate.ps1
```

### Step 3: Install Backend Dependencies
```powershell
pip install -r backend/requirements.txt
```

### Step 4: Run the FastAPI Server
```powershell
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

Interactive OpenAPI documentation is available at:
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

---

## 📡 API Endpoints

### 1. `GET /health`
Returns service status, loaded model architecture, and verified class count.
```json
{
  "status": "healthy",
  "model_loaded": true,
  "class_count": 25,
  "model_architecture": "MobileNetV2 (Functional)",
  "framework": "TensorFlow / Keras 3",
  "supported_crops": ["Apple", "Corn (Maize)", "Grape", "Potato", "Tomato"]
}
```

### 2. `GET /classes`
Returns the complete list of 25 supported class labels grouped by crop.

### 3. `POST /predict` (and `POST /api/v1/predict`)
Accepts multipart form-data with key `file` containing a leaf photo (`.jpg`, `.jpeg`, `.png`, max 10MB).
Returns:
- `predicted_class`: Raw class label from `plant_disease_classes.json`
- `crop`: Formatted crop name
- `scientific_name`: Botanical species
- `disease`: Condition name
- `is_healthy`: Boolean
- `confidence`: Probability float (`0.0` to `1.0`)
- `confidence_percentage`: Confidence percentage (`0.0%` to `100.0%`)
- `symptoms`: Observable foliar symptoms
- `advisory`: Preventive agronomic guidance
- `top_classes`: Array of top 5 candidate predictions with scores
- `latency_ms`: Inference time in milliseconds

---

## 🧪 Automated Testing

To run the automated integration test suite:
```powershell
python backend/test_integration.py
```

To evaluate the model against an independent labeled test set:
```powershell
python backend/evaluate.py --test_dir "path/to/labeled_test_dataset"
```

---

## ⚖️ Academic Integrity Policy
- **No Fabricated Accuracy:** We do not claim an arbitrary test accuracy percentage without empirical evaluation on a labeled test split.
- **No Fake Severity:** The model is a classification network; lesion severity percentage requires spatial segmentation masks (e.g., U-Net) and is intentionally not faked.
