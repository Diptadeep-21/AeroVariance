"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    label: "Good",
    color: "#22c55e",
  },
  {
    label: "Satisfactory",
    color: "#84cc16",
  },
  {
    label: "Moderate",
    color: "#facc15",
  },
  {
    label: "Poor",
    color: "#f97316",
  },
  {
    label: "Very Poor",
    color: "#dc2626",
  },
];

export default function MapLegend() {
  return (
    <Card className="absolute bottom-4 left-4 z-20 w-60 shadow-lg">

      <CardHeader className="pb-2">

        <CardTitle className="text-sm">
          AQI Categories
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3"
          >
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <span className="text-sm">
              {item.label}
            </span>

          </div>
        ))}

      </CardContent>

    </Card>
  );
}