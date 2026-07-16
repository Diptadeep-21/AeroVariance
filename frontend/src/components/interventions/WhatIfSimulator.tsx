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

import { useSimulation } from "@/hooks/useSimulation";

export default function WhatIfSimulator() {
  const { simulate } = useSimulation();

  const [traffic, setTraffic] =
    useState(20);

  const [construction, setConstruction] =
    useState(15);

  const [industry, setIndustry] =
    useState(10);

  const [duration, setDuration] =
    useState("3");

  async function run() {
    await simulate(
      traffic,
      construction,
      industry
    );
  }

  return (
    <Card>

      <CardHeader>

        <CardTitle>

          What-If Simulator

        </CardTitle>

        <CardDescription>

          Evaluate pollution-control strategies before implementation.

        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-8">

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="space-y-6">

            <SliderField
              label="Traffic Emissions"
              value={traffic}
              onChange={setTraffic}
            />

            <SliderField
              label="Construction Dust"
              value={construction}
              onChange={setConstruction}
            />

            <SliderField
              label="Industrial Emissions"
              value={industry}
              onChange={setIndustry}
            />

          </div>

          <div className="space-y-4">

            <p className="text-sm font-medium">
              Duration
            </p>

            <Select
              value={duration}
              onValueChange={(value) => {
                if (value) {
                  setDuration(value);
                }
              }}
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

            <Button
              className="mt-8 w-full"
              onClick={run}
            >

              <Play className="mr-2 h-4 w-4" />

              Run Simulation

            </Button>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function SliderField({
  label,
  value,
  onChange,
}: SliderFieldProps) {
  return (
    <div className="space-y-3">

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium">

          {label}

        </p>

        <span className="font-semibold">

          {value}%

        </span>

      </div>

      <Slider
        min={0}
        max={100}
        step={5}
        value={value}
        onValueChange={(value) => {
          if (typeof value === "number") {
            onChange(value);
          } else {
            onChange(value[0] ?? 0);
          }
        }}
      />

    </div>
  );
}