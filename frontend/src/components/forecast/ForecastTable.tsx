"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { useAQIStore } from "@/store/useAQIStore";

export default function ForecastTable() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );

  if (!dashboard || !dashboard.forecast) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Prediction Details
          </CardTitle>

          <CardDescription>
            Waiting for forecast...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { station, forecast } = dashboard;

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Prediction Details
        </CardTitle>

        <CardDescription>
          Latest model prediction metadata
        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <p className="text-sm text-muted-foreground">
              Station
            </p>

            <p className="mt-1 font-medium">
              {station}
            </p>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">
              Predicted AQI
            </p>

            <p className="mt-1 font-semibold text-xl">
              {forecast.predicted_aqi.toFixed(2)}
            </p>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">
              Category
            </p>

            <Badge className="mt-2">
              {forecast.category}
            </Badge>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">
              Confidence
            </p>

            <p className="mt-1 font-medium">
              {(forecast.confidence * 100).toFixed(1)}%
            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}