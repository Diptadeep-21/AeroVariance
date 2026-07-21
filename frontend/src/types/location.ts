export interface LocationResponse {
    location: {
        name: string;
        country: string;
        state?: string;
        lat: number;
        lon: number;
    };

    reading: {
        AQI: number;
        category: string;
        pm25: number;
        pm10: number;
        co: number;
        no2: number;
        so2: number;
        o3: number;
    };

    advisory: {
        risk: string;
        color: string;
        message: string;
        mask: boolean;
        outdoor: string;
    };

    forecast: {
        predicted_aqi: number;
        category?: string;
        model_available?: boolean;
    } | null;

    is_monitored: boolean;

    days_collected: number;

    records_count: number;

    phase: number;

    progress_pct: number;
}

export interface LocationResult {
    name: string;
    latitude: number;
    longitude: number;
    city?: string;
    state?: string;
    country?: string;
}
