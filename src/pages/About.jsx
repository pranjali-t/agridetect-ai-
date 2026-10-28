// src/pages/About.jsx
import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  ShieldAlert, 
  Compass, 
  Server, 
  Database, 
  Terminal, 
  Code2, 
  CheckCircle2,
  Info,
  ExternalLink
} from 'lucide-react';
import { SUPPORTED_CROPS } from '../data/cropsData';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-agri-100 text-agri-800 border border-agri-200">
          <BookOpen className="w-3.5 h-3.5 text-agri-600" />
          <span>Capstone Project Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-serif tracking-tight">
          About the Project
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Comprehensive project overview, botanical target scope, technology stack, realistic academic limitations, and future roadmap.
        </p>
      </div>

      {/* Project Overview & Motivation */}
      <section className="bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 font-serif">
            1. Problem Statement & Motivation
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Plant diseases represent a persistent threat to global agricultural output, causing estimated annual harvest yield reductions exceeding 20-30% in high-value staple crops. Traditional disease diagnosis relies on manual visual examination by trained agronomists or laboratory pathogen culturing—processes that are time-intensive, expensive, and largely inaccessible to remote or smallholder farmers.
        </p>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          The <strong>AI-Based Crop Disease Detection System</strong> is engineered as an interactive academic platform to explore automated foliar pathology classification. By combining high-resolution visual processing with deep convolutional neural networks, the system seeks to empower non-expert growers to recognize pathogen signatures before widespread crop devastation occurs.
        </p>

        <div className="p-4 rounded-2xl bg-cream-50 border border-[#E8E1D5] text-xs text-gray-700 flex items-start gap-3">
          <Info className="w-4 h-4 text-agri-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-gray-900">Phase 1 Development Scope: </span>
            This implementation delivers the complete frontend user experience, responsive agricultural design system, file validation, and session history management. It is designed with modular microservice adapters ready to connect to a FastAPI backend in Phase 2.
          </div>
        </div>
      </section>

      {/* Five Supported Crops & Diseases */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-serif">
              2. Five Supported Crops & Pathological Classes
            </h2>
            <p className="text-xs text-gray-500">
              Curated based on agricultural significance and standard benchmark foliar datasets.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {SUPPORTED_CROPS.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-2xl border border-[#E8E1D5] p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F2ECE1] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{crop.emoji}</span>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {crop.name}
                    </h3>
                    <p className="text-xs italic text-[#786F5E]">
                      {crop.scientificName} &bull; Family: {crop.family}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cream-100 text-gray-700 border border-[#E0D7C9]">
                  {crop.diseases.length} Monitored Classes
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {crop.overview}
              </p>

              {/* Disease Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#F0EBE1] rounded-xl overflow-hidden">
                  <thead className="bg-[#FAF8F3] text-gray-700 font-bold border-b border-[#F0EBE1]">
                    <tr>
                      <th className="py-2.5 px-3">Condition / Class</th>
                      <th className="py-2.5 px-3">Causal Pathogen</th>
                      <th className="py-2.5 px-3">Primary Foliar Symptoms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EBE1] text-gray-600">
                    {crop.diseases.map((d) => (
                      <tr key={d.name} className="hover:bg-cream-50/50">
                        <td className="py-2 px-3 font-semibold text-gray-900">
                          {d.name}
                        </td>
                        <td className="py-2 px-3 italic text-gray-500">
                          {d.pathogen}
                        </td>
                        <td className="py-2 px-3 leading-relaxed">
                          {d.symptoms}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-serif">
              3. Technology Stack Architecture
            </h2>
            <p className="text-xs text-gray-500">
              Engineered with modern, performant web standards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Active Phase 1 Frontend Stack */}
          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-agri-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-agri-600" />
                Active Frontend (Phase 1)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Implemented
              </span>
            </div>

            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <strong className="text-gray-900">React 19 & Vite:</strong> Lightning-fast compilation, reactive component lifecycle, and lightweight footprint.
              </li>
              <li>
                <strong className="text-gray-900">Tailwind CSS:</strong> Bespoke agricultural green and cream palette, accessible typography, and fluid responsive grid.
              </li>
              <li>
                <strong className="text-gray-900">React Router v6:</strong> Declarative client-side routing for seamless multi-page transitions.
              </li>
              <li>
                <strong className="text-gray-900">Lucide React:</strong> Consistent, accessible iconography.
              </li>
              <li>
                <strong className="text-gray-900">predictionService.js:</strong> Decoupled abstraction layer handling client validation, mock previews, and future REST API dispatch.
              </li>
              <li>
                <strong className="text-gray-900">Session Storage Persistence:</strong> Zero-database session archive that retains scan records within the active browser session.
              </li>
            </ul>
          </div>

          {/* Planned Phase 2 Backend Stack */}
          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#786F5E] flex items-center gap-1.5">
                <Server className="w-4 h-4 text-gray-600" />
                Future Backend & AI (Phase 2)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Planned
              </span>
            </div>

            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <strong className="text-gray-900">FastAPI (Python 3.10+):</strong> High-performance asynchronous REST API framework with native OpenAPI schema generation.
              </li>
              <li>
                <strong className="text-gray-900">Uvicorn ASGI Server:</strong> Lightweight asynchronous web server gateway.
              </li>
              <li>
                <strong className="text-gray-900">Deep Learning Model:</strong> Convolutional Neural Network (CNN) with transfer learning (e.g. MobileNetV2 or ResNet50) fine-tuned on foliar benchmarks.
              </li>
              <li>
                <strong className="text-gray-900">PyTorch / ONNX Runtime:</strong> Optimized tensor inference for rapid GPU and CPU prediction latency.
              </li>
              <li>
                <strong className="text-gray-900">Dataset Scope:</strong> Curated PlantVillage agricultural benchmark foliar dataset spanning 18+ classes across 5 crops.
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Realistic Academic Limitations */}
      <section className="bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-8 shadow-soft space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-serif">
              4. Realistic Academic Limitations
            </h2>
            <p className="text-xs text-gray-500">
              Transparent assessment of technical boundaries and environmental factors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
            <h4 className="font-bold text-gray-900">Macro Single-Leaf Photography Requirement</h4>
            <p className="leading-relaxed">
              Convolutional models require focused close-ups of an individual leaf. Multi-leaf background clutter, hands in frame, or severe motion blur impede accurate feature activation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
            <h4 className="font-bold text-gray-900">Illumination & Glare Sensitivity</h4>
            <p className="leading-relaxed">
              Excessive camera flash glare or deep shadows alter color channel distributions, potentially obscuring yellow chlorotic halos and fungal rust spore patterns.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
            <h4 className="font-bold text-gray-900">Co-Infections & Vascular Disease Scope</h4>
            <p className="leading-relaxed">
              The classification assumes single-pathogen dominance. It cannot diagnose concurrent dual infections, root rot (Pythium/Fusarium), or soil nutrient deficiencies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
            <h4 className="font-bold text-gray-900">Advisory Scope & Honesty Policy</h4>
            <p className="leading-relaxed">
              In accordance with academic rigor, this project does not invent unsubstantiated model accuracy benchmarks or generate fabricated leaf lesion severity percentages without validated spatial segmentation masks.
            </p>
          </div>
        </div>
      </section>

      {/* Future Scope & Roadmap */}
      <section className="bg-white rounded-3xl border border-[#E8E1D5] p-6 sm:p-8 shadow-soft space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-serif">
              5. Future Scope & Roadmap
            </h2>
            <p className="text-xs text-gray-500">
              Planned development milestones following Phase 1 completion.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-2">
            <span className="text-xs font-mono font-bold text-agri-700">MILESTONE 1</span>
            <h4 className="text-sm font-bold text-gray-900">FastAPI Backend Integration</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connect the frontend client to a live FastAPI REST endpoint with PyTorch CNN weights.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-2">
            <span className="text-xs font-mono font-bold text-agri-700">MILESTONE 2</span>
            <h4 className="text-sm font-bold text-gray-900">Offline PWA Field Capability</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Implement client-side inference via ONNX Web or TensorFlow.js for off-grid farmers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-2">
            <span className="text-xs font-mono font-bold text-agri-700">MILESTONE 3</span>
            <h4 className="text-sm font-bold text-gray-900">Lesion Segmentation Masking</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Incorporate U-Net segmentation to calculate actual damaged surface area percentages.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E1D5] space-y-2">
            <span className="text-xs font-mono font-bold text-agri-700">MILESTONE 4</span>
            <h4 className="text-sm font-bold text-gray-900">Multilingual Voice Extension</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Add audio readouts in regional farming dialects for broader smallholder accessibility.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
