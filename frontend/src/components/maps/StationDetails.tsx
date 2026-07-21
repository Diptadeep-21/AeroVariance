"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { MapPin } from "lucide-react";

import { useAQIStore } from "@/store/useAQIStore";

export default function StationDetails() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );

  if (!dashboard || !dashboard.forecast) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Station</CardTitle>
          <CardDescription>
            Waiting for data...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="h-full">

      <CardHeader>

        <div className="flex items-center gap-2">

          <MapPin className="h-5 w-5" />

          <CardTitle>

            Selected Station

          </CardTitle>

        </div>

        <CardDescription>

          Current monitoring location

        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        <div>

          <p className="text-sm text-muted-foreground">
            Station
          </p>

          <p className="mt-1 font-medium">
            {dashboard.station}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Current Prediction
          </p>

          <p className="text-3xl font-bold">
            {dashboard.forecast.predicted_aqi.toFixed(1)}
          </p>

        </div>

        <div>

          <Badge>

            {dashboard.forecast.category}

          </Badge>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Confidence
          </p>

          <p className="font-medium">
            {(dashboard.forecast.confidence * 100).toFixed(1)}%
          </p>

        </div>

      </CardContent>

    </Card>
  );
}