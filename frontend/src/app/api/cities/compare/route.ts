import { NextResponse } from "next/server";

export async function GET() {
  const cities = [
    {
      city: "Delhi",
      aqi: 245,
      category: "Poor",
      pm25: 112,
      pm10: 210,
      no2: 65,
      trend: "+4.2%",
      dominantSource: "Vehicular & Stubble",
      activeInterventions: 18,
      complianceRate: "72%",
    },
    {
      city: "Kolkata",
      aqi: 178,
      category: "Moderate",
      pm25: 84,
      pm10: 162,
      no2: 42,
      trend: "-2.1%",
      dominantSource: "Industrial & Transport",
      activeInterventions: 12,
      complianceRate: "81%",
    },
    {
      city: "Mumbai",
      aqi: 165,
      category: "Moderate",
      pm25: 76,
      pm10: 148,
      no2: 38,
      trend: "-5.8%",
      dominantSource: "Construction & Dust",
      activeInterventions: 15,
      complianceRate: "88%",
    },
    {
      city: "Bengaluru",
      aqi: 112,
      category: "Moderate",
      pm25: 48,
      pm10: 95,
      no2: 29,
      trend: "+1.5%",
      dominantSource: "Traffic Density",
      activeInterventions: 9,
      complianceRate: "92%",
    },
    {
      city: "Chennai",
      aqi: 98,
      category: "Satisfactory",
      pm25: 39,
      pm10: 82,
      no2: 24,
      trend: "-3.4%",
      dominantSource: "Sea-Salt & Coastal Transport",
      activeInterventions: 7,
      complianceRate: "95%",
    },
  ];

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    totalCitiesTracked: cities.length,
    cities,
  });
}
