import React from 'react';
import { X, Sliders, Cpu, Shield, Activity, RefreshCw } from 'lucide-react';

interface ModelSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  confidenceThreshold: number;
  setConfidenceThreshold: (val: number) => void;
}

export const ModelSettingsModal: React.FC<ModelSettingsModalProps> = ({
  isOpen,
  onClose,
  confidenceThreshold,
  setConfidenceThreshold
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">ML Model & OpenCV Engine Settings</h3>
              <p className="text-xs text-slate-400 font-mono">Fine-tune detection threshold & WASM pipeline</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Form */}
        <div className="space-y-5">
          
          {/* Confidence Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>NMS Confidence Threshold Cutoff:</span>
              <span className="font-mono text-emerald-400 font-bold">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="98"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[11px] text-slate-400">
              Higher thresholds require stronger neural network certainty before rendering bounding boxes.
            </p>
          </div>

          {/* Inference Backend Info */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
              <span className="flex items-center">
                <Cpu className="w-4 h-4 text-cyan-400 mr-2" />
                Active Hardware Backend:
              </span>
              <span className="font-mono text-emerald-400 font-bold">WebGPU / WebAssembly</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              OpenCV 4.8 matrices and YOLO tensor convolutions run locally in client browser memory for 100% privacy and zero latency.
            </p>
          </div>

          {/* Model Weights Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs text-slate-300">
            <span>Model Weights: <strong className="text-white">AgriVision-YOLOv8-Crop-v2.1</strong></span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
              VERIFIED
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all"
          >
            Apply Settings & Close
          </button>
        </div>

      </div>
    </div>
  );
};
