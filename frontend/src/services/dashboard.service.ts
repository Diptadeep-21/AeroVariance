import { api } from "@/lib/api";

import type { DashboardResponse } from "@/types/dashboard";

export async function getLocationDashboard() {

    const { data } = await api.get(
        "/dashboard",
        {
            params:{
                mode:"location"
            }
        }
    )

    return data;
}