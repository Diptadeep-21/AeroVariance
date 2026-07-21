import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "Moderate";

    const res = await fetch(`${API_BASE}/advisory/${encodeURIComponent(category)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      // Fallback response if category endpoint varies
      return NextResponse.json({
        category,
        risk: category === "Severe" || category === "Very Poor" ? "High" : "Moderate",
        message: `Air quality is classified as ${category}. Vulnerable populations should limit prolonged outdoor exertion.`,
        outdoor: category === "Severe" ? "Avoid" : "Limit Exertion",
        mask: category === "Severe" || category === "Very Poor",
        color: category === "Severe" ? "#ef4444" : "#f59e0b",
      });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch advisories" },
      { status: 500 }
    );
  }
}
