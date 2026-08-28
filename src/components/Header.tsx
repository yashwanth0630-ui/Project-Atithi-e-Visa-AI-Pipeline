"use client";

import React, { useState } from "react";
import { ShieldCheck, Cpu, Layers, Sparkles, AlertCircle, FileText, Info } from "lucide-react";

interface HeaderProps {
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenArchitecture }) => {
  const [showRulesModal, setShowRulesModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-600 p-[1px] shadow-lg shadow-orange-500/10">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span className="text-xl font-black text-amber-400 select-none">अ</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
                  Project <span className="text-amber-400 ml-1.5">Atithi</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  e-Visa AI Pipeline
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Multimodal Document Parsing • Semantic Intent Classification • Synthetic ETA
              </p>
            </div>
          </div>

          {/* Action Badges & Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setShowRulesModal(true)}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-all shadow-sm"
              title="View Hackathon Compliance & Zero-Interference Policy"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>RULES.md</span>
            </button>

            <button
              onClick={onOpenArchitecture}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-500/30 hover:border-amber-500/60 transition-all shadow-sm shadow-amber-500/5 group"
            >
              <Cpu className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Architecture & AI</span>
            </button>
          </div>
        </div>
      </header>

      {/* RULES.md Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Hackathon Compliance Directives (RULES.md)</h3>
                  <p className="text-xs text-slate-400">Strict safety & zero-interference protocol</p>
                </div>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <h4 className="font-semibold text-emerald-400 mb-1 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> 1. Zero-Interference Policy
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  This application does not scrape, query, or reverse-engineer live government portals (`indianvisaonline.gov.in`). It is an independent AI prototype created for <em>Build What Moves India</em>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <h4 className="font-semibold text-amber-400 mb-1 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5" /> 2. Synthetic Data & Ephemeral Processing
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  All demonstration documents and passports use 100% synthetic fictitious identities. Files are processed in ephemeral memory buffers with no persistent disk storage of personal media.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <h4 className="font-semibold text-blue-400 mb-1 flex items-center">
                  <Info className="w-3.5 h-3.5 mr-1.5" /> 3. Submission Integrity & Zero-Key Mode
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Evaluators can test end-to-end with preloaded verified synthetic test fixtures without needing an OpenAI API key or registration.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
