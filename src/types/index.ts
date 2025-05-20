export type AnalysisResult = {
  accent: string;
  confidence: number; // 0-100
  explanation: string;
  imageUrl?: string;
  dataAiHint?: string;
  region?: string;
};

export type AccentData = {
  name: string;
  region: string;
  audioFeaturesExample: string;
  imageUrl: string; 
  dataAiHint: string;
};
