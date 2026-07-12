export interface FeatureImpact {
  feature: string;
  impact: number;
}

export interface AttributionResponse {
  station: string;
  timestamp: string;

  actual_aqi: number;
  predicted_aqi: number;

  prediction_error: number;
  prediction_correct: boolean;

  top_features: FeatureImpact[];
}

export interface GlobalFeatureImportance {
  feature: string;
  importance: number;
}

export interface FeatureImpact {
  feature: string;
  impact: number;
}

export interface PredictionExplanation {
  station: string;
  timestamp: string;

  actual_aqi: number;

  predicted_aqi: number;

  prediction_error: number;

  prediction_correct: boolean;

  top_features: FeatureImpact[];
}