import { api } from "@/lib/api";

import type {
  LocationDashboardResponse,
} from "@/types/locationDashboard";

export async function getLocationDashboard(
  location: string
): Promise<LocationDashboardResponse> {

  const { data } =
    await api.get<LocationDashboardResponse>(
      "/dashboard",
      {
        params: {
          mode: "location",
          location,
        },
      }
    );

  return data;
}