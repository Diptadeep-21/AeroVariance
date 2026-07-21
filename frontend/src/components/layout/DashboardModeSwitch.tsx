"use client";

import { cn } from "@/lib/utils";
import { useAQIStore } from "@/store/useAQIStore";

export default function DashboardModeSwitch() {
  const mode = useAQIStore((s) => s.mode);
  const setMode = useAQIStore((s) => s.setMode);

  return (
    <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
      <button
        onClick={() => setMode("station")}
        className={cn(
          "rounded-lg px-4 py-2 text-sm font-medium transition-all",
          mode === "station"
            ? "bg-lime-300 text-black shadow-sm"
            : "text-zinc-500 hover:text-black dark:hover:text-white"
        )}
      >
        Monitoring Station
      </button>

      <button
        onClick={() => setMode("location")}
        className={cn(
          "rounded-lg px-4 py-2 text-sm font-medium transition-all",
          mode === "location"
            ? "bg-lime-300 text-black shadow-sm"
            : "text-zinc-500 hover:text-black dark:hover:text-white"
        )}
      >
        Search Location
      </button>
    </div>
  );
}