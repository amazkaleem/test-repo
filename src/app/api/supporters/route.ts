import { NextResponse } from "next/server";
import { getSupportersCount } from "@/lib/supporters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getSupportersCount();

  return NextResponse.json({
    count,
    source: "Classy recurring-donation-plans (active) with 0=>11 and error=>32 fallback",
  });
}
