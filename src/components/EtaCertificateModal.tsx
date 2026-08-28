"use client";

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import {
  ShieldCheck,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Sparkles,
  ExternalLink,
  Info,
  Building,
  Copy,
  Check,
  Smartphone,
  Share2,
  X
} from "lucide-react";
import { EVisaExtractionData } from "@/lib/schema";

interface EtaCertificateModalProps {
  isOpen: boolean;
  data: EVisaExtractionData | null;
  onClose: () => void;
}

// ── Sanitization Helpers ──────────────────────────────────────────────
function cleanAddress(raw: string): string {
  return raw
    .replace(/AUTOMATED AI ADDRESS & JURISDICTION EXTRACTION\s*/gi, "")
    .replace(/Extracted Hotel\/Host Address:\s*/gi, "")
    .replace(/Extracted District:\s*/gi, ", ")
    .replace(/Extracted State:\s*/gi, ", ")
    .replace(/Extracted Postal Code:\s*/gi, " ")
    .replace(/Extracted Phone Number:\s*/gi, "")
    .replace(/\s*,\s*,/g, ",")
    .replace(/^[\s,]+/, "")
    .trim();
}

function cleanSurname(raw: string): string {
  return raw
    .replace(/\s*FLIGHT\s*ROUTE\s*/gi, "")
    .replace(/\s*TICKET\s*/gi, "")
    .replace(/\s*ITINERARY\s*/gi, "")
    .replace(/\s*RECEIPT\s*/gi, "")
    .replace(/\s*E-?TICKET\s*/gi, "")
    .replace(/\s*BOARDING\s*PASS\s*/gi, "")
    .replace(/\s*CONFIRMATION\s*/gi, "")
    .trim();
}

function formatMrzLine(raw: string): string {
  return raw
    .replace(/\s+/g, "<")
    .toUpperCase()
    .padEnd(44, "<")
    .substring(0, 44);
}
// ─────────────────────────────────────────────────────────────────────

export const EtaCertificateModal: React.FC<EtaCertificateModalProps> = ({
  isOpen,
  data,
  onClose,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [smsCopied, setSmsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FF9933", "#FFFFFF", "#138808", "#38bdf8"],
        });
      } catch (err) {
        // Safe fail
      }
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const etaNumber = `IN-ETA-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const issueDate = new Date().toISOString().split("T")[0];
  const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const safeSurname = cleanSurname(data.traveler.surname);
  const safeGivenName = data.traveler.given_name.trim();
  const safeAddress = cleanAddress(data.reference_in_india.address);

  // Generate lightweight SMS-ready text representation (~160 chars)
  const smsString = `GOI SYNTHETIC ETA GRANTED\nRef: ${etaNumber}\nName: ${safeGivenName} ${safeSurname}\nPassport: ${data.traveler.passport_number}\nVisa: ${data.travel_details.visa_type}\nPort: ${data.travel_details.port_of_arrival}\nValidity: ${issueDate} to ${expiryDate}\nRef: ${data.reference_in_india.name}`;

  const handleGenerateQrPass = async () => {
    try {
      const qrPayload = `INDIAN ELECTRONIC TRAVEL AUTHORIZATION (ETA)
