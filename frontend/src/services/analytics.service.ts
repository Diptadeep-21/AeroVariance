import { api } from "@/lib/api";

import type {
  AnalyticsResponse,
  ModelMetricsResponse,
} from "@/types/analytics";

export async function getAnalytics(
  station: string
): Promise<AnalyticsResponse> {
  const { data } = await api.get<AnalyticsResponse>(
    `/analytics/${encodeURIComponent(station)}`
  );

  return data;
}

export async function getModelMetrics(): Promise<ModelMetricsResponse> {
  const { data } = await api.get<ModelMetricsResponse>(
    "/analytics/model"
  );

  return data;
}