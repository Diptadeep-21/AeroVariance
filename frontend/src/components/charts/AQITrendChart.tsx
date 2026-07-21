"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
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

export interface AQITrendPoint {
  label: string;
  actual: number | null;
  forecast: number | null;
}

interface AQITrendChartProps {
  data?: AQITrendPoint[];
}

export default function AQITrendChart({
  data = [],
}: AQITrendChartProps) {
  return (
    <Card className="h-105">
      <CardHeader>
        <CardTitle>AQI Trend</CardTitle>

        <CardDescription>
          Historical observations and AI forecast
        </CardDescription>
      </CardHeader>

      <CardContent className="h-80">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No trend data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="label" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="actual"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="forecast"
                strokeDasharray="6 6"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}