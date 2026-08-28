"use client";

import React from "react";
import { HardDrive, RefreshCw, Trash2, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface AgentBatchPanelProps {
  queueItems: any[];
  onSyncAll: () => void;
  onClearQueue: () => void;
  isSyncing: boolean;
  isOnline: boolean;
  syncProgress?: string | null;
}

export const AgentBatchPanel: React.FC<AgentBatchPanelProps> = ({
  queueItems,
  onSyncAll,
  onClearQueue,
  isSyncing,
  isOnline,
  syncProgress,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-amber-500/40 bg-amber-950/20 space-y-4 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Assisted Agent Mode (VLE / CSC Village Desk)</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
                {queueItems.length} Queued
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Captures applications completely offline into browser IndexedDB. Syncs with AI when connectivity returns.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {queueItems.length > 0 && (
            <button
              onClick={onClearQueue}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

          <button
            onClick={onSyncAll}
            disabled={!isOnline || isSyncing || queueItems.length === 0}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Syncing..." : "Sync All Now"}</span>
          </button>
        </div>
      </div>

      {syncProgress && (
        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center space-x-2 animate-pulse">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>{syncProgress}</span>
        </div>
      )}

      {/* Queue items list */}
      {queueItems.length === 0 ? (
        <div className="text-center py-6 text-slate-500 text-xs">
          <Clock className="w-6 h-6 mx-auto mb-1.5 text-slate-600" />
          <span>No offline applications queued. Upload files or use the sandbox to queue.</span>
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {queueItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-semibold text-white flex items-center space-x-2">
                  <span>Batch #{idx + 1}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {item.payload?.itineraryText || "Itinerary Document Queued"}
                </p>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                PENDING SYNC
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
