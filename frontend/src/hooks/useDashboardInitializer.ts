"use client";

import { useEffect } from "react";

import { useAQIStore } from "@/store/useAQIStore";

export function useDashboardInitializer() {
  const stations = useAQIStore(
    (state) => state.stations
  );

  const loadStations = useAQIStore(
    (state) => state.loadStations
  );

  const selectedStation = useAQIStore(
    (state) => state.selectedStation
  );

  const setStation = useAQIStore(
    (state) => state.setStation
  );

  useEffect(() => {
    if (stations.length === 0) {
      loadStations();
    }
  }, [stations.length, loadStations]);

  useEffect(() => {
  if (
    stations.length > 0 &&
    !selectedStation
  ) {
    setStation(stations[0]);
  }
}, [
  stations,
  selectedStation,
  setStation,
]);
}