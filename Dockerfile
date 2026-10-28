# Dockerfile for Unified React Frontend + FastAPI & Keras ML Backend
# Compatible with Hugging Face Spaces (Docker SDK), Render, Railway, and Koyeb

FROM python:3.11-slim

WORKDIR /app

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=7860

# Install necessary build tools for compiling C extensions if needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy backend codebase and trained Keras model
COPY backend/ /app/backend/

# Copy compiled React frontend distribution
COPY dist/ /app/dist/

# Create non-root user for security (required by Hugging Face Spaces)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

EXPOSE 7860

# Launch Uvicorn using the dynamic PORT environment variable (defaults to 7860 for Hugging Face)
CMD ["sh", "-c", "uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT:-7860}"]
