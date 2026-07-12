"use client";

import { Layer, Source } from "react-map-gl/maplibre";

import { hotspots } from "@/lib/hotspots";

export default function PollutionHotspots() {
    const data = {
        type: "FeatureCollection",
        features: hotspots.map((spot) => ({
            type: "Feature",
            properties: {
                station: spot.station,
                aqi: spot.aqi,
            },
            geometry: {
                type: "Point",
                coordinates: [
                    spot.longitude,
                    spot.latitude,
                ],
            },
        })),
    };

    return (
        <Source
            id="pollution-hotspots"
            type="geojson"
            data={data}
        >
            <Layer
                id="hotspot-circles"
                type="circle"
                paint={{
                    "circle-radius": 16,
                    "circle-color": "#ef4444",
                    "circle-opacity": 0.35,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#dc2626",
                }}
            />
        </Source>
    );
}