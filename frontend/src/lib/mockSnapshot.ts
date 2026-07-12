import { ForecastRequest } from "@/types/forecast";

export function buildMockSnapshot(
  station: string
): ForecastRequest {
  return {
    station,

    AQI_lag1: 175,
    AQI_lag3: 172,
    AQI_lag24: 169,

    pm25_lag1: 82,
    pm10_lag1: 121,

    hour: new Date().getHours(),
    dayofweek: new Date().getDay(),
    month: new Date().getMonth() + 1,
  };
}