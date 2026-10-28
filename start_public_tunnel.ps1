# start_public_tunnel.ps1
Write-Host "================================================================" -ForegroundColor Green
Write-Host "  AI Crop Disease Detection System - Live Server & Public Link  " -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""

if (-not (Test-Path "dist\index.html")) {
    Write-Host "[1/3] Building production frontend..." -ForegroundColor Cyan
    npm run build
} else {
    Write-Host "[1/3] Production build found in dist\" -ForegroundColor Cyan
}

Write-Host "`n[2/3] Starting Unified Backend & Frontend Server (Port 8000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\backend\venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000"

Write-Host "Waiting 5 seconds for model warmup..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "`n[3/3] Launching Public HTTPS Cloudflare Tunnel..." -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Green
Write-Host " Your public clickable link will appear below (https://...):" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Green
.\tools\cloudflared.exe tunnel --url http://127.0.0.1:8000
