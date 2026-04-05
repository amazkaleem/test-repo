import { NextResponse } from "next/server";
import { getSupportersCount } from "@/lib/supporters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const count = await getSupportersCount();

  console.log("I got the current supporter value! It is: ", count);
  return NextResponse.json({
    count,
    source: "mock + gofundme webhook",
  });
}
