"use client";

import {
  TrendingDown,
  Activity,
  BadgeCheck,
  Gauge,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAQIStore } from "@/store/useAQIStore";

function getCategory(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  return "Very Poor";
}

export default function ImpactEstimator() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );

  const simulation = useAQIStore(
    (state) => state.simulation
  );

  if (!dashboard) {
    return (
      <Card>
        <CardContent className="flex h-40 items-center justify-center text-muted-foreground">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const current =
    simulation?.before ??
    dashboard.forecast.predicted_aqi;

  const simulated =
    simulation?.after ??
    dashboard.forecast.predicted_aqi;

  const improvement =
    simulation?.difference ?? 0;

  const percent =
    simulation?.percent_change ?? 0;

  return (
    <Card>

      <CardHeader>

        <CardTitle>

          Estimated Impact

        </CardTitle>

        <CardDescription>

          AI-estimated effect of the selected intervention.

        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="grid gap-5 md:grid-cols-4">

          <div className="rounded-xl border p-5">

            <Activity className="mb-3 h-5 w-5 text-primary" />

            <p className="text-xs text-muted-foreground">
              Current AQI
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {current.toFixed(0)}
            </h2>

          </div>

          <div className="rounded-xl border p-5">

            <TrendingDown className="mb-3 h-5 w-5 text-green-600" />

            <p className="text-xs text-muted-foreground">
              AQI Improvement
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {improvement > 0 ? "-" : ""}
              {Math.abs(improvement).toFixed(1)}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {percent.toFixed(1)}%
            </p>

          </div>

          <div className="rounded-xl border p-5">

            <BadgeCheck className="mb-3 h-5 w-5 text-blue-600" />

            <p className="text-xs text-muted-foreground">
              Expected Category
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {getCategory(simulated)}
            </h2>

          </div>

          <div className="rounded-xl border p-5">

            <Gauge className="mb-3 h-5 w-5 text-orange-600" />

            <p className="text-xs text-muted-foreground">
              Model Confidence
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {(dashboard.forecast.confidence * 100).toFixed(0)}%
            </h2>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}