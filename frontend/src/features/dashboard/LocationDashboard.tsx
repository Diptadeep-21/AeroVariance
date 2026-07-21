"use client";

import PageHeader from "@/components/layout/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import { CloudSun, Database, MapPin, Gauge, ShieldAlert, Sparkles, Activity, Timer } from "lucide-react";
import { useAQIStore } from "@/store/useAQIStore";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LocationDashboard() {
  const { locationData, loading } = useAQIStore();

  if (!locationData) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Location Intelligence (Global AI)"
          description="Search any global location or ward to view air quality data and ML progression."
        />
        <Card className="border-dashed bg-slate-50/50 p-12 text-center">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <MapPin className="h-12 w-12 text-slate-400" />
            <h3 className="text-lg font-semibold">No Location Selected</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Use the search bar in the top navigation to search for any city or custom coordinates (e.g., "Chennai" or "Bengaluru").
            </p>
          </CardContent>
        </Card>
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
        <Badge className="w-fit self-start px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium">
          {getPhaseName(phase)}
        </Badge>
      </div>

      {/* Main KPI Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Current AQI"
          value={loading ? "--" : reading?.AQI ?? "--"}
          subtitle={reading?.category ?? "Live Category"}
        />

        <MetricCard
          title="PM2.5"
          value={loading ? "--" : `${reading?.pm25 ?? 0} µg/m³`}
          subtitle="Current Level"
        />

        <MetricCard
          title="PM10"
          value={loading ? "--" : `${reading?.pm10 ?? 0} µg/m³`}
          subtitle="Current Level"
        />

        <MetricCard
          title="Predicted AQI"
          value={phase === 3 ? (forecast?.predicted_aqi?.toFixed(0) ?? "N/A") : "Coming Soon"}
          subtitle={phase === 3 ? "AI 24h Forecast" : "Calibrating..."}
          icon={<CloudSun className="h-5 w-5 text-indigo-500" />}
        />
      </div>

      {/* Progressive AI Progression Card */}
      <Card className="overflow-hidden border border-slate-100 shadow-sm">
        <CardHeader className="bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-indigo-600" />
              <div>
                <CardTitle className="text-md font-semibold text-slate-800">Global AI Model Progression</CardTitle>
                <CardDescription>Hyperlocal forecast calibration timeline (60 days target)</CardDescription>
              </div>
            </div>
            <span className="text-sm font-semibold text-indigo-600">{progress_pct}% Completed</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Progress value={progress_pct} className="h-3 w-full bg-slate-100" />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border p-4 bg-slate-50/30">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Timer className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase">History Collected</span>
              </div>
              <h4 className="text-xl font-bold">{days_collected.toFixed(1)} / 60 Days</h4>
              <p className="text-xs text-muted-foreground mt-1">({records_count} total data points)</p>
            </div>

            <div className="rounded-xl border p-4 bg-slate-50/30">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Activity className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase">Current Phase</span>
              </div>
              <h4 className="text-md font-bold text-slate-800">{getPhaseName(phase)}</h4>
              <p className="text-xs text-muted-foreground mt-1">{getPhaseDescription(phase)}</p>
            </div>

            <div className="rounded-xl border p-4 bg-slate-50/30">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase">Unlocked Features</span>
              </div>
              <ul className="text-xs space-y-1 text-slate-700 font-medium">
                <li className="flex items-center gap-1.5 text-emerald-600">✓ Live AQI Readings</li>
                <li className={`flex items-center gap-1.5 ${phase >= 3 ? "text-emerald-600" : "text-slate-400"}`}>
                  {phase >= 3 ? "✓" : "○"} Hyperlocal 24-72h Forecast
                </li>
                <li className={`flex items-center gap-1.5 ${phase >= 3 ? "text-emerald-600" : "text-slate-400"}`}>
                  {phase >= 3 ? "✓" : "○"} SHAP Attribution
                </li>
                <li className={`flex items-center gap-1.5 ${phase >= 3 ? "text-emerald-600" : "text-slate-400"}`}>
                  {phase >= 3 ? "✓" : "○"} What-If Simulation
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Pollutants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Atmospheric Pollutant Breakdown</CardTitle>
          <CardDescription>Ward-level concentration measurements for key air pollutants.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium uppercase">CO</p>
              <h4 className="text-lg font-bold text-slate-800 mt-1">{reading?.co ?? 0} ppb</h4>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium uppercase">NO₂</p>
              <h4 className="text-lg font-bold text-slate-800 mt-1">{reading?.no2 ?? 0} µg/m³</h4>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium uppercase">SO₂</p>
              <h4 className="text-lg font-bold text-slate-800 mt-1">{reading?.so2 ?? 0} µg/m³</h4>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium uppercase">O₃</p>
              <h4 className="text-lg font-bold text-slate-800 mt-1">{reading?.o3 ?? 0} µg/m³</h4>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium uppercase">Status</p>
              <Badge className="mt-1" variant="outline">{reading?.category ?? "Normal"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}