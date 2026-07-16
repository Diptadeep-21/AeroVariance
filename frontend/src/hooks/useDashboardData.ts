"use client";

import { useEffect } from "react";

import { useAQIStore } from "@/store/useAQIStore";

import { buildMockSnapshot } from "@/lib/mockSnapshot";

export function useDashboardData() {
  const stations = useAQIStore(
    (state) => state.stations
  );

  const selectedStation = useAQIStore(
    (state) => state.selectedStation
  );

  const stationDashboards = useAQIStore(
    (state) => state.stationDashboards
  );

  const loadDashboard = useAQIStore(
    (state) => state.loadDashboard
  );

  const loadStationHistory = useAQIStore(
    (state) => state.loadStationHistory
  );

  useEffect(() => {
    if (
      stations.length === 0 ||
      !selectedStation
    ) {
      return;
    }

    if (
      stationDashboards[selectedStation]
    ) {
      loadStationHistory(selectedStation);
      return;
    }

    const payload =
      buildMockSnapshot(selectedStation);

    loadDashboard(payload);

    loadStationHistory(selectedStation);

  }, [
    stations,
    selectedStation,
    stationDashboards,
    loadDashboard,
    loadStationHistory,
  ]);
}