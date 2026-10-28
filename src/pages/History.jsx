// src/pages/History.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History as HistoryIcon, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Search, 
  Filter,
  Leaf,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePredictions } from '../context/PredictionContext';
import HistoryModal from '../components/HistoryModal';
import { SUPPORTED_CROPS } from '../data/cropsData';

export default function History() {
  const { history, removePrediction, clearHistory } = usePredictions();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeModalRecord, setActiveModalRecord] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter history records
  const filteredHistory = history.filter((item) => {
    // Search query filter (matches crop, condition, or filename)
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.crop?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.condition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fileName?.toLowerCase().includes(searchQuery.toLowerCase());

    // Crop filter
    const matchesCrop =
      selectedCropFilter === 'ALL' ||
      item.cropId === selectedCropFilter ||
      item.crop?.toLowerCase() === selectedCropFilter.toLowerCase();

    // Status filter
    const matchesStatus =
      selectedStatusFilter === 'ALL' ||
      (selectedStatusFilter === 'HEALTHY' && item.isHealthy) ||
      (selectedStatusFilter === 'DISEASED' && !item.isHealthy);

    return matchesSearch && matchesCrop && matchesStatus;
  });

  const healthyCount = history.filter((h) => h.isHealthy).length;
  const diseasedCount = history.filter((h) => !h.isHealthy).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-agri-100 text-agri-800 border border-agri-200 mb-2">
            <HistoryIcon className="w-3.5 h-3.5 text-agri-600" />
            <span>Browser Session Archive</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-serif tracking-tight">
            Prediction History
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Visual logs of leaf diagnostics processed during your current browser session.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {history.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-white hover:bg-rose-50 border border-[#E8E1D5] hover:border-rose-200 transition-colors shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}

          <button
            onClick={() => navigate('/detect')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-agri-700 hover:bg-agri-800 shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-agri-300" />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Clear Confirmation Banner */}
      {showClearConfirm && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <span>Are you sure you want to clear all {history.length} session prediction records?</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                clearHistory();
                setShowClearConfirm(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-700 text-white font-bold hover:bg-rose-800 transition-colors"
            >
              Confirm Clear
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1.5 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {history.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-[#E8E1D5] p-12 text-center max-w-xl mx-auto shadow-soft space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cream-100 text-agri-700 flex items-center justify-center mx-auto shadow-inner">
            <HistoryIcon className="w-8 h-8 opacity-60" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 font-serif">
            No Session Predictions Yet
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            Images you analyze during this browser session will appear here with crop diagnostics, confidence scores, and symptoms.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('/detect')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-agri-300" />
              <span>Start Your First Analysis</span>
            </button>
          </div>
        </div>
      ) : (
        /* Non-Empty State: Stats + Filters + Records */
        <div className="space-y-6">
          
          {/* Summary Metric Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Total Scans (Session)
                </span>
                <div className="text-2xl font-black text-gray-900 font-mono mt-0.5">
                  {history.length}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cream-100 text-agri-800 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Healthy Leaves
                </span>
                <div className="text-2xl font-black text-emerald-700 font-mono mt-0.5">
                  {healthyCount}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  Pathogens Detected
                </span>
                <div className="text-2xl font-black text-rose-700 font-mono mt-0.5">
                  {diseasedCount}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="bg-white rounded-2xl border border-[#E8E1D5] p-4 shadow-xs flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by crop, disease, or filename..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF8F3] border border-[#E8E1D5] focus:outline-hidden focus:border-agri-500"
              />
            </div>

            {/* Filter by Crop */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={selectedCropFilter}
                onChange={(e) => setSelectedCropFilter(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF8F3] border border-[#E8E1D5] text-gray-700 w-full md:w-auto"
              >
                <option value="ALL">All Crops</option>
                {SUPPORTED_CROPS.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name}
                  </option>
                ))}
              </select>

              {/* Filter by Status */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF8F3] border border-[#E8E1D5] text-gray-700 w-full md:w-auto"
              >
                <option value="ALL">All Status</option>
                <option value="HEALTHY">Healthy Only</option>
                <option value="DISEASED">Diseased Only</option>
              </select>
            </div>
          </div>

          {/* Prediction Records Grid */}
          {filteredHistory.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E8E1D5] p-8 text-center text-xs text-gray-500">
              No predictions match the active search and filter criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHistory.map((item) => {
                const confidencePercent = (item.confidence * 100).toFixed(1);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#E8E1D5] hover:border-agri-300 p-5 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Leaf Thumbnail Preview */}
                      <div className="w-16 h-16 rounded-xl bg-cream-100 border border-[#E8E1D5] flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.previewUrl ? (
                          <img
                            src={item.previewUrl}
                            alt="Leaf Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Leaf className="w-6 h-6 text-agri-600 opacity-60" />
                        )}
                      </div>

                      {/* Diagnostic Summary */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-900 truncate">
                            {item.condition}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              item.isHealthy
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            {item.isHealthy ? 'Healthy' : 'Diseased'}
                          </span>
                        </div>

                        <div className="text-xs text-gray-600 mb-2">
                          <span className="font-semibold text-agri-900">{item.crop}</span>
                          {item.scientificName && (
                            <span className="italic text-[11px] text-gray-400 ml-1">
                              ({item.scientificName})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-gray-500">
                          <span>
                            Confidence: <strong className="font-mono text-agri-800">{confidencePercent}%</strong>
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.savedAt || item.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        Mock Preview
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveModalRecord(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cream-100 hover:bg-cream-200 text-gray-800 border border-[#E0D7C9] transition-colors"
                        >
                          <Eye className="w-3 h-3 text-gray-600" />
                          <span>View Details</span>
                        </button>

                        <button
                          onClick={() => removePrediction(item.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* History Detail Modal */}
      {activeModalRecord && (
        <HistoryModal
          record={activeModalRecord}
          onClose={() => setActiveModalRecord(null)}
        />
      )}

    </div>
  );
}
