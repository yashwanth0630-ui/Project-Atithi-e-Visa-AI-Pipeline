"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { NetworkStatusBar } from "@/components/NetworkStatusBar";
import { AgentBatchPanel } from "@/components/AgentBatchPanel";
import { DocumentUploader } from "@/components/DocumentUploader";
import { ProcessingState } from "@/components/ProcessingState";
import { ReviewCard } from "@/components/ReviewCard";
import { EtaCertificateModal } from "@/components/EtaCertificateModal";
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { EVisaExtractionData } from "@/lib/schema";
import {
  saveToQueue,
  getQueuedApplications,
  syncQueue,
  clearQueue
} from "@/lib/offline-queue";
import { Sparkles, Shield, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [stage, setStage] = useState<"upload" | "processing" | "review">("upload");
  const [parsedData, setParsedData] = useState<EVisaExtractionData | null>(null);
  const [pipelineMode, setPipelineMode] = useState<string>("synthetic-fixture");
  const [isEtaModalOpen, setIsEtaModalOpen] = useState<boolean>(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // India DPI Network & Agent Mode states
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [is2GMode, setIs2GMode] = useState<boolean>(false);
  const [isAgentMode, setIsAgentMode] = useState<boolean>(false);
  const [queueCount, setQueueCount] = useState<number>(0);
  const [queuedItems, setQueuedItems] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      refreshQueue();

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  const refreshQueue = async () => {
    try {
      const items = await getQueuedApplications();
      setQueuedItems(items);
      setQueueCount(items.length);
    } catch (err) {
      console.warn("Could not load queue:", err);
    }
  };

  const handleProcessDocuments = async (payload: {
    passportBase64?: string;
    itineraryText?: string;
    itineraryBase64?: string;
    fixtureId?: string;
  }) => {
    if (isAgentMode || !isOnline) {
      try {
        await saveToQueue(payload);
        await refreshQueue();
        alert(
          isAgentMode
            ? "Application captured into Agent Batch Queue (IndexedDB). Ready for bulk sync."
            : "Offline PWA Active: Application buffered locally in IndexedDB. Will sync when 4G signal returns."
        );
        return;
      } catch (queueErr: any) {
        console.error("Queue error:", queueErr);
        setErrorMessage("Could not save to offline queue: " + queueErr.message);
        return;
      }
    }

    setStage("processing");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/parse-documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success && json.data) {
        setParsedData(json.data);
        setPipelineMode(json.mode || "live-openai");
        setStage("review");
      } else {
        throw new Error(json.error || "Failed to extract documents");
      }
    } catch (err: any) {
      console.error("Error processing documents:", err);
      setErrorMessage(err.message || "An unexpected error occurred during processing.");
      setStage("upload");
    }
  };

  const handleSyncAll = async () => {
    if (!isOnline) {
      alert("Must be online to synchronize queued applications.");
      return;
    }
    setIsSyncing(true);
    setSyncProgress("Starting batch sync...");

    try {
      const results = await syncQueue((current, total) => {
        setSyncProgress(`Processing application ${current} of ${total}...`);
      });

      await refreshQueue();
      setSyncProgress(null);
      setIsSyncing(false);

      if (results.length > 0 && results[0].status === "success" && results[0].data?.data) {
        setParsedData(results[0].data.data);
        setPipelineMode("agent-batch-synced");
        setStage("review");
      } else {
        alert("Batch sync complete! Processed " + results.length + " items.");
      }
    } catch (syncErr: any) {
      console.error("Sync error:", syncErr);
      setSyncProgress(null);
      setIsSyncing(false);
      alert("Sync encountered an issue: " + syncErr.message);
    }
  };

  const handleClearQueue = async () => {
    if (confirm("Are you sure you want to clear all queued offline applications?")) {
      await clearQueue();
      await refreshQueue();
    }
  };

  const handleGenerateEta = (finalData: EVisaExtractionData) => {
    setParsedData(finalData);
    setIsEtaModalOpen(true);
  };

  const handleReset = () => {
    setStage("upload");
    setParsedData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased overflow-x-hidden">
      <Header onOpenArchitecture={() => setIsArchModalOpen(true)} />

      {/* Network & DPI Status Bar - Edge-to-edge on mobile */}
      <div className="w-full">
        <NetworkStatusBar
          isOnline={isOnline}
          is2GMode={is2GMode}
          onToggle2G={(val) => setIs2GMode(val)}
          isAgentMode={isAgentMode}
          onToggleAgent={(val) => setIsAgentMode(val)}
          queueCount={queueCount}
          onSyncQueue={handleSyncAll}
          isSyncing={isSyncing}
        />
      </div>

      {/* Main Container: Bleeds edge-to-edge on mobile, constrained on desktop */}
      <main className="flex-1 w-full px-0 sm:px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 py-6 md:py-10 space-y-8 md:space-y-10">
        
        {/* Hero Banner: Hyper-minimal on mobile */}
        <section className="text-center space-y-4 md:space-y-6 max-w-3xl mx-auto px-5 md:px-0 mt-2 md:mt-0">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Intent-to-Action Pipeline • DPI Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Indian e-Visa Application, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Automated &amp; Frictionless.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            Drop raw traveler documents. Our multimodal pipeline parses identity bio-pages, semantically classifies the right visa sub-category, and validates against Indian immigration schemas.
          </p>

          {/* Quick Metrics: Stacked full-width on mobile, pill-row on desktop */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 pt-4 text-[13px] md:text-sm font-medium text-slate-400">
            <div className="flex items-center justify-center space-x-2 bg-slate-900 md:bg-transparent w-full sm:w-auto px-4 py-3 md:p-0 rounded-xl border border-slate-800 md:border-none">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Manual Forms</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-slate-900 md:bg-transparent w-full sm:w-auto px-4 py-3 md:p-0 rounded-xl border border-slate-800 md:border-none">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Offline PWA / 2G</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-slate-900 md:bg-transparent w-full sm:w-auto px-4 py-3 md:p-0 rounded-xl border border-slate-800 md:border-none">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>ETA Pass (PDF/QR)</span>
            </div>
          </div>
        </section>

        {/* Error Alert: Floats with proper margins on mobile */}
        {errorMessage && (
          <div className="mx-4 md:mx-auto p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm max-w-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-lg gap-3">
            <span className="leading-relaxed">{errorMessage}</span>
            <button 
              onClick={() => setErrorMessage(null)} 
              className="w-full sm:w-auto bg-red-500/20 hover:bg-red-500/30 text-red-200 py-2 px-4 rounded-lg font-bold transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Assisted Agent Batch Panel when Agent Mode is Active */}
        {isAgentMode && stage === "upload" && (
          <div className="px-4 md:px-0">
            <AgentBatchPanel
              queueItems={queuedItems}
              onSyncAll={handleSyncAll}
              onClearQueue={handleClearQueue}
              isSyncing={isSyncing}
              isOnline={isOnline}
              syncProgress={syncProgress}
            />
          </div>
        )}

        {/* Dynamic Workflow Stages */}
        <section className="relative w-full">
          {stage === "upload" && (
            <DocumentUploader
              onProcess={handleProcessDocuments}
              isLoading={false}
              is2GMode={is2GMode}
            />
          )}

          {stage === "processing" && <ProcessingState />}

          {stage === "review" && parsedData && (
            <ReviewCard
              initialData={parsedData}
              mode={pipelineMode}
              onGenerateEta={handleGenerateEta}
              onReset={handleReset}
            />
          )}
        </section>
      </main>

      {/* Modals */}
      <EtaCertificateModal
        isOpen={isEtaModalOpen}
        data={parsedData}
        onClose={() => setIsEtaModalOpen(false)}
      />

      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      {/* Footer: Extra bottom padding for mobile to account for native swipe bars */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 md:py-10 text-center text-xs text-slate-500 mt-auto pb-safe">
        <div className="flex flex-col items-center justify-center space-y-3 md:space-y-0 md:flex-row md:space-x-3 px-6">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="text-[13px] md:text-sm">
            Project Atithi • Built for <em>Build What Moves India</em>
          </span>
        </div>
        <p className="max-w-xl mx-auto mt-4 leading-relaxed text-slate-600 px-6">
          Independent AI demonstration prototype. Compliant with Hackathon Zero-Interference Directives. All mock data &amp; identity cards are 100% synthetic specimens.
        </p>
      </footer>
    </div>
  );
}
