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

export interface AQITrendPoint {
  label: string;
  actual: number | null;
  forecast: number | null;
}

interface AQITrendChartProps {
  data?: AQITrendPoint[];
}

export default function AQITrendChart({ data = [] }: AQITrendChartProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none h-105 space-y-6">
      <div>
        <h3 className="font-serif text-xl font-semibold text-[#111827]">AQI Trend</h3>
        <p className="mt-1 text-sm text-[#6B7280]">Historical observations and AI forecast trajectory.</p>
      </div>

      <div className="h-75 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[#9CA3AF]">
            No trend data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="label" stroke="#9CA3AF" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Observed AQI"
                stroke="#2563EB"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                name="Predicted AQI"
                stroke="#93C5FD"
                strokeDasharray="6 6"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}