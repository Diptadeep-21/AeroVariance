import { api } from "@/lib/api";
import type { LocationResponse } from "@/types/location";

export async function searchLocation(
    location: string
): Promise<LocationResponse> {

    const { data } =
        await api.get<LocationResponse>(
            "/location",
            {
                params: { location },
            }
        );

    return data;
}