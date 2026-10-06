import React, { useState, useEffect } from 'react';
import { ActiveTab, DeviceMode, DiseaseResult } from './types';
import { SAMPLE_DISEASES } from './data/sampleDataset';
import { Navbar } from './components/Navbar';
import { BottomMobileNav } from './components/BottomMobileNav';
import { IntroSection } from './components/IntroSection';
import { CameraVisionScanner } from './components/CameraVisionScanner';
import { DiagnosticReportCard } from './components/DiagnosticReportCard';
import { DatasetExplorer } from './components/DatasetExplorer';
import { ScanHistory } from './components/ScanHistory';
import { ModelSettingsModal } from './components/ModelSettingsModal';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';
import { Sparkles, Scan, BookOpen, History, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('intro');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('web');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(75);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Active diagnostic result
  const [activeResult, setActiveResult] = useState<DiseaseResult | null>(SAMPLE_DISEASES[0]);

  // Persistent Scan History
  const [history, setHistory] = useState<DiseaseResult[]>(() => {
    try {
      const saved = localStorage.getItem('agrivision_scan_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [
      {
        ...SAMPLE_DISEASES[0],
        dateAnalyzed: new Date(Date.now() - 3600000 * 4).toLocaleString()
      },
      {
        ...SAMPLE_DISEASES[1],
        dateAnalyzed: new Date(Date.now() - 3600000 * 24).toLocaleString()
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('agrivision_scan_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  const handleSaveToHistory = (item: DiseaseResult) => {
    setHistory((prev) => [item, ...prev.filter((p) => p.id !== item.id)]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleAnalysisComplete = (result: DiseaseResult) => {
    setActiveResult(result);
    // Auto add to history
    handleSaveToHistory(result);
  };

  // Main Page Content Render
  const renderMainContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <IntroSection
            onStartScan={() => setActiveTab('scanner')}
            setActiveTab={setActiveTab}
          />
        );
      case 'scanner':
        return (
          <div className="space-y-8 py-4">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Computer Vision Pipeline</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">AI Bounding Box Crop Analyzer</h2>
              <p className="text-sm text-slate-400">Capture camera stream or upload photos to render OpenCV target bounding boxes & instant disease remedies.</p>
            </div>

            {/* Vision Scanner Component */}
            <CameraVisionScanner
              onAnalysisComplete={handleAnalysisComplete}
              confidenceThreshold={confidenceThreshold}
            />

            {/* Diagnostic Report Card Output */}
            {activeResult && (
              <DiagnosticReportCard
                result={activeResult}
                onSaveToHistory={handleSaveToHistory}
                isSaved={history.some((h) => h.id === activeResult.id)}
              />
            )}
          </div>
        );
      case 'dataset':
        return (
          <DatasetExplorer
            onSelectDisease={(disease) => {
              setActiveResult(disease);
              setActiveTab('scanner');
            }}
          />
        );
      case 'history':
        return (
          <ScanHistory
            history={history}
            onSelectHistoryItem={(item) => {
              setActiveResult(item);
              setActiveTab('scanner');
            }}
            onClearHistory={handleClearHistory}
          />
        );
      default:
        return null;
    }
  };

  const appContent = (
    <div className="space-y-6">
      {/* Tab Quick Selector Pills (If on Web view) */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('intro')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'intro'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intro & Features</span>
        </button>

        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'scanner'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Scan className="w-3.5 h-3.5" />
          <span>Vision Scanner & Remedies</span>
        </button>

        <button
          onClick={() => setActiveTab('dataset')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'dataset'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Crop Dataset</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'history'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Scan History ({history.length})</span>
        </button>
      </div>

      {/* Main View Area */}
      {renderMainContent()}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Settings Modal */}
      <ModelSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        confidenceThreshold={confidenceThreshold}
        setConfidenceThreshold={setConfidenceThreshold}
      />

      {/* MOBILE APP PREVIEW FRAME MODE */}
      {deviceMode === 'mobile' ? (
        <MobileFrameWrapper onSwitchToWeb={() => setDeviceMode('web')}>
          {appContent}
        </MobileFrameWrapper>
      ) : (
        /* STANDARD RESPONSIVE WEB SITE MODE */
        <div className="flex-1 flex flex-col">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            deviceMode={deviceMode}
            setDeviceMode={setDeviceMode}
            openSettings={() => setIsSettingsOpen(true)}
            historyCount={history.length}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
            {appContent}
          </main>

          {/* Touch Bottom Nav for Mobile Screens */}
          <BottomMobileNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            historyCount={history.length}
          />

          {/* Footer */}
          <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400 font-mono">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>AgriVision.AI © 2026 — OpenCV Boundary Box Crop ML Disease Detection</p>
              <p className="flex items-center space-x-1 text-slate-400">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                <span>Mobile App & Web App Dual Architecture</span>
              </p>
            </div>
          </footer>
        </div>
      )}

    </div>
  );
}
