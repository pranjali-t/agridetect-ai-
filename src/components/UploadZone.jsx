// src/components/UploadZone.jsx
import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { validateLeafImage, formatFileSize } from '../services/predictionService';

export default function UploadZone({ 
  onFileSelected, 
  currentFile, 
  onClear, 
  disabled = false,
  customError = null 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const fileInputRef = useRef(null);

  // Update preview when currentFile changes
  useEffect(() => {
    if (currentFile) {
      const url = URL.createObjectURL(currentFile);
      setPreviewUrl(url);
      setValidationError(null);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [currentFile]);

  const handleProcessFile = (file) => {
    if (!file) return;

    const validation = validateLeafImage(file);
    if (!validation.valid) {
      setValidationError(validation.error);
      return;
    }

    setValidationError(null);
    onFileSelected(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClear();
  };

  const displayedError = customError || validationError;

  return (
    <div className="w-full space-y-3">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        className="hidden"
        disabled={disabled}
        onChange={handleFileInputChange}
      />

      {/* Main Upload / Preview Area */}
      {!currentFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none bg-white ${
            isDragging
              ? 'border-agri-600 bg-agri-50 scale-[1.01]'
              : displayedError
              ? 'border-red-300 bg-red-50/40 hover:border-red-400'
              : 'border-[#D9D1C5] hover:border-agri-500 hover:bg-[#FAF8F3]'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="max-w-md mx-auto flex flex-col items-center">
            {/* Visual Icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform ${
              isDragging ? 'bg-agri-200 text-agri-800 scale-110' : 'bg-cream-100 text-agri-700'
            }`}>
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
              Drag & drop your crop leaf photo here
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-500 mb-5">
              or <span className="text-agri-700 font-bold underline underline-offset-2">browse files</span> from your device
            </p>

            {/* Badges for supported formats */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#786F5E]">
              <span className="px-2.5 py-1 rounded-md bg-[#FAF6EE] border border-[#E8E1D5]">
                JPG / JPEG
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#FAF6EE] border border-[#E8E1D5]">
                PNG
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#FAF6EE] border border-[#E8E1D5]">
                Max 10 MB
              </span>
            </div>

            <p className="text-[11px] text-[#8C8270] mt-4 max-w-xs text-balance">
              For best diagnostic accuracy, ensure single leaf focus, clean daylight illumination, and avoid blurry edges.
            </p>
          </div>
        </div>
      ) : (
        /* Preview Card */
        <div className="bg-white rounded-3xl border border-[#E8E1D5] p-5 shadow-soft overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            
            {/* Leaf Image Preview with remove overlay */}
            <div className="relative w-full sm:w-48 h-48 sm:h-48 rounded-2xl overflow-hidden bg-cream-100 border border-[#E8E1D5] flex-shrink-0 flex items-center justify-center shadow-inner">
              <img
                src={previewUrl}
                alt="Selected Leaf Preview"
                className="w-full h-full object-contain p-2"
              />
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all shadow-md"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* File Metadata Details */}
            <div className="flex-1 space-y-3 text-left w-full">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Image Ready for Analysis
                </span>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 truncate" title={currentFile.name}>
                  {currentFile.name}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>Size: {formatFileSize(currentFile.size)}</span>
                  <span>&bull;</span>
                  <span>Type: {currentFile.type || 'image/jpeg'}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                Leaf photo is verified and loaded in memory. Ready to extract convolutional feature maps.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => !disabled && fileInputRef.current?.click()}
                  disabled={disabled}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cream-100 hover:bg-cream-200 text-gray-700 border border-[#E0D7C9] transition-colors"
                >
                  <RefreshCw className="w-3 h-3 text-gray-600" />
                  <span>Choose Different Photo</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={disabled}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                  <span>Remove Image</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Error Banner */}
      {displayedError && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Validation Warning: </span>
            {displayedError}
          </div>
          <button
            onClick={() => setValidationError(null)}
            className="text-red-600 hover:text-red-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
