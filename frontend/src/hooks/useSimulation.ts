"use client";

import { useAQIStore } from "@/store/useAQIStore";

import type {
  SimulationRequest,
} from "@/types/simulation";

export function useSimulation() {

  const mode = useAQIStore((state) => state.mode);
  const dashboard = useAQIStore((state) => state.dashboard);
  const locationData = useAQIStore((state) => state.locationData);
  const runSimulation = useAQIStore((state) => state.runSimulation);

  async function simulate(
    traffic: number,
    construction: number,
    industry: number
  ) {
    let stationName = "";
    if (mode === "station" && dashboard) {
      stationName = dashboard.station;
    } else if (mode === "location" && locationData) {
      stationName = locationData.location.name;
    }

    if (!stationName) return;

    const payload: SimulationRequest = {
      station: stationName,
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