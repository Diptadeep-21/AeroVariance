"use client";

import { useEffect } from "react";

import { useAQIStore } from "@/store/useAQIStore";

export function useDashboardData() {

  const mode = useAQIStore(
    (s) => s.mode
  );

  const stations = useAQIStore(
    (s) => s.stations
  );

  const selectedStation = useAQIStore(
    (s) => s.selectedStation
  );

  const selectedLocation = useAQIStore(
    (s) => s.selectedLocation
  );

  const loadDashboard = useAQIStore(
    (s) => s.loadDashboard
  );

  const loadStationHistory = useAQIStore(
    (s) => s.loadStationHistory
  );

  useEffect(() => {

    if (mode === "station") {

      if (
        stations.length === 0 ||
        !selectedStation
      ) {
        return;
      }

      loadDashboard();

      loadStationHistory(
        selectedStation
      );

      return;
    }

    if (!selectedLocation) {
      return;
    }

    loadDashboard();

  }, [

    mode,

    stations,

    selectedStation,

    selectedLocation,

    loadDashboard,

    loadStationHistory,

  ]);

}