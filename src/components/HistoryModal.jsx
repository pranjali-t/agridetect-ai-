// src/components/HistoryModal.jsx
import React from 'react';
import { X, CheckCircle2, AlertTriangle, Leaf, Calendar, ShieldCheck, FileText, Info } from 'lucide-react';

export default function HistoryModal({ record, onClose }) {
  if (!record) return null;

  const isHealthy = record.isHealthy;
  const confidencePercent = (record.confidence * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-[#E8E1D5] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-cream-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-serif">
              Session Diagnostic Record
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              Recorded on {new Date(record.savedAt || record.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Mock Data Banner */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            {record.previewNote || 'Frontend Preview Mode: Classification values are simulated mock data.'}
          </span>
        </div>

        {/* Diagnosis & Confidence */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Condition Diagnosed
            </span>
            <div className="text-lg font-bold text-gray-900">
              {record.condition}
            </div>
            <div className="text-xs text-gray-600">
              Crop: <span className="font-semibold">{record.crop}</span>
              {record.scientificName && <span className="italic"> ({record.scientificName})</span>}
            </div>
            <div className="pt-1">
              {isHealthy ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Healthy Leaf
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                  <AlertTriangle className="w-3.5 h-3.5" /> Pathogen Identified
                </span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] flex flex-col justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Confidence (Mock)
            </span>
            <span className="text-3xl font-black text-agri-800 font-mono">
              {confidencePercent}%
            </span>
            <span className="text-[10px] text-gray-400 mt-1">
              Simulated score
            </span>
          </div>
        </div>

        {/* Symptoms & Advisory */}
        <div className="space-y-4">
          {record.symptoms && (
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-agri-700" />
                Symptoms Overview
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                {record.symptoms}
              </p>
            </div>
          )}

          {record.advisory && (
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-agri-700" />
                Preventive Advisory
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                {record.advisory}
              </p>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-[#E8E1D5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
}
