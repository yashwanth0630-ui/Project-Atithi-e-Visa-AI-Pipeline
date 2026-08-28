"use client";

import React, { useEffect, useState } from "react";
import { Eye, Brain, CheckCircle2, ShieldCheck, Sparkles, Loader2, ArrowRight } from "lucide-react";

interface ProcessingStateProps {
  onComplete?: () => void;
}

export const ProcessingState: React.FC<ProcessingStateProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 600);
    const timer2 = setTimeout(() => setStep(3), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="glass-panel-glow rounded-2xl p-8 border border-amber-500/30 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="relative inline-flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse"></div>
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-600 p-[2px] shadow-2xl">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
        </div>
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Executing Multimodal AI Pipeline
        </h3>
        <p className="text-xs text-slate-400">
          Extracting identity bio-data from passport image & classifying travel purpose into Indian immigration schema...
        </p>
      </div>

      {/* 3 Step Visual Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
        <div
          className={`p-3.5 rounded-xl border text-left transition-all ${
            step >= 1
              ? "bg-slate-900 border-amber-500/40 text-amber-300"
              : "bg-slate-950/60 border-slate-800 text-slate-500"
          }`}
        >
          <div className="flex items-center space-x-2 mb-1.5">
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold">1. GPT-4o Vision</span>
          </div>
          <p className="text-[10px] text-slate-400">MRZ & bio-page extraction</p>
          {step > 1 && (
            <span className="mt-2 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono inline-flex items-center">
              <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Complete
            </span>
          )}
        </div>

        <div
          className={`p-3.5 rounded-xl border text-left transition-all ${
            step >= 2
              ? "bg-slate-900 border-cyan-500/40 text-cyan-300"
              : "bg-slate-950/60 border-slate-800 text-slate-500"
          }`}
        >
          <div className="flex items-center space-x-2 mb-1.5">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold">2. Intent Classifier</span>
          </div>
          <p className="text-[10px] text-slate-400">Semantic visa type routing</p>
          {step > 2 && (
            <span className="mt-2 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono inline-flex items-center">
              <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Inferred
            </span>
          )}
        </div>

        <div
          className={`p-3.5 rounded-xl border text-left transition-all ${
            step >= 3
              ? "bg-slate-900 border-emerald-500/40 text-emerald-300"
              : "bg-slate-950/60 border-slate-800 text-slate-500"
          }`}
        >
          <div className="flex items-center space-x-2 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold">3. Zod Contract</span>
          </div>
          <p className="text-[10px] text-slate-400">Strict schema validation</p>
          {step >= 3 && (
            <span className="mt-2 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono inline-flex items-center">
              <Sparkles className="w-2.5 h-2.5 mr-1" /> Validated
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
