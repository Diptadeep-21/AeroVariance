"use client";

import { useState } from "react";

import { getForecast } from "@/services/forecast.service";
import { simulateAQI } from "@/services/simulation.service";
import {
  getAttribution,
  getGlobalImportance,
} from "@/services/attribution.service";
import { getAdvisory } from "@/services/advisory.service";

export default function TestPage() {
  const [forecast, setForecast] = useState<any>(null);
  const [simulation, setSimulation] = useState<any>(null);
  const [attribution, setAttribution] = useState<any>(null);
  const [importance, setImportance] = useState<any>(null);
  const [advisory, setAdvisory] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function testForecast() {
    try {
      setLoading(true);

      const data = await getForecast({
        station: "Ballygunge, Kolkata - WBPCB",

        AQI_lag1: 180,
        AQI_lag3: 170,
        AQI_lag24: 160,

        pm25_lag1: 95,
        pm10_lag1: 145,

        hour: 12,
        dayofweek: 3,
        month: 5,
      });

      setForecast(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function testSimulation() {
    try {
      setLoading(true);

      const data = await simulateAQI({
        station: "Ballygunge, Kolkata - WBPCB",

        AQI_lag1: 180,
        AQI_lag3: 170,
        AQI_lag24: 160,

        pm25_lag1: 95,
        pm10_lag1: 145,

        no2_lag1: 45,
        co_lag1: 1700,
        so2_lag1: 20,

        traffic_change: -20,
        construction_change: -15,
        industry_change: -10,
      });

      setSimulation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function testAttribution() {
    try {
      setLoading(true);

      const prediction = await getAttribution(0);

      const global = await getGlobalImportance();

      setAttribution(prediction);

      setImportance(global);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function testAdvisory() {
    try {
      setLoading(true);

      const data = await getAdvisory("Moderate");

      setAdvisory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-10 space-y-10">
      <h1 className="text-4xl font-bold">
        FastAPI Integration Test
      </h1>

      {loading && (
        <p className="text-blue-500">Loading...</p>
      )}

      <div className="flex flex-wrap gap-4">
        <button
          onClick={testForecast}
          className="rounded bg-blue-600 px-5 py-3 text-white"
        >
          Test Forecast
        </button>

        <button
          onClick={testSimulation}
          className="rounded bg-green-600 px-5 py-3 text-white"
        >
          Test Simulation
        </button>

        <button
          onClick={testAttribution}
          className="rounded bg-purple-600 px-5 py-3 text-white"
        >
          Test Attribution
        </button>

        <button
          onClick={testAdvisory}
          className="rounded bg-orange-600 px-5 py-3 text-white"
        >
          Test Advisory
        </button>
      </div>

      <section className="space-y-8">

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Forecast
          </h2>

          <pre className="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto">
            {forecast
              ? JSON.stringify(forecast, null, 2)
              : "No data"}
          </pre>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Simulation
          </h2>

          <pre className="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto">
            {simulation
              ? JSON.stringify(simulation, null, 2)
              : "No data"}
          </pre>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Attribution
          </h2>

          <pre className="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto">
            {attribution
              ? JSON.stringify(attribution, null, 2)
              : "No data"}
          </pre>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Global Feature Importance
          </h2>

          <pre className="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto">
            {importance
              ? JSON.stringify(importance, null, 2)
              : "No data"}
          </pre>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Advisory
          </h2>

          <pre className="rounded bg-gray-900 p-4 text-sm text-green-400 overflow-auto">
            {advisory
              ? JSON.stringify(advisory, null, 2)
              : "No data"}
          </pre>
        </div>

      </section>
    </main>
  );
}