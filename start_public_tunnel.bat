@echo off
title AI Crop Disease Detection - Live Cloud Host
echo ================================================================
echo   AI Crop Disease Detection System - Live Server & Public Link
echo ================================================================
echo.

echo [1/3] Checking production frontend build...
if not exist "dist\index.html" (
    echo Building frontend distribution...
    call npm run build
) else (
    echo Production build found in dist\
)

echo.
echo [2/3] Starting Unified Backend & Frontend Server (Port 8000)...
start "Plant AI Backend (Port 8000)" .\backend\venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000

echo Waiting 5 seconds for TensorFlow model warmup...
timeout /t 5 /nobreak >nul

echo.
echo [3/3] Launching Public HTTPS Cloudflare Tunnel...
echo ================================================================
echo  Your public clickable link will appear below:
echo  Share this link with anyone on phone or laptop!
echo ================================================================
.\tools\cloudflared.exe tunnel --url http://127.0.0.1:8000
pause
