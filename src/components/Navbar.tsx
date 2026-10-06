import React from 'react';
import { ActiveTab, DeviceMode } from '../types';
import { 
  Scan, 
  Sparkles, 
  BookOpen, 
  History, 
  Smartphone, 
  Monitor, 
  SlidersHorizontal, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  openSettings: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  deviceMode,
  setDeviceMode,
  openSettings,
  historyCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center transition-all group-hover:bg-transparent">
                <Scan className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                  AgriVision<span className="text-emerald-400">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                  OpenCV 4.8
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Mobile & Web Boundary Box ML Disease Analyzer
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'scanner'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Scan className="w-4 h-4" />
              <span>AI Vision Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('intro')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'intro'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Overview & Intro</span>
            </button>

            <button
              onClick={() => setActiveTab('dataset')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dataset'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Crop Dataset</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'history'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Scan Logs</span>
              {historyCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded-full">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>

          {/* Controls: Device Frame Toggle + Model Settings */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* System Engine Status */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>WebGPU / OpenCV WASM</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-1" />
            </div>

            {/* Mobile Preview Frame Toggle */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
              <button
                onClick={() => setDeviceMode('web')}
                title="Switch to Web View"
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  deviceMode === 'web'
                    ? 'bg-emerald-500 text-slate-950 shadow font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Web Site</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                title="Switch to Mobile App Preview Frame"
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  deviceMode === 'mobile'
                    ? 'bg-emerald-500 text-slate-950 shadow font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile App</span>
              </button>
            </div>

            {/* Settings Trigger */}
            <button
              onClick={openSettings}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-slate-700 transition-colors"
              title="ML Model Settings & OpenCV Parameters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
