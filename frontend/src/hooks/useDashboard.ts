"use client";

import { useEffect, useState } from "react";

import { getForecast } from "@/services/forecast.service";
import { getAdvisory } from "@/services/advisory.service";

import type { AdvisoryResponse } from "@/types/advisory";


import type {
    ForecastRequest,
    ForecastResponse,
} from "@/types/forecast";

interface DashboardState {
    forecast: ForecastResponse | null;
    advisory: AdvisoryResponse | null;

    loading: boolean;

    error: string | null;
}

export function useDashboard() {
    const [state, setState] = useState<DashboardState>({
        forecast: null,
        advisory: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setState((prev) => ({
                ...prev,
                loading: true,
                error: null,
            }));

            /**
             * Temporary payload.
             *
             * Later this will come from
             * Zustand + station selection.
             */

            const payload: ForecastRequest = {
                station: "Ballygunge, Kolkata - WBPCB",

                AQI_lag1: 175,
                AQI_lag3: 172,
                AQI_lag24: 168,

                pm25_lag1: 82,
                pm10_lag1: 116,

                hour: new Date().getHours(),
                dayofweek: new Date().getDay(),
                month: new Date().getMonth() + 1,
            };

            const [forecast, advisory] = await Promise.all([
                getForecast(payload),
                getAdvisory("Moderate"),
            ]);

            setState({
                forecast,
                advisory,
                loading: false,
                error: null,
            });
        } catch (err) {
            setState({
                forecast: null,
                advisory: null,
                loading: false,
                error: "Unable to load dashboard.",
            });

            console.error(err);
        }
    }

    return {
        ...state,

        refresh: loadDashboard,
    };
}