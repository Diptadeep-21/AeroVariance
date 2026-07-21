"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAQIStore } from "@/store/useAQIStore";

export default function ComparisonChart() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );

  const simulation = useAQIStore(
    (state) => state.simulation
  );

  if (!dashboard || !dashboard.forecast) {
    return (
      <Card>
        <CardContent className="flex h-80 items-center justify-center text-muted-foreground">
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

  const data = [
    {
      label: "Current",
      aqi: Number(current.toFixed(1)),
    },
    {
      label: "Simulated",
      aqi: Number(simulated.toFixed(1)),
    },
  ];

  return (
    <Card>

      <CardHeader>

        <CardTitle>

          AQI Comparison

        </CardTitle>

        <CardDescription>

          Current forecast versus intervention scenario

        </CardDescription>

      </CardHeader>

      <CardContent className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="label"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="aqi"
              radius={[8, 8, 0, 0]}
            >

              <Cell fill="#ef4444" />

              <Cell fill="#22c55e" />

              <LabelList
                dataKey="aqi"
                position="top"
              />

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
}