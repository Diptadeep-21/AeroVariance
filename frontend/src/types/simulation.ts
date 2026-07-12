export interface SimulationRequest {
  station?: string;

  AQI_lag1: number;
  AQI_lag3: number;
  AQI_lag24: number;

  pm25_lag1: number;
  pm10_lag1: number;

  no2_lag1: number;
  co_lag1: number;
  so2_lag1: number;

  traffic_change: number;
  construction_change: number;
  industry_change: number;
}

export interface SimulationResponse {
  before: number;
  after: number;
  difference: number;
  percent_change: number;
}