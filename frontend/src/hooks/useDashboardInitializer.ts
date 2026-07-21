"use client";

import { useEffect } from "react";

import { useAQIStore } from "@/store/useAQIStore";

console.log("DashboardInitializer mounted");

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
  console.log("Stations:", stations);
  console.log("Selected:", selectedStation);

  if (stations.length > 0 && !selectedStation) {
    const first = stations.find((s) => s.active);

    console.log("First station:", first);

    if (first) {
      console.log("Calling setStation:", first.station);
      setStation(first.station);
    }
  }
}, [stations, selectedStation]);

  useEffect(() => {
  console.log("Stations:", stations);

  console.log("Selected:", selectedStation);

  if (
    stations.length > 0 &&
    !selectedStation
  ) {
    const first = stations.find(
      (s) => s.active
    );

    console.log("First:", first);

    if (first) {
      console.log("Setting station:", first.station);

      setStation(first.station);
    }
  }
}, [
  stations,
  selectedStation,
]);

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
    const first = stations.find(
      (s) => s.active
    );

    if (first) {
      setStation(first.station);
    }
  }
}, [
  stations,
  selectedStation,
  setStation,
]);
}