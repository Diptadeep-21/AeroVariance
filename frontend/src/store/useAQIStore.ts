"use client";

import { create } from "zustand";

import { getStations } from "@/services/station.service";
import { getDashboard } from "@/services/dashboard.service";
import { getStationHistory } from "@/services/attribution.service";

import type { ForecastRequest } from "@/types/forecast";
import type { DashboardResponse } from "@/types/dashboard";
import type { Station } from "@/types/station";
import type { AttributionResponse } from "@/types/attribution";

interface AQIState {
  stations: Station[];

  selectedStation: string;

  dashboard: DashboardResponse | null;

  stationDashboards: Record<
    string,
    DashboardResponse
  >;

  stationHistory: Record<
    string,
    AttributionResponse[]
  >;

  loading: boolean;

  error: string | null;

  loadStations: () => Promise<void>;

  setStation: (
    station: string
  ) => void;

  loadDashboard: (
    payload: ForecastRequest
  ) => Promise<void>;

  loadStationDashboard: (
    station: string,
    payload: ForecastRequest
  ) => Promise<void>;

  loadStationHistory: (
    station: string
  ) => Promise<void>;
}

export const useAQIStore = create<AQIState>(
  (set) => ({
    stations: [],

    selectedStation: "",

    dashboard: null,

    stationDashboards: {},

    stationHistory: {},

    loading: false,

    error: null,

    loadStations: async () => {
      try {
        const stations =
          await getStations();

        set({
          stations,
        });
      } catch (err) {
        console.error(err);

        set({
          error:
            "Unable to load stations.",
        });
      }
    },

    setStation: (station) =>
      set({
        selectedStation: station,
      }),

    loadDashboard: async (
      payload
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const dashboard =
          await getDashboard(payload);

        set({
          dashboard,
          loading: false,
        });
      } catch (err) {
        console.error(err);

        set({
          loading: false,
          error:
            "Unable to load dashboard.",
        });
      }
    },

    loadStationDashboard: async (
      station,
      payload
    ) => {
      try {
        const dashboard =
          await getDashboard(payload);

        set((state) => ({
          stationDashboards: {
            ...state.stationDashboards,
            [station]: dashboard,
          },
        }));
      } catch (err) {
        console.error(err);
      }
    },

    loadStationHistory: async (
      station
    ) => {
      try {
        const history =
          await getStationHistory(
            station
          );

        set((state) => ({
          stationHistory: {
            ...state.stationHistory,
            [station]: history,
          },
        }));
      } catch (err) {
        console.error(err);
      }
    },
  })
);