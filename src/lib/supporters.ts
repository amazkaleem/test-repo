export interface OfflineDonation {
  id: string;
  donorName: string;
  amountUsd: number;
  receivedAt: string;
}

const BASE_CAMPAIGN_SUPPORTERS = 320;
const CAMPAIGN_ID = process.env.GOFUNDME_CAMPAIGN_ID || "227362"; // From webhook data
const CLIENT_ID = process.env.GOFUNDME_CLIENT_ID;
const CLIENT_SECRET = process.env.GOFUNDME_CLIENT_SECRET;

// Mock offline donations. Replace this with your backend data source when ready.
export const MOCK_OFFLINE_DONATIONS: OfflineDonation[] = [
  { id: "off-001", donorName: "Ana R.", amountUsd: 50, receivedAt: "2026-03-14" },
  { id: "off-002", donorName: "Carlos M.", amountUsd: 25, receivedAt: "2026-03-15" },
  { id: "off-003", donorName: "Keiko S.", amountUsd: 100, receivedAt: "2026-03-17" },
  { id: "off-004", donorName: "Luis P.", amountUsd: 10, receivedAt: "2026-03-18" },
  { id: "off-005", donorName: "Maya T.", amountUsd: 35, receivedAt: "2026-03-20" },
  { id: "off-006", donorName: "Noah W.", amountUsd: 20, receivedAt: "2026-03-22" },
  { id: "off-007", donorName: "Sofia G.", amountUsd: 75, receivedAt: "2026-03-25" },
];

// Cache access token to avoid repeated OAuth calls
let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }

  try {
    // Debug: Log credentials being used (without exposing secret)
    console.log("[supporters] Attempting OAuth with:", {
      clientIdLength: CLIENT_ID?.length,
      clientSecretLength: CLIENT_SECRET?.length,
      campaignId: CAMPAIGN_ID,
    });

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
      console.error(`[supporters] OAuth error (${response.status}):`, errorText);
      throw new Error(`OAuth failed: ${response.statusText}`);
    }

    const data = (await response.json()) as { access_token: string; expires_in: number };
    cachedAccessToken = data.access_token;
    // Cache for slightly less than expires_in to be safe
    tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60000;

    console.log("[supporters] Successfully obtained access token");
    return data.access_token;
  } catch (error) {
    console.error("[supporters] Failed to get access token:", error);
    throw error;
  }
}

export async function getSupportersCount(): Promise<number> {
  try {
    if (!CAMPAIGN_ID || !CLIENT_ID || !CLIENT_SECRET) {
      console.warn("[supporters] Missing GoFundMe credentials, falling back to mock count");
      return BASE_CAMPAIGN_SUPPORTERS + MOCK_OFFLINE_DONATIONS.length;
    }

    const accessToken = await getAccessToken();

    // Fetch campaign supporters list
    const response = await fetch(`https://api.classy.org/2.0/campaigns/${CAMPAIGN_ID}/supporters`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/hal+json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[supporters] API error (${response.status}):`, errorText);
      throw new Error(`GoFundMe API failed: ${response.statusText}`);
    }

    const data = (await response.json()) as Record<string, unknown>;
    console.log("[supporters] Campaign supporters payload:", JSON.stringify(data, null, 2));

    // Extract supporter count from the response
    // The response likely has a 'data' array with supporters or a 'total' count field
    const supportersArray = (data.data as Array<unknown>) || [];
    const gofundmeCount = supportersArray.length;
    const totalCount = BASE_CAMPAIGN_SUPPORTERS + MOCK_OFFLINE_DONATIONS.length + gofundmeCount;

    console.log(`[supporters] GoFundMe API count: ${gofundmeCount}, Total: ${totalCount}`);
    return totalCount;
  } catch (error) {
    console.error("[supporters] Failed to fetch from GoFundMe API:", error);
    // Fallback to mock data if API fails
    return BASE_CAMPAIGN_SUPPORTERS + MOCK_OFFLINE_DONATIONS.length;
  }
}
