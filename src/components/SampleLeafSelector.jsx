// src/components/SampleLeafSelector.jsx
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SAMPLE_LEAVES, sampleToFile } from '../data/sampleLeaves';

export default function SampleLeafSelector({ onSelectSample, disabled = false }) {
  const handleSelect = (sample) => {
    if (disabled) return;
    const file = sampleToFile(sample);
    onSelectSample(file, sample);
  };

  return (
    <div className="bg-[#FAF8F3] rounded-2xl border border-[#E8E1D5] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-agri-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
            Quick Test Samples (Instant Demo)
          </h4>
        </div>
        <span className="text-[11px] text-[#8C8270]">
          Click any sample leaf to test without searching for files
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {SAMPLE_LEAVES.map((sample) => (
          <button
            key={sample.id}
            type="button"
            disabled={disabled}
            onClick={() => handleSelect(sample)}
            className={`p-3 rounded-xl border text-left transition-all group flex flex-col justify-between ${
              disabled
                ? 'opacity-50 cursor-not-allowed bg-cream-50 border-[#E8E1D5]'
                : 'bg-white hover:bg-agri-50/60 border-[#E5DFD5] hover:border-agri-400 hover:shadow-xs active:scale-[0.98]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-gray-900 group-hover:text-agri-800">
                  {sample.cropName}
                </span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${sample.isHealthy ? 'text-emerald-700 bg-emerald-100' : 'text-amber-800 bg-amber-100'}`}>
                  {sample.isHealthy ? 'Healthy' : 'Diseased'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium truncate">
                {sample.expectedCondition}
              </p>
            </div>

            <div className="mt-3 pt-1.5 border-t border-[#F2ECE1] flex items-center justify-between text-[10px] text-agri-700 font-bold group-hover:text-agri-900">
              <span>Load Leaf</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
