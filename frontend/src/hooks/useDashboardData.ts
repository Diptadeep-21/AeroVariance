"use client";

import { useEffect } from "react";

import { useAQIStore } from "@/store/useAQIStore";

import { buildMockSnapshot } from "@/lib/mockSnapshot";

export function useDashboardData() {
  const selectedStation = useAQIStore(
    (state) => state.selectedStation
  );

  const loadDashboard = useAQIStore(
    (state) => state.loadDashboard
  );

  const loadStationHistory = useAQIStore(
    (state) => state.loadStationHistory
  );

  useEffect(() => {
    if (!selectedStation) return;

    const payload =
      buildMockSnapshot(selectedStation);

    loadDashboard(payload);

    loadStationHistory(selectedStation);

  }, [
    selectedStation,
    loadDashboard,
    loadStationHistory,
  ]);
}