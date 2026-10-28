---
title: AI-Based Crop Disease Detection System
emoji: 🌿
colorFrom: green
colorTo: emerald
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# AI-Based Crop Disease Detection System (Full-Stack AI Project)

A modern, responsive agricultural AI dashboard and microservice built with **React**, **Vite**, **Tailwind CSS**, **FastAPI**, and a trained **MobileNetV2** Convolutional Neural Network (CNN) in **Keras 3**.

The system diagnoses foliar plant diseases across **five vital staple agricultural crops** covering **25 verified condition classes**.

---

## 🌐 Hosting & Public Clickable Link Options

### ⚡ Method 1: Instant Public Link (1-Click Local Cloud Tunnel)
To get a public HTTPS link in seconds without paying or deploying to the cloud:
1. Double-click `start_public_tunnel.bat` (or run `.\start_public_tunnel.ps1` in PowerShell).
2. It compiles the frontend, starts the unified server, and generates a live `https://<random-name>.trycloudflare.com` URL.
3. Anyone on mobile or desktop can access the link immediately with full model inference!

---

### ☁️ Method 2: Permanent 24/7 Free Cloud Hosting (Hugging Face Spaces)
Hugging Face Spaces is the recommended free cloud hosting for Machine Learning applications because it provides **16 GB RAM + 2 vCPU** for free (unlike Render/Vercel free tiers that crash on TensorFlow due to 512MB RAM limits).

