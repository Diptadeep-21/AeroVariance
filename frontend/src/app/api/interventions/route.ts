import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const station = body.station || "All Zones";
    const trafficChange = body.traffic_change ?? -20;
    const constructionChange = body.construction_change ?? -15;

    return NextResponse.json({
      station,
      timestamp: new Date().toISOString(),
      priority_actions: [
        {
          id: "act-1",
          title: "Deploy Electric Bus Sprinklers in Hotspot Corridors",
          category: "Traffic / Mobility",
          impact: "Estimated -14% PM2.5 within 2.5km radius",
          urgency: "High",
          status: "Recommended",
        },
        {
          id: "act-2",
          title: "Temporary Anti-Smog Gun Mandate on Construction Sites",
          category: "Construction & Dust",
          impact: "Estimated -18% PM10 localized reduction",
          urgency: "Immediate",
          status: "Enforcing",
        },
        {
          id: "act-3",
          title: "Industrial Boiler Shift & Biomass Burning Patrols",
          category: "Industrial Emissions",
          impact: "Estimated -9% SO2 & NO2 emissions",
          urgency: "Medium",
          status: "Planned",
        },
      ],
      estimated_aqi_reduction: Math.abs(trafficChange * 0.45 + constructionChange * 0.35),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch interventions" },
      { status: 500 }
    );
  }
}
