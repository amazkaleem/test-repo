import { unstable_cache } from "next/cache";

export interface OfflineDonation {
  id: string;
  donorName: string;
  amountUsd: number;
  receivedAt: string;
}

const BASE_CAMPAIGN_SUPPORTERS = 0;
const MIN_SUPPORTERS_FLOOR = 32;
const ERROR_FALLBACK_COUNT = MIN_SUPPORTERS_FLOOR;

/** GoFundMe Pro (Classy) REST API via GOFUNDME_* env vars. */
const CAMPAIGN_ID = process.env.NEXT_PUBLIC_GOFUNDME_CAMPAIGN_ID;
const CLIENT_ID = process.env.GOFUNDME_CLIENT_ID;
const CLIENT_SECRET = process.env.GOFUNDME_CLIENT_SECRET;

export const MOCK_OFFLINE_DONATIONS: OfflineDonation[] = [];

let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }

  try {
    const response = await fetch("https://api.classy.org/oauth2/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID || "",
        client_secret: CLIENT_SECRET || "",
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[supporters] Classy OAuth error (${response.status}):`, errorText);
      throw new Error(`Classy OAuth failed: ${response.statusText}`);
    }

    const data = (await response.json()) as { access_token: string; expires_in: number };
    cachedAccessToken = data.access_token;
    tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60000;

    return data.access_token;
  } catch (error) {
    console.error("[supporters] Failed to get access token:", error);
    throw error;
  }
}

async function fetchSupportersCount(): Promise<number> {
  try {
    if (!CAMPAIGN_ID || !CLIENT_ID || !CLIENT_SECRET) {
      console.warn(
        "[supporters] Missing GoFundMe Pro API credentials (GOFUNDME_*), using error fallback",
      );
      return ERROR_FALLBACK_COUNT;
    }

    const accessToken = await getAccessToken();

    // Classy URLs use hyphenated segments (`recurring-donation-plans`), not underscores.
    // Only count active recurring donation plans (monthly active donors).
    const response = await fetch(
      `https://api.classy.org/2.0/campaigns/${CAMPAIGN_ID}/recurring-donation-plans?filter=status=active&per_page=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/hal+json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[supporters] Classy API error (${response.status}):`, errorText);
      throw new Error(`Classy API failed: ${response.statusText}`);
    }

    const data = (await response.json()) as Record<string, unknown>;

    if (typeof data.total !== "number") {
      console.error("[supporters] Unexpected Classy response shape: missing numeric `total`");
      return ERROR_FALLBACK_COUNT;
    }

    const activeRecurringCount = data.total;
    const totalCount =
      BASE_CAMPAIGN_SUPPORTERS + MOCK_OFFLINE_DONATIONS.length + activeRecurringCount;

    return Math.max(totalCount, MIN_SUPPORTERS_FLOOR);
  } catch (error) {
    console.error("[supporters] Failed to fetch from Classy API:", error);
    return ERROR_FALLBACK_COUNT;
  }
}

export const getSupportersCount = unstable_cache(
  fetchSupportersCount,
  ["classy-supporters-count"],
  { revalidate: 300 } 
);
