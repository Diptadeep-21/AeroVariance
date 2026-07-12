"use client";

import { Bell, ChevronDown, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StationSelector from "./StationSelector";
import { useAQIStore } from "@/store/useAQIStore";

export default function Navbar() {
  const dashboard = useAQIStore(
    (state) => state.dashboard
  );
  return (
    <header className="sticky top-0 z-40 h-18 border-b border-border bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">

      <div className="flex h-full items-center justify-between px-8">

        {/* Left */}

        <div>

          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Air Quality Intelligence
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Selected Station */}

          <StationSelector />

          {/* AQI */}

          <Badge
            variant="secondary"
            className="rounded-full border-green-200 bg-green-50 px-4 py-1 text-green-700"
          >
            ● {dashboard?.forecast.category ?? "--"} AQI
          </Badge>

          {/* Notification */}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile */}

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