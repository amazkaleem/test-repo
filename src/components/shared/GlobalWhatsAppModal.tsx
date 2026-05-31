"use client";

import { useEffect, useState } from "react";
import WhatsAppModal from "./WhatsAppModal";

const VALID_ORIGINS = [
  "https://giving.classy.org",
  "https://www.classy.org",
  "https://giving.gofundme.com",
];

function isTransactionSuccess(data: unknown): boolean {
  if (typeof data !== "object" || data === null) return false;

  const type = String((data as Record<string, unknown>).type ?? "").toLowerCase();

  return type === "donation_completed_msg_from_app" || type.includes("completed");
}

export default function GlobalWhatsAppModal() {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!VALID_ORIGINS.includes(event.origin)) return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (isTransactionSuccess(data)) {
          setShowWhatsAppModal(true);
        }
      } catch {
        if (event.data === "transactionSuccessful") {
          setShowWhatsAppModal(true);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    const handleCustomEvent = () => setShowWhatsAppModal(true);
    window.addEventListener("classyDonationComplete", handleCustomEvent);
    window.addEventListener("gfm:transaction_success", handleCustomEvent);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("classyDonationComplete", handleCustomEvent);
      window.removeEventListener("gfm:transaction_success", handleCustomEvent);
    };
  }, []);

  return (
    <WhatsAppModal 
      isOpen={showWhatsAppModal} 
      onClose={() => setShowWhatsAppModal(false)} 
    />
  );
}
