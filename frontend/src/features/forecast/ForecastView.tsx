"use client";

import PageHeader from "@/components/layout/PageHeader";

import ForecastSummary from "@/components/forecast/ForecastSummary";
import ForecastChart from "@/components/forecast/ForecastChart";
import ForecastTable from "@/components/forecast/ForecastTable";
import { useDashboardData } from "@/hooks/useDashboardData";

import { useAQIStore } from "@/store/useAQIStore";

export default function ForecastView() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );



const loading = useAQIStore(
  (state) => state.loading
);

useDashboardData();

  return (
    <div className="space-y-6">

      <PageHeader
        title="Forecast"
        description="AI-powered air quality predictions for the selected monitoring station."
      />

      <ForecastSummary
        forecast={dashboard?.forecast}
      />

      <ForecastChart />

      <ForecastTable />

    </div>
  );
}