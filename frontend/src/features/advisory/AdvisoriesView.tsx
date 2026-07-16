"use client";

import PageHeader from "@/components/layout/PageHeader";

import AdvisoryCard from "@/components/advisories/AdvisoryCard";
import HealthRiskCard from "@/components/advisories/HealthRiskCard";
import LanguageSelector from "@/components/advisories/LanguageSelector";

import { useAQIStore } from "@/store/useAQIStore";

export default function AdvisoriesView() {
  const t = useAQIStore(
    (state) => state.translations
  );

  return (
    <div className="space-y-6">

      <PageHeader
        title={
          t.pageTitle ??
          "Citizen Advisories"
        }
        description={
          t.pageDescription ??
          "Health recommendations generated from the latest air-quality prediction."
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <AdvisoryCard />

        <HealthRiskCard />

      </div>

      <LanguageSelector />

    </div>
  );
}