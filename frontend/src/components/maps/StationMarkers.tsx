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
    station: string
  ) {
    setStation(station);

    setOpenStation(station);

    if (!stationDashboards[station]) {
      const payload =
        buildMockSnapshot(station);

      await loadStationDashboard(
        station,
        payload
      );
      if (
    !useAQIStore
        .getState()
        .stationHistory[station]
) {
    await loadStationHistory(
        station
    );
}
    }
  }

  return (
    <>
      {stations.map((station) => {
        const point =
          stationCoordinates[station];

        if (!point) return null;

        const dashboard =
          stationDashboards[station];

        return (
          <Marker
            key={station}
            latitude={point.latitude}
            longitude={point.longitude}
            anchor="bottom"
          >
            <>
              <button
                onClick={() =>
                  handleClick(station)
                }
                className="transition hover:scale-110"
              >
                <MapPin
                  className={`h-8 w-8 ${
                    selectedStation === station
                      ? "text-red-600"
                      : "text-sky-600"
                  }`}
                  fill="currentColor"
                />
              </button>

              {openStation === station &&
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