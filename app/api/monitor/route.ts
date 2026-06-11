import { NextResponse } from "next/server";

const MONITOR_URL =
  "https://baukit.org/p/ndif-monitor/data/status.json";

export async function GET() {
  try {
    const res = await fetch(MONITOR_URL, {
      next: { revalidate: 120 },
    });
    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json(null, { status: 502 });
  }
}