Reference: ${etaNumber}
Holder: ${safeGivenName.toUpperCase()} ${safeSurname.toUpperCase()}
Passport: ${data.traveler.passport_number.toUpperCase()}
Visa Type: ${data.travel_details.visa_type}
Port of Entry: ${data.travel_details.port_of_arrival}
Validity: ${issueDate} to ${expiryDate}
Status: GRANTED (SYNTHETIC SPECIMEN)
Reference in India: ${data.reference_in_india.name}
Digital Signature: ${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}
Hackathon Prototype • Build What Moves India`;
      const url = await QRCode.toDataURL(qrPayload, {
        width: 320,
        margin: 2,
        color: {
          dark: "#090d16",
          light: "#ffffff",
        },
      });
      setQrDataUrl(url);
      setShowQrModal(true);
    } catch (err) {
      console.error("QR Code Generation Error:", err);
    }
  };

  const copySmsText = () => {
    navigator.clipboard.writeText(smsString);
    setSmsCopied(true);
    setTimeout(() => setSmsCopied(false), 2000);
  };

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    // Dark background
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 297, "F");

    // Header Banner
    doc.setFillColor(255, 153, 51);
    doc.rect(0, 0, 210, 6, "F");
    doc.setFillColor(19, 136, 8);
    doc.rect(0, 6, 210, 6, "F");

    // Titles
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("GOVERNMENT OF INDIA (PROTOTYPE SPECIMEN)", 105, 22, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(251, 191, 36);
    doc.text("ELECTRONIC TRAVEL AUTHORIZATION (ETA)", 105, 29, { align: "center" });

    doc.setFontSize(8);
    doc.setTextColor(239, 68, 68);
    doc.text("100% SYNTHETIC SPECIMEN • BUILD WHAT MOVES INDIA HACKATHON PROTOTYPE", 105, 35, { align: "center" });

    // Box border
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(0.5);
    doc.rect(12, 40, 186, 245);

    // ETA Application Details
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("Application Reference:", 18, 50);
    doc.setTextColor(56, 189, 248);
    doc.setFont("helvetica", "bold");
    doc.text(etaNumber, 75, 50);

    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "normal");
    doc.text("Visa Sub-Category:", 18, 57);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(data.travel_details.visa_type, 75, 57);

    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "normal");
    doc.text("ETA Status:", 18, 64);
    doc.setTextColor(52, 211, 153);
    doc.setFont("helvetica", "bold");
    doc.text("GRANTED (SYNTHETIC SIMULATION)", 75, 64);

    // Divider
    doc.line(18, 69, 192, 69);

    // 1. Traveler Identification
    doc.setTextColor(251, 191, 36);
    doc.setFontSize(10);
    doc.text("1. TRAVELER IDENTIFICATION", 18, 77);

    const leftCol = 18;
    const rightCol = 75;
    const maxFieldWidth = pageWidth - rightCol - 15;
    let y = 85;

    doc.setFontSize(8.5);

    const fixedFields = [
      ["Given Name(s):", safeGivenName.toUpperCase()],
      ["Surname:", safeSurname.toUpperCase()],
      ["Passport Number:", data.traveler.passport_number.toUpperCase()],
      ["Nationality:", data.traveler.nationality],
      ["Date of Birth:", data.traveler.date_of_birth],
      ["Gender:", data.traveler.gender],
      ["Port of Arrival:", data.travel_details.port_of_arrival],
      ["Expected Arrival Date:", data.travel_details.arrival_date],
      ["Date of Issue:", issueDate],
      ["Validity Window:", `${issueDate} to ${expiryDate}`],
    ];

    fixedFields.forEach(([label, val]) => {
      doc.setTextColor(148, 163, 184);
      doc.setFont("helvetica", "normal");
      doc.text(label, leftCol, y);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text(String(val), rightCol, y);
      y += 6.5;
    });

    // Auto-wrapped Purpose of Travel
    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "normal");
    doc.text("Travel Purpose:", leftCol, y);

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    const wrappedPurpose = doc.splitTextToSize(
      data.travel_details.purpose_of_travel,
      maxFieldWidth
    );
    doc.text(wrappedPurpose, rightCol, y);
    y += wrappedPurpose.length * 5 + 2;

    // 2. Reference in India
    y += 3;
    doc.line(18, y, 192, y);
    y += 8;

    doc.setTextColor(52, 211, 153);
    doc.setFontSize(10);
    doc.text("2. MANDATORY REFERENCE IN INDIA (HOTEL / HOST)", 18, y);
    y += 8;

    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "normal");
    doc.text("Hotel / Host Name:", leftCol, y);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(data.reference_in_india.name, rightCol, y);
    y += 6.5;

    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "normal");
    doc.text("Full Address:", leftCol, y);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    const splitAddr = doc.splitTextToSize(safeAddress, maxFieldWidth);
    doc.text(splitAddr, rightCol, y);
    y += splitAddr.length * 5 + 2;

    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "normal");
    doc.text("Contact Phone:", leftCol, y);
    doc.setTextColor(56, 189, 248);
    doc.setFont("helvetica", "bold");
    doc.text(data.reference_in_india.phone, rightCol, y);
    y += 8;

    // MRZ Zone
    if (data.mrz_data?.raw_mrz_string) {
      doc.setFillColor(2, 6, 23);
      doc.rect(18, y, 174, 16, "F");
      doc.setFont("courier", "normal");
      doc.setFontSize(7);
      doc.setTextColor(56, 189, 248);

      const rawLines = data.mrz_data.raw_mrz_string.split("\n");
      const mrz1 = formatMrzLine(rawLines[0] || "");
      const mrz2 = formatMrzLine(rawLines[1] || "");

      doc.text(mrz1, 22, y + 6);
      doc.text(mrz2, 22, y + 12);
      y += 22;
    }

    // Footer Compliance Note
    doc.setDrawColor(239, 68, 68);
    doc.setFillColor(30, 41, 59);
    doc.rect(18, 245, 174, 30, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(248, 113, 113);
    doc.text("HACKATHON COMPLIANCE DIRECTIVE & ZERO-INTERFERENCE NOTICE", 22, 252);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(203, 213, 225);
    const splitNotice = doc.splitTextToSize(
      "This document is an ephemeral synthetic prototype generated by Project Atithi for the Build What Moves India hackathon. It has not interacted with live government immigration servers and holds zero legal travel validity.",
      166
    );
    doc.text(splitNotice, 22, 258);

    doc.save(`Synthetic_Indian_ETA_${safeSurname}_${etaNumber}.pdf`);
  };

  const displaySurname = cleanSurname(data.traveler.surname);
  const displayAddress = cleanAddress(data.reference_in_india.address);

  const rawMrzLines = data.mrz_data?.raw_mrz_string?.split("\n") || [];
  const displayMrz1 = formatMrzLine(rawMrzLines[0] || "");
  const displayMrz2 = formatMrzLine(rawMrzLines[1] || "");

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[95vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Synthetic Electronic Travel Authorization (ETA)
                </h2>
                <p className="text-xs text-slate-400">
                  Application Successfully Formatted & Ready for Issuance
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

          {/* Certificate Printable Area */}
          <div
            ref={certRef}
            className="relative bg-slate-950 border-2 border-slate-700 rounded-xl p-6 sm:p-8 space-y-5 overflow-hidden shadow-2xl text-slate-100"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-emerald-600" />

            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
              <p className="text-[11px] font-mono font-bold text-red-400">
                ⚠️ 100% SYNTHETIC SPECIMEN • FOR HACKATHON EVALUATION ONLY • NOT AN OFFICIAL VISA
              </p>
            </div>

            <div className="text-center space-y-1 pb-3 border-b border-slate-800">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold mb-1">
                अ
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-wider uppercase text-white">
                Government of India (Prototype Specimen)
              </h3>
              <p className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                Electronic Travel Authorization (ETA)
              </p>
            </div>

            {/* Status & Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block">
                  Application Number
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">{etaNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block">
                  ETA Status
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> GRANTED (SIMULATION)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block">
                  Visa Sub-Category
                </span>
                <span className="text-xs font-bold text-amber-300">
                  {data.travel_details.visa_type}
                </span>
              </div>
            </div>

            {/* Bio-Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Given Name(s):</span>
                <span className="font-bold text-white uppercase">{data.traveler.given_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Surname / Family Name:</span>
                <span className="font-bold text-white uppercase">{displaySurname}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Passport Number:</span>
                <span className="font-mono font-bold text-cyan-300">{data.traveler.passport_number}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Nationality:</span>
                <span className="font-semibold text-white">{data.traveler.nationality}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Date of Birth:</span>
                <span className="font-mono text-white">{data.traveler.date_of_birth}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Port of Entry:</span>
                <span className="font-semibold text-amber-300">{data.travel_details.port_of_arrival}</span>
              </div>
            </div>

            {/* Reference in India Callout */}
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center">
                <Building className="w-3 h-3 mr-1" /> Mandatory Reference in India
              </span>
              <div className="text-white font-semibold">{data.reference_in_india.name}</div>
              <div className="text-slate-300 text-[11px]">{displayAddress}</div>
              <div className="text-cyan-300 text-[11px] font-mono">Tel: {data.reference_in_india.phone}</div>
            </div>

            {/* ICAO MRZ Preview */}
            {data.mrz_data?.raw_mrz_string && (
              <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/20 font-mono text-[10px] text-cyan-300 tracking-[0.15em] leading-relaxed overflow-x-auto">
                <div>{displayMrz1}</div>
                <div>{displayMrz2}</div>
              </div>
            )}
          </div>

          {/* Modal Action Buttons: Multi-format DPI delivery */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>DPI delivery options: High-res PDF or low-data offline QR pass.</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleGenerateQrPass}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors"
              >
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>Get Offline QR / SMS</span>
              </button>

              <button
                onClick={downloadPdf}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Full PDF ETA</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightweight Offline QR & SMS Pass Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Offline QR & SMS Pass</h3>
                  <p className="text-[11px] text-slate-400">Zero-data low-bandwidth travel credential</p>
                </div>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* QR Code display */}
            {qrDataUrl && (
              <div className="bg-white p-4 rounded-xl text-center shadow-inner">
                <img src={qrDataUrl} alt="Synthetic ETA QR Code" className="w-52 h-52 mx-auto" />
                <p className="text-[10px] text-slate-700 font-mono mt-1 font-semibold">
                  SCAN AT IMMIGRATION • OFFLINE SIGNATURE
                </p>
              </div>
            )}

            {/* SMS string copy box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>SMS / WhatsApp Text Pass</span>
                <button
                  onClick={copySmsText}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
                >
                  {smsCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                {smsString}
              </pre>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </>
  );
};
