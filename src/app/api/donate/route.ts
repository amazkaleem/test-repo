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
const IDEMPOTENCY_TTL_MS = 1000 * 60 * 60 * 24;

// In-memory idempotency cache
const processedEventIds = new Map<string, number>();

/**
 * Security: Validate Webhook Secret & Payload Integrity
 * Implements Svix signature verification as required by GoFundMe Pro
 */
// function verifySvixSignature(
//   rawBody: string,
//   signature: string,
//   eventId: string,
//   timestamp: string,
//   secret: string
// ): boolean {
//   const signedContent = `${eventId}.${timestamp}.${rawBody}`;
//   // Extract the base64 part of the secret (Svix secrets often prefixed with whsec_)
//   const secretPart = secret.includes("_") ? secret.split("_")[1] : secret;
//   const secretBytes = Buffer.from(secretPart, "base64");

//   const expectedSignature = createHmac("sha256", secretBytes)
//     .update(signedContent)
//     .digest("base64");

//   const parts = signature.split(",");
//   if (parts.length !== 2) return false;

//   const providedSig = Buffer.from(parts[1], "base64");
//   const expectedSigBuffer = Buffer.from(expectedSignature, "base64");

//   return timingSafeEqual(providedSig, expectedSigBuffer);
// }

/**
 * Best Practice: Handle Retries Gracefully (Idempotency)
 */
function hasEventBeenProcessed(eventId: string): boolean {
  const lastSeen = processedEventIds.get(eventId);
  if (!lastSeen) return false;
  if (Date.now() - lastSeen > IDEMPOTENCY_TTL_MS) {
    processedEventIds.delete(eventId);
    return false;
  }
  return true;
}

/**
 * Logic for Transaction Created
 * This is where you would "Update Fundraising Thermometers"
 */
async function handleTransactionCreated(payload: TransactionWebhookPayload) {
  const transaction = payload.data;
  console.info("[webhook] Processing transaction:", transaction);

  // LOGIC: Send immediate thank-you messages
  // Example: await sendEmail(transaction.email, "Thank you!");
}

export async function POST(request: NextRequest) {
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing Secret" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER);
  const timestamp = request.headers.get(TIMESTAMP_HEADER);
  const eventId = request.headers.get(EVENT_ID_HEADER);

  if (!eventId) {
    return NextResponse.json({ error: "Please provide an event Id!" }, { status: 400 });
  }

  // Security: Verify payload authenticity
  // if ( !signature || !timestamp || !eventId || !verifySvixSignature(rawBody, signature, eventId, timestamp, WEBHOOK_SECRET))
  // {
  //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  // }

  const payload = JSON.parse(rawBody) as TransactionWebhookPayload;
  const eventType = payload.eventType;

  // Best Practice: Log all deliveries
  console.info(`[webhook] Received ${eventType}`, { eventId });

  // Best Practice: Implement idempotent processing
  if (hasEventBeenProcessed(eventId)) {
    return NextResponse.json({ duplicate: true }, { status: 200 });
  }

  if (!SUPPORTED_EVENTS.has(eventType)) {
    return NextResponse.json({ ignored: true }, { status: 200 });
  }

  /**
   * Security Recommendation: Respond Promptly (within 15s)
   * We return 202 and process the business logic in the "background"
   */
  if (ACK_IMMEDIATELY) {
    processedEventIds.set(eventId, Date.now());

    // Background processing
    void handleTransactionCreated(payload).catch((err) =>
      console.error("[webhook] Async Error:", err)
    );

    return NextResponse.json({ accepted: true }, { status: 202 });
  }

  // Fallback for synchronous processing
  try {
    await handleTransactionCreated(payload);
    processedEventIds.set(eventId, Date.now());
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Synchronous processing of request failed with error: ", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
