// src/pages/Detection.jsx
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  AlertCircle, 
  Camera, 
  Sun, 
  Target, 
  Check, 
  HelpCircle,
  AlertTriangle,
  Info,
  Server,
  Cpu
} from 'lucide-react';
import UploadZone from '../components/UploadZone';
import ScanningProgress from '../components/ScanningProgress';
import ResultCard from '../components/ResultCard';
import SampleLeafSelector from '../components/SampleLeafSelector';
import { predictCropDisease, validateLeafImage, testBackendConnection } from '../services/predictionService';
import { sampleToFile } from '../data/sampleLeaves';
import { usePredictions } from '../context/PredictionContext';

export default function Detection() {
  const { activeSample, setActiveSample } = usePredictions();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [simulateError, setSimulateError] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ checked: false, connected: false, message: '' });

  // Check backend health on mount
  useEffect(() => {
    let isMounted = true;
    async function checkHealth() {
      const res = await testBackendConnection();
      if (isMounted) {
        setBackendStatus({ checked: true, connected: res.connected, message: res.message, url: res.url });
      }
    }
    checkHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  // If redirected from Home with an active sample, load it automatically
  useEffect(() => {
    if (activeSample) {
      const file = sampleToFile(activeSample);
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
      setErrorMessage(null);
      // Clear after consuming
      setActiveSample(null);
    }
  }, [activeSample, setActiveSample]);

  // Clean up preview object URL on unmount or file change
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelected = (file) => {
    const validation = validateLeafImage(file);
    if (!validation.valid) {
      setErrorMessage(validation.error);
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setResult(null);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setResult(null);
    setErrorMessage(null);
  };

  const handleSelectSample = (file, sample) => {
    handleFileSelected(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorMessage(null);
    setResult(null);

    try {
      if (simulateError) {
        // Explicit simulation of server/network failure for test demonstration
        await new Promise((r) => setTimeout(r, 800));
        throw new Error('Simulated network error: Unable to reach FastAPI backend service (port 8000). Check server connection.');
      }

      const prediction = await predictCropDisease(selectedFile);
      setResult(prediction);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during leaf analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAnalysis = () => {
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-agri-100 text-agri-800 border border-agri-200">
          <Camera className="w-3.5 h-3.5 text-agri-600" />
          <span>Foliar Disease Diagnostic Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-serif tracking-tight">
          Leaf Pathogen Analysis
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Upload an image of an Apple, Corn, Grape, Potato, or Tomato leaf. The system validates the file and executes inference on the trained MobileNetV2 CNN model.
        </p>
      </div>

      {/* Backend Connection Status Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
        backendStatus.connected
          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
          : 'bg-amber-50 border-amber-200/90 text-amber-950'
      }`}>
        <div className="flex items-start sm:items-center gap-2.5">
          {backendStatus.connected ? (
            <Server className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5 sm:mt-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5 sm:mt-0" />
          )}
          <div>
            <span className="font-bold">
              {backendStatus.connected ? 'FastAPI Backend Active: ' : 'Backend Connection: '}
            </span>
            <span>
              {backendStatus.connected
                ? `Connected to ${backendStatus.url || 'FastAPI service'}. Real MobileNetV2 Keras model inference is active.`
                : backendStatus.message || 'Connecting to FastAPI backend server...'}
            </span>
          </div>
        </div>

        {/* Toggle to test error state */}
        <label className="inline-flex items-center gap-2 cursor-pointer select-none self-end sm:self-auto text-[11px] font-semibold text-gray-700 bg-white hover:bg-cream-100 px-2.5 py-1 rounded-lg border border-[#E0D7C9] transition-colors shadow-xs">
          <input
            type="checkbox"
            checked={simulateError}
            onChange={(e) => setSimulateError(e.target.checked)}
            className="rounded border-gray-400 text-agri-600 focus:ring-agri-500 w-3.5 h-3.5"
          />
          <span>Simulate Error State</span>
        </label>
      </div>

      {/* Quick Test Samples Selector */}
      <SampleLeafSelector 
        onSelectSample={handleSelectSample} 
        disabled={isLoading}
      />

      {/* Main Analysis Workspace */}
      <div className="space-y-6">
        
        {/* Upload Zone Component */}
        <UploadZone
          currentFile={selectedFile}
          onFileSelected={handleFileSelected}
          onClear={handleClearFile}
          disabled={isLoading}
          customError={errorMessage}
        />

        {/* Action Button: Analyze Leaf */}
        {selectedFile && !result && !isLoading && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleAnalyze}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-agri-800/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 text-agri-300" />
              <span>Analyze Leaf Now</span>
            </button>

            <button
              onClick={handleClearFile}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-cream-100 text-gray-700 text-sm font-semibold border border-[#E8E1D5] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Loading State: Animated Scanner */}
        {isLoading && (
          <div className="pt-4 animate-fadeIn">
            <ScanningProgress />
          </div>
        )}

        {/* Error State Banner */}
        {errorMessage && !isLoading && (
          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 space-y-2 animate-fadeIn text-left">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>Analysis Encountered an Error</span>
            </div>
            <p className="text-xs text-red-800 leading-relaxed">
              {errorMessage}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleAnalyze}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-700 text-white hover:bg-red-800 transition-colors"
              >
                Retry Analysis
              </button>
              <button
                onClick={() => setErrorMessage(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-red-700 border border-red-200 hover:bg-red-50 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Results State */}
        {result && !isLoading && (
          <div className="pt-4 animate-fadeIn">
            <ResultCard
              result={result}
              onReset={handleResetAnalysis}
              imagePreviewUrl={previewUrl}
            />
          </div>
        )}

      </div>

      {/* Empty State / Photo Guidelines Section */}
      {!selectedFile && !result && (
        <div className="bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-8 space-y-6 text-left">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-agri-700" />
            <h3 className="text-base font-bold text-gray-900 font-serif">
              Best Photography Practices for Foliar Diagnosis
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600">
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Single Leaf Focus</h4>
              <p className="leading-relaxed">
                Ensure a single leaf fills at least 70% of the frame. Avoid background soil, cluttered foliage, or hands.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
                <Sun className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Natural Diffuse Light</h4>
              <p className="leading-relaxed">
                Photograph under uniform daylight. Prevent harsh flash reflections or deep shadows that obscure lesion textures.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
                <Camera className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Sharp Macro Focus</h4>
              <p className="leading-relaxed">
                Keep the camera parallel to the leaf blade to capture vein patterns and spot margins with high sharpness.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
