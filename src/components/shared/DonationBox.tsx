"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface DonationBoxProps {
  className?: string;
}

export default function DonationBox({ className }: DonationBoxProps) {
  const t = useTranslations("monthlyDonation.donation");
  const classyAttributes = { classy: "782216" } as Record<string, string>;

  return (
    <article
      className={cn("w-full max-w-sm rounded-xl bg-[#F9F7F3] p-6 shadow-xl", className)}
      aria-label="Donation selector"
    >
      <div
        id="3kvNr4sq4nQFlOZCDtY5F"
        {...classyAttributes}
        className="min-h-24"
        aria-label={t("cta")}
      />
      <a href="/?campaign=782216" {...classyAttributes} className="sr-only" aria-label={t("cta")}>
        {t("cta")}
      </a>
      <p className="mb-5 flex items-center gap-1.5 text-sm text-gray-600">
        <span aria-hidden="true">💛</span>
        {t("note")}
      </p>
    </article>
  );
}
