"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type {
  StationDashboardResponse,
} from "@/types/stationDashboard";

interface Props {
  dashboard: StationDashboardResponse;
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
              {dashboard.forecast?.predicted_aqi?.toFixed(1) ?? dashboard.latest_reading?.aqi ?? "N/A"}
            </p>

          </div>

          <Badge>
            {dashboard.forecast?.category ?? dashboard.latest_reading?.category ?? "Normal"}
          </Badge>

        </div>

        <div>

          <p className="text-xs text-muted-foreground">
            Health Advisory
          </p>

          <p className="text-sm">
            {dashboard.advisory?.message ?? "Regular atmospheric monitoring active."}
          </p>

        </div>

      </CardContent>

    </Card>
  );
}