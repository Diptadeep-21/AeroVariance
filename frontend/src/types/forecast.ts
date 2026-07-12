export interface ForecastRequest {
  station?: string;

  AQI_lag1: number;
  AQI_lag3: number;
  AQI_lag24: number;

  pm25_lag1: number;
  pm10_lag1: number;

  hour: number;
  dayofweek: number;
  month: number;
}

export interface ForecastResponse {
  predicted_aqi: number;
  category: string;
  confidence: number;
}