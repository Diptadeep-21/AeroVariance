import { api } from "@/lib/api";
import {
  AttributionResponse,
  GlobalFeatureImportance,
} from "@/types/attribution";

export async function getAttribution(
  index: number
) {
  const { data } =
    await api.get<AttributionResponse>(
      `/attribution/${index}`
    );

  return data;
}

export async function getGlobalImportance() {
  const { data } =
    await api.get<GlobalFeatureImportance[]>(
      "/attribution/global"
    );

  return data;
}

export async function getStationHistory(
  station: string
) {
  const { data } =
    await api.get<AttributionResponse[]>(
      `/attribution/station/${encodeURIComponent(
        station
      )}`
    );

  return data;
}

export async function getLatestPrediction() {
  return getAttribution(0);
}