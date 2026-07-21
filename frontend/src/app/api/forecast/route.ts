import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location") || "Delhi";

    const res = await fetch(`${API_BASE}/forecast?location=${encodeURIComponent(location)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Backend error ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch forecast" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const station = body.station || "Rabindra Sarobar, Kolkata - WBPCB";
    const res = await fetch(`${API_BASE}/dashboard?mode=station&station=${encodeURIComponent(station)}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Backend error ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data.forecast || data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate forecast" },
      { status: 500 }
    );
  }
}
