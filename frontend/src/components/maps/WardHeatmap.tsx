"use client";

import { Source, Layer } from "react-map-gl/maplibre";

const fillLayer = {
  id: "ward-fill",
  type: "fill" as const,
  paint: {
    "fill-color": "#4f46e5",
    "fill-opacity": 0.08,
  },
};

const outlineLayer = {
  id: "ward-outline",
  type: "line" as const,
  paint: {
    "line-color": "#6366f1",
    "line-width": 1.2,
  },
};

export default function WardHeatmap() {
  return (
    <Source
      id="wards"
      type="geojson"
      data="/geojson/kolkata-wards-fixed.geojson"
    >
      <Layer {...fillLayer} />
      <Layer {...outlineLayer} />
    </Source>
  );
}