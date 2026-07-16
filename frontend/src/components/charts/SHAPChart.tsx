"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAQIStore } from "@/store/useAQIStore";

export default function SHAPChart() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );

  const loading = useAQIStore(
    (state) => state.loading
  );

  const data =
    dashboard?.latest_prediction?.top_features?.map(
      (item) => ({
        feature: item.feature,
        value: Math.abs(item.impact),
      })
    ) ?? [];

  return (
    <Card className="h-105">
      <CardHeader>
        <CardTitle>
          Prediction Drivers
        </CardTitle>

        <CardDescription>
          Most influential features for the latest AI prediction
        </CardDescription>
      </CardHeader>

      <CardContent className="h-80">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading prediction...
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                left: 16,
                right: 16,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis type="number" />

              <YAxis
                type="category"
                dataKey="feature"
                width={120}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}