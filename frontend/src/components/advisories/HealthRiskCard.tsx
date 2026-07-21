"use client";

import { Baby, PersonStanding, HeartPulse, Trees, Shield } from "lucide-react";
import { useAQIStore } from "@/store/useAQIStore";

interface RiskItem {
  title: string;
  icon: React.ReactNode;
  level: string;
}

function buildRiskLevels(risk: string, t: Record<string, string>): RiskItem[] {
  switch (risk) {
    case "Low":
      return [
        { title: t.children ?? "Children", icon: <Baby className="h-4 w-4" />, level: t.low ?? "Low" },
        { title: t.elderly ?? "Elderly", icon: <PersonStanding className="h-4 w-4" />, level: t.low ?? "Low" },
        { title: t.respiratoryPatients ?? "Respiratory Patients", icon: <HeartPulse className="h-4 w-4" />, level: t.moderate ?? "Moderate" },
        { title: t.outdoorWorkers ?? "Outdoor Workers", icon: <Trees className="h-4 w-4" />, level: t.low ?? "Low" },
      ];
    case "Medium":
      return [
        { title: t.children ?? "Children", icon: <Baby className="h-4 w-4" />, level: t.moderate ?? "Moderate" },
        { title: t.elderly ?? "Elderly", icon: <PersonStanding className="h-4 w-4" />, level: t.moderate ?? "Moderate" },
        { title: t.respiratoryPatients ?? "Respiratory Patients", icon: <HeartPulse className="h-4 w-4" />, level: t.high ?? "High" },
        { title: t.outdoorWorkers ?? "Outdoor Workers", icon: <Trees className="h-4 w-4" />, level: t.moderate ?? "Moderate" },
      ];
    case "High":
    case "Very High":
      return [
        { title: t.children ?? "Children", icon: <Baby className="h-4 w-4" />, level: t.high ?? "High" },
        { title: t.elderly ?? "Elderly", icon: <PersonStanding className="h-4 w-4" />, level: t.veryHigh ?? "Very High" },
        { title: t.respiratoryPatients ?? "Respiratory Patients", icon: <HeartPulse className="h-4 w-4" />, level: t.veryHigh ?? "Very High" },
        { title: t.outdoorWorkers ?? "Outdoor Workers", icon: <Trees className="h-4 w-4" />, level: t.high ?? "High" },
      ];
    default:
      return [];
  }
}

function getBadgeStyle(level: string) {
  switch (level) {
    case "Low":
      return "bg-[#DCFCE7] text-[#15803D]";
    case "Moderate":
      return "bg-[#FEF3C7] text-[#B45309]";
    default:
      return "bg-[#FEE2E2] text-[#DC2626]";
  }
}

export default function HealthRiskCard() {
  const dashboard = useAQIStore((state) => state.dashboard);
  const t = useAQIStore((state) => state.translations);

  if (!dashboard || !dashboard.advisory) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none flex h-60 items-center justify-center text-[#6B7280]">
        Loading health assessment...
      </div>
    );
  }

  const risks = buildRiskLevels(dashboard.advisory.risk, t);

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none space-y-6">
      <div>
        <h3 className="font-serif text-xl font-semibold text-[#111827]">
          {t.healthAssessment ?? "Health Risk Assessment"}
        </h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          {t.healthAssessmentDescription ?? "Estimated impact across different population groups."}
        </p>
      </div>

      <div className="space-y-3">
        {risks.map((risk) => (
          <div
            key={risk.title}
            className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-3.5"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-[#E5E7EB] bg-white p-2 text-[#2563EB]">
                {risk.icon}
              </div>
              <p className="text-sm font-medium text-[#111827]">{risk.title}</p>
            </div>

            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeStyle(risk.level)}`}>
              {risk.level}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />
        <p className="text-xs leading-relaxed text-[#6B7280]">
          {t.disclaimer ??
            "This assessment is generated using the latest AI forecast and is intended to support precautionary decisions. Follow guidance from local authorities during severe pollution events."}
        </p>
      </div>
    </div>
  );
}