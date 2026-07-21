"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, ShieldCheck, AlertTriangle, Activity } from "lucide-react";
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

  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "good":
      case "satisfactory":
        return "bg-emerald-500 text-white";
      case "moderate":
        return "bg-amber-500 text-white";
      case "poor":
      case "very poor":
      case "severe":
        return "bg-rose-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Multi-City Comparative Intelligence"
          description="Cross-metropolitan AQI analysis, intervention effectiveness, and compliance metrics."
        />
        <div className="text-muted-foreground">Loading city comparative metrics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Multi-City Comparative Intelligence"
        description="Cross-metropolitan AQI analysis, intervention effectiveness, and compliance metrics."
      />

      {/* Overview Metric Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-xs text-muted-foreground">Tracked Cities</p>
              <h3 className="text-2xl font-bold">{cities.length} Metros</h3>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground">National Avg AQI</p>
              <h3 className="text-2xl font-bold">
                {Math.round(cities.reduce((acc, c) => acc + c.aqi, 0) / (cities.length || 1))}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="text-xs text-muted-foreground">Active Interventions</p>
              <h3 className="text-2xl font-bold">
                {cities.reduce((acc, c) => acc + c.activeInterventions, 0)} Total
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
            <div>
              <p className="text-xs text-muted-foreground">Avg Enforcement Rate</p>
              <h3 className="text-2xl font-bold">85.6%</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>AQI & Pollutant Concentration Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison of PM2.5, PM10, and NO2 levels across major urban centers.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cities}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="aqi" name="Overall AQI" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pm25" name="PM2.5 (µg/m³)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pm10" name="PM10 (µg/m³)" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* City Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>City Breakdown & Source Attribution</CardTitle>
          <CardDescription>
            Detailed environmental metrics, dominant pollution contributors, and municipal compliance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="p-3">City</th>
                  <th className="p-3">AQI Level</th>
                  <th className="p-3">PM2.5</th>
                  <th className="p-3">PM10</th>
                  <th className="p-3">Dominant Source</th>
                  <th className="p-3">Interventions</th>
                  <th className="p-3">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cities.map((c) => (
                  <tr key={c.city} className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold">{c.city}</td>
                    <td className="p-3">
                      <Badge className={getBadgeColor(c.category)}>
                        {c.aqi} - {c.category}
                      </Badge>
                    </td>
                    <td className="p-3">{c.pm25} µg/m³</td>
                    <td className="p-3">{c.pm10} µg/m³</td>
                    <td className="p-3 font-medium text-slate-700">{c.dominantSource}</td>
                    <td className="p-3">{c.activeInterventions} Active</td>
                    <td className="p-3 text-emerald-600 font-semibold">{c.complianceRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
