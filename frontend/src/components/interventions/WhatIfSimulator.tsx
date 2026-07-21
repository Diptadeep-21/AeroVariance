"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const [traffic, setTraffic] = useState(20);
  const [construction, setConstruction] = useState(15);
  const [industry, setIndustry] = useState(10);
  const [duration, setDuration] = useState("3");

  async function run() {
    await simulate(traffic, construction, industry);
  }

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none">
      <div className="mb-6">
        <h3 className="font-serif text-xl font-semibold text-[#111827]">
          What-If Simulator
        </h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          Evaluate pollution-control strategies before implementation.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <SliderField
            label="Traffic Emissions Reduction"
            value={traffic}
            onChange={setTraffic}
          />
          <SliderField
            label="Construction Dust Control"
            value={construction}
            onChange={setConstruction}
          />
          <SliderField
            label="Industrial Emission Limits"
            value={industry}
            onChange={setIndustry}
          />
        </div>

        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B7280] mb-2">
              Simulation Horizon
            </p>
            <Select
              value={duration}
              onValueChange={(value) => {
                if (value) setDuration(value);
              }}
            >
              <SelectTrigger className="w-full rounded-xl border-[#E5E7EB] bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Day</SelectItem>
                <SelectItem value="3">3 Days</SelectItem>
                <SelectItem value="5">5 Days</SelectItem>
                <SelectItem value="7">7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="mt-6 w-full rounded-full bg-[#0F172A] py-6 text-sm font-medium text-white hover:bg-slate-800 transition-all shadow-xs"
            onClick={run}
          >
            <Play className="mr-2 h-4 w-4 fill-white" />
            Run Simulation
          </Button>
        </div>
      </div>
    </div>
  );
}

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function SliderField({ label, value, onChange }: SliderFieldProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#111827]">{label}</p>
        <span className="font-semibold text-[#2563EB] text-sm">{value}%</span>
      </div>
      <Slider
        min={0}
        max={100}
        step={5}
        value={value}
        onValueChange={(val) => {
          if (typeof val === "number") {
            onChange(val);
          } else {
            onChange(val[0] ?? 0);
          }
        }}
      />
    </div>
  );
}