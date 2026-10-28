// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detection from './pages/Detection';
import History from './pages/History';
import About from './pages/About';
import { PredictionProvider } from './context/PredictionContext';

export default function App() {
  return (
    <PredictionProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-gray-800 font-sans selection:bg-agri-200 selection:text-agri-900">
          {/* Main Top Navigation */}
          <Navbar />

          {/* Primary View Routing */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detect" element={<Detection />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </PredictionProvider>
  );
}
