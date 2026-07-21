"use client";

import { Check, ChevronsUpDown, MapPin, LayoutGrid } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useAQIStore } from "@/store/useAQIStore";
import { cn } from "@/lib/utils";

export default function StationSelector() {
  const [open, setOpen] = useState(false);
  const stations = useAQIStore((state) => state.stations);
  const loadStations = useAQIStore((state) => state.loadStations);
  const selectedStation = useAQIStore((state) => state.selectedStation);
  const setStation = useAQIStore((state) => state.setStation);

  useEffect(() => {
    if (stations.length === 0) {
      loadStations();
    }
  }, [stations.length, loadStations]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            className="w-[320px] justify-between rounded-full border-[#E5E7EB] bg-white px-4 text-[#111827] hover:bg-[#FAFBFC]"
          >
            <div className="flex items-center gap-2 truncate">
              {selectedStation ? (
                <MapPin className="h-4 w-4 shrink-0 text-[#2563EB]" />
              ) : (
                <LayoutGrid className="h-4 w-4 shrink-0 text-[#2563EB]" />
              )}

              <span className="truncate text-sm font-medium">
                {selectedStation
                  ? selectedStation
                      .replace(", Kolkata - WBPCB", "")
                      .replace("Victoria", "Victoria Memorial")
                  : "Overview Page (All Stations)"}
              </span>
            </div>

            <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
          </Button>
        }
      />

      <PopoverContent className="w-[320px] p-0 rounded-2xl border-[#E5E7EB] bg-white shadow-md">
        <Command>
          <CommandInput placeholder="Search station or overview..." className="border-b border-[#E5E7EB]" />
          <CommandList>
            <CommandEmpty>No station found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="overview"
                onSelect={() => {
                  setStation("");
                  setOpen(false);
                }}
                className="font-medium text-[#2563EB]"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-[#2563EB]",
                    !selectedStation ? "opacity-100" : "opacity-0"
                  )}
                />
                <LayoutGrid className="mr-2 h-4 w-4 text-[#2563EB]" />
                Overview Page (All Stations)
              </CommandItem>

              {stations
                .filter((s) => s.active)
                .map((s) => (
                  <CommandItem
                    key={s.station}
                    value={s.station}
                    onSelect={() => {
                      setStation(s.station);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-[#2563EB]",
                        selectedStation === s.station ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {s.station
                      .replace(", Kolkata - WBPCB", "")
                      .replace("Victoria", "Victoria Memorial")}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}