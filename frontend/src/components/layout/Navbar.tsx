"use client";

import {
  Bell,
  ChevronDown,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import StationSelector from "./StationSelector";
import DashboardModeSwitch from "./DashboardModeSwitch";
import LocationSearch from "@/components/location/LocationSearch";

import { useAQIStore } from "@/store/useAQIStore";

export default function Navbar() {
  const stationDashboard = useAQIStore(
  (state) => state.stationDashboard
);

const latest = stationDashboard?.latest_reading;

const forecast = stationDashboard?.forecast;

  const mode = useAQIStore(
    (state) => state.mode
  );

  const searchLocation =
    useAQIStore(
      (state) => state.searchLocation
    );

  const loading =
    useAQIStore(
      (state) => state.loading
    );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">

      <div className="flex h-20 items-center justify-between px-8 lg:px-10">

        {/* Left */}

        <div>

          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Air Quality Intelligence
          </p>

        </div>

        {/* Center */}

        <div className="flex items-center gap-4">

          <DashboardModeSwitch />

          {mode === "station" ? (
            <StationSelector />
          ) : (
            <LocationSearch
              loading={loading}
              onSearch={searchLocation}
            />
          )}

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {mode === "station" && (
            <Badge
              variant="secondary"
              className="rounded-full border-green-200 bg-green-50 px-4 py-1 text-green-700"
            >
              ● {latest?.category ?? "--"} AQI
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            className="h-10 gap-3 rounded-full pl-3 pr-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
              D
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-medium">
                Diptadeep
              </p>
            </div>

            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>

        </div>

      </div>

    </header>
  );
}