"use client";

import { cn } from "@/lib/utils";
import { useAQIStore } from "@/store/useAQIStore";

export default function DashboardModeSwitch() {
  const mode = useAQIStore((s) => s.mode);
  const setMode = useAQIStore((s) => s.setMode);

  return (
    <div className="inline-flex rounded-full border border-[#E5E7EB] bg-[#FAFBFC] p-1">
      <button
        onClick={() => setMode("station")}
        className={cn(
          "rounded-full px-4 py-1.5 text-[13px] font-medium transition-all",
          mode === "station"
            ? "bg-[#C6F135] text-[#0F172A] font-semibold"
            : "text-[#6B7280] hover:text-[#111827]"
        )}
      >
        Monitoring Station
      </button>

      <button
        onClick={() => setMode("location")}
        className={cn(
          "rounded-full px-4 py-1.5 text-[13px] font-medium transition-all",
          mode === "location"
            ? "bg-[#C6F135] text-[#0F172A] font-semibold"
            : "text-[#6B7280] hover:text-[#111827]"
        )}
      >
        Search Location
      </button>
    </div>
  );
}