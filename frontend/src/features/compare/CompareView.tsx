"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import { Building2, TrendingUp, ShieldCheck, Activity } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

interface CityMetric {
  city: string;
  aqi: number;
  category: string;
  pm25: number;
  pm10: number;
  no2: number;
  trend: string;
  dominantSource: string;
  activeInterventions: number;
  complianceRate: string;
}

export default function CompareView() {
  const [cities, setCities] = useState<CityMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComparison() {
      try {
        const res = await fetch("/api/cities/compare");
        const data = await res.json();
        setCities(data.cities || []);
      } catch (err) {
        console.error("Failed to load compare cities", err);
      } finally {
        setLoading(false);
      }
    }
    fetchComparison();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Compare Cities"
          description="Cross-metropolitan AQI analysis, intervention effectiveness, and compliance metrics."
        />
        <div className="text-[#6B7280]">Loading city comparative metrics...</div>
      </div>
    );
  }

  const avgAqi = Math.round(cities.reduce((acc, c) => acc + c.aqi, 0) / (cities.length || 1));
  const totalInterventions = cities.reduce((acc, c) => acc + c.activeInterventions, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compare Cities"
        description="Cross-metropolitan AQI analysis, intervention effectiveness, and compliance metrics."
      />

      {/* 4-Up Metric Card Row */}
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard
          title="Tracked Cities"
          value={cities.length}
          subtitle="Urban Centers"
          icon={<Building2 className="h-5 w-5 text-[#2563EB]" />}
        />

        <MetricCard
          title="National Avg AQI"
          value={avgAqi}
          subtitle="Aggregated Index"
          icon={<Activity className="h-5 w-5 text-[#2563EB]" />}
        />

        <MetricCard
          title="Active Interventions"
          value={totalInterventions}
          subtitle="Enforced Policies"
          icon={<ShieldCheck className="h-5 w-5 text-[#2563EB]" />}
        />

        <MetricCard
          title="Avg Enforcement Rate"
          value="85.6%"
          subtitle="Compliance Target"
          icon={<TrendingUp className="h-5 w-5 text-[#2563EB]" />}
        />
      </div>

      {/* Grouped Bar Comparison Chart */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none">
        <div className="mb-6">
          <h3 className="font-serif text-xl font-semibold text-[#111827]">AQI & Pollutant Concentration Comparison</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Side-by-side comparison of PM2.5, PM10, and NO2 levels across major urban centers.
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cities}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="city" stroke="#9CA3AF" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              />
              <Legend />
              <Bar dataKey="aqi" name="Overall AQI" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pm25" name="PM2.5 (µg/m³)" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pm10" name="PM10 (µg/m³)" fill="#93C5FD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* City Breakdown Table */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none">
        <div className="mb-6">
          <h3 className="font-serif text-xl font-semibold text-[#111827]">City Breakdown & Source Attribution</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Detailed environmental metrics, dominant pollution contributors, and municipal compliance.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#E5E7EB] bg-[#FAFBFC] text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B7280]">
              <tr>
                <th className="p-3.5">City</th>
                <th className="p-3.5">AQI Level</th>
                <th className="p-3.5">PM2.5</th>
                <th className="p-3.5">PM10</th>
                <th className="p-3.5">Dominant Source</th>
                <th className="p-3.5">Interventions</th>
                <th className="p-3.5">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {cities.map((c) => (
                <tr key={c.city} className="hover:bg-[#FAFBFC]/50 transition-colors">
                  <td className="p-3.5 font-semibold text-[#111827]">{c.city}</td>
                  <td className="p-3.5">
                    <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#15803D]">
                      {c.aqi} - {c.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#111827]">{c.pm25} µg/m³</td>
                  <td className="p-3.5 text-[#111827]">{c.pm10} µg/m³</td>
                  <td className="p-3.5 font-medium text-[#6B7280]">{c.dominantSource}</td>
                  <td className="p-3.5 text-[#111827]">{c.activeInterventions} Active</td>
                  <td className="p-3.5 font-semibold text-[#15803D]">{c.complianceRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
