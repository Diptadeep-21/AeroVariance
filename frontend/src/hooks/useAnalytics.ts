"use client";

import { useEffect, useState } from "react";

import {
  getAnalytics,
  getModelMetrics,
} from "@/services/analytics.service";

import { useAQIStore } from "@/store/useAQIStore";

import type {
  AnalyticsResponse,
  ModelMetricsResponse,
} from "@/types/analytics";

export function useAnalytics() {
  const station = useAQIStore(
    (s) => s.selectedStation
  );

  const [analytics, setAnalytics] =
    useState<AnalyticsResponse | null>(null);

  const [metrics, setMetrics] =
    useState<ModelMetricsResponse | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  useEffect(() => {
    if (!station) return;

    async function load() {
      setLoading(true);

      try {
        const [
          analyticsData,
          metricsData,
        ] = await Promise.all([
          getAnalytics(station),
          getModelMetrics(),
        ]);

        setAnalytics(analyticsData);
        setMetrics(metricsData);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [station]);

  return {
    analytics,
    metrics,
    loading,
  };
}