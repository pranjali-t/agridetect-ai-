// src/components/ScanningProgress.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Scan, Cpu, CheckCircle } from 'lucide-react';

const STAGES = [
  { label: 'Normalizing image tensor & color channels...', duration: 350 },
  { label: 'Segmenting foliar contours & chlorophyll index...', duration: 400 },
  { label: 'Extracting convolutional lesion feature maps...', duration: 450 },
  { label: 'Aggregating classification across supported crop classes...', duration: 300 },
];

export default function ScanningProgress() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStageIndex(1);
      setProgress(45);
    }, 400);

    const timer2 = setTimeout(() => {
      setCurrentStageIndex(2);
      setProgress(75);
    }, 850);

    const timer3 = setTimeout(() => {
      setCurrentStageIndex(3);
      setProgress(95);
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-agri-200 p-8 shadow-elevated text-center max-w-lg mx-auto relative overflow-hidden">
      {/* Animated Glowing Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-agri-400 via-agri-600 to-agri-400 animate-pulse" />

      {/* Pulsing Visual Radar / Scanner Icon */}
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-agri-100 animate-ping opacity-50" />
        <div className="absolute inset-2 rounded-full bg-agri-200 animate-pulse" />
        <div className="relative w-14 h-14 rounded-2xl bg-agri-700 text-white flex items-center justify-center shadow-lg">
          <Scan className="w-7 h-7 text-agri-300 animate-bounce" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Analyzing Crop Leaf
      </h3>
      
      <p className="text-xs text-agri-700 font-semibold mb-6 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Deep Learning Model Processing</span>
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-[#EFE9DF] rounded-full h-2.5 mb-4 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-agri-500 to-agri-700 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current Diagnostic Stage */}
      <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E1D5] text-xs text-gray-700 font-medium min-h-[50px] flex items-center justify-center">
        <span className="animate-pulse">{STAGES[currentStageIndex]?.label}</span>
      </div>

      <p className="text-[11px] text-[#8C8270] mt-4">
        Evaluating foliar necrosis, chlorosis, and margin morphology
      </p>
    </div>
  );
}
