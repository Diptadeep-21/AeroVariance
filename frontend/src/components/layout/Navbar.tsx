"use client";

import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import StationSelector from "./StationSelector";
import DashboardModeSwitch from "./DashboardModeSwitch";
import LocationSearch from "@/components/location/LocationSearch";
import { useAQIStore } from "@/store/useAQIStore";

export default function Navbar() {
  const stationDashboard = useAQIStore((state) => state.stationDashboard);
  const latest = stationDashboard?.latest_reading;
  const mode = useAQIStore((state) => state.mode);
  const searchLocation = useAQIStore((state) => state.searchLocation);
  const loading = useAQIStore((state) => state.loading);

  const getStatusStyle = (category?: string) => {
    if (!category) return { bg: "bg-[#FAFBFC]", text: "text-[#6B7280]", dot: "bg-[#6B7280]" };
    const c = category.toLowerCase();
    if (c.includes("good")) return { bg: "bg-[#DCFCE7]", text: "text-[#15803D]", dot: "bg-[#15803D]" };
    if (c.includes("satisfactory")) return { bg: "bg-[#DCFCE7]", text: "text-[#16A34A]", dot: "bg-[#16A34A]" };
    if (c.includes("moderate")) return { bg: "bg-[#FEF3C7]", text: "text-[#B45309]", dot: "bg-[#B45309]" };
    if (c.includes("poor") && !c.includes("very")) return { bg: "bg-[#FFE4D5]", text: "text-[#C2410C]", dot: "bg-[#C2410C]" };
    if (c.includes("very poor")) return { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]", dot: "bg-[#DC2626]" };
    if (c.includes("severe")) return { bg: "bg-[#F3D9DF]", text: "text-[#9F1239]", dot: "bg-[#9F1239]" };
    return { bg: "bg-[#FAFBFC]", text: "text-[#6B7280]", dot: "bg-[#6B7280]" };
  };

  const statusStyle = getStatusStyle(latest?.category);

  return (
    <header className="sticky top-0 z-40 h-[80px] border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md">
      <div className="flex h-full items-center justify-between gap-6 px-8 lg:px-10">

        {/* Left — mode switch + location, grouped */}
        <div className="flex items-center gap-3">
          <DashboardModeSwitch />
          <div className="h-6 w-px bg-[#E5E7EB]" />
          {mode === "station" ? (
            <StationSelector />
          ) : (
            <LocationSearch loading={loading} onSearch={searchLocation} />
          )}
        </div>

        {/* Right — status + actions, grouped */}
        <div className="flex flex-shrink-0 items-center gap-3">
          {mode === "station" && (
            <div
              className={`flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] font-medium ${statusStyle.bg} ${statusStyle.text}`}
            >
              <span className={`h-2 w-2 flex-shrink-0 rounded-full ${statusStyle.dot}`} />
              {latest?.category ?? "Normal"} AQI
            </div>
          )}

          <div className="h-6 w-px bg-[#E5E7EB]" />

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-[#6B7280] hover:bg-[#FAFBFC] hover:text-[#111827]"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            className="h-10 gap-3 rounded-full border-[#E5E7EB] bg-white pl-2.5 pr-3 text-[#111827] hover:bg-[#FAFBFC]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB] text-[12px] font-semibold text-white">
              C
            </div>
            <span className="hidden text-[14px] font-medium lg:inline">
              Citizen
            </span>
            <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
          </Button>
        </div>

      </div>
    </header>
  );
}