"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type {
  DashboardResponse,
} from "@/types/dashboard";

interface Props {
  dashboard: DashboardResponse;
}

export default function StationPopup({
  dashboard,
}: Props) {
  return (
    <Card className="min-w-65 border-0 shadow-none">

      <CardContent className="space-y-4 p-2">

        <div>

          <p className="text-xs text-muted-foreground">
            Station
          </p>

          <h3 className="font-semibold">
            {dashboard.station}
          </h3>

        </div>

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs text-muted-foreground">
              AQI
            </p>

            <p className="text-3xl font-bold">
              {dashboard.forecast.predicted_aqi.toFixed(1)}
            </p>

          </div>

          <Badge>
            {dashboard.forecast.category}
          </Badge>

        </div>

        <div>

          <p className="text-xs text-muted-foreground">
            Health Advisory
          </p>

          <p className="text-sm">
            {dashboard.advisory.message}
          </p>

        </div>

      </CardContent>

    </Card>
  );
}