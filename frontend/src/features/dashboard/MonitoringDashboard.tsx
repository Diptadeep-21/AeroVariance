"use client";

import PageHeader from "@/components/layout/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import AQITrendChart from "@/components/charts/AQITrendChart";
import SHAPChart from "@/components/charts/SHAPChart";
import PredictionInsights from "@/components/dashboard/PredictionInsights";
import PredictionHistory from "@/components/dashboard/PredictionHistory";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CloudSun, ShieldAlert, MapPin, Wind, Building2, Activity, ArrowRight, Cpu, Globe } from "lucide-react";
import { useAQIStore } from "@/store/useAQIStore";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardView() {
  const { stationDashboard, loading, selectedStation, stations, setStation } = useAQIStore();

  const { analytics, metrics } = useAnalytics();
  useDashboardData();

  // If no station selected (e.g. initial site load or overview page chosen), render Overview Page!
  if (!selectedStation) {
    const activeStations = stations.filter((s) => s.active);

    return (
      <div className="space-y-8">
        <PageHeader
          title="Air Intelligence Overview"
          description="National monitoring station network, real-time air quality metrics, and global location search."
        />

        {/* Overview KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Tracked Stations"
            value={activeStations.length || 6}
            subtitle="Registered Ambient Stations"
            icon={<Building2 className="h-5 w-5 text-[#2563EB]" />}
          />

          <MetricCard
            title="Network Status"
            value="Active"
            subtitle="Live Data Ingestion"
            badge="Synchronized"
            icon={<Activity className="h-5 w-5 text-[#2563EB]" />}
          />

          <MetricCard
            title="AI Model Pipeline"
            value="Calibrated"
            subtitle="XGBoost & SHAP Engine"
            badge="24h Predictions"
            icon={<Cpu className="h-5 w-5 text-[#2563EB]" />}
          />

          <MetricCard
            title="Global Search"
            value="100,000+"
            subtitle="Global Cities Coverage"
            badge="Global AI"
            icon={<Globe className="h-5 w-5 text-[#2563EB]" />}
          />
        </div>

        {/* Station Selection Grid Header */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#111827]">
                Monitoring Station Network
              </h3>
              <p className="text-sm text-[#6B7280]">
                Select any station below to analyze real-time readings, 24h AI forecasts, and SHAP feature drivers.
              </p>
            </div>
            <span className="rounded-full bg-[#EFF6FF] px-3.5 py-1 text-xs font-semibold text-[#2563EB]">
              {activeStations.length} Stations Available
            </span>
          </div>

          {/* Interactive Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeStations.map((st) => {
              const displayName = st.station
                .replace(", Kolkata - WBPCB", "")
                .replace("Victoria", "Victoria Memorial");

              return (
                <div
                  key={st.station}
                  onClick={() => setStation(st.station)}
                  className="group cursor-pointer rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:border-[#2563EB] hover:shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] text-[#2563EB]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#15803D]">
                        Active Feed
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                        {displayName}
                      </h4>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {(st as any).city || "Ambient Air Quality Station"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
                    <span className="text-xs font-medium text-[#6B7280]">Continuous Station</span>
                    <button className="flex items-center gap-1.5 rounded-full bg-[#0F172A] px-4 py-1.5 text-xs font-medium text-white transition-all group-hover:bg-[#2563EB]">
                      Analyze Station
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const latest = stationDashboard?.latest_reading;
  const forecast = stationDashboard?.forecast;
  const latestPrediction = stationDashboard?.latest_prediction;

  const readings = [...(analytics?.sensor_readings ?? [])].sort(
    (a, b) =>
      new Date((a as any).datetimeLocal ?? (a as any).timestamp).getTime() -
      new Date((b as any).datetimeLocal ?? (b as any).timestamp).getTime()
  );

  const latestForecast = stationDashboard?.forecast?.predicted_aqi ?? null;

  const trendData = readings.map((reading, index) => {
    const ts = (reading as any).datetimeLocal ?? (reading as any).timestamp;

    return {
      label: new Date(ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      actual: (reading as any).AQI ?? (reading as any).aqi ?? 0,
      forecast: index === readings.length - 1 ? latestForecast : null,
    };
  });

  const currentAqi = (latest as any)?.AQI ?? latest?.aqi ?? "--";

  return (
    <div className="space-y-6">
      <PageHeader
        title={selectedStation.replace(", Kolkata - WBPCB", "").replace("Victoria", "Victoria Memorial")}
        description="Monitor ambient air quality, AI forecasts, source attribution, and intervention insights."
      />

      {/* Primary 4-Up Metric Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Current AQI"
          value={loading ? "--" : currentAqi}
          badge={latest?.category ?? "Normal"}
          icon={<Wind className="h-5 w-5 text-[#2563EB]" />}
          loading={loading}
        />

        <MetricCard
          title="Forecast"
          value={loading ? "--" : (forecast?.predicted_aqi ? forecast.predicted_aqi.toFixed(0) : "--")}
          badge={forecast?.category ?? "AI Predicted"}
          icon={<CloudSun className="h-5 w-5 text-[#2563EB]" />}
          loading={loading}
        />

        <MetricCard
          title="PM2.5"
          value={loading ? "--" : (latest?.pm25 !== undefined ? `${latest.pm25} µg/m³` : "--")}
          subtitle="Latest Sensor Reading"
        />

        <MetricCard
          title="PM10"
          value={loading ? "--" : (latest?.pm10 !== undefined ? `${latest.pm10} µg/m³` : "--")}
          subtitle="Latest Sensor Reading"
        />
      </div>

      {/* Secondary 2-Up Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <MetricCard
          title="Risk Level"
          value={forecast?.category ?? latest?.category ?? "Normal"}
          subtitle="Current Atmospheric Category"
          badge={currentAqi !== "--" ? `AQI ${currentAqi}` : "Normal"}
          icon={<ShieldAlert className="h-5 w-5 text-[#2563EB]" />}
          loading={loading}
        />

        <MetricCard
          title="Station"
          value={selectedStation || "Station"}
          subtitle="Monitoring Station Location"
          badge="Live Feed"
          icon={<MapPin className="h-5 w-5 text-[#2563EB]" />}
        />
      </div>

      {/* 8/4 Split Row: AQITrendChart + SHAPChart */}
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <AQITrendChart data={trendData} />
        </div>

        <div className="xl:col-span-4">
          <SHAPChart data={metrics?.top_features ?? []} />
        </div>
      </div>

      {/* Full-width Insights & History */}
      <PredictionInsights data={latestPrediction ?? null} />

      <PredictionHistory history={analytics?.evaluations ?? []} />
    </div>
  );
}