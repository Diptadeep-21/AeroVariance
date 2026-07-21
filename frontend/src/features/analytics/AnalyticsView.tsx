"use client";

import PageHeader from "@/components/layout/PageHeader";

import AQITrendChart, {
  AQITrendPoint,
} from "@/components/charts/AQITrendChart";

import SHAPChart from "@/components/charts/SHAPChart";

import PredictionHistory from "@/components/dashboard/PredictionHistory";

import { Card } from "@/components/ui/card";

import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsView() {
  const {
    analytics,
    metrics,
    loading,
  } = useAnalytics();

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Analytics"
          description="Historical insights and model performance."
        />

        <div className="text-muted-foreground">
          Loading analytics...
        </div>
      </div>
    );
  }

  if (!analytics || !metrics) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Analytics"
          description="Historical insights and model performance."
        />

        <div className="text-destructive">
          Unable to load analytics.
        </div>
      </div>
    );
  }

  const trendData: AQITrendPoint[] =
    analytics.sensor_readings.map((reading, index) => ({
      label: new Date(reading.timestamp || Date.now()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      actual: reading.AQI,

      forecast:
        analytics.predictions[index]?.predicted_aqi ??
        null,
    }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Historical insights and AI model performance."
      />

      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard
          title="RMSE"
          value={metrics.regression.RMSE.toFixed(2)}
        />

        <MetricCard
          title="MAE"
          value={metrics.regression.MAE.toFixed(2)}
        />

        <MetricCard
          title="MAPE"
          value={`${metrics.regression.MAPE.toFixed(2)}%`}
        />

        <MetricCard
          title="R²"
          value={metrics.regression.R2.toFixed(3)}
        />

        <MetricCard
          title="Accuracy"
          value={`${metrics.classification.accuracy.toFixed(
            2
          )}%`}
        />
      </div>

      <AQITrendChart
        data={trendData}
      />

      <SHAPChart
        data={metrics.top_features}
      />

      <PredictionHistory
        history={analytics.evaluations}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
}

function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="text-sm text-muted-foreground">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </Card>
  );
}