"use client";

import {
  Bar,
  BarChart,
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

export interface SHAPFeature {
  feature: string;
  importance: number;
}

interface SHAPChartProps {
  data?: SHAPFeature[];
}

export default function SHAPChart({
  data = [],
}: SHAPChartProps) {
  return (
    <Card className="h-105">
      <CardHeader>
        <CardTitle>Prediction Drivers</CardTitle>

        <CardDescription>
          Most influential features used by the model
        </CardDescription>
      </CardHeader>

      <CardContent className="h-80">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No feature importance available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                left: 20,
                right: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" />

              <YAxis
                dataKey="feature"
                type="category"
                width={120}
              />

              <Tooltip />

              <Bar
                dataKey="importance"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}