// src/components/CropCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePredictions } from '../context/PredictionContext';
import { SAMPLE_LEAVES } from '../data/sampleLeaves';

export default function CropCard({ crop }) {
  const navigate = useNavigate();
  const { setActiveSample } = usePredictions();

  // Find a matching sample for this crop if available
  const matchingSample = SAMPLE_LEAVES.find((s) => s.cropId === crop.id);

  const handleTestCrop = () => {
    if (matchingSample) {
      setActiveSample(matchingSample);
    }
    navigate('/detect');
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#E8E1D5] hover:border-agri-400 p-6 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top subtle decorative accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: crop.color || '#2E7D32' }}
      />

      <div>
        {/* Header with Emoji and Title */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-[#FAF8F3] border border-[#EFEBE4] shadow-xs">
              {crop.emoji}
            </span>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-agri-800 transition-colors">
                {crop.name}
              </h3>
              <p className="text-xs italic text-[#786F5E] font-medium">
                {crop.scientificName} &bull; {crop.family}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-agri-100 text-agri-800 border border-agri-200">
            {crop.diseases.length} Classes
          </span>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-4">
          {crop.tagline}
        </p>

        {/* Monitored Diseases */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C8270] block">
            Monitored Foliar Conditions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {crop.diseases.map((d) => {
              const isHealthy = d.name.toLowerCase().includes('healthy');
              return (
                <span
                  key={d.name}
                  className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-medium border ${
                    isHealthy
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200/80'
                  }`}
                >
                  {isHealthy ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                  )}
                  {d.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
        <button
          onClick={handleTestCrop}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-agri-700 hover:text-agri-900 group/btn transition-colors"
        >
          <span>Test {crop.name} Leaf</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
        <span className="text-[10px] text-[#A89F91]">
          JPG &bull; PNG
        </span>
      </div>
    </div>
  );
}
