import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { TransactionWebhookPayload } from "@/types";

export const runtime = "nodejs";

const WEBHOOK_SECRET = process.env.GFM_PRO_WEBHOOK_SECRET;
// Set this to true to return 202 immediately as per "Respond promptly" recommendation
const ACK_IMMEDIATELY = true;
const SUPPORTED_EVENTS = new Set(["transaction.created"]);
const SIGNATURE_HEADER = "svix-signature";
const EVENT_ID_HEADER = "svix-id";
const TIMESTAMP_HEADER = "svix-timestamp";
/** Reject webhooks whose svix-timestamp is too far from now (limits replay of captured requests). */
const MAX_TIMESTAMP_SKEW_SECONDS = 5 * 60;
const IDEMPOTENCY_TTL_MS = 1000 * 60 * 60 * 24;

// In-memory idempotency cache
const processedEventIds = new Map<string, number>();

// Validate Svix webhook signature
function verifySvixSignature(
  rawBody: string,
  signature: string,
  eventId: string,
  timestamp: string,
  secret: string
): boolean {
  const signedContent = `${eventId}.${timestamp}.${rawBody}`;
  // Extract the base64 part of the secret (Svix secrets often prefixed with whsec_)
  const secretPart = secret.includes("_") ? secret.split("_")[1] : secret;
  const secretBytes = Buffer.from(secretPart, "base64");

  const expectedSignature = createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  const expectedSigBuffer = Buffer.from(expectedSignature, "base64");
  if (expectedSigBuffer.length === 0) return false;

  // Svix may send several space-separated entries, each like "v1,<base64_hmac>".
  const entries = signature.trim().split(/\s+/).filter(Boolean);
  for (const entry of entries) {
    const commaIdx = entry.indexOf(",");
    if (commaIdx <= 0) continue;
    const version = entry.slice(0, commaIdx);
    const encodedSig = entry.slice(commaIdx + 1);
    if (version !== "v1") continue;

    const providedSig = Buffer.from(encodedSig, "base64");
    if (providedSig.length !== expectedSigBuffer.length) continue;
    if (timingSafeEqual(providedSig, expectedSigBuffer)) return true;
  }

  return false;
}

function isWebhookTimestampFresh(timestampHeader: string): boolean {
  const ts = Number.parseInt(timestampHeader, 10);
  if (!Number.isFinite(ts) || ts <= 0) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  return Math.abs(nowSec - ts) <= MAX_TIMESTAMP_SKEW_SECONDS;
}

function hasEventBeenProcessed(eventId: string): boolean {
  const lastSeen = processedEventIds.get(eventId);
  if (!lastSeen) return false;
  if (Date.now() - lastSeen > IDEMPOTENCY_TTL_MS) {
    processedEventIds.delete(eventId);
    return false;
  }
  return true;
}

// TODO: implement side-effects (e.g. update supporter count in DB) once a persistent store is in place
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleTransactionCreated(payload: TransactionWebhookPayload) {}

export async function POST(request: NextRequest) {
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing Secret" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER);
  const timestamp = request.headers.get(TIMESTAMP_HEADER);
  const eventId = request.headers.get(EVENT_ID_HEADER);

  if (!signature || !timestamp || !eventId) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (!isWebhookTimestampFresh(timestamp)) {
    return NextResponse.json({ error: "Invalid or expired webhook timestamp" }, { status: 401 });
  }

  if (!verifySvixSignature(rawBody, signature, eventId, timestamp, WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: TransactionWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as TransactionWebhookPayload;
  } catch (err) {
    console.error("[webhook] Failed to parse webhook body as JSON:", err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const eventType = payload.eventType;


  if (hasEventBeenProcessed(eventId)) {
    return NextResponse.json({ duplicate: true }, { status: 200 });
  }

  if (!SUPPORTED_EVENTS.has(eventType)) {
    return NextResponse.json({ ignored: true }, { status: 200 });
  }

  if (ACK_IMMEDIATELY) {
    processedEventIds.set(eventId, Date.now());
    void handleTransactionCreated(payload).catch((err) =>
      console.error("[webhook] Async Error:", err)
    );

    return NextResponse.json({ accepted: true }, { status: 202 });
  }

  try {
    await handleTransactionCreated(payload);
    processedEventIds.set(eventId, Date.now());
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Synchronous processing of request failed with error: ", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
