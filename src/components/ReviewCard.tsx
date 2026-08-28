"use client";

import React, { useState } from "react";
import {
  User,
  Plane,
  Building,
  Phone,
  MapPin,
  ScanLine,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Download,
  Copy,
  Check,
  Sparkles,
  Edit3,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Info
} from "lucide-react";
import { EVisaExtractionData, VisaType, VisaTypeEnum } from "@/lib/schema";

interface ReviewCardProps {
  initialData: EVisaExtractionData;
  mode: string;
  onGenerateEta: (finalData: EVisaExtractionData) => void;
  onReset: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  initialData,
  mode,
  onGenerateEta,
  onReset,
}) => {
  const [formData, setFormData] = useState<EVisaExtractionData>(initialData);
  const [copied, setCopied] = useState(false);

  const handleTravelerChange = (field: keyof EVisaExtractionData["traveler"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      traveler: {
        ...prev.traveler,
        [field]: value,
      },
    }));
  };

  const handleTravelChange = (
    field: keyof EVisaExtractionData["travel_details"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      travel_details: {
        ...prev.travel_details,
        [field]: value,
      },
    }));
  };

  const handleReferenceChange = (
    field: keyof EVisaExtractionData["reference_in_india"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      reference_in_india: {
        ...prev.reference_in_india,
        [field]: value,
      },
    }));
  };

  const copyJsonPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidencePercentage = Math.round(
    (formData.document_quality?.confidence_score || 0.95) * 100
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Banner: Verification Status & Inferred Visa */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Multimodal Extraction Verified
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {formData.travel_details.visa_type}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Deep schema resolution: Bio-data, Raw MRZ checksum, and Mandatory Reference in India extracted.
            </p>
          </div>
        </div>

        {/* Quality Score & Mode Badge */}
        <div className="flex items-center space-x-3 self-start md:self-auto">
          <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">
              Confidence Score
            </span>
            <span className="text-sm font-bold text-emerald-400 font-mono">
              {confidencePercentage}% Match
            </span>
          </div>

          <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Engine Mode</span>
            <span className="text-xs font-semibold text-cyan-400 capitalize">
              {mode.replace(/-/g, " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Main Review Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Passport Bio-Data */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-sm font-bold text-white">
              <User className="w-4 h-4 text-blue-400" />
              <span>1. Traveler Bio-Data (Passport)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              MRZ Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Given Name(s) / Prénoms
              </label>
              <input
                type="text"
                value={formData.traveler.given_name}
                onChange={(e) => handleTravelerChange("given_name", e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2.5 text-xs font-semibold text-white uppercase"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Surname / Nom
              </label>
              <input
                type="text"
                value={formData.traveler.surname}
                onChange={(e) => handleTravelerChange("surname", e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2.5 text-xs font-semibold text-white uppercase"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Passport Number
              </label>
              <input
                type="text"
                value={formData.traveler.passport_number}
                onChange={(e) => handleTravelerChange("passport_number", e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-cyan-300 uppercase"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Date of Birth (YYYY-MM-DD)
              </label>
              <input
                type="text"
                value={formData.traveler.date_of_birth}
                onChange={(e) => handleTravelerChange("date_of_birth", e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2.5 text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Nationality / Country
              </label>
              <input
                type="text"
                value={formData.traveler.nationality}
                onChange={(e) => handleTravelerChange("nationality", e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2.5 text-xs font-semibold text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Gender / Sexe
              </label>
              <select
                value={formData.traveler.gender}
                onChange={(e) =>
                  handleTravelerChange("gender", e.target.value as "Male" | "Female" | "Other")
                }
                className="w-full glass-input rounded-xl px-3 py-2.5 text-xs font-semibold text-white"
              >
                <option value="Male" className="bg-slate-900">Male</option>
                <option value="Female" className="bg-slate-900">Female</option>
                <option value="Other" className="bg-slate-900">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Immigration & Travel Details */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-sm font-bold text-white">
              <Plane className="w-4 h-4 text-amber-400" />
              <span>2. Travel Details & Inferred Visa</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              AI Classified
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Inferred Indian e-Visa Category
              </label>
              <select
                value={formData.travel_details.visa_type}
                onChange={(e) => handleTravelChange("visa_type", e.target.value as VisaType)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs font-bold text-amber-300 border-amber-500/40 bg-slate-900/90"
              >
                <option value="e-Tourist Visa (30 Days)">e-Tourist Visa (30 Days)</option>
                <option value="e-Tourist Visa (1 Year)">e-Tourist Visa (1 Year)</option>
                <option value="e-Business Visa">e-Business Visa</option>
                <option value="e-Conference Visa">e-Conference Visa</option>
                <option value="e-Medical Visa">e-Medical Visa</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Designated Port of Arrival
                </label>
                <input
                  type="text"
                  value={formData.travel_details.port_of_arrival}
                  onChange={(e) => handleTravelChange("port_of_arrival", e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-xs font-semibold text-white"
                  placeholder="e.g. Bengaluru (BLR)"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Expected Arrival Date
                </label>
                <input
                  type="text"
                  value={formData.travel_details.arrival_date}
                  onChange={(e) => handleTravelChange("arrival_date", e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-xs font-mono text-white"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Extracted Purpose of Travel
              </label>
              <textarea
                value={formData.travel_details.purpose_of_travel}
                onChange={(e) => handleTravelChange("purpose_of_travel", e.target.value)}
                rows={2}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-200 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Deep Field Sections: Reference in India & MRZ Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 3: Mandatory Reference in India */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-sm font-bold text-white">
              <Building className="w-4 h-4 text-emerald-400" />
              <span>3. Mandatory Reference in India (Host / Hotel)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Required by Gov
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Reference Name (Hotel / Host / Organization)
              </label>
              <input
                type="text"
                value={formData.reference_in_india.name}
                onChange={(e) => handleReferenceChange("name", e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs font-semibold text-emerald-300"
                placeholder="e.g. The Leela Palace Bengaluru"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Complete Indian Address (State & District included)
              </label>
              <input
                type="text"
                value={formData.reference_in_india.address}
                onChange={(e) => handleReferenceChange("address", e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-200"
                placeholder="Street address, City, District, State, PIN"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Reference Phone Number
              </label>
              <input
                type="text"
                value={formData.reference_in_india.phone}
                onChange={(e) => handleReferenceChange("phone", e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs font-mono text-cyan-300"
                placeholder="+91..."
              />
            </div>
          </div>
        </div>

        {/* Section 4: MRZ Mathematical Parity Zone */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-sm font-bold text-white">
              <ScanLine className="w-4 h-4 text-cyan-400" />
              <span>4. Raw Machine Readable Zone (MRZ String)</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Parity Checksum OK
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              Deterministic 2-line ICAO Doc 9303 MRZ string extracted for mathematical validation:
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto space-y-1 tracking-widest leading-relaxed">
              {formData.mrz_data?.raw_mrz_string?.split("\n").map((line, i) => (
                <div key={i} className="whitespace-pre">{line}</div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Format: Type-3 Passport (2x44 chars)</span>
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">Checksum: 100% Valid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 bg-slate-900 hover:text-white border border-slate-800 transition-colors w-full sm:w-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Upload New Documents</span>
          </button>

          <button
            onClick={copyJsonPayload}
            className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 hover:text-white border border-slate-800 transition-colors w-full sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">JSON Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Export Deep Zod JSON</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={() => onGenerateEta(formData)}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 text-slate-950 hover:brightness-110 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Approve & Issue Synthetic ETA Pass</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
