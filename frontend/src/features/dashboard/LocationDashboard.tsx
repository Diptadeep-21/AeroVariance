"use client";

import PageHeader from "@/components/layout/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import { CloudSun, Database, MapPin, Sparkles, Activity, Timer } from "lucide-react";
import { useAQIStore } from "@/store/useAQIStore";
import { Progress } from "@/components/ui/progress";

export default function LocationDashboard() {
  const { locationData, loading } = useAQIStore();

  if (!locationData) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Location Intelligence"
          description="Search any global location or ward to view air quality data and ML progression."
        />
        <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-white p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAFBFC] border border-[#E5E7EB] text-[#6B7280]">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#111827]">No Location Selected</h3>
            <p className="max-w-md text-sm text-[#6B7280]">
              Use the search bar in the top navigation to search for any city or custom coordinates (e.g., "Chennai" or "Bengaluru").
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { location, reading, forecast, days_collected = 0, phase = 1, progress_pct = 0, records_count = 0 } = locationData;

  const getPhaseName = (p: number) => {
    switch (p) {
      case 1:
        return "Phase 1: Ingestion & Baseline";
      case 2:
        return "Phase 2: Dispersion Calibration";
      case 3:
        return "Phase 3: Active AI Inference";
      default:
        return "Data Collection";
    }
  };

  const getPhaseDescription = (p: number) => {
    switch (p) {
      case 1:
        return "Establishing baseline readings. Continuous API queries are collecting local atmospheric patterns.";
      case 2:
        return "Calibrating XGBoost regressor with local wind, temperature, and historical pollutant lags.";
      case 3:
        return "Hyperlocal regression model fully calibrated. 24h-72h predictive forecasts and What-If simulations are unlocked.";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title={`${location.name}, ${location.country}`}
          description={`Global AI Mode: Coordinates [Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}]`}
        />
        <span className="w-fit self-start rounded-full bg-[#EFF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#2563EB]">
          {getPhaseName(phase)}
        </span>
      </div>

      {/* Main KPI Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Current AQI"
          value={loading ? "--" : reading?.AQI ?? "--"}
          subtitle="Live Measurement"
          badge={reading?.category ?? "Normal"}
        />

        <MetricCard
          title="PM2.5"
          value={loading ? "--" : `${reading?.pm25 ?? 0} µg/m³`}
          subtitle="Particulate Matter 2.5"
        />

        <MetricCard
          title="PM10"
          value={loading ? "--" : `${reading?.pm10 ?? 0} µg/m³`}
          subtitle="Particulate Matter 10"
        />

        <MetricCard
          title="Predicted AQI"
          value={forecast?.predicted_aqi ? forecast.predicted_aqi.toFixed(0) : "Calibrating"}
          subtitle={forecast ? "Global Regressor AI" : "Data Gathering"}
          icon={<CloudSun className="h-5 w-5 text-[#2563EB]" />}
        />
      </div>

      {/* Progressive AI Progression Card */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E7EB] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-2 text-[#2563EB]">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#111827]">Global AI Model Progression</h3>
              <p className="text-sm text-[#6B7280]">Hyperlocal forecast calibration timeline (60 days target)</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-[#2563EB]">{progress_pct}% Completed</span>
        </div>

        <div className="space-y-6">
          <Progress value={progress_pct} className="h-2.5 w-full bg-[#FAFBFC]" />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
              <div className="flex items-center gap-2 text-[#2563EB] mb-2">
                <Timer className="h-4 w-4" />
                <span className="text-[11px] font-medium uppercase tracking-[0.14em]">History Collected</span>
              </div>
              <h4 className="font-numeric text text-2xl font-bold text-[#111827]">{days_collected.toFixed(1)} / 60 Days</h4>
              <p className="text-xs text-[#6B7280] mt-1">({records_count} data points recorded)</p>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
              <div className="flex items-center gap-2 text-[#2563EB] mb-2">
                <Activity className="h-4 w-4" />
                <span className="text-[11px] font-medium uppercase tracking-[0.14em]">Current Phase</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#111827]">{getPhaseName(phase)}</h4>
              <p className="text-xs text-[#6B7280] mt-1">{getPhaseDescription(phase)}</p>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
              <div className="flex items-center gap-2 text-[#2563EB] mb-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-[11px] font-medium uppercase tracking-[0.14em]">Unlocked Features</span>
              </div>
              <ul className="text-xs space-y-1.5 text-[#111827] font-medium">
                <li className="flex items-center gap-1.5 text-[#15803D]">✓ Live AQI Readings</li>
                <li className="flex items-center gap-1.5 text-[#15803D]">✓ Global AI Regressor Forecast</li>
                <li className={`flex items-center gap-1.5 ${phase >= 3 ? "text-[#15803D]" : "text-[#9CA3AF]"}`}>
                  {phase >= 3 ? "✓" : "○"} Dedicated Local SHAP Model
                </li>
                <li className={`flex items-center gap-1.5 ${phase >= 3 ? "text-[#15803D]" : "text-[#9CA3AF]"}`}>
                  {phase >= 3 ? "✓" : "○"} Hyperlocal Policy Calibration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Pollutants Table */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none">
        <div className="mb-6">
          <h3 className="font-serif text-lg font-semibold text-[#111827]">Atmospheric Pollutant Breakdown</h3>
          <p className="text-sm text-[#6B7280]">Concentration measurements for key atmospheric criteria pollutants.</p>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
          <div className="p-4 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] text-center">
            <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">CO</p>
            <h4 className="font-numeric text text-xl font-bold text-[#111827] mt-1">{reading?.co ?? 0} ppb</h4>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] text-center">
            <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">NO₂</p>
            <h4 className="font-numeric text text-xl font-bold text-[#111827] mt-1">{reading?.no2 ?? 0} µg/m³</h4>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] text-center">
            <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">SO₂</p>
            <h4 className="font-numeric text text-xl font-bold text-[#111827] mt-1">{reading?.so2 ?? 0} µg/m³</h4>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] text-center">
            <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">O₃</p>
            <h4 className="font-numeric text text-xl font-bold text-[#111827] mt-1">{reading?.o3 ?? 0} µg/m³</h4>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] text-center flex flex-col justify-center items-center">
            <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">Status</p>
            <span className="mt-1 rounded-full bg-[#DCFCE7] px-3 py-0.5 text-xs font-semibold text-[#15803D]">
              {reading?.category ?? "Normal"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}