import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Leaf, 
  FlaskConical, 
  ShieldCheck, 
  Printer, 
  Bookmark, 
  Sparkles, 
  Info, 
  Activity, 
  Calendar,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DiseaseResult } from '../types';

interface DiagnosticReportCardProps {
  result: DiseaseResult;
  onSaveToHistory: (result: DiseaseResult) => void;
  isSaved?: boolean;
}

export const DiagnosticReportCard: React.FC<DiagnosticReportCardProps> = ({
  result,
  onSaveToHistory,
  isSaved = false
}) => {
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'prevention'>('organic');
  const [savedState, setSavedState] = useState<boolean>(isSaved);

  useEffect(() => {
    // Trigger confetti if high confidence or healthy crop!
    if (result.severity === 'Healthy' || result.overallConfidence > 92) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.85 }
        });
      } catch (e) {
        // Ignore confetti if unsupported
      }
    }
  }, [result]);

  const handleSave = () => {
    onSaveToHistory(result);
    setSavedState(true);
  };

  const getSeverityBadge = () => {
    switch (result.severity) {
      case 'Healthy':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            HEALTHY CROP
          </span>
        );
      case 'Mild':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            MILD SEVERITY
          </span>
        );
      case 'Moderate':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            MODERATE SEVERITY
          </span>
        );
      case 'Severe':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
            CRITICAL SEVERITY
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
      
      {/* Top Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            {getSeverityBadge()}
            <span className="text-xs font-mono text-slate-400 flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-slate-500" />
              {result.dateAnalyzed || 'Just Now'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {result.diseaseName}
          </h2>

          <div className="flex items-center space-x-2 text-sm text-slate-300 font-mono">
            <span className="text-emerald-400 font-semibold">{result.cropName}</span>
            <span>•</span>
            <span className="italic text-slate-400">{result.scientificName}</span>
          </div>
        </div>

        {/* Confidence Rating Radial Gauge Box */}
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 self-start lg:self-auto">
          <div className="relative flex items-center justify-center w-16 h-16">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${result.overallConfidence}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-white font-mono">
              {result.overallConfidence}%
            </span>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-mono">CONFIDENCE SCORE</p>
            <p className="text-sm font-bold text-emerald-400">ML Model Verified</p>
            <p className="text-[11px] text-slate-400">Area Infected: {result.affectedAreaPercentage}%</p>
          </div>
        </div>

      </div>

      {/* Disease Overview & Symptoms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Overview Box (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center">
            <Info className="w-4 h-4 text-emerald-400 mr-2" />
            Diagnostic Summary & Analysis
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {result.overview}
          </p>

          {/* Key Symptoms */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 font-mono uppercase">Key Detected Symptoms:</h4>
            <div className="space-y-1.5">
              {result.symptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Snapshot with Bounding Box Overlay Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center">
            <Activity className="w-4 h-4 text-emerald-400 mr-2" />
            Target Bounding Frame Snapshot
          </h3>
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden h-52 flex items-center justify-center">
            <img
              src={result.imageUrl}
              alt={result.diseaseName}
              className="w-full h-full object-cover"
            />
            {result.boundingBoxes.map((box) => (
              <div
                key={box.id}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`,
                  borderColor: box.color
                }}
                className="absolute border-2 border-dashed z-10"
              >
                <span 
                  style={{ backgroundColor: box.color }}
                  className="absolute -top-5 left-0 text-[9px] font-mono font-bold text-slate-950 px-1 rounded"
                >
                  {box.confidence}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TAILORED REMEDIES ENGINE SECTION */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Agronomic Treatment Engine</span>
            <h3 className="text-xl font-bold text-white">Recommended Remedies & Action Plan</h3>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('organic')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'organic'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Organic Treatments</span>
            </button>

            <button
              onClick={() => setActiveTab('chemical')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'chemical'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Chemical Dosage</span>
            </button>

            <button
              onClick={() => setActiveTab('prevention')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'prevention'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Prevention</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
          
          {activeTab === 'organic' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <Leaf className="w-4 h-4" />
                <span>Eco-Friendly & Biological Fungicide Steps</span>
              </div>
              <ul className="space-y-2.5">
                {result.organicRemedies.map((remedy, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'chemical' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                <FlaskConical className="w-4 h-4" />
                <span>Targeted Fungicide Spray Recommendations</span>
              </div>
              <ul className="space-y-2.5">
                {result.chemicalRemedies.map((remedy, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'prevention' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Long-Term Agricultural Best Practices</span>
              </div>
              <ul className="space-y-2.5">
                {result.preventionSteps.map((step, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-[11px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

      {/* Report Footer Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        
        <button
          onClick={handleSave}
          disabled={savedState}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            savedState
              ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>{savedState ? 'Saved to Scan History' : 'Save Diagnostic Report'}</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Report</span>
          </button>
        </div>

      </div>

    </div>
  );
};
