"use client";

import PageHeader from "@/components/layout/PageHeader";

import WhatIfSimulator from "@/components/interventions/WhatIfSimulator";
import ImpactEstimator from "@/components/interventions/ImpactEstimator";
import ComparisonChart from "@/components/charts/ComparisionChart";

export default function InterventionsView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Interventions"
        description="Simulate pollution-control strategies before deployment."
      />

      <WhatIfSimulator />

      <ImpactEstimator />

      <ComparisonChart />
    </div>
  );
}