"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type {
  AttributionResponse,
} from "@/types/attribution";

interface Props {
  data: AttributionResponse | null;
}

export default function PredictionInsights({
  data,
}: Props) {

  if (!data) {
    return (
      <Card>

        <CardHeader>

          <CardTitle>
            Latest AI Prediction
          </CardTitle>

        </CardHeader>

        <CardContent>

          No prediction available.

        </CardContent>

      </Card>
    );
  }

  return (
    <Card>

      <CardHeader>

        <CardTitle>

          Latest AI Prediction

        </CardTitle>

        <CardDescription>

          Explainable AI summary

        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Predicted AQI
            </p>

            <h2 className="text-4xl font-bold">

              {data.predicted_aqi}

            </h2>

          </div>

          <Badge variant="secondary">

            {data.prediction_correct ? (

              <>

                <CheckCircle2 className="mr-1 h-4 w-4" />

                Accurate

              </>

            ) : (

              <>

                <AlertTriangle className="mr-1 h-4 w-4" />

                Error

              </>

            )}

          </Badge>

        </div>

        <div>

          <h3 className="mb-3 flex items-center gap-2 font-semibold">

            <Sparkles className="h-4 w-4" />

            Top Feature Contributions

          </h3>

          <div className="space-y-2">

            {data.top_features.map((feature) => (

              <div
                key={feature.feature}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
              >

                <span>

                  {feature.feature}

                </span>

                <Badge>

                  {feature.impact}

                </Badge>

              </div>

            ))}

          </div>

        </div>

      </CardContent>

    </Card>
  );
}