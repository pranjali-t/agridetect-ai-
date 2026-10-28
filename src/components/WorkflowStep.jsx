// src/components/WorkflowStep.jsx
import React from 'react';
import { Upload, Cpu, FileCheck2, ArrowRight } from 'lucide-react';

const iconMap = {
  Upload: Upload,
  Cpu: Cpu,
  FileCheck2: FileCheck2,
};

export default function WorkflowStep({ step, title, description, iconName, details, isLast }) {
  const IconComponent = iconMap[iconName] || Upload;

  return (
    <div className="relative flex-1 flex flex-col items-center md:items-start text-center md:text-left bg-white p-6 sm:p-7 rounded-2xl border border-[#E8E1D5] shadow-soft hover:shadow-elevated transition-all group">
      {/* Step Pill */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="w-12 h-12 rounded-xl bg-agri-100 border border-agri-200 text-agri-800 flex items-center justify-center font-bold shadow-xs group-hover:bg-agri-700 group-hover:text-white transition-colors duration-300">
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="text-xs font-black tracking-widest text-[#B5ABA0] uppercase font-mono">
          STEP {step}
        </span>
      </div>

      <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-agri-800 transition-colors">
        {title}
      </h4>

      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
        {description}
      </p>

      <div className="mt-auto pt-3 border-t border-[#F2ECE1] w-full text-[11px] text-[#786F5E] flex items-center gap-1.5 font-medium">
        <span>{details}</span>
      </div>

      {!isLast && (
        <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-cream-bg border border-[#E8E1D5] text-[#8C8270] shadow-xs flex items-center justify-center">
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
