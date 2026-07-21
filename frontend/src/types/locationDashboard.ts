export interface LatestReading {
  location: string;

  latitude: number;

  longitude: number;

  timestamp: string;

  provider: string;

  aqi: number;

  category: string;

  pm25: number;

  pm10: number;

  co: number;

  no2: number;

  so2: number;

  o3: number;
}

export interface LocationForecast {
  location: string;

  predicted_aqi: number;

  based_on_records: number;

  model_available: boolean;
}

export interface DashboardLocation {
  location: string;

  latest_reading: LatestReading | null;

  forecast: LocationForecast | null;

  records: number;

  model_available: boolean;

  last_trained: string | null;
}

export interface DashboardSummary {
  tracked_locations: number;

  history_records: number;

  trained_models: number;
}

export interface LocationDashboardResponse {
  summary: DashboardSummary;

  locations: DashboardLocation[];
}