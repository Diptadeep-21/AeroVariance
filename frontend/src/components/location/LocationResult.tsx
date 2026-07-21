"use client";

import type {
    LocationResponse,
} from "@/types/location";

interface Props {
    data: LocationResponse;
}

export default function LocationResult({
    data,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">
                    {data.location.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                    {data.location.state
                        ? `${data.location.state}, `
                        : ""}
                    {data.location.country}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Metric
                    label="AQI"
                    value={data.reading.AQI}
                />

                <Metric
                    label="Category"
                    value={data.reading.category}
                />

                <Metric
                    label="PM2.5"
                    value={data.reading.pm25}
                />

                <Metric
                    label="PM10"
                    value={data.reading.pm10}
                />

                <Metric
                    label="CO"
                    value={data.reading.co}
                />

                <Metric
                    label="NO₂"
                    value={data.reading.no2}
                />

                <Metric
                    label="SO₂"
                    value={data.reading.so2}
                />

                <Metric
                    label="O₃"
                    value={data.reading.o3}
                />
            </div>

            <div className="mt-6 rounded-xl border bg-muted/40 p-4">
                <div className="mb-2 font-medium">
                    Health Advisory
                </div>

                <p className="text-sm">
                    {data.advisory.message}
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <span>
                        <strong>Risk:</strong>{" "}
                        {data.advisory.risk}
                    </span>

                    <span>
                        <strong>Mask:</strong>{" "}
                        {data.advisory.mask
                            ? "Recommended"
                            : "Not Required"}
                    </span>

                    <span>
                        <strong>Outdoor:</strong>{" "}
                        {data.advisory.outdoor}
                    </span>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">

                <h3 className="mb-3 text-lg font-semibold">
                    Monitoring Status
                </h3>

                <p className="text-sm text-muted-foreground">
                    {data.is_monitored
                        ? "This location is covered by a WBPCB monitoring station."
                        : "This location is outside the monitored WBPCB network. Air quality is estimated from nearby observations."}
                </p>
                

            </div>

            <div className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">

    <h3 className="mb-3 text-lg font-semibold">
        AI Forecast
    </h3>

    {data.forecast ? (

        <div className="space-y-2">

            <p className="text-sm text-muted-foreground">
                AI forecast is available for this location.
            </p>

        </div>

    ) : (

        <div className="space-y-2">

            <p className="text-sm text-muted-foreground">
                AI forecasting is currently available only for monitored WBPCB stations.
            </p>

            <p className="text-xs text-muted-foreground">
                This location displays live air quality from OpenWeather but has no historical data to generate an AI forecast.
            </p>

        </div>

    )}

</div>


        </div>
    );
}

function Metric({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl border p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {label}
            </p>

            <p className="mt-2 text-xl font-semibold">
                {value}
            </p>
        </div>
    );
}