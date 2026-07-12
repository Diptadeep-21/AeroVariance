"use client";

import Map, {
    NavigationControl,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import StationMarkers from "./StationMarkers";
import MapLegend from "./MapLegend";
import WardHeatmap from "./WardHeatmap";
import PollutionHotspots from "./PollutionHotspots";

import {
    DEFAULT_VIEW,
    MAP_STYLE,
} from "@/lib/mapbox";

export default function AQIMap() {
    return (
        <div className="h-175 w-full overflow-hidden rounded-3xl border">

            <Map
                initialViewState={DEFAULT_VIEW}
                mapStyle={MAP_STYLE}
            >
                <Map
                    initialViewState={DEFAULT_VIEW}
                    mapStyle={MAP_STYLE}
                >

                    <NavigationControl position="top-right" />

                    <WardHeatmap />

                    <PollutionHotspots />

                    <StationMarkers />

                </Map>

                <NavigationControl position="top-right" />

            </Map>
            <MapLegend />

        </div>
    );
}