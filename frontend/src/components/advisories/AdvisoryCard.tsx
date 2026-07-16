"use client";

import {
  ShieldAlert,
  Wind,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { useAQIStore } from "@/store/useAQIStore";

export default function AdvisoryCard() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );

  const t = useAQIStore(
    (state) => state.translations
  );

  if (!dashboard) {
    return (
      <Card>
        <CardContent className="flex h-60 items-center justify-center text-muted-foreground">
          Loading advisory...
        </CardContent>
      </Card>
    );
  }

  const {
    forecast,
    advisory,
  } = dashboard;

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          {t.advisoryTitle ?? "Citizen Advisory"}
        </CardTitle>

        <CardDescription>
          {t.pageDescription ??
            "AI-generated health guidance for the selected station."}
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              {t.predictedAQI ?? "Predicted AQI"}
            </p>

            <h2 className="mt-1 text-4xl font-bold">
              {forecast.predicted_aqi.toFixed(0)}
            </h2>

          </div>

          <Badge
            className="px-4 py-2 text-sm"
            style={{
              backgroundColor: advisory.color,
              color: "#ffffff",
            }}
          >
            {t.forecastCategory ??
              forecast.category}
          </Badge>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-xl border p-4">

            <ShieldAlert className="mb-3 h-5 w-5 text-primary" />

            <p className="text-xs text-muted-foreground">
              {t.riskLevel ?? "Risk Level"}
            </p>

            <p className="mt-1 font-semibold">
              {t.advisoryRisk ??
                advisory.risk}
            </p>

          </div>

          <div className="rounded-xl border p-4">

            <Wind className="mb-3 h-5 w-5 text-primary" />

            <p className="text-xs text-muted-foreground">
              {t.outdoorActivity ??
                "Outdoor Activity"}
            </p>

            <p className="mt-1 font-semibold">
              {t.advisoryOutdoor ??
                advisory.outdoor}
            </p>

          </div>

          <div className="rounded-xl border p-4">

            <AlertTriangle className="mb-3 h-5 w-5 text-primary" />

            <p className="text-xs text-muted-foreground">
              {t.maskRequired ??
                "Mask Required"}
            </p>

            <p className="mt-1 font-semibold">
              {advisory.mask
                ? (t.yes ?? "Yes")
                : (t.no ?? "No")}
            </p>

          </div>

        </div>

        <div className="rounded-xl border bg-muted/40 p-5">

          <p className="text-sm font-medium">
            {t.recommendation ??
              "Recommendation"}
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            {t.advisoryMessage ??
              advisory.message}
          </p>

        </div>

      </CardContent>

    </Card>
  );
}