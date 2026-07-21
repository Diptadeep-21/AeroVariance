"use client";

import { useAQIStore } from "@/store/useAQIStore";

import MonitoringDashboard from "./MonitoringDashboard";
import LocationDashboard from "./LocationDashboard";

export default function DashboardView() {

    const mode =
        useAQIStore(s => s.mode);

    return mode === "station"
        ? <MonitoringDashboard />
        : <LocationDashboard />;
}