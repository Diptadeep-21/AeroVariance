"use client";

import {
    Check,
    ChevronsUpDown,
    MapPin,
} from "lucide-react";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { useAQIStore } from "@/store/useAQIStore";

import { cn } from "@/lib/utils";

export default function StationSelector() {
    const [open, setOpen] = useState(false);

    const stations = useAQIStore(
        (state) => state.stations
    );

    const loadStations = useAQIStore(
        (state) => state.loadStations
    );

    const selectedStation = useAQIStore(
        (state) => state.selectedStation
    );

    const setStation = useAQIStore(
        (state) => state.setStation
    );

    useEffect(() => {
        if (stations.length === 0) {
            loadStations();
        }
    }, [stations.length, loadStations]);

    return (
        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger>

                <Button
                    variant="outline"
                    role="combobox"
                    className="w-[320px] justify-between"
                >

                    <div className="flex items-center gap-2">

                        <MapPin className="h-4 w-4" />

                        <span className="truncate">

                            {
                                selectedStation
                                    ? selectedStation.split(",")[0]
                                    : "Select Station"
                            }

                        </span>

                    </div>

                    <ChevronsUpDown className="h-4 w-4 opacity-50" />

                </Button>

            </PopoverTrigger>

            <PopoverContent className="w-[320px] p-0">

                <Command>

                    <CommandInput placeholder="Search station..." />

                    <CommandList>

                        <CommandEmpty>

                            No station found.

                        </CommandEmpty>

                        <CommandGroup>

                            {stations.map((station) => (
                                <CommandItem
                                    key={station}
                                    value={station}
                                    onSelect={() => {
                                        setStation(station);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedStation === station
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />

                                    {station}
                                </CommandItem>
                            ))}

                        </CommandGroup>

                    </CommandList>

                </Command>

            </PopoverContent>

        </Popover>
    );
}