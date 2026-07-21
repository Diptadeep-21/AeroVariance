"use client";

import { useState, useEffect } from "react";
import Map, { NavigationControl, Marker, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import StationMarkers from "./StationMarkers";
import MapLegend from "./MapLegend";
import WardHeatmap from "./WardHeatmap";
import PollutionHotspots from "./PollutionHotspots";
import { useAQIStore } from "@/store/useAQIStore";
import { DEFAULT_VIEW, MAP_STYLE } from "@/lib/mapbox";
import { Compass } from "lucide-react";

export default function AQIMap() {
  const { mode, selectedLocation, locationData } = useAQIStore();
  const [viewState, setViewState] = useState({
    longitude: DEFAULT_VIEW.longitude,
    latitude: DEFAULT_VIEW.latitude,
    zoom: DEFAULT_VIEW.zoom,
  });

  useEffect(() => {
    if (mode === "location" && selectedLocation) {
      setViewState({
        longitude: selectedLocation.longitude,
        latitude: selectedLocation.latitude,
        zoom: 11.5,
      });
    } else {
      setViewState({
        longitude: DEFAULT_VIEW.longitude,
        latitude: DEFAULT_VIEW.latitude,
        zoom: DEFAULT_VIEW.zoom,
      });
    }
  }, [selectedLocation, mode]);

  // Create a GeoJSON circle for the risk zone around searched coordinates
  const circleGeoJSON = selectedLocation
    ? {
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [selectedLocation.longitude, selectedLocation.latitude],
        },
        properties: {},
      }
    : null;

  return (
    <div className="relative h-175 w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-1 shadow-none">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={MAP_STYLE}
      >
        <NavigationControl position="top-right" />

        <WardHeatmap />

        <PollutionHotspots />

        {/* Normal monitoring stations */}
        <StationMarkers />

        {/* If custom searched location is active, render special marker & risk boundary */}
        {mode === "location" && selectedLocation && (
          <>
            {/* Concentric risk radius layer around the search point */}
            <Source
              id="searched-risk-zone"
              type="geojson"
              data={{
                type: "FeatureCollection" as const,
                features: circleGeoJSON ? [circleGeoJSON] : [],
              }}
            >
              <Layer
                id="risk-radius-layer"
                type="circle"
                paint={{
                  "circle-radius": 70,
                  "circle-color": locationData?.reading?.AQI && locationData.reading.AQI > 150 ? "#EF4444" : "#2563EB",
                  "circle-opacity": 0.15,
                  "circle-stroke-width": 2,
                  "circle-stroke-color": locationData?.reading?.AQI && locationData.reading.AQI > 150 ? "#DC2626" : "#2563EB",
                  "circle-stroke-opacity": 0.4,
                }}
              />
            </Source>

            {/* Custom pulsating target marker */}
            <Marker
              latitude={selectedLocation.latitude}
              longitude={selectedLocation.longitude}
              anchor="center"
            >
              <div className="relative flex h-10 w-10 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB] shadow-xs">
                  <Compass className="h-4 w-4 text-white animate-pulse" />
                </div>
              </div>
            </Marker>
          </>
        )}
      </Map>

      <MapLegend />

      {/* Floating Mode Info overlay */}
      <div className="absolute left-6 top-6 rounded-2xl border border-[#E5E7EB] bg-white/95 p-5 shadow-xs backdrop-blur-md max-w-sm">
        <h4 className="font-serif text-[16px] font-semibold text-[#111827]">
          {mode === "station" ? "Monitoring Mode (Station AI)" : "Location Search Mode (Global AI)"}
        </h4>
        <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
          {mode === "station"
            ? "Visualizing registered continuous ambient air stations. Click pins to view SHAP metrics."
            : selectedLocation
            ? `Focused on ${selectedLocation.name}. Radar ring shows estimated localized emission impact zone.`
            : "Search any custom location to target the map viewport and estimate boundary risk zones."}
        </p>
      </div>
    </div>
  );
}