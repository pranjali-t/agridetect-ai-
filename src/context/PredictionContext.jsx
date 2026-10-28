// src/context/PredictionContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const PredictionContext = createContext(null);

const SESSION_STORAGE_KEY = 'crop_disease_session_history_v1';

export function PredictionProvider({ children }) {
  // Load session predictions from sessionStorage if present
  const [history, setHistory] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Session storage read error:', e);
      return [];
    }
  });

  // Active sample selected from home/about to pass into detection page
  const [activeSample, setActiveSample] = useState(null);

  // Sync to sessionStorage on changes
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Session storage write error:', e);
    }
  }, [history]);

  const addPrediction = (prediction, previewUrl = null) => {
    const record = {
      ...prediction,
      previewUrl: previewUrl || null,
      savedAt: new Date().toISOString(),
    };

    setHistory((prev) => [record, ...prev]);
    return record;
  };

  const removePrediction = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  return (
    <PredictionContext.Provider
      value={{
        history,
        addPrediction,
        removePrediction,
        clearHistory,
        activeSample,
        setActiveSample,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
}

export function usePredictions() {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePredictions must be used within a PredictionProvider');
  }
  return context;
}
