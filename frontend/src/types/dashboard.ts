import { ForecastResponse } from "./forecast";
import { AdvisoryResponse } from "./advisory";
import { PredictionExplanation } from "./attribution";

export interface DashboardResponse {
  station: string;

  forecast: ForecastResponse;

  advisory: AdvisoryResponse;

  latest_prediction: PredictionExplanation;
}