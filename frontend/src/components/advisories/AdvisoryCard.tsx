"use client";

import { ShieldAlert, Wind, AlertTriangle } from "lucide-react";
import { useAQIStore } from "@/store/useAQIStore";

export default function AdvisoryCard() {
  const dashboard = useAQIStore((state) => state.dashboard);
  const t = useAQIStore((state) => state.translations);

  if (!dashboard || !dashboard.forecast) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none flex h-60 items-center justify-center text-[#6B7280]">
        Loading advisory...
      </div>
    );
  }

  const forecast = dashboard.forecast;
  const advisory = dashboard.advisory ?? {
    category: forecast.category,
    risk: "Moderate",
    message: "Standard precautionary measures advised.",
    outdoor: "Moderate",
    mask: false,
    color: "#f59e0b",
  };

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none space-y-6">
      <div>
        <h3 className="font-serif text-xl font-semibold text-[#111827]">
          {t.advisoryTitle ?? "Citizen Advisory"}
        </h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          {t.pageDescription ?? "AI-generated health guidance for the selected station."}
        </p>
      </div>

      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B7280]">
            {t.predictedAQI ?? "Predicted AQI"}
          </p>
          <h2 className="mt-1 font-numeric text text-[40px] font-bold tracking-tight text-[#111827] leading-none">
            {forecast.predicted_aqi.toFixed(0)}
          </h2>
        </div>

        <span className="rounded-full bg-[#DCFCE7] px-4 py-1.5 text-xs font-semibold text-[#15803D]">
          {t.forecastCategory ?? forecast.category}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
          <ShieldAlert className="mb-2 h-5 w-5 text-[#2563EB]" />
          <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{t.riskLevel ?? "Risk Level"}</p>
          <p className="mt-1 text-base font-semibold text-[#111827]">{t.advisoryRisk ?? advisory.risk}</p>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
          <Wind className="mb-2 h-5 w-5 text-[#2563EB]" />
          <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{t.outdoorActivity ?? "Outdoor Activity"}</p>
          <p className="mt-1 text-base font-semibold text-[#111827]">{t.advisoryOutdoor ?? advisory.outdoor}</p>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
          <AlertTriangle className="mb-2 h-5 w-5 text-[#2563EB]" />
          <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{t.maskRequired ?? "Mask Required"}</p>
          <p className="mt-1 text-base font-semibold text-[#111827]">
            {advisory.mask ? (t.yes ?? "Yes") : (t.no ?? "No")}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B7280]">
          {t.recommendation ?? "Recommendation"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#111827]">
          {t.advisoryMessage ?? advisory.message}
        </p>
      </div>
    </div>
  );
}