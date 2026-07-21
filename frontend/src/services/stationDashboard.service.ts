import { api } from "@/lib/api";

import type {
  StationDashboardResponse,
} from "@/types/stationDashboard";

export async function getStationDashboard(
  station: string
): Promise<StationDashboardResponse> {

  const { data } =
    await api.get<StationDashboardResponse>(
      "/dashboard",
      {
        params: {
          mode: "station",
          station,
        },
      }
    );

  return data;
}