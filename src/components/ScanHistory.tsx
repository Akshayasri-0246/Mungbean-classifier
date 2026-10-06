import React from 'react';
import type { DiseaseResult } from '../types';
import { History, Trash2, Target, ChevronRight } from 'lucide-react';

interface ScanHistoryProps {
  history: DiseaseResult[];
  onSelectHistoryItem: (item: DiseaseResult) => void;
  onClearHistory: () => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory
}) => {
  return (
    <div className="space-y-6 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">LocalStorage Session Logs</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Scan History & Diagnostic Log</h2>
          <p className="text-slate-400 text-sm">Review previously scanned leaves, bounding box coordinates, and treatment remedies.</p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Log History</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <History className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No Past Scans Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Run a live camera scan or upload a leaf image to automatically save your diagnostic report to your history.
          </p>
        </div>
      ) : (
        /* History Grid */
        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelectHistoryItem(item)}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.diseaseName}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold">{item.cropName}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400 font-mono">{item.dateAnalyzed || 'Recent'}</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                    {item.diseaseName}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center mt-0.5">
                    <Target className="w-3 h-3 text-emerald-400 mr-1" />
                    {item.boundingBoxes.length} Bounding Box ROI Target(s) ({item.overallConfidence}% Confidence)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.severity === 'Healthy' 
                    ? 'bg-emerald-500/15 text-emerald-400' 
                    : item.severity === 'Severe'
                    ? 'bg-rose-500/15 text-rose-400'
                    : 'bg-yellow-500/15 text-yellow-400'
                }`}>
                  {item.severity}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
