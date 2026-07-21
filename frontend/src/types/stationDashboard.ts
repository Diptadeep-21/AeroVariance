import type { AttributionResponse } from "./attribution";
import type { AdvisoryResponse } from "./advisory";

export interface StationLatestReading {
  station: string;

  timestamp: string;

  aqi: number;

  category: string;

  pm25: number;

  pm10: number;

  co: number;

  no2: number;

  so2: number;

  o3: number;
}

export interface StationForecast {
  station: string;

  timestamp: string;

  predicted_aqi: number;

  category: string;

  confidence: number;

  model_version: string;
}

export interface StationDashboardResponse {
  station: string;

  latest_reading: StationLatestReading | null;

  forecast: StationForecast | null;

  latest_prediction: AttributionResponse | null;

  advisory: AdvisoryResponse | null;
}