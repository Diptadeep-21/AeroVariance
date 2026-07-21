"use client";

import PageHeader from "@/components/layout/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import AQITrendChart, { AQITrendPoint } from "@/components/charts/AQITrendChart";
import SHAPChart from "@/components/charts/SHAPChart";
import PredictionHistory from "@/components/dashboard/PredictionHistory";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsView() {
  const { analytics, metrics, loading } = useAnalytics();

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Analytics"
          description="Historical insights and model performance metrics."
        />
        <div className="text-[#6B7280]">Loading analytics metrics...</div>
      </div>
    );
  }

  if (!analytics || !metrics) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Analytics"
          description="Historical insights and model performance metrics."
        />
        <div className="text-red-600 font-medium">Unable to load analytics data.</div>
      </div>
    );
  }

  const trendData: AQITrendPoint[] = analytics.sensor_readings.map((reading, index) => ({
    label: new Date(reading.timestamp || Date.now()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    actual: reading.AQI,
    forecast: analytics.predictions[index]?.predicted_aqi ?? null,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Historical atmospheric insights, error diagnostics, and AI model evaluation."
      />

      {/* 5-Up Metric Card Row */}
      <div className="grid gap-6 md:grid-cols-5">
        <MetricCard
          title="RMSE"
          value={metrics.regression.RMSE.toFixed(2)}
          subtitle="Root Mean Sq Error"
        />

        <MetricCard
          title="MAE"
          value={metrics.regression.MAE.toFixed(2)}
          subtitle="Mean Absolute Error"
        />

        <MetricCard
          title="MAPE"
          value={`${metrics.regression.MAPE.toFixed(2)}%`}
          subtitle="Percentage Error"
        />

        <MetricCard
          title="R² Score"
          value={metrics.regression.R2.toFixed(3)}
          subtitle="Variance Explained"
        />

        <MetricCard
          title="Accuracy"
          value={`${metrics.classification.accuracy.toFixed(2)}%`}
          subtitle="Category Precision"
        />
      </div>

      {/* Full-width AQI Trend Line Chart */}
      <AQITrendChart data={trendData} />

      <SHAPChart data={metrics.top_features} />

      <PredictionHistory history={analytics.evaluations} />
    </div>
  );
}