"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { useAQIStore } from "@/store/useAQIStore";

export default function PredictionHistory() {
  const selectedStation = useAQIStore(
  (state) => state.selectedStation
);

const stationHistory = useAQIStore(
  (state) => state.stationHistory
);

const history =
  stationHistory[selectedStation] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Prediction History
        </CardTitle>

        <CardDescription>
          Recent prediction performance for the selected station
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left">
              <th className="py-2">
                Time
              </th>

              <th>
                Actual
              </th>

              <th>
                Predicted
              </th>

              <th>
                Error
              </th>

              <th>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-muted-foreground"
                >
                  No prediction history available.
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="py-2">
                    {item.timestamp}
                  </td>

                  <td>
                    {item.actual_aqi}
                  </td>

                  <td>
                    {item.predicted_aqi}
                  </td>

                  <td>
                    {item.prediction_error}
                  </td>

                  <td>
                    {item.prediction_correct
                      ? "✅"
                      : "❌"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}