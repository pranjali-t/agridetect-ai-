// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Leaf, History, Sparkles, Menu, X, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { usePredictions } from '../context/PredictionContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { history } = usePredictions();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home Dashboard' },
    { to: '/detect', label: 'Disease Detection' },
    { 
      to: '/history', 
      label: 'Prediction History',
      badge: history.length > 0 ? history.length : null 
    },
    { to: '/about', label: 'About Project' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Project Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-agri-700 text-white flex items-center justify-center shadow-md shadow-agri-900/10 group-hover:bg-agri-800 transition-colors">
              <Leaf className="w-6 h-6 text-agri-300 transform group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-agri-900 tracking-tight font-serif">
                  AgriDetect <span className="text-agri-600 font-sans font-bold text-sm">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  FastAPI + ML Model Active
                </span>
              </div>
              <p className="text-[11px] text-[#786F5E] font-medium tracking-wide uppercase">
                Crop Disease Detection System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-agri-100/80 text-agri-900 border border-agri-200 shadow-xs'
                      : 'text-gray-600 hover:text-agri-800 hover:bg-cream-100'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-agri-600 text-white min-w-[20px] text-center">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/detect')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white text-sm font-semibold shadow-md shadow-agri-800/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-agri-300" />
              <span>Analyze a Leaf</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigate('/detect')}
              className="px-3 py-1.5 rounded-lg bg-agri-700 text-white text-xs font-semibold"
            >
              Analyze
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-cream-200"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E1D5] bg-[#FAF8F3] px-4 pt-3 pb-5 space-y-2">
          <div className="px-3 py-1.5 text-xs font-semibold text-[#8C8270] uppercase tracking-wider">
            Navigation
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-agri-100 text-agri-900 border border-agri-200'
                    : 'text-gray-700 hover:bg-cream-100'
                }`
              }
            >
              <span>{link.label}</span>
              {link.badge !== null && link.badge !== undefined && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-agri-600 text-white">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/detect');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-agri-700 text-white font-semibold text-sm shadow"
            >
              <Sparkles className="w-4 h-4 text-agri-300" />
              <span>Analyze Leaf Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
