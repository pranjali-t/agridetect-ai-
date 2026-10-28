"""
backend/app/main.py

FastAPI application entry point for the AI-Based Crop Disease Detection System.
Provides REST API endpoints for system health, class metadata, and real model inference.
"""

import logging
from contextlib import asynccontextmanager
from typing import Dict, Any, List
from pathlib import Path

from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from .predictor import (
    PlantDiseasePredictor,
    ALLOWED_EXTENSIONS,
    ALLOWED_MIME_TYPES,
)
from .disease_info import DISEASE_KNOWLEDGE_BASE

# Configure server logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("plant_disease_api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan event handler: Loads model once at application startup
    and maintains it in memory for all subsequent requests.
    """
    logger.info("Starting up FastAPI application...")
    predictor = PlantDiseasePredictor.get_instance()
    if predictor.is_loaded:
        logger.info(f"Model successfully loaded at startup with {len(predictor.classes)} classes.")
    else:
        logger.error(f"Model failed to load at startup: {predictor.load_error}")
    yield
    logger.info("Shutting down FastAPI application...")


app = FastAPI(
    title="AI-Based Crop Disease Detection API",
    description="High-performance FastAPI backend serving a fine-tuned MobileNetV2 CNN classifier for 25 crop disease conditions.",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure Cross-Origin Resource Sharing (CORS) for local development and deployed Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/info", tags=["General"])
async def api_info():
    """API metadata and system summary endpoint."""
    predictor = PlantDiseasePredictor.get_instance()
    return {
        "title": "AI-Based Crop Disease Detection System API",
        "phase": "Phase 2 Backend & ML Integration",
        "status": "online",
        "model_loaded": predictor.is_loaded,
        "classes_monitored": len(predictor.classes),
        "docs_url": "/docs",
    }


@app.get("/health", tags=["Monitoring"])
async def health_check():
    """
    GET /health
    Returns backend service health and confirms whether the ML model is loaded.
    """
    predictor = PlantDiseasePredictor.get_instance()
    if not predictor.is_loaded:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={
                "status": "degraded",
                "model_loaded": False,
                "error": predictor.load_error,
                "classes_available": False,
            },
        )

    return {
        "status": "healthy",
        "model_loaded": True,
        "class_count": len(predictor.classes),
        "model_architecture": "MobileNetV2 (Functional)",
        "framework": "TensorFlow / Keras 3",
        "supported_crops": ["Apple", "Corn (Maize)", "Grape", "Potato", "Tomato"],
    }


@app.get("/classes", tags=["Metadata"])
async def get_supported_classes():
    """
    GET /classes
    Returns the verified supported 25 class labels and organized crop categories.
    """
    predictor = PlantDiseasePredictor.get_instance()
    if not predictor.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model classes are not loaded.",
        )

    # Group classes by crop for clean frontend inspection
    grouped_by_crop: Dict[str, List[Dict[str, Any]]] = {}
    for raw_name in predictor.classes:
        info = DISEASE_KNOWLEDGE_BASE.get(raw_name, {})
        crop = info.get("crop", raw_name.split("___")[0])
        if crop not in grouped_by_crop:
            grouped_by_crop[crop] = []
        grouped_by_crop[crop].append({
            "raw_class": raw_name,
            "disease": info.get("disease", raw_name),
            "is_healthy": info.get("is_healthy", False),
            "causal_agent": info.get("causal_agent", "N/A"),
        })

    return {
        "total_classes": len(predictor.classes),
        "classes": predictor.classes,
        "grouped_by_crop": grouped_by_crop,
    }


async def _handle_prediction(file: UploadFile) -> Dict[str, Any]:
    """Shared prediction logic for /predict and /api/v1/predict."""
    predictor = PlantDiseasePredictor.get_instance()
    if not predictor.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Inference engine is not ready: {predictor.load_error}",
        )

    # 1. Validate file presence
    if not file or not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No image file provided in upload.",
        )

    # 2. Validate file extension
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Unsupported file extension ('{file_ext}'). "
                f"Only JPG, JPEG, and PNG images are accepted."
            ),
        )

    # 3. Read image bytes
    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not read uploaded file: {str(e)}",
        )

    # 4. Check non-empty payload
    if len(contents) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty (0 bytes).",
        )

    # 5. Check size limit (max 10 MB)
    max_bytes = 10 * 1024 * 1024
    if len(contents) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds maximum allowed size of 10 MB ({len(contents)/(1024*1024):.2f} MB).",
        )

    # 6. Run actual model inference
    try:
        prediction_result = predictor.predict(contents)
    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(val_err),
        )
    except Exception as inf_err:
        logger.exception("Inference failed:")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Model inference failed: {str(inf_err)}",
        )

    # Add client-side metadata
    prediction_result["filename"] = file.filename
    prediction_result["filesize_bytes"] = len(contents)
    return prediction_result


@app.post("/predict", tags=["Inference"])
async def predict_crop_disease(file: UploadFile = File(...)):
    """
    POST /predict
    Accepts an uploaded crop leaf image (JPG/JPEG/PNG) via multipart/form-data.
    Returns real model inference results mapped to the 25 disease classes.
    """
    return await _handle_prediction(file)


@app.post("/api/v1/predict", tags=["Inference"])
async def predict_crop_disease_v1(file: UploadFile = File(...)):
    """
    POST /api/v1/predict
    Versioned alias endpoint for frontend client compatibility.
    """
    return await _handle_prediction(file)


# ---------------------------------------------------------------------------
# Production Frontend SPA Static File Serving
# ---------------------------------------------------------------------------
DIST_DIR = Path(__file__).resolve().parent.parent.parent / "dist"

if DIST_DIR.exists() and (DIST_DIR / "index.html").exists():
    assets_dir = DIST_DIR / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/", include_in_schema=False)
    async def serve_root():
        """Serves compiled React frontend production entrypoint."""
        return FileResponse(str(DIST_DIR / "index.html"))

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        """Fallback to index.html for React Router SPA routes (e.g. /detect, /history, /about)."""
        target = DIST_DIR / full_path
        if full_path and target.is_file():
            return FileResponse(str(target))
        return FileResponse(str(DIST_DIR / "index.html"))
else:
    @app.get("/", tags=["General"])
    async def fallback_root():
        """Fallback root endpoint when frontend dist is not built."""
        return await api_info()
