"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getStations } from "@/services/station.service";
import { getDashboard } from "@/services/dashboard.service";
import { getStationHistory } from "@/services/attribution.service";

import type { ForecastRequest } from "@/types/forecast";
import type { DashboardResponse } from "@/types/dashboard";
import type { Station } from "@/types/station";
import type { AttributionResponse } from "@/types/attribution";

import { simulateAQI } from "@/services/simulation.service";
import { translate } from "@/services/translation.service";

import type {
  SimulationRequest,
  SimulationResponse,
} from "@/types/simulation";

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

  simulation: SimulationResponse | null;

  language: string;

  translations: Record<string, string>;

  translationCache: Record<
    string,
    Record<string, string>
  >;

  setLanguage: (
    language: string
  ) => Promise<void>;

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

  runSimulation: (
    payload: SimulationRequest
  ) => Promise<void>;
}

export const useAQIStore = create<AQIState>(
  (set, get) => ({
    stations: [],

    selectedStation: "",

    dashboard: null,

    stationDashboards: {},

    stationHistory: {},

    simulation: null,

    language: "en",

    translations: {},

    translationCache: {},

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
      set((state) => ({
        selectedStation: station,

        dashboard:
          state.stationDashboards[station] ??
          null,

        simulation: null,

        error: null,
      })),

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

        set((state) => ({
          dashboard,

          stationDashboards: {
            ...state.stationDashboards,

            [dashboard.station]:
              dashboard,
          },

          loading: false,
        }));

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

        const cached =
          useAQIStore
            .getState()
            .stationHistory[station];

        if (cached) return;

        const history =
          await getStationHistory(
            station
          );

        set((state) => ({

          stationHistory: {

            ...state.stationHistory,

            [station]:
              history,

          },

        }));

      }

      catch (err) {

        console.error(err);

      }

    },

    runSimulation: async (
      payload
    ) => {

      try {

        set({
          loading: true,
          error: null,
        });

        const simulation =
          await simulateAQI(
            payload
          );

        set({
          simulation,
          loading: false,
        });

      }

      catch (err) {

        console.error(err);

        set({

          loading: false,

          simulation: null,

          error:
            "Simulation failed.",

        });

      }

    },

    setLanguage: async (language) => {

  if (language === "en") {
    set({
      language,
      translations: {},
    });
    return;
  }

  const cache =
    get().translationCache[language];

  if (cache) {
    set({
      language,
      translations: cache,
    });
    return;
  }

  // ✅ Get the latest dashboard from Zustand
  const dashboard = get().dashboard;

  const strings = {
    pageTitle: "Citizen Advisories",

    pageDescription:
      "Health recommendations generated from the latest air-quality prediction.",

    advisoryTitle: "Citizen Advisory",

    recommendation: "Recommendation",

    predictedAQI: "Predicted AQI",

    riskLevel: "Risk Level",

    outdoorActivity: "Outdoor Activity",

    maskRequired: "Mask Required",

    healthAssessment:
      "Health Risk Assessment",

    healthAssessmentDescription:
      "Estimated impact across different population groups.",

    children: "Children",

    elderly: "Elderly",

    respiratoryPatients:
      "Respiratory Patients",

    outdoorWorkers:
      "Outdoor Workers",

    low: "Low",

    moderate: "Moderate",

    high: "High",

    veryHigh: "Very High",

    disclaimer:
      "This assessment is generated using the latest AI forecast and is intended to support precautionary decisions. Follow guidance from local authorities during severe pollution events.",

    yes: "Yes",

    no: "No",

    advisoryMessage:
      dashboard?.advisory.message ?? "",

    advisoryRisk:
      dashboard?.advisory.risk ?? "",

    advisoryOutdoor:
      dashboard?.advisory.outdoor ?? "",

    forecastCategory:
      dashboard?.forecast.category ?? "",
  };

  const translated =
    await translate({
      language,
      strings,
    });

  set((state) => ({
    language,
    translations: translated,
    translationCache: {
      ...state.translationCache,
      [language]: translated,
    },
  }));
},
  })
);