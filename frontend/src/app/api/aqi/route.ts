import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode") || "station";
    const station = searchParams.get("station") || "";
    const location = searchParams.get("location") || "";

    const query = new URLSearchParams();
    query.set("mode", mode);
    if (station) query.set("station", station);
    if (location) query.set("location", location);

    const res = await fetch(`${API_BASE}/dashboard?${query.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Backend error ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch AQI data" },
      { status: 500 }
    );
  }
}
