import { useState } from "react";
import { searchLocation } from "@/services/location.service";
import type { LocationResponse } from "@/types/location";

export function useLocation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [data, setData] =
        useState<LocationResponse | null>(null);

    const search = async (city: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await searchLocation(city);

            setData(res);

            return res;
        } catch (err) {
            setError("Unable to fetch location.");

            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        search,
    };
}