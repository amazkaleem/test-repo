"use client";

import { useEffect, useState } from "react";
import WhatsAppModal from "./WhatsAppModal";

export default function GlobalWhatsAppModal() {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // for testing whats app modal

  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.location.search.includes("testModal=true")) {
  //     const testTimeout = setTimeout(() => setShowWhatsAppModal(true), 2000);
  //     return () => clearTimeout(testTimeout);
  //   }
  // }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const validOrigins = ["https://www.classy.org", "https://giving.gofundme.com"];
      if (!validOrigins.includes(event.origin)) return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        
        const isSuccess = 
          data === "transactionSuccessful" ||
          data?.type === "donationResponse" ||
          data?.event === "transaction.success" ||
          String(data?.eventName).toLowerCase().includes("complete") ||
          String(data?.type).toLowerCase().includes("success");
          
        if (isSuccess && (data?.transactionId || data?.id || data === "transactionSuccessful")) {
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
