"use client";

import { useEffect } from "react";
import { useAQIStore } from "@/store/useAQIStore";

export function useDashboardInitializer() {
  const stations = useAQIStore((state) => state.stations);
  const loadStations = useAQIStore((state) => state.loadStations);

  useEffect(() => {
    if (stations.length === 0) {
      loadStations();
    }
  }, [stations.length, loadStations]);
}