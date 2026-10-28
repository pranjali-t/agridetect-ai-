// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  BookOpen, 
  HelpCircle,
  FlaskConical,
  Microscope
} from 'lucide-react';
import { SUPPORTED_CROPS, WORKFLOW_STEPS, SYSTEM_STATS } from '../data/cropsData';
import CropCard from '../components/CropCard';
import WorkflowStep from '../components/WorkflowStep';
import SampleLeafSelector from '../components/SampleLeafSelector';
import { usePredictions } from '../context/PredictionContext';

export default function Home() {
  const navigate = useNavigate();
  const { setActiveSample } = usePredictions();

  const handleSelectSample = (file, sample) => {
    setActiveSample(sample);
    navigate('/detect');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-agri-100/60 via-cream-100/30 to-transparent pointer-events-none rounded-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          
          {/* Phase Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] shadow-xs text-xs font-semibold text-agri-800">
            <span className="w-2 h-2 rounded-full bg-agri-500 animate-pulse" />
            <span>Full-Stack AI System Active &bull; College Capstone</span>
            <span className="text-[#A89F91]">&bull;</span>
            <span className="text-gray-600">5 Target Crops</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-agri-900 tracking-tight font-serif leading-[1.15]">
            AI-Based Crop Disease <br />
            <span className="text-agri-700 italic">Detection System</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A modern, responsive agricultural AI dashboard engineered to assist agronomy students, researchers, and farmers in diagnosing foliar pathogens early across five staple crops.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => navigate('/detect')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-agri-800/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 text-agri-300" />
              <span>Analyze a Leaf</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('supported-crops');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-cream-100 text-gray-800 font-bold text-sm sm:text-base border border-[#E8E1D5] shadow-xs transition-colors"
            >
              <span>View Supported Crops</span>
            </button>
          </div>

          {/* Feature Highlights Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 border border-[#E8E1D5]">
              <CheckCircle2 className="w-3.5 h-3.5 text-agri-600" />
              JPG, JPEG & PNG Supported
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 border border-[#E8E1D5]">
              <Cpu className="w-3.5 h-3.5 text-agri-600" />
              FastAPI-Ready Client Architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 border border-[#E8E1D5]">
              <ShieldCheck className="w-3.5 h-3.5 text-agri-600" />
              Clearly Labeled Mock Previews
            </span>
          </div>

        </div>

        {/* Quick Sample Leaf Test Row */}
        <div className="max-w-5xl mx-auto mt-12 px-4">
          <SampleLeafSelector onSelectSample={handleSelectSample} />
        </div>
      </section>

      {/* 3-Step Diagnostic Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-agri-700">
            Streamlined Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif">
            Three-Step Diagnostic Workflow
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Designed for ease in the field or research laboratory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {WORKFLOW_STEPS.map((step, idx) => (
            <WorkflowStep
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
              iconName={step.icon}
              details={step.details}
              isLast={idx === WORKFLOW_STEPS.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Five Supported Crops Section */}
      <section id="supported-crops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-agri-700 block mb-1">
              Botanical Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif">
              Five Supported Crops
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
              Targeted monitoring for the five core crops in the PlantVillage benchmark. Click any crop card to test an analysis immediately.
            </p>
          </div>

          <div className="text-xs text-gray-500 bg-white px-3.5 py-2 rounded-xl border border-[#E8E1D5] inline-flex items-center gap-2 self-start md:self-auto">
            <FlaskConical className="w-4 h-4 text-agri-600" />
            <span>18+ Total Condition Classes</span>
          </div>
        </div>

        {/* 5 Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPPORTED_CROPS.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
          
          {/* Sixth Informational Card */}
          <div className="bg-gradient-to-br from-[#143826] to-[#1F5B3C] text-white rounded-2xl p-6 shadow-soft flex flex-col justify-between border border-[#1F5B3C]">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-agri-300">
                <Microscope className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-serif">
                Why These Five Crops?
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Apples, corn, grapes, potatoes, and tomatoes represent critical staple food security crops and high-value horticultural exports frequently devastated by rapid foliar blights and rusts.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-700/50 flex items-center justify-between text-xs">
              <span className="text-emerald-200">Phase 2: FastAPI CNN</span>
              <button
                onClick={() => navigate('/about')}
                className="underline hover:text-white transition-colors font-semibold"
              >
                Learn More &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* System Technical Scope Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8E1D5] p-8 shadow-soft">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#F2ECE1]">
            {SYSTEM_STATS.map((stat, i) => (
              <div key={i} className={`pt-4 lg:pt-0 ${i === 0 ? '' : 'lg:pl-6'}`}>
                <div className="text-2xl sm:text-3xl font-extrabold text-agri-900 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-gray-700 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-100 border border-[#E0D7C9] rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-agri-950 font-serif">
            Ready to test leaf diagnosis?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Upload your own field photo or select one of our preloaded test samples to experience the diagnosis workflow.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/detect')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-agri-300" />
              <span>Open Disease Detection Studio</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
