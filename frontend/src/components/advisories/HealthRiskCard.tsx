"use client";

import {
  Baby,
  PersonStanding,
  HeartPulse,
  Trees,
  Shield,
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

interface RiskItem {
  title: string;
  icon: React.ReactNode;
  level: string;
}

function buildRiskLevels(
  risk: string,
  t: Record<string, string>
): RiskItem[] {
  switch (risk) {
    case "Low":
      return [
        {
          title: t.children ?? "Children",
          icon: <Baby className="h-4 w-4" />,
          level: t.low ?? "Low",
        },
        {
          title: t.elderly ?? "Elderly",
          icon: <PersonStanding className="h-4 w-4" />,
          level: t.low ?? "Low",
        },
        {
          title:
            t.respiratoryPatients ??
            "Respiratory Patients",
          icon: <HeartPulse className="h-4 w-4" />,
          level: t.moderate ?? "Moderate",
        },
        {
          title:
            t.outdoorWorkers ??
            "Outdoor Workers",
          icon: <Trees className="h-4 w-4" />,
          level: t.low ?? "Low",
        },
      ];

    case "Medium":
      return [
        {
          title: t.children ?? "Children",
          icon: <Baby className="h-4 w-4" />,
          level: t.moderate ?? "Moderate",
        },
        {
          title: t.elderly ?? "Elderly",
          icon: <PersonStanding className="h-4 w-4" />,
          level: t.moderate ?? "Moderate",
        },
        {
          title:
            t.respiratoryPatients ??
            "Respiratory Patients",
          icon: <HeartPulse className="h-4 w-4" />,
          level: t.high ?? "High",
        },
        {
          title:
            t.outdoorWorkers ??
            "Outdoor Workers",
          icon: <Trees className="h-4 w-4" />,
          level: t.moderate ?? "Moderate",
        },
      ];

    case "High":
    case "Very High":
      return [
        {
          title: t.children ?? "Children",
          icon: <Baby className="h-4 w-4" />,
          level: t.high ?? "High",
        },
        {
          title: t.elderly ?? "Elderly",
          icon: <PersonStanding className="h-4 w-4" />,
          level: t.veryHigh ?? "Very High",
        },
        {
          title:
            t.respiratoryPatients ??
            "Respiratory Patients",
          icon: <HeartPulse className="h-4 w-4" />,
          level: t.veryHigh ?? "Very High",
        },
        {
          title:
            t.outdoorWorkers ??
            "Outdoor Workers",
          icon: <Trees className="h-4 w-4" />,
          level: t.high ?? "High",
        },
      ];

    default:
      return [];
  }
}

function badgeVariant(level: string) {
  switch (level) {
    case "Low":
      return "secondary";

    case "Moderate":
      return "outline";

    default:
      return "destructive";
  }
}

export default function HealthRiskCard() {
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
          Loading health assessment...
        </CardContent>
      </Card>
    );
  }

  const risks = buildRiskLevels(
    dashboard.advisory.risk,
    t
  );

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          {t.healthAssessment ??
            "Health Risk Assessment"}
        </CardTitle>

        <CardDescription>
          {t.healthAssessmentDescription ??
            "Estimated impact across different population groups."}
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-4">

        {risks.map((risk) => (

          <div
            key={risk.title}
            className="flex items-center justify-between rounded-xl border p-4"
          >

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-muted p-2">
                {risk.icon}
              </div>

              <p className="font-medium">
                {risk.title}
              </p>

            </div>

            <Badge
              variant={badgeVariant(
                risk.level
              )}
            >
              {risk.level}
            </Badge>

          </div>

        ))}

        <div className="mt-4 flex items-start gap-3 rounded-xl bg-muted/40 p-4">

          <Shield className="mt-1 h-5 w-5 text-primary" />

          <p className="text-sm leading-6 text-muted-foreground">

            {t.disclaimer ??
              "This assessment is generated using the latest AI forecast and is intended to support precautionary decisions. Follow guidance from local authorities during severe pollution events."}

          </p>

        </div>

      </CardContent>

    </Card>
  );
}