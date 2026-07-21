"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getStations } from "@/services/station.service";
import { getStationDashboard } from "@/services/stationDashboard.service";
import { getLocationDashboard } from "@/services/locationDashboard.service";
import { getStationHistory } from "@/services/attribution.service";

// import type { ForecastRequest } from "@/types/forecast";
//import type { DashboardRequest } from "@/types/dashboardRequest";
import type { DashboardResponse } from "@/types/dashboard";
import type { Station } from "@/types/station";
import type { AttributionResponse } from "@/types/attribution";
import type { StationDashboardResponse } from "@/types/stationDashboard";
import type { LocationDashboardResponse } from "@/types/locationDashboard";

import { simulateAQI } from "@/services/simulation.service";
import { translate } from "@/services/translation.service";

import type {
  LocationResult,
  LocationResponse,
} from "@/types/location";
import {
  searchLocation as searchLocationApi,
} from "@/services/location.service";

import type {
  SimulationRequest,
  SimulationResponse,
} from "@/types/simulation";

interface AQIState {
  stations: Station[];

  selectedStation: string;

  mode:
  | "station"
  | "location";

  selectedLocation:
  | LocationResult
  | null;

  nearestStation:
  | string
  | null;

  locationData: LocationResponse | null;


  stationDashboard: StationDashboardResponse | null;

  dashboard: StationDashboardResponse | null;

  locationDashboard: LocationDashboardResponse | null;

stationDashboards: Record<
  string,
  StationDashboardResponse
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

  setMode: (
    mode: "station" | "location"
  ) => void;

  setLocation: (
    location: LocationResult
  ) => void;

  setNearestStation: (
    station: string | null
  ) => void;

  setLocationData: (
    data: LocationResponse | null
  ) => void;

  searchLocation: (
    location: string
  ) => Promise<void>;

  setStation: (
    station: string
  ) => void;

  loadDashboard: () => Promise<void>;

  loadStationDashboard: (
    station: string
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

    mode: "station",

    selectedLocation: null,

    nearestStation: null,

    locationData: null,

    stationDashboard: null,

    dashboard: null,

    locationDashboard: null,

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

        set((state) => ({
          stations,
          selectedStation: state.selectedStation || "",
        }));
      } catch (err) {
        console.error(err);

        set({
          error:
            "Unable to load stations.",
        });
      }
    },

    setMode: (
      mode: "station" | "location"
    ) =>
      set({
        mode,
      }),

    setLocation: (
      location: LocationResult
    ) =>
      set({
        mode: "location",
        selectedLocation: location,
      }),

    setNearestStation: (
      station: string | null
    ) =>
      set({
        nearestStation: station,
      }),

    setLocationData: (data) =>
      set({
        locationData: data,
      }),

    searchLocation: async (
      location
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const result =
          await searchLocationApi(location);

        set({
          loading: false,

          mode: "location",

          locationData: result,

          selectedLocation: {
            name: result.location.name,
            latitude: result.location.lat,
            longitude: result.location.lon,
            country: result.location.country,
            state: result.location.state,
          },
        });
      } catch (err) {
        console.error(err);

        set({
          loading: false,
          error: "Unable to search location.",
        });
      }
    },

    setStation: (station) => {
      set({
        mode: "station",

        selectedStation: station,

        dashboard: null,

        stationDashboard: null,

        simulation: null,

        error: null,
      });
      get().loadDashboard();
    },

    loadDashboard: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const s = get();

        if (s.mode === "station") {
          if (!s.selectedStation) {
            set({ loading: false });
            return;
          }
          const dashboard = await getStationDashboard(s.selectedStation);

          set((state) => ({
            dashboard: dashboard,
            stationDashboard: dashboard,
            stationDashboards: {
              ...state.stationDashboards,
              [state.selectedStation]: dashboard,
            },
            loading: false,
          }));

          return;
        }

    if (!s.selectedLocation) {

      set({
        loading: false,
      });

      return;
    }

    const dashboard =
      await getLocationDashboard(
        s.selectedLocation.name
      );

    set({
      locationDashboard: dashboard,
      loading: false,
    });

  }

  catch (err) {

    console.error(err);

    set({
      loading: false,
      error: "Unable to load dashboard.",
    });

  }

},

    loadStationDashboard: async (station) => {

  set({
    selectedStation: station,
    mode: "station",
  });

  await get().loadDashboard();

},

    loadStationHistory: async (
      station
    ) => {

      if (!station) return;
      try {
        const cached = useAQIStore.getState().stationHistory[station];
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
      const s = get();

let category = "";
let forecast = "";

if (s.mode === "location") {

  const current =
    s.locationDashboard?.locations?.[0];

  category =
    current?.latest_reading?.category ?? "";

  forecast =
    current?.forecast?.predicted_aqi
      ?.toString() ?? "";

} else {

  category =
    s.stationDashboard?.forecast?.category ?? "";

  forecast =
    s.stationDashboard?.forecast?.predicted_aqi
      ?.toString() ?? "";

}

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

        advisoryMessage: category,

advisoryRisk: category,

        advisoryOutdoor:
          "",

        forecastCategory: forecast,
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