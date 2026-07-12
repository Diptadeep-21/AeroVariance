"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const data = [
  { hour: "06", actual: 158, forecast: 160 },
  { hour: "08", actual: 165, forecast: 166 },
  { hour: "10", actual: 171, forecast: 170 },
  { hour: "12", actual: 176, forecast: 178 },
  { hour: "14", actual: 181, forecast: 182 },
  { hour: "16", actual: null, forecast: 186 },
  { hour: "18", actual: null, forecast: 191 },
];

export default function AQITrendChart() {
  return (
    <Card className="h-105">

      <CardHeader>

        <CardTitle>
          AQI Trend
        </CardTitle>

        <CardDescription>
          Historical observations and AI forecast
        </CardDescription>

      </CardHeader>

      <CardContent className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="hour" />

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

      </CardContent>

    </Card>
  );
}