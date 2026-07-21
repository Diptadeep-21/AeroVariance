"use client";

import PageHeader from "@/components/layout/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import AQITrendChart from "@/components/charts/AQITrendChart";
import SHAPChart from "@/components/charts/SHAPChart";
import PredictionInsights from "@/components/dashboard/PredictionInsights";
import PredictionHistory from "@/components/dashboard/PredictionHistory";
import { useAnalytics } from "@/hooks/useAnalytics";
import LocationResult from "@/components/location/LocationResult";

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
        stationDashboard,
        loading,
        selectedStation,
    } = useAQIStore();

    const latest =
        stationDashboard?.latest_reading;

    const forecast =
        stationDashboard?.forecast;

    const latestPrediction =
        stationDashboard?.latest_prediction;

    const advisory =
        stationDashboard?.advisory;

    const {
        analytics,
        metrics,
    } = useAnalytics();

    const readings = [...(analytics?.sensor_readings ?? [])].sort(
    (a, b) =>
        new Date(
            (a as any).datetimeLocal ??
            (a as any).timestamp
        ).getTime() -
        new Date(
            (b as any).datetimeLocal ??
            (b as any).timestamp
        ).getTime()
);

const latestForecast =
    stationDashboard?.forecast?.predicted_aqi ?? null;

const trendData = readings.map((reading, index) => {
    const ts =
        (reading as any).datetimeLocal ??
        (reading as any).timestamp;

    return {
        label: new Date(ts).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
        actual: reading.AQI,
        forecast:
            index === readings.length - 1
                ? latestForecast
                : null,
    };
});

    //   useDashboardInitializer();
    useDashboardData();

    console.log("Analytics:", analytics);

    console.log(
        "Evaluations:",
        analytics?.evaluations
    );

    console.log(
        "Prediction count:",
        analytics?.predictions?.length
    );

    console.log(
        "Sensor count:",
        analytics?.sensor_readings?.length
    );

    console.log("Selected station:", selectedStation);

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
                            : latest?.aqi ?? "--"
                    }

                    subtitle={
                        latest?.timestamp
                            ? `Updated ${new Date(
                                latest.timestamp
                            ).toLocaleString()}`
                            : "Latest Reading"
                    }

                    badge={latest?.category ?? "--"}
                />

                <MetricCard
                    title="Forecast"
                    value={
                        loading
                            ? "--"
                            : forecast?.predicted_aqi ?? "--"
                    }

                    badge={
                        forecast?.category ?? "--"
                    }
                    icon={<CloudSun className="h-5 w-5" />}
                    loading={loading}
                />

                <MetricCard
                    title="PM2.5"
                    value={
                        loading
                            ? "--"
                            : latest?.pm25 ?? "--"
                    }
                    subtitle="Latest Sensor"
                />

                <MetricCard
                    title="PM10"
                    value={
                        loading
                            ? "--"
                            : latest?.pm10 ?? "--"
                    }
                    subtitle="Latest Sensor"
                />

                <MetricCard
                    title="Risk Level"
                    value={
                        forecast?.category ??
                        latest?.category ??
                        "--"
                    }
                    subtitle="Current AQI Category"
                    badge={
                        latest?.aqi !== undefined
                            ? `AQI ${latest.aqi}`
                            : "--"
                    }
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
                    <AQITrendChart
                        data={trendData}
                    />
                </div>

                <div className="xl:col-span-4">
                    <SHAPChart
                        data={metrics?.top_features ?? []}
                    />
                </div>

            </div>

            <PredictionInsights
                data={latestPrediction ?? null}
            />

            <PredictionHistory
                history={analytics?.evaluations ?? []}
            />

        </div>
    );
}