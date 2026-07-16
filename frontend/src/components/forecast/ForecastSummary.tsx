"use client";

import { CloudSun } from "lucide-react";

import MetricCard from "@/components/common/MetricCard";

import type { ForecastResponse } from "@/types/forecast";

interface Props {
  forecast?: ForecastResponse | null;
}

export default function ForecastSummary({
  forecast,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <MetricCard
        title="Predicted AQI"
        subtitle="Next Prediction"
        value={
          forecast?.predicted_aqi.toFixed(2) ??
          "--"
        }
        badge={forecast?.category}
        icon={<CloudSun className="h-5 w-5" />}
      />

      <MetricCard
        title="Confidence"
        subtitle="Model Confidence"
        value={
          forecast
            ? `${(
                forecast.confidence * 100
              ).toFixed(1)}%`
            : "--"
        }
      />

      <MetricCard
        title="Category"
        subtitle="Forecast Status"
        value={forecast?.category ?? "--"}
      />

    </div>
  );
}