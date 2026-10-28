// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, GraduationCap, ShieldAlert, Code2, Server } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#143826] text-[#E8F5E9] border-t border-[#1F5B3C] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-agri-500/20 text-agri-300 flex items-center justify-center border border-agri-400/30">
                <Leaf className="w-5 h-5 text-agri-300" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                AI-Based Crop Disease Detection System
              </span>
            </div>
            
            <p className="text-sm text-agri-100/80 leading-relaxed max-w-lg">
              A university computer science capstone project engineered to assist agricultural researchers and smallholder farmers with automated visual diagnosis of foliar diseases using modern web technologies and deep learning.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1F5B3C] text-emerald-200 border border-emerald-500/30">
                <GraduationCap className="w-3.5 h-3.5" />
                College Capstone Project
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-900/40 text-amber-200 border border-amber-600/30">
                <ShieldAlert className="w-3.5 h-3.5" />
                Academic Prototype (Phase 1 Frontend)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-agri-300">
              Application Pages
            </h4>
            <ul className="space-y-2 text-sm text-agri-100/70">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Dashboard
                </Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-white transition-colors">
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white transition-colors">
                  Prediction History
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About & Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Supported Crops */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-agri-300">
              System Scope
            </h4>
            <p className="text-xs text-agri-200/80 leading-relaxed">
              Targeted for 5 vital agricultural crops:
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="px-2 py-1 rounded bg-[#1F5B3C]/60 text-white">Apple</span>
              <span className="px-2 py-1 rounded bg-[#1F5B3C]/60 text-white">Corn (Maize)</span>
              <span className="px-2 py-1 rounded bg-[#1F5B3C]/60 text-white">Grape</span>
              <span className="px-2 py-1 rounded bg-[#1F5B3C]/60 text-white">Potato</span>
              <span className="px-2 py-1 rounded bg-[#1F5B3C]/60 text-white">Tomato</span>
            </div>
            <div className="pt-2 text-xs text-agri-200/60 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-agri-400" />
              <span>FastAPI Backend Ready (Phase 2)</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 border-t border-[#1F5B3C]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-agri-200/60">
          <p>
            &copy; {new Date().getFullYear()} AI-Based Crop Disease Detection System. Designed with React, Vite & Tailwind CSS.
          </p>
          <p className="text-center sm:text-right text-[11px] text-agri-200/50 max-w-md">
            Academic Demonstration: Visual predictions are simulated in Phase 1 for interface evaluation. Diagnostic outputs are advisory and not certified agronomic advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
