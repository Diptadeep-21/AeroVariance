"use client";

import { useState } from "react";

import {
  Marker,
  Popup,
} from "react-map-gl/maplibre";

import { MapPin } from "lucide-react";

import { useAQIStore } from "@/store/useAQIStore";

import { stationCoordinates } from "@/lib/stationCoordinates";
import { buildMockSnapshot } from "@/lib/mockSnapshot";

import StationPopup from "./StationPopup";

export default function StationMarkers() {
  const stations = useAQIStore(
    (state) => state.stations
  );

  const selectedStation = useAQIStore(
    (state) => state.selectedStation
  );

  const setStation = useAQIStore(
    (state) => state.setStation
  );

  const stationDashboards = useAQIStore(
    (state) => state.stationDashboards
  );

  const loadStationDashboard =
    useAQIStore(
      (state) =>
        state.loadStationDashboard
    );

  const [openStation, setOpenStation] =
    useState<string | null>(null);

  const loadStationHistory =
    useAQIStore(
        state =>
            state.loadStationHistory
    );

  async function handleClick(
    stationName: string
  ) {
    setStation(stationName);

    setOpenStation(stationName);

    if (!stationDashboards[stationName]) {
      await loadStationDashboard(stationName);
      if (!useAQIStore.getState().stationHistory[stationName]) {
        await loadStationHistory(stationName);
      }
    }
  }

  return (
    <>
      {stations.map((item) => {
        const stationName = typeof item === "string" ? item : item.station;
        const point = stationCoordinates[stationName];

        if (!point) return null;

        const dashboard = stationDashboards[stationName];

        return (
          <Marker
            key={stationName}
            latitude={point.latitude}
            longitude={point.longitude}
            anchor="bottom"
          >
            <>
              <button
                onClick={() =>
                  handleClick(stationName)
                }
                className="transition hover:scale-110"
              >
                <MapPin
                  className={`h-8 w-8 ${
                    selectedStation === stationName
                      ? "text-red-600"
                      : "text-sky-600"
                  }`}
                  fill="currentColor"
                />
              </button>

              {openStation === stationName &&
                dashboard && (
                  <Popup
                    closeButton
                    closeOnClick={false}
                    latitude={
                      point.latitude
                    }
                    longitude={
                      point.longitude
                    }
                    offset={20}
                    anchor="bottom"
                    onClose={() =>
                      setOpenStation(null)
                    }
                  >
                    <StationPopup
                      dashboard={dashboard}
                    />
                  </Popup>
                )}
            </>
          </Marker>
        );
      })}
    </>
  );
}