**Steps to deploy to Hugging Face Spaces (in 3 minutes):**
1. Sign up / Log in to [Hugging Face](https://huggingface.co).
2. Click **New Space** (`+ New Space`).
3. Set:
   - **Space Name:** `plant-disease-detection`
   - **License:** `mit`
   - **Space SDK:** Choose **Docker** -> **Blank**
   - **Space Hardware:** Free (2 vCPU, 16 GB RAM)
4. Push your repository to Hugging Face:
   ```bash
   git remote add space https://huggingface.co/spaces/<YOUR_USERNAME>/plant-disease-detection
   git add .
   git commit -m "Deploy Plant Disease Detection AI"
   git push space master:main
   ```
5. Hugging Face will build the `Dockerfile` automatically and provide a permanent public link:
   `https://<YOUR_USERNAME>-plant-disease-detection.hf.space`

---

### 🐳 Method 3: Docker Deployment on Render / Railway
The included `Dockerfile` is compatible with Render Web Services and Railway:
- **Build Command:** Built via Docker
- **Environment Variable:** `PORT=10000` (Render) or `PORT=8000` (Railway)
- The container serves both the compiled React frontend and the FastAPI backend unified on a single port with zero CORS configuration needed.

---

## 🌾 Supported Crops & 25 Monitored Classes

| Crop | Botanical Name | Family | Monitored Foliar Conditions |
| :--- | :--- | :--- | :--- |
| **Apple** | *Malus domestica* | Rosaceae | `Apple Scab`, `Black Rot`, `Cedar Apple Rust`, `Healthy` |
| **Corn (Maize)** | *Zea mays* | Poaceae | `Gray Leaf Spot`, `Common Rust`, `Northern Leaf Blight`, `Healthy` |
| **Grape** | *Vitis vinifera* | Vitaceae | `Black Rot`, `Esca (Black Measles)`, `Leaf Blight`, `Healthy` |
| **Potato** | *Solanum tuberosum* | Solanaceae | `Early Blight`, `Late Blight`, `Healthy` |
| **Tomato** | *Solanum lycopersicum* | Solanaceae | `Bacterial Spot`, `Early Blight`, `Late Blight`, `Leaf Mold`, `Septoria Leaf Spot`, `Spider Mites`, `Target Spot`, `Yellow Leaf Curl (TYLCV)`, `Mosaic Virus (ToMV)`, `Healthy` |

---

## 🏗️ Project Architecture

```text
plant-disease-detection/
├── backend/
│   ├── app/
│   │   ├── __init__.py           # Package marker
│   │   ├── main.py               # FastAPI application, lifespan startup, CORS, API routes
│   │   ├── predictor.py          # Singleton model loader, image preprocessing, inference
│   │   └── disease_info.py       # Knowledge base (symptoms, causal pathogens, advisories)
│   ├── plant_disease_model_package/
│   │   ├── final_plant_disease_model.keras   # Trained Keras 3 MobileNetV2 CNN weights
│   │   └── plant_disease_classes.json        # 25 verified class label strings
│   ├── venv/                     # Python 3.11 virtual environment
│   ├── evaluate.py               # Independent evaluation script for labeled test sets
│   ├── test_integration.py       # Automated integration test suite
│   ├── requirements.txt          # Python dependencies
│   └── README.md                 # Backend documentation
├── src/                          # React + Vite frontend source code
│   ├── components/               # Navbar, ResultCard, UploadZone, CropCard, etc.
│   ├── pages/                    # Home, Detection, History, About
│   ├── services/                 # predictionService.js (connects to FastAPI)
│   ├── context/                  # PredictionContext.jsx (session history)
│   └── data/                     # cropsData.js, sampleLeaves.js
├── .env                          # Frontend environment (VITE_API_URL=http://localhost:8000)
├── package.json                  # Frontend packages & scripts
└── README.md                     # Full-stack documentation
```

---

## 🚀 Key Features

1. **Home Dashboard (`/`)**
   - Project introduction and "Analyze a Leaf" primary call-to-action.
   - Comprehensive overview cards for all 5 supported crops with 1-click test shortcuts.
   - Three-step visual workflow (`01 Upload Image` &rarr; `02 AI Analysis` &rarr; `03 Review Diagnostics`).
   - Quick-load test sample selector for seamless demonstrations.

2. **Disease Detection Studio (`/detect`)**
   - Drag-and-drop image upload zone with interactive states.
   - File validation supporting `.jpg`, `.jpeg`, and `.png` (Max: 10 MB).
   - High-resolution image preview with file metadata (size, type) and remove/replace actions.
   - Multi-stage scanning radar animation (`ScanningProgress.jsx`) during evaluation.
   - Real-time connection indicator verifying FastAPI backend health on port 8000.
   - Polished diagnostic results card (`ResultCard.jsx`) displaying crop name, scientific name, diagnosed condition, live model predictive confidence score, foliar symptoms summary, and non-prescriptive cultural advisories.

3. **Prediction History (`/history`)**
   - Real model predictions recorded during the active browser session (persisted via `sessionStorage`).
   - Metric counters for Total Scans, Healthy Leaves, and Pathogens Identified.
   - Filtering by Crop (Apple, Corn, Grape, Potato, Tomato) and Health Status (Healthy vs Diseased), plus a real-time search bar.
   - Detailed history modal for inspecting archived diagnostic records.

4. **About Project Documentation (`/about`)**
   - Detailed academic problem statement and agricultural motivation.
   - Botanical taxonomy and pathogen table.
   - Architecture breakdown of the full-stack system.
   - Transparent assessment of realistic academic limitations and future expansion roadmap.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS, Lucide React, React Router v6
- **Backend:** FastAPI, Uvicorn, Python 3.11, Pydantic, Python-Multipart
- **Machine Learning:** Keras 3.15.1, TensorFlow 2.21, MobileNetV2 Architecture, Pillow, NumPy, Scikit-learn
- **Data Serialization:** HDF5 weights inside `.keras` zip format, JSON class indices

---

## 💻 Windows Setup Instructions (PowerShell)

### Prerequisites

Ensure you have **Python 3.11** and **Node.js** (v18+) installed:
```powershell
py -3.11 --version
node -v
npm -v
```

---

### Step 1: Open the Project Directory
```powershell
cd "c:\Users\pranj\Downloads\plant disease detection"
```

---

### Step 2: Start the FastAPI Backend

Open a **PowerShell** terminal:
```powershell
# Navigate to project directory
cd "c:\Users\pranj\Downloads\plant disease detection"

# Activate Python 3.11 virtual environment
.\backend\venv\Scripts\Activate.ps1

# (Optional: install dependencies if not already installed)
pip install -r backend/requirements.txt

# Start the FastAPI server
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

Backend will be live at:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**  
API Documentation (Swagger UI):
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

---

### Step 3: Start the React Frontend

Open a **second PowerShell** terminal:
```powershell
cd "c:\Users\pranj\Downloads\plant disease detection"

# Install frontend packages (if not already installed)
npm install

# Start Vite development server
npm run dev
```

Frontend will be live at:
👉 **[http://localhost:5173](http://localhost:5173)**

---

### Step 4: Run Automated Tests

To test backend health, classes, and inference with an actual image:
```powershell
.\backend\venv\Scripts\python.exe backend/test_integration.py
```

Expected output:
```text
=================================================================
      AI-BASED CROP DISEASE DETECTION - INTEGRATION TEST SUITE
=================================================================

[TEST 1] Checking GET /health...
  [OK] PASSED: Model loaded, 25 classes verified (MobileNetV2 (Functional)).

[TEST 2] Checking GET /classes...
  [OK] PASSED: 25 classes grouped across 5 crops.

[TEST 3] Running inference on valid synthetic leaf image (POST /predict)...
  [OK] PASSED: Prediction generated in ~250 ms.

[TEST 4] Testing API versioning alias (POST /api/v1/predict)...
  [OK] PASSED: /api/v1/predict returned prediction.

[TEST 5] Validating rejection of unsupported file type (.pdf / .txt)...
  [OK] PASSED: Server rejected .txt with 400.

[TEST 6] Validating rejection of corrupted image payload...
  [OK] PASSED: Server rejected corrupted image with 400.

=================================================================
TEST SUMMARY: 6/6 TESTS PASSED
=================================================================
```

---

### Step 5: Evaluate on an External Labeled Dataset

To calculate Accuracy, Precision, Recall, F1-Score, and a Confusion Matrix against an independent test set:
```powershell
.\backend\venv\Scripts\python.exe backend/evaluate.py --test_dir "C:\path\to\labeled_test_dataset"
```

---

## ⚖️ Academic Integrity & Limitations Policy

- **No Invented Model Accuracy:** Prediction confidence on individual images is never confused with test accuracy. Benchmark accuracy is only reported when computed across an empirical test dataset using `evaluate.py`.
- **No Fabricated Severity:** The existing model performs classification; severity percentage estimation requires spatial segmentation (e.g. U-Net) and is intentionally not faked.
- **Advisory Scope:** Outputs are intended as an academic diagnostic aid and do not constitute certified agronomic laboratory prescriptions.
