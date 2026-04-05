"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DonationBoxProps {
  className?: string;
}

export default function DonationBox({ className }: DonationBoxProps) {
  const t = useTranslations("monthlyDonation.donation");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const form = document.querySelector("cl-donation-form");

      if (
        form &&
        (form as HTMLElement).shadowRoot?.querySelector(".donation-form-container")
      ) {
        setLoading(false);
        clearInterval(interval);
      }
    }, 120);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
      <article
        className={cn(
          "relative w-full max-w-[380px] shrink-0 min-h-[520px] rounded-xl bg-[#F9F7F3] p-6 shadow-xl",
          className
        )}
      >
      {loading && (
        <div className="flex w-full flex-col animate-pulse">
          <div className="h-[46px] max-w-[380px] bg-gray-200 rounded-full mx-auto" />
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto mt-6" />

          <div className="grid w-full grid-cols-2 gap-2 mt-5">
            <div className="h-[52px] bg-gray-200 rounded-lg" />
            <div className="h-[52px] bg-gray-200 rounded-lg" />
            <div className="h-[52px] bg-gray-200 rounded-lg" />
            <div className="h-[52px] bg-gray-200 rounded-lg" />
          </div>

          <div className="h-[52px] w-full bg-gray-200 rounded-lg mt-2" />
          <div className="h-[52px] w-full bg-yellow-200 rounded-lg mt-6" />
        </div>
      )}

      <div
        className={cn(
          "transition-opacity duration-300 w-full",
          loading ? "h-0 overflow-hidden opacity-0" : "opacity-100"
        )}
      >
        <div
          id="3kvNr4sq4nQFlOZCDtY5F"
          {...({ classy: "782216" } as Record<string, string>)}
          className="min-h-24"
          aria-label={t("cta")}
        />
      </div>
    </article>
  );
}