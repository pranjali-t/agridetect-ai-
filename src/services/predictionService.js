// src/services/predictionService.js
/**
 * Prediction Service for AI-Based Crop Disease Detection System
 * 
 * ARCHITECTURE DESIGN:
 * - Directly connects to the live FastAPI backend (MobileNetV2 CNN classifier).
 * - Transmits leaf image files via multipart/form-data.
 * - Parses actual model predictions, confidence scores, and agronomic advisories.
 * - Handles offline and connection error states transparently.
 */

import { SUPPORTED_CROPS } from '../data/cropsData';

// Verified production Render backend URL (used as fallback when VITE_API_URL is omitted or in production)
const DEFAULT_PRODUCTION_BACKEND = 'https://agridetect-ai-ocz5.onrender.com';

// Configurable Vite environment variable with smart fallback
function resolveApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/$/, '');
  }

  // Detect local development environment
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8000';
    }
  }

  // Deployed production environment (Vercel, custom domain, etc.)
  return DEFAULT_PRODUCTION_BACKEND;
}

export const API_BASE_URL = resolveApiBaseUrl();

/**
 * Predicts disease from an uploaded leaf image using the live FastAPI backend.
 * 
 * @param {File} imageFile - The validated leaf image file (JPG, JPEG, or PNG)
 * @param {Object} options - Optional configuration flags
 * @returns {Promise<PredictionResult>}
 */
export async function predictCropDisease(imageFile, options = {}) {
  // If explicitly requested mock preview mode
  if (options.forceMock) {
    return generateMockPrediction(imageFile, options);
  }

  try {
    return await callFastAPIBackend(imageFile);
  } catch (apiError) {
    console.error('FastAPI backend connection error:', apiError);
    // Provide a clear, actionable error message to the user
    throw new Error(
      apiError.message || `Unable to reach inference backend at ${API_BASE_URL}. Ensure the FastAPI server is running.`
    );
  }
}

/**
 * Dispatches multipart/form-data to the FastAPI /predict endpoint.
 */
async function callFastAPIBackend(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  const endpoint = `${API_BASE_URL}/predict`;

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
  } catch (networkError) {
    throw new Error(
      `Network connection failed. Could not reach backend server at ${API_BASE_URL}. The Render service may be waking up from sleep mode (cold start), please wait ~30 seconds and try again.`
    );
  }

  // Read response body safely ONCE as text to prevent "body stream already read"
  const rawText = await response.text();

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (_) {
    // Check if response is HTML (e.g. from a cloud proxy 502/503 or Vercel rewrite)
    if (rawText.trim().startsWith('<')) {
      throw new Error(
        `Backend returned an HTML response instead of JSON (HTTP ${response.status}). The Render service may be starting up or the endpoint URL (${endpoint}) is unreachable.`
      );
    }
    throw new Error(
      `Backend returned an invalid non-JSON response (HTTP ${response.status}): ${rawText.slice(0, 150)}`
    );
  }

  if (!response.ok) {
    const errorDetail = (data && (data.detail || data.message))
      ? (typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail))
      : `Inference failed with HTTP ${response.status}`;
    throw new Error(errorDetail);
  }

  // Validate expected payload structure from FastAPI
  if (!data || typeof data.crop === 'undefined' || typeof data.confidence === 'undefined') {
    throw new Error('Backend returned unexpected data structure missing crop or confidence fields.');
  }

  // Normalize top classes for result card consumption
  const topClasses = (data.top_classes || []).map((tc) => ({
    label: tc.label || tc.raw_class,
    score: tc.confidence,
    confidencePercent: tc.confidence_percent,
  }));

  return {
    id: `real-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    crop: data.crop,
    scientificName: data.scientific_name || '',
    condition: data.disease,
    pathogen: data.causal_agent || null,
    isHealthy: Boolean(data.is_healthy),
    confidence: data.confidence, // Float e.g. 0.941
    confidencePercentage: data.confidence_percentage,
    topClasses: topClasses,
    symptoms: data.symptoms || 'Observable foliar characteristics analyzed by convolutional model.',
    advisory: data.advisory || 'Consult your regional agricultural extension service for localized cultural guidelines.',
    timestamp: new Date().toISOString(),
    isMock: false,
    dataSource: 'Live MobileNetV2 Keras Model (Render FastAPI Backend)',
    modelLatencyMs: data.latency_ms || null,
    fileName: imageFile.name,
    fileSizeFormatted: formatFileSize(imageFile.size),
  };
}

/**
 * Formats byte size into human readable string
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Validates uploaded file type and size.
 * Allowed: JPG, JPEG, PNG. Max: 10 MB.
 */
export function validateLeafImage(file) {
  if (!file) {
    return { valid: false, error: 'No image file was provided.' };
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  
  const hasValidMime = allowedTypes.includes(file.type.toLowerCase());
  const hasValidExt = allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

  if (!hasValidMime && !hasValidExt) {
    return {
      valid: false,
      error: `Unsupported file format ("${file.name}"). Only JPG, JPEG, and PNG images are accepted.`,
    };
  }

  const maxSizeBytes = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds the 10 MB limit (${formatFileSize(file.size)}). Please upload a smaller crop leaf image.`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Tests connection to the FastAPI health endpoint.
 */
export async function testBackendConnection() {
  const endpoint = `${API_BASE_URL}/health`;

  try {
    const controller = new AbortController();
    // Allow up to 15s to accommodate Render free-tier cold starts
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    // Read body text once safely
    const rawText = await res.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (_) {
      return {
        connected: false,
        message: `Backend returned HTML/non-JSON at ${endpoint} (HTTP ${res.status}). Service might be booting or sleeping.`,
        url: API_BASE_URL,
      };
    }

    if (res.ok && data && (data.status === 'healthy' || data.model_loaded)) {
      return { 
        connected: true, 
        message: `Connected to FastAPI server (${data.class_count || 25} classes active)`,
        url: API_BASE_URL,
        data: data 
      };
    }

    return { 
      connected: false, 
      message: `Backend returned status ${res.status}: ${data.detail || data.status || 'Degraded'}`,
      url: API_BASE_URL,
    };
  } catch (err) {
    const isTimeout = err.name === 'AbortError';
    const msg = isTimeout
      ? `Connection timed out after 15s. The Render service is likely waking up from sleep mode (cold start). Please wait ~30 seconds and refresh.`
      : `Could not reach backend at ${endpoint}: ${err.message}`;
    return { connected: false, message: msg, url: API_BASE_URL };
  }
}

/**
 * Explicit demo mock generator for fallback test toggling only.
 */
function generateMockPrediction(imageFile, options = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selectedCrop = SUPPORTED_CROPS[0];
      const conditionObj = selectedCrop.diseases[0];
      resolve({
        id: `mock-${Date.now()}`,
        crop: selectedCrop.name,
        scientificName: selectedCrop.scientificName,
        condition: conditionObj.name,
        pathogen: conditionObj.pathogen,
        isHealthy: false,
        confidence: 0.912,
        topClasses: [
          { label: `${selectedCrop.name} - ${conditionObj.name}`, score: 0.912 },
          { label: `${selectedCrop.name} - Healthy`, score: 0.088 },
        ],
        symptoms: conditionObj.symptoms,
        advisory: conditionObj.culturalPractices,
        timestamp: new Date().toISOString(),
        isMock: true,
        dataSource: 'Frontend Mock Preview Mode',
        previewNote: '⚡ DEMO MOCK: Real backend model connection was bypassed via test toggle.',
        fileName: imageFile.name,
        fileSizeFormatted: formatFileSize(imageFile.size),
      });
    }, 800);
  });
}
