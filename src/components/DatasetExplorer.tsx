import React, { useState } from 'react';
import { SAMPLE_DISEASES } from '../data/sampleDataset';
import { DiseaseResult } from '../types';
import { Search, Filter, Leaf, Target, CheckCircle2, ChevronRight } from 'lucide-react';

interface DatasetExplorerProps {
  onSelectDisease: (disease: DiseaseResult) => void;
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({ onSelectDisease }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState<string>('All');

  const filteredDiseases = SAMPLE_DISEASES.filter((d) => {
    const matchesSearch = 
      d.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = selectedSeverityFilter === 'All' || d.severity === selectedSeverityFilter;

    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Pre-trained ML Knowledgebase</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Crop Leaf Disease Dataset</h2>
          <p className="text-slate-400 text-sm">Explore trained plant classes, bounding box spot signatures, and remedies.</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search crop or disease..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Severity filter */}
          <div className="flex items-center space-x-1 p-1 bg-slate-900 rounded-xl border border-slate-800 w-full sm:w-auto">
            {['All', 'Healthy', 'Mild', 'Moderate', 'Severe'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSeverityFilter === sev
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectDisease(item)}
            className="group cursor-pointer rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 overflow-hidden shadow-lg hover:shadow-emerald-500/10 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.diseaseName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md border border-slate-800 text-emerald-400 font-mono">
                  {item.cropName}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono">
                  {item.overallConfidence}% Conf.
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                    {item.diseaseName}
                  </h3>
                  <p className="text-xs italic text-slate-400 font-mono">{item.scientificName}</p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.overview}
                </p>

                {/* Bounding box count badge */}
                <div className="flex items-center space-x-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.boundingBoxes.length} Bounding Box ROI Target(s)</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                Analyze with Vision Engine
              </span>
              <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
