"use client";

import React from "react";
import { Cpu, Eye, CheckCircle2, FileJson, ArrowRight, ShieldCheck, Zap, Database, Terminal, Clock, ShieldAlert } from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">OpenAI Architecture & Resilience Engine</h2>
              <p className="text-xs text-slate-400">
                Deep architectural specification for the <em>Build What Moves India</em> Hackathon
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Demo-Killer Fix Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Vercel 60s Timeout Override</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <code className="text-amber-300 font-mono">export const maxDuration = 60;</code> deployed on Next.js App Router API route to guarantee OCR completes without 10s serverless cuts.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-cyan-400 text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Canvas 1200px Guard</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Client canvas downscales 12MP raw phone photos to max 1200px JPEG, eliminating Vercel 4.5MB payload limits while retaining high OCR resolution.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold">
              <Database className="w-3.5 h-3.5" />
              <span>Deep Domain Extraction</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Extracts the mandatory <strong>Reference in India</strong> (hotel/state/district/phone) and raw <strong>MRZ 2-line checksum</strong> string.
            </p>
          </div>
        </div>

        {/* Schema Code Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <FileJson className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Deep Zod Output Schema Contract
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">openai.beta.chat.completions.parse</span>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300/90 overflow-x-auto leading-relaxed">
{`export const EVisaExtractionSchema = z.object({
  traveler: z.object({
    given_name: z.string(),
    surname: z.string(),
    passport_number: z.string(),
    date_of_birth: z.string().describe("YYYY-MM-DD"),
    nationality: z.string(),
    gender: z.enum(["Male", "Female", "Other"]),
  }),
  mrz_data: z.object({
    raw_mrz_string: z.string().describe("The exact 2-line MRZ string for deterministic mathematical checksum validation"),
  }),
  travel_details: z.object({
    port_of_arrival: z.string(),
    arrival_date: z.string().describe("YYYY-MM-DD"),
    purpose_of_travel: z.string(),
    visa_type: z.enum([
      "e-Tourist Visa (30 Days)",
      "e-Tourist Visa (1 Year)",
      "e-Business Visa",
      "e-Conference Visa",
      "e-Medical Visa"
    ]),
  }),
  reference_in_india: z.object({
    name: z.string().describe("Name of hotel, conference, or local host"),
    address: z.string().describe("Full address in India including State and District"),
    phone: z.string().describe("Contact phone number of the Indian reference"),
  }).describe("Mandatory field for Indian e-Visa"),
  document_quality: z.object({
    is_readable: z.boolean(),
    confidence_score: z.number().min(0).max(1),
    warnings: z.array(z.string()),
  }),
});`}
          </pre>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero-Interference & Synthetic Specimen Safeguard Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
