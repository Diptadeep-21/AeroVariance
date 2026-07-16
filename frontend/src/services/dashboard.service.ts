import { api } from "@/lib/api";
import { DashboardResponse } from "@/types/dashboard";
import { ForecastRequest } from "@/types/forecast";

export async function getDashboard(
  payload: ForecastRequest
): Promise<DashboardResponse> {
  const { data } =
    await api.post<DashboardResponse>(
      "/dashboard",
      payload
    );

  return data;
}