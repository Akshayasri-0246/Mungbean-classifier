import React from 'react';
import { ActiveTab } from '../types';
import { Scan, Sparkles, BookOpen, History } from 'lucide-react';

interface BottomMobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  historyCount: number;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  activeTab,
  setActiveTab,
  historyCount
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 md:hidden px-4 py-2">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-xl transition-all ${
            activeTab === 'scanner' ? 'text-emerald-400 font-semibold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scan className="w-5 h-5" />
          <span className="text-[10px]">Scanner</span>
        </button>

        <button
          onClick={() => setActiveTab('intro')}
          className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-xl transition-all ${
            activeTab === 'intro' ? 'text-emerald-400 font-semibold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">Features</span>
        </button>

        <button
          onClick={() => setActiveTab('dataset')}
          className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-xl transition-all ${
            activeTab === 'dataset' ? 'text-emerald-400 font-semibold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px]">Dataset</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-xl transition-all relative ${
            activeTab === 'history' ? 'text-emerald-400 font-semibold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <History className="w-5 h-5" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-emerald-500 text-slate-950 font-bold text-[9px] rounded-full">
                {historyCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Logs</span>
        </button>
      </div>
    </div>
  );
};
