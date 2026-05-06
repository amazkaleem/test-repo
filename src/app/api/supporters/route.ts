import { NextResponse } from "next/server";
import { getSupportersCount } from "@/lib/supporters";

export const runtime = "nodejs";

export async function GET() {
  const count = await getSupportersCount();

  return NextResponse.json({
    count,
    source: "mock offline donations + Classy supporters API",
  });
}
