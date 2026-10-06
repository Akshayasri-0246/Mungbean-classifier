import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scan, 
  Cpu, 
  Target, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Camera, 
  Upload, 
  Zap, 
  Layers, 
  Leaf, 
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { ActiveTab } from '../types';

interface IntroSectionProps {
  onStartScan: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onStartScan, setActiveTab }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const pipelineSteps = [
    {
      step: '01',
      title: 'Real-time OpenCV Capture & Pre-processing',
      icon: Camera,
      badge: 'OpenCV 4.8 Matrix Engine',
      description: 'Captures live video feed or high-res leaf photos. Converts RGB channels to HSV color spaces, applying Canny edge detection and bilateral smoothing to isolate plant foliage from background noise.',
      tech: ['HSV Matrix Conversion', 'Gaussian Blur Filter', 'Canny Edge Detector']
    },
    {
      step: '02',
      title: 'Neural Network Boundary Box Detection',
      icon: Target,
      badge: 'YOLOv8 ML Model',
      description: 'Evaluates feature maps to pinpoint exact lesion spots. Generates high-precision bounding box coordinates (X, Y, Width, Height) around infected zones with non-maximum suppression.',
      tech: ['Anchor-Free BBox Regression', 'Multi-scale ROI Pooling', 'IoU Thresholding']
    },
    {
      step: '03',
      title: 'Confidence Matrix & Disease Classification',
      icon: Activity,
      badge: 'Confidence Score Engine',
      description: 'Calculates overall confidence percentage (e.g. 98.4%) by evaluating spectral reflectance, lesion concentric patterns, and spatial distribution across detected leaf regions.',
      tech: ['Softmax Probability', 'Confidence Metric Score', 'Chlorosis Ratio']
    },
    {
      step: '04',
      title: 'Tailored Organic & Chemical Remedies',
      icon: ShieldCheck,
      badge: 'Agronomic Treatment Pipeline',
      description: 'Generates instant action plans including organic eco-treatments (Neem oil, bio-fungicides), precise chemical spray dosages, and preventive crop rotation schedules.',
      tech: ['Organic Spray Dosage', 'Fungicide Recommendation', 'Soil Protection']
    }
  ];

  const interactiveFeatures = [
    {
      title: 'Live Camera & Upload Scanner',
      desc: 'Seamless camera streaming on mobile and web with instant shutter capture and drag-and-drop file support.',
      icon: Scan,
      color: 'from-emerald-500/20 to-teal-500/5',
      accent: 'text-emerald-400',
      border: 'hover:border-emerald-500/40'
    },
    {
      title: 'Dynamic Bounding Box Visualizer',
      desc: 'Renders color-coded target frames with confidence tags, infected pixel surface area %, and spot highlighting.',
      icon: Target,
      color: 'from-cyan-500/20 to-blue-500/5',
      accent: 'text-cyan-400',
      border: 'hover:border-cyan-500/40'
    },
    {
      title: 'OpenCV Spectral Filter Modes',
      desc: 'Toggle between Standard RGB, Edge Detection, Thermal Density Heatmaps, and Color Histograms in real time.',
      icon: Layers,
      color: 'from-purple-500/20 to-indigo-500/5',
      accent: 'text-purple-400',
      border: 'hover:border-purple-500/40'
    },
    {
      title: 'Responsive Web & Mobile App UI',
      desc: 'Built with mobile-first PWA responsiveness. Experience full web layout or simulated smartphone app UI with ease.',
      icon: Zap,
      color: 'from-amber-500/20 to-orange-500/5',
      accent: 'text-amber-400',
      border: 'hover:border-amber-500/40'
    }
  ];

  return (
    <div className="space-y-12 py-4 pb-16">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-12 lg:p-16">
        
        {/* Glowing Background Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Next-Gen OpenCV & Deep Learning Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            AI Crop Disease Detection with <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Live Bounding Boxes</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Analyze plant leaves instantly via live mobile camera or image upload. Our trained Computer Vision ML model draws target boundary boxes, calculates confidence ratings, identifies crop diseases, and provides step-by-step remedies.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onStartScan}
              className="inline-flex items-center space-x-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Scan className="w-5 h-5" />
              <span>Launch Live Camera / Upload Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('dataset')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-base font-semibold transition-all"
            >
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span>Explore Crop Dataset</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">98.6%</p>
              <p className="text-xs text-slate-400 font-medium">Model Accuracy</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">&lt; 1.5s</p>
              <p className="text-xs text-slate-400 font-medium">OpenCV Inference Time</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400">45+</p>
              <p className="text-xs text-slate-400 font-medium">Trained Disease Classes</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">100%</p>
              <p className="text-xs text-slate-400 font-medium">Mobile & Web Compatible</p>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Workflow Pipeline */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">How AgriVision Works</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Interactive Processing Pipeline</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Click on any pipeline stage below to view how image pixels transform into bounding box diagnosis.
          </p>
        </div>

        {/* Step Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineSteps.map((stepItem, idx) => {
            const Icon = stepItem.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={stepItem.step}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                  isActive 
                    ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10 scale-[1.02]' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${
                    isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    STEP {stepItem.step}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {stepItem.title}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">{stepItem.badge}</span>
              </div>
            );
          })}
        </div>

        {/* Active Pipeline Detail Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-emerald-500/30 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    {React.createElement(pipelineSteps[activeStep].icon, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{pipelineSteps[activeStep].title}</h3>
                    <p className="text-xs text-emerald-400 font-mono">{pipelineSteps[activeStep].badge}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {pipelineSteps[activeStep].description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {pipelineSteps[activeStep].tech.map((t, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 mr-1.5" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulated Interactive Pipeline Graphic */}
              <div className="w-full md:w-80 h-44 rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>CV_MATRIX_STREAM</span>
                  <span className="text-emerald-400 animate-pulse">ACTIVE</span>
                </div>

                {/* Animated Box visual depending on step */}
                <div className="relative my-2 h-20 w-full rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                  
                  {activeStep === 0 && (
                    <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                      <Camera className="w-4 h-4" />
                      <span>RGB --&gt; HSV Filtering</span>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="relative border-2 border-rose-500 bg-rose-500/10 px-4 py-2 rounded text-xs font-mono text-rose-400 flex items-center space-x-2">
                      <Target className="w-4 h-4 animate-spin" />
                      <span>BBOX [X:22, Y:28] - 97.4%</span>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xl font-extrabold text-cyan-400 font-mono">98.4%</span>
                      <span className="text-[10px] text-slate-400 font-mono">CONFIDENCE CONFIRMED</span>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>Neem Oil + Copper Remedy Ready</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>FPS: 60.0</span>
                  <span>Latency: 12ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feature Highlights Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Key Capabilities</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Built for Web & Mobile Excellence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interactiveFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-slate-900/80 border border-slate-800 transition-all ${feat.border} group`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${feat.color} border border-slate-700/60 ${feat.accent} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center">
                      {feat.title}
                      <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white">Ready to test your crop leaves?</h3>
          <p className="text-sm text-slate-300">Open live webcam scanner or drag & drop leaf images to start immediately.</p>
        </div>
        <button
          onClick={onStartScan}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all whitespace-nowrap"
        >
          Open AI Scanner Now
        </button>
      </div>

    </div>
  );
};
