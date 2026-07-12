"use client";

import PageHeader from "@/components/layout/PageHeader";
import AQIMap from "@/components/maps/AQIMap";

export default function MapView() {
  return (
    <div className="space-y-6">

      <PageHeader
        title="Air Quality Map"
        description="Visualize air quality across monitoring stations."
      />

      <AQIMap />

    </div>
  );
}