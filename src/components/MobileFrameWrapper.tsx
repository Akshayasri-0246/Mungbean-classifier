import React from 'react';
import { Wifi, Battery, Signal, Smartphone, Monitor, ChevronLeft } from 'lucide-react';

interface MobileFrameWrapperProps {
  children: React.ReactNode;
  onSwitchToWeb: () => void;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({ children, onSwitchToWeb }) => {
  return (
    <div className="min-h-screen py-6 px-4 flex flex-col items-center justify-center bg-slate-950/90 relative">
      
      {/* Top Banner Notice */}
      <div className="mb-4 flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
        <Smartphone className="w-4 h-4 text-emerald-400" />
        <span>Mobile App Device Simulator Frame</span>
        <button
          onClick={onSwitchToWeb}
          className="ml-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] hover:bg-emerald-400 transition-colors"
        >
          Switch to Full Web Site
        </button>
      </div>

      {/* Simulated Smartphone Frame */}
      <div className="relative w-full max-w-[410px] h-[840px] bg-slate-950 rounded-[48px] border-[10px] border-slate-800 phone-frame-container overflow-hidden flex flex-col shadow-2xl">
        
        {/* Phone Top Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center border-b border-x border-slate-800/80">
          <div className="w-12 h-3.5 bg-slate-900 rounded-full flex items-center justify-end px-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-ping" />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="h-10 bg-slate-950 px-6 flex items-end justify-between text-[11px] text-slate-300 font-medium z-40 shrink-0 pb-1 select-none">
          <span>9:41</span>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Signal className="w-3.5 h-3.5 text-slate-300" />
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Mobile Screen Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 relative scrollbar-none pb-20">
          {children}
        </div>

        {/* Phone Bottom Home Swipe Bar */}
        <div className="h-5 bg-slate-950 flex items-center justify-center shrink-0 z-40">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>

      </div>

    </div>
  );
};
