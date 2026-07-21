"use client";

import PageHeader from "@/components/layout/PageHeader";
import WhatIfSimulator from "@/components/interventions/WhatIfSimulator";
import ImpactEstimator from "@/components/interventions/ImpactEstimator";
import ComparisonChart from "@/components/charts/ComparisionChart";
import { useAQIStore } from "@/store/useAQIStore";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, MapPin, Sparkles } from "lucide-react";

const Alert = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex gap-3 rounded-xl border p-4 ${className}`}>{children}</div>
);

const AlertTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h5 className={`font-semibold tracking-tight ${className}`}>{children}</h5>
);

const AlertDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-sm mt-1 leading-normal ${className}`}>{children}</div>
);

export default function InterventionsView() {
  const { mode, locationData, dashboard } = useAQIStore();

  // If in location mode but no location searched yet
  if (mode === "location" && !locationData) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Interventions & What-If Simulation"
          description="Simulate policy decisions (traffic reduction, construction controls) to estimate AQI improvements."
        />
        <Card className="border-dashed bg-slate-50/50 p-12 text-center">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <MapPin className="h-12 w-12 text-slate-400" />
            <h3 className="text-lg font-semibold">No Location Selected</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Please search for a location in the search bar first to analyze localized interventions and unlock the simulator.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If in station mode but no dashboard loaded
  if (mode === "station" && !dashboard) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Interventions & What-If Simulation"
          description="Simulate policy decisions to estimate AQI improvements."
        />
        <div className="text-muted-foreground">Loading station simulation environment...</div>
      </div>
    );
  }

  const isCalibrating = mode === "location" && locationData && locationData.phase < 3;
  const daysCollected = locationData?.days_collected ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interventions & What-If Simulation"
        description="Simulate pollution-control strategies before deployment to verify environmental efficacy."
      />

      {isCalibrating && (
        <Alert className="bg-amber-50/40 border-amber-200 flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <AlertTitle className="text-amber-800 font-semibold">What-If Calibration Mode Active</AlertTitle>
            <AlertDescription className="text-amber-700 text-sm">
              The machine learning model for <strong>{locationData.location.name}</strong> is currently in its data gathering phase (Day {daysCollected.toFixed(1)}/60).
              The simulator below is running in <strong>Calibration Preview Mode</strong> using regional atmospheric dispersion factors.
            </AlertDescription>
          </div>
        </Alert>
      )}

      {mode === "station" && (
        <Alert className="bg-emerald-50/40 border-emerald-200 flex items-start">
          <Sparkles className="h-5 w-5 text-emerald-600 mt-0.5" />
          <div>
            <AlertTitle className="text-emerald-800 font-semibold">Fully Calibrated AI Model</AlertTitle>
            <AlertDescription className="text-emerald-700 text-sm">
              Continuous station data is active for <strong>{dashboard?.station}</strong>. Simulations are backed by full SHAP explainability matrices.
            </AlertDescription>
          </div>
        </Alert>
      )}

      <WhatIfSimulator />

      <ImpactEstimator />

      <ComparisonChart />
    </div>
  );
}