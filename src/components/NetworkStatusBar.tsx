"use client";

import React from "react";
import { Wifi, WifiOff, Zap, Users, HardDrive, RefreshCw } from "lucide-react";

interface NetworkStatusBarProps {
  isOnline: boolean;
  is2GMode: boolean;
  onToggle2G: (enabled: boolean) => void;
  isAgentMode: boolean;
  onToggleAgent: (enabled: boolean) => void;
  queueCount: number;
  onSyncQueue: () => void;
  isSyncing: boolean;
}

export const NetworkStatusBar: React.FC<NetworkStatusBarProps> = ({
  isOnline,
  is2GMode,
  onToggle2G,
  isAgentMode,
  onToggleAgent,
  queueCount,
  onSyncQueue,
  isSyncing,
}) => {
  return (
    <div className="w-full bg-slate-950/80 border-y border-slate-800/80 backdrop-blur-md px-4 sm:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Network State Badge */}
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              <Wifi className="w-3.5 h-3.5" />
              <span>DPI Network Online</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 font-bold animate-pulse">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline PWA Active (IndexedDB Buffer)</span>
            </div>
          )}

          {is2GMode && (
            <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-mono">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>2G Grayscale (&lt;40KB)</span>
            </span>
          )}
        </div>

        {/* DPI Controls: 2G Toggle & Agent Mode */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Extreme 2G Mode Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={is2GMode}
              onChange={(e) => onToggle2G(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-950"
            />
            <span className="text-slate-300 group-hover:text-white transition-colors flex items-center space-x-1">
              <span>Extreme 2G Mode</span>
            </span>
          </label>

          {/* Assisted Agent Mode Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={isAgentMode}
              onChange={(e) => onToggleAgent(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-950"
            />
            <span className="text-slate-300 group-hover:text-white transition-colors flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Agent Mode (VLE/CSC)</span>
              {queueCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
                  {queueCount}
                </span>
              )}
            </span>
          </label>

          {/* Quick Sync button if items queued */}
          {queueCount > 0 && (
            <button
              onClick={onSyncQueue}
              disabled={isSyncing || !isOnline}
              className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center space-x-1 hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? "animate-spin" : ""}`} />
              <span>Sync {queueCount} Queued</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
