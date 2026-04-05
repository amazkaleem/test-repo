export type Locale = "en" | "es" | "ja";

export const locales: Locale[] = ["en", "es", "ja"];

export interface SiteMetadata {
  title: string;
  siteUrl: string;
  blogUrl: string;
  description: string;
  keywords: string[];
  author: string;
  infoEmail: string;
  tripsEmail: string;
  twitter: string;
  facebook: string;
  youtube: string;
  vimeo: string;
  instagram: string;
  github: string;
}


interface TransactionData {
  id: number;
  parent_transaction_id: number;
  supporter_id: number;
  member_id: number;
  organization_id: number;
  campaign_id: number;
  fundraising_page_id: number;
  fundraising_team_id: number;
  designation_id: number;
  recurring_donation_plan_id: number;
  donation_matching_plan_id: number;
  tax_entity_id: number;

  // Billing & Contact
  member_name: string;
  member_email_address: string;
  member_phone: string;
  member_country: string;
  billing_first_name: string;
  billing_last_name: string;
  billing_address1: string;
  billing_address2: string;
  billing_city: string;
  billing_state: string;
  billing_postal_code: string;
  billing_country: string;
  company_name: string;

  // Transaction Amounts & Currency
  total_gross_amount: number;
  donation_gross_amount: number;
  donation_net_amount: number;
  initial_gross_amount: number;
  overhead_net_amount: number;
  currency_code: string;
  charged_total_gross_amount: number;
  charged_currency_code: string;
  
  // Fees
  fees_amount: number;
  charged_fees_amount: number;
  classy_fees_amount: number;
  charged_classy_fees_amount: number;
  pp_fees_amount: number;
  charged_pp_fees_amount: number;
  processor_fee_amount: number;
  application_fee_amount: number;
  flex_rate_amount: number;
  adjustment_amount: number;
  
  // Fee Percentages & Meta
  applied_application_fee_percent: number;
  applied_flex_rate_percent: number;
  applied_fot_percent: number;
  applied_processor_fee_percent: number;
  applied_raw_processor_fee_flat: number;
  fee_on_top: boolean;
  is_donor_covered_fee: boolean;

  // Payment Details
  payment_gateway: string;
  payment_method: string;
  payment_source: string;
  payment_type: string;
  card_type: string;
  card_last_four: number;
  card_expiration: string;
  account_number: string;
  account_type: string;
  institution: string;
  pp_reference_id: string;
  pp_transaction_id: string;
  pp_response: string;
  processor_decline_code: string;

  // Status & Timing
  status: string;
  frequency: "one-time" | "recurring";
  is_anonymous: boolean;
  hide_amount: boolean;
  is_reprocess: boolean;
  reprocess_attempts: number;
  is_gift_aid: boolean;
  opted_into_payment_sync: boolean;
  acknowledgements_count: number;
  created_at: string;
  updated_at: string;
  charged_at: string;
  purchased_at: string;
  refunded_at: string | null;

  // Raw / Original Values
  raw_donation_gross_amount: number;
  raw_total_gross_amount: number;
  raw_initial_gross_amount: number;
  raw_overhead_net_amount: number;
  raw_processor_fee_amount: number;
  raw_application_fee_amount: number;
  raw_flex_rate_amount: number;
  raw_adjustment_amount: number;
  raw_currency_code: string;

  // Metadata & Context
  comment: string | null;
  in_honor_of: string | null;
  dedication: Record<string, unknown>;
  promo_code_code: string | null;
  browser_info: string;
  context: {
    application_fee_campaign_category: string;
    application_fee_platform_fee_type: string;
    commerce_confirmation_id: string;
    commerce_order_id: string;
    created_by: string;
    is_passport: boolean;
    source_campaign_id: number;
    source_campaign_type: string;
  };

  // Catch-all for future API updates
  [key: string]: unknown;
}

export interface TransactionWebhookPayload {
  eventType: "transaction.created";
  data: TransactionData;
}
