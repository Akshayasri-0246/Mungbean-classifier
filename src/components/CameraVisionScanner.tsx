import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  Sliders, 
  Zap, 
  Layers, 
  Check, 
  AlertCircle, 
  Scan, 
  Focus,
  Target,
  Image as ImageIcon,
  Sparkles,
  Eye,
  Crosshair,
  Volume2,
  VolumeX
} from 'lucide-react';
import { DiseaseResult, BoundingBox, VisionFilterMode } from '../types';
import { SAMPLE_DISEASES } from '../data/sampleDataset';
import { analyzeImageWithOpenCV } from '../utils/opencvAnalyzer';

interface CameraVisionScannerProps {
  onAnalysisComplete: (result: DiseaseResult) => void;
  confidenceThreshold: number;
}

export const CameraVisionScanner: React.FC<CameraVisionScannerProps> = ({
  onAnalysisComplete,
  confidenceThreshold
}) => {
  const [sourceMode, setSourceMode] = useState<'upload' | 'camera' | 'sample'>('sample');
  const [selectedSample, setSelectedSample] = useState<DiseaseResult>(SAMPLE_DISEASES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Filter & Visualizer States
  const [filterMode, setFilterMode] = useState<VisionFilterMode>('rgb');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [liveThreshold, setLiveThreshold] = useState<number>(confidenceThreshold);

  // Active Detection Output
  const [currentResult, setCurrentResult] = useState<DiseaseResult | null>(SAMPLE_DISEASES[0]);

  // Handle Camera start/stop
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      setSourceMode('camera');
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Camera access denied or device has no camera available. Using high-resolution sample leaf dataset instead.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setSourceMode('upload');
          // Auto trigger OpenCV analysis
          runAnalysis(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Run OpenCV Analysis
  const runAnalysis = async (imgSource?: string) => {
    setIsAnalyzing(true);
    setSelectedBoxId(null);

    // Audio feedback simulation
    if (soundEnabled) {
      playBeepSound();
    }

    try {
      let result: DiseaseResult;
      
      const activeMode = imgSource ? 'upload' : sourceMode;
      const activeImage = imgSource ? imgSource : customImage;

      if (activeMode === 'camera' && videoRef.current) {
        result = await analyzeImageWithOpenCV(videoRef.current, liveThreshold);
      } else if (activeMode === 'upload' && activeImage) {
        const img = new Image();
        img.src = activeImage;
        await img.decode();
        result = await analyzeImageWithOpenCV(img, liveThreshold);
      } else {
        // Sample mode
        const img = new Image();
        img.src = selectedSample.imageUrl;
        img.crossOrigin = 'anonymous';
        try {
          await img.decode();
          result = await analyzeImageWithOpenCV(img, liveThreshold);
          result.cropName = selectedSample.cropName;
          result.diseaseName = selectedSample.diseaseName;
          result.scientificName = selectedSample.scientificName;
          result.overview = selectedSample.overview;
          result.symptoms = selectedSample.symptoms;
          result.organicRemedies = selectedSample.organicRemedies;
          result.chemicalRemedies = selectedSample.chemicalRemedies;
          result.preventionSteps = selectedSample.preventionSteps;
        } catch {
          result = { ...selectedSample, dateAnalyzed: new Date().toLocaleString() };
        }
      }

      setCurrentResult(result);
      onAnalysisComplete(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playBeepSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // Audio context ignored if user has not interacted
    }
  };

  const getDisplayedImage = (): string => {
    if (sourceMode === 'upload' && customImage) return customImage;
    if (sourceMode === 'sample' && selectedSample) return selectedSample.imageUrl;
    return SAMPLE_DISEASES[0].imageUrl;
  };

  const activeBoxes = currentResult?.boundingBoxes.filter(b => b.confidence >= liveThreshold) || [];

  return (
    <div className="space-y-6">
      
      {/* Top Controller Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        
        {/* Source Mode Switcher */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              stopCamera();
              setSourceMode('sample');
              setCurrentResult(selectedSample);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sourceMode === 'sample' 
                ? 'bg-emerald-500 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Sample Library</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              setSourceMode('upload');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sourceMode === 'upload' 
                ? 'bg-emerald-500 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Image</span>
          </button>

          <button
            onClick={() => {
              startCamera();
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sourceMode === 'camera' 
                ? 'bg-emerald-500 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Camera</span>
          </button>
        </div>

        {/* OpenCV Filter Modes Switcher */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline mr-1">FILTER:</span>
          {(['rgb', 'heatmap', 'edges', 'bbox_only'] as VisionFilterMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize transition-all uppercase whitespace-nowrap ${
                filterMode === mode
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/60'
              }`}
            >
              {mode.replace('_', ' ')}
            </button>
          ))}

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 ml-2"
            title="Toggle Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-600" />}
          </button>
        </div>

      </div>

      {/* Main Interactive Scanner Visualizer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Canvas & Overlay (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl group min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Laser Scanning Beam Effect */}
            {isAnalyzing && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] z-30 animate-laser" />
            )}

            {/* Target Crosshair Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400 z-20" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400 z-20" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400 z-20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400 z-20" />

            {/* Status Telemetry Badge */}
            <div className="absolute top-4 left-14 z-20 flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>OPENCV_ENGINE: {filterMode.toUpperCase()}</span>
            </div>

            {/* LIVE CAMERA FEED */}
            {sourceMode === 'camera' && (
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`w-full max-h-[460px] object-cover ${
                    filterMode === 'edges' ? 'filter grayscale contrast-200 invert' : ''
                  } ${filterMode === 'heatmap' ? 'filter hue-rotate-180 contrast-150' : ''}`}
                />
                {!isCameraActive && (
                  <div className="p-6 text-center space-y-3">
                    <Camera className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
                    <p className="text-sm text-slate-400">Click "Live Camera" above to enable your smartphone or laptop webcam feed.</p>
                  </div>
                )}
              </div>
            )}

            {/* UPLOAD / SAMPLE IMAGE DISPLAY */}
            {sourceMode !== 'camera' && (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={getDisplayedImage()}
                  alt="Crop Leaf Analysis"
                  className={`w-full max-h-[460px] object-contain transition-all ${
                    filterMode === 'edges' ? 'filter grayscale contrast-200 invert' : ''
                  } ${filterMode === 'heatmap' ? 'filter hue-rotate-180 contrast-150 brightness-110' : ''} ${
                    filterMode === 'bbox_only' ? 'opacity-20 grayscale' : 'opacity-100'
                  }`}
                />
              </div>
            )}

            {/* DYNAMIC BOUNDING BOX OVERLAYS */}
            {activeBoxes.map((box) => {
              const isSelected = selectedBoxId === box.id;
              return (
                <div
                  key={box.id}
                  onClick={() => setSelectedBoxId(box.id)}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                    borderColor: box.color
                  }}
                  className={`absolute z-20 cursor-pointer border-2 transition-all group ${
                    isSelected ? 'ring-4 ring-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'hover:border-white'
                  }`}
                >
                  {/* Bounding Box Tag Label */}
                  <div 
                    style={{ backgroundColor: box.color }}
                    className="absolute -top-7 left-0 px-2 py-0.5 rounded text-[10px] font-extrabold text-slate-950 font-mono shadow flex items-center space-x-1 whitespace-nowrap z-30"
                  >
                    <Focus className="w-3 h-3" />
                    <span>{box.label}</span>
                    <span className="opacity-80">({box.confidence}%)</span>
                  </div>

                  {/* Corner Crosshair Nodes */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full" />
                </div>
              );
            })}

            {/* Analyzing Overlay Screen */}
            {isAnalyzing && (
              <div className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                  <Scan className="w-8 h-8 text-emerald-400 absolute" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-base font-bold text-white font-mono">EXECUTING OPENCV MATRIX PIPELINE</p>
                  <p className="text-xs text-slate-400 font-mono">Extracting Leaf Contours & Bounding Box Vectors...</p>
                </div>
              </div>
            )}

          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Run OpenCV Button */}
            <button
              onClick={() => runAnalysis()}
              disabled={isAnalyzing}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing Image Pixels...' : 'Run OpenCV & ML Boundary Analysis'}</span>
            </button>

            {/* Custom Upload Hidden Input Trigger */}
            <label className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold cursor-pointer transition-all">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Choose Image File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Confidence Slider Bar */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center">
                <Sliders className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                Bounding Box Confidence Sensitivity Cutoff:
              </span>
              <span className="font-mono text-emerald-400 font-bold">{liveThreshold}% Threshold</span>
            </div>
            <input
              type="range"
              min="50"
              max="98"
              value={liveThreshold}
              onChange={(e) => setLiveThreshold(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

        </div>

        {/* Right Column: Sample Dataset Selection & Live Detection Stats (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Bounding Box Inspection Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center">
                <Target className="w-4 h-4 text-emerald-400 mr-2" />
                Detected Bounding Boxes ({activeBoxes.length})
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {activeBoxes.map((box) => (
                <div
                  key={box.id}
                  onClick={() => setSelectedBoxId(box.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedBoxId === box.id
                      ? 'bg-slate-800 border-emerald-500 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: box.color }} />
                      {box.label}
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{box.confidence}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{box.notes}</p>
                </div>
              ))}

              {activeBoxes.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No bounding boxes meet the current {liveThreshold}% confidence threshold.</p>
              )}
            </div>
          </div>

          {/* Quick Select Sample Preset Library */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center">
                <ImageIcon className="w-4 h-4 text-emerald-400 mr-2" />
                Quick Test Samples
              </h3>
              <span className="text-[10px] text-slate-400">Click to load</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_DISEASES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSample(sample);
                    setSourceMode('sample');
                    setCurrentResult(sample);
                    onAnalysisComplete(sample);
                  }}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    sourceMode === 'sample' && selectedSample.id === sample.id
                      ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.cropName}
                    className="w-full h-16 object-cover rounded-lg mb-1.5"
                  />
                  <p className="text-[11px] font-bold text-white truncate">{sample.cropName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{sample.diseaseName}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
