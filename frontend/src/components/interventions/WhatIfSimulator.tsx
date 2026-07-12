"use client";

import { useState } from "react";

import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";

export default function WhatIfSimulator() {
  const [intervention, setIntervention] =
    useState("traffic");

  const [reduction, setReduction] =
    useState([20]);

  const [duration, setDuration] =
    useState("3");

  return (
    <Card>

      <CardHeader>

        <CardTitle>

          What-If Simulator

        </CardTitle>

        <CardDescription>

          Evaluate pollution-control strategies before deployment.

        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-8">

        <div className="grid gap-6 md:grid-cols-3">

          <div className="space-y-2">

            <p className="text-sm font-medium">
              Intervention
            </p>

            <Select
              value={intervention}
              onValueChange={setIntervention}
            >

              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="traffic">
                  Traffic Restriction
                </SelectItem>

                <SelectItem value="industry">
                  Industrial Emission Cut
                </SelectItem>

                <SelectItem value="construction">
                  Construction Ban
                </SelectItem>

                <SelectItem value="dust">
                  Dust Suppression
                </SelectItem>

                <SelectItem value="odd-even">
                  Odd-Even Traffic
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div className="space-y-2">

            <div className="flex items-center justify-between">

              <p className="text-sm font-medium">
                Reduction
              </p>

              <span className="text-sm font-semibold">
                {reduction[0]}%
              </span>

            </div>

            <Slider
              min={5}
              max={80}
              step={5}
              value={reduction}
              onValueChange={setReduction}
            />

          </div>

          <div className="space-y-2">

            <p className="text-sm font-medium">

              Duration

            </p>

            <Select
              value={duration}
              onValueChange={setDuration}
            >

              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="1">
                  1 Day
                </SelectItem>

                <SelectItem value="3">
                  3 Days
                </SelectItem>

                <SelectItem value="5">
                  5 Days
                </SelectItem>

                <SelectItem value="7">
                  7 Days
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

        </div>

        <Button className="w-full">

          <Play className="mr-2 h-4 w-4" />

          Run Simulation

        </Button>

      </CardContent>

    </Card>
  );
}