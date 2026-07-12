"use client";

import PageHeader from "@/components/layout/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import AQITrendChart from "@/components/charts/AQITrendChart";
import SHAPChart from "@/components/charts/SHAPChart";
import PredictionInsights from "@/components/dashboard/PredictionInsights";
import PredictionHistory from "@/components/dashboard/PredictionHistory";

import {
  CloudSun,
  ShieldAlert,
  MapPin,
} from "lucide-react";

import { useAQIStore } from "@/store/useAQIStore";
import { useDashboardInitializer } from "@/hooks/useDashboardInitializer";
import { useDashboardData } from "@/hooks/useDashboardData";


export default function DashboardView() {
  const {
    dashboard,
    loading,
    selectedStation,
  } = useAQIStore();

  useDashboardInitializer();
useDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Monitor Kolkata's air quality, AI forecasts and intervention insights."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          title="Current AQI"
          value={
            loading
              ? "--"
              : dashboard?.forecast.predicted_aqi ?? "--"
          }
          badge={dashboard?.forecast.category}
          loading={loading}
        />

        <MetricCard
          title="Forecast"
          value={
            loading
              ? "--"
              : dashboard?.forecast.predicted_aqi ?? "--"
          }
          subtitle="Predicted AQI"
          badge={dashboard?.forecast.category}
          icon={<CloudSun className="h-5 w-5" />}
          loading={loading}
        />

        <MetricCard
          title="Risk Level"
          value={
            loading
              ? "--"
              : dashboard?.advisory.risk ?? "--"
          }
          subtitle="Health Advisory"
          badge={dashboard?.advisory.outdoor}
          icon={<ShieldAlert className="h-5 w-5" />}
          loading={loading}
        />

        <MetricCard
          title="Station"
          value={selectedStation || "--"}
          subtitle="Monitoring Location"
          badge="Live"
          icon={<MapPin className="h-5 w-5" />}
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-12">

        <div className="xl:col-span-8">
          <AQITrendChart />
        </div>

        <div className="xl:col-span-4">
          <SHAPChart />
        </div>

      </div>

      <PredictionInsights
        data={dashboard?.latest_prediction ?? null}
      />
      <PredictionHistory />

    </div>
  );
}