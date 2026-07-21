"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface PredictionHistoryItem {
  timestamp: string;
  predicted_aqi: number;
  actual_aqi: number;
  absolute_error: number;
}


interface PredictionHistoryProps {
  history?: PredictionHistoryItem[];
}

export default function PredictionHistory({
  history = [],
}: PredictionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Prediction History
        </CardTitle>

        <CardDescription>
          Historical prediction performance
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left">
              <th className="py-2">Time</th>

              <th>Actual</th>

              <th>Predicted</th>

              <th>Error</th>

              <th>Status</th>
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
              history.map((item) => (
                <tr
                  key={item.timestamp}
                  className="border-b"
                >
                  <td className="py-2">
                    {new Date(
                      item.timestamp
                    ).toLocaleString()}
                  </td>

                  <td>{item.actual_aqi}</td>

                  <td>{item.predicted_aqi}</td>

                  <td>{item.absolute_error}</td>

                  <td>
                    {item.absolute_error <= 10
                      ? "✅"
                      : "⚠️"}
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