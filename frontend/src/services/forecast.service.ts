import { api } from "@/lib/api";
import {
  ForecastRequest,
  ForecastResponse,
} from "@/types/forecast";

export async function getForecast(
  payload: ForecastRequest
) {
  const { data } =
    await api.post<ForecastResponse>(
      "/forecast",
      payload
    );

  return data;
}