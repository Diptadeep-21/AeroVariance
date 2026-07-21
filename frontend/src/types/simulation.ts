export interface SimulationRequest {
  station: string;

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