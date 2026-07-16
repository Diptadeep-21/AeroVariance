"use client";

import { useAQIStore } from "@/store/useAQIStore";

import type {
  SimulationRequest,
} from "@/types/simulation";

export function useSimulation() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );

  const runSimulation = useAQIStore(
    (state) => state.runSimulation
  );

  async function simulate(
    traffic: number,
    construction: number,
    industry: number
  ) {
    if (!dashboard) return;

    const forecast =
      dashboard.forecast;

    /**
     * Temporary snapshot.
     *
     * Replace these values with the
     * latest sensor snapshot from
     * MongoDB/OpenAQ in the future.
     */
    const payload: SimulationRequest = {
      station: dashboard.station,

      AQI_lag1: forecast.predicted_aqi,
      AQI_lag3: forecast.predicted_aqi - 3,
      AQI_lag24: forecast.predicted_aqi - 8,

      pm25_lag1: 82,
      pm10_lag1: 116,

      no2_lag1: 32,
      co_lag1: 0.7,
      so2_lag1: 6,

      traffic_change: traffic,
      construction_change: construction,
      industry_change: industry,
    };

    await runSimulation(payload);
  }

  return {
    simulate,
  };
}