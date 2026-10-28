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

// Configurable Vite environment variable with smart fallback
function resolveApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location) {
    const port = window.location.port;
    if (port === '5173' || port === '3000') {
      return 'http://localhost:8000';
    }
    // Unified host or hosted cloud: use same origin (relative path)
    return '';
  }
  return 'http://localhost:8000';
}

const API_BASE_URL = resolveApiBaseUrl();

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

  const endpoint = API_BASE_URL ? `${API_BASE_URL}/predict` : '/predict';

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
  } catch (networkError) {
    throw new Error(
      `Network connection failed. Could not reach backend server at ${endpoint || window.location.origin}. Please check that the FastAPI service is running.`
    );
  }

  if (!response.ok) {
    let errorDetail = `Backend returned status ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson && errJson.detail) {
        errorDetail = errJson.detail;
      }
    } catch (_) {
      const errText = await response.text();
      if (errText) errorDetail = errText;
    }
    throw new Error(errorDetail);
  }

  const data = await response.json();

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
    dataSource: 'Live MobileNetV2 Keras Model (FastAPI Backend)',
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
  const endpoint = API_BASE_URL ? `${API_BASE_URL}/health` : '/health';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const originDisplay = API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'FastAPI Backend');
      return { 
        connected: true, 
        message: `Connected to FastAPI server (${data.class_count || 25} classes active)`,
        url: originDisplay,
        data: data 
      };
    }
    return { connected: false, message: `Backend responded with HTTP status ${res.status}.` };
  } catch (err) {
    return { connected: false, message: `Could not reach backend at ${endpoint}: ${err.message}` };
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
