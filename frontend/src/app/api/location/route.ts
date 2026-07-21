import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location") || "";

    const res = await fetch(`${API_BASE}/location?location=${encodeURIComponent(location)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Backend error ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to search location" },
      { status: 500 }
    );
  }
}
