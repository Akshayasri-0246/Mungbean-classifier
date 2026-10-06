export type DiseaseSeverity = 'Healthy' | 'Mild' | 'Moderate' | 'Severe';

export interface BoundingBox {
  id: string;
  label: string;
  x: number; // percentage 0-100 or relative pixel coords
  y: number;
  width: number;
  height: number;
  confidence: number; // percentage 0-100
  color: string;
  notes?: string;
}

export interface DiseaseResult {
  id: string;
  diseaseName: string;
  cropName: string;
  scientificName: string;
  severity: DiseaseSeverity;
  overallConfidence: number;
  affectedAreaPercentage: number;
  overview: string;
  symptoms: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventionSteps: string[];
  boundingBoxes: BoundingBox[];
  imageUrl: string;
  dateAnalyzed?: string;
}

export type VisionFilterMode = 'rgb' | 'heatmap' | 'edges' | 'histogram' | 'bbox_only';

export type ActiveTab = 'scanner' | 'intro' | 'dataset' | 'history' | 'analytics';

export type DeviceMode = 'web' | 'mobile';
