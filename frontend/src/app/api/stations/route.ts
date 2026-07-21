import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/stations`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Backend error ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch stations" },
      { status: 500 }
    );
  }
}
