"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type DonationTab = "monthly" | "oneTime";

const AMOUNTS = [5, 10, 25, 100] as const;
const DEFAULT_AMOUNT = 10;

interface DonationBoxProps {
  className?: string;
}

export default function DonationBox({ className }: DonationBoxProps) {
  const t = useTranslations("monthlyDonation.donation");
  const [tab, setTab] = useState<DonationTab>("monthly");
  const [selected, setSelected] = useState<number | null>(DEFAULT_AMOUNT);
  const [custom, setCustom] = useState("");

  const selectPreset = useCallback((amount: number) => {
    setSelected(amount);
    setCustom("");
  }, []);

  const handleCustom = useCallback((value: string) => {
    // Allow only digits
    const sanitized = value.replace(/\D/g, "");
    setCustom(sanitized);
    setSelected(null);
  }, []);

  const activeAmount = selected ?? (custom ? Number(custom) : null);
  const suffix = tab === "monthly" ? " USD/mo" : " USD";

  useEffect(() => {
    if (!activeAmount) return;
    const frequency = tab === "oneTime" ? "one-time" : "monthly";
    const url = new URL(window.location.href);

    url.searchParams.set("campaign", "782216");
    url.searchParams.set("frequency", frequency);
    url.searchParams.set("amount", String(activeAmount));

    window.history.replaceState({}, "", url.toString());
  }, [activeAmount, tab]);

  const handleDonate = useCallback(() => {
    if (!activeAmount) return;
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, [activeAmount]);

  return (
    <article
      className={cn("w-full max-w-sm rounded-xl bg-[#F9F7F3] p-6 shadow-xl", className)}
      aria-label="Donation selector"
    >
      {/* Tab toggle */}
      <nav
        className="mb-5 flex border-b border-[#ECEBE5] pb-4"
        role="tablist"
        aria-label="Donation frequency"
      >
        {(["monthly", "oneTime"] as const).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "flex-1 py-2 text-center font-title text-sm uppercase tracking-wide transition-colors",
              tab === key
                ? "rounded-sm bg-[#FECB26] text-shh-black"
                : "text-gray-500 hover:text-shh-black"
            )}
          >
            {t(`tabs.${key}`)}
          </button>
        ))}
      </nav>

      {/* Amount grid */}
      <fieldset className="mb-4 grid grid-cols-3 gap-2">
        <legend className="sr-only">Select amount</legend>

        {AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => selectPreset(amount)}
            className={cn(
              "rounded-sm border-2 px-3 py-2.5 text-center font-body text-sm font-semibold transition-colors",
              selected === amount
                ? "border-[#FECB26] bg-[#FECB26] text-shh-black"
                : "border-[#ECEBE5] bg-[#ECEBE5] text-gray-700 hover:border-gray-400"
            )}
          >
            <span className="mr-1 font-title text-base">${amount}</span>
            {/* Invisible "USD/mo" reserves max width; visible suffix overlays it */}
            <span className="relative inline-block text-xs text-gray-500">
              <span className="invisible" aria-hidden="true">
                {" "}
                USD/mo
              </span>
              <span className="absolute inset-0">{suffix}</span>
            </span>
          </button>
        ))}

        {/* Custom amount */}
        <label
          className={cn(
            "col-span-2 flex items-center gap-1 rounded-lg border-2 px-3 py-2.5 transition-colors",
            selected === null && custom
              ? "border-[#FECB26] bg-[#FECB26]"
              : "border-[#ECEBE5] bg-[#ECEBE5] hover:border-gray-400"
          )}
        >
          {custom && <span className="font-title text-base">$</span>}
          <input
            type="text"
            inputMode="numeric"
            placeholder={t("amounts.custom")}
            value={custom}
            onChange={(e) => handleCustom(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:font-body placeholder:font-normal placeholder:text-gray-500"
            aria-label={t("amounts.custom")}
          />
        </label>
      </fieldset>

      {/* Note */}
      <p className="mb-5 flex items-center gap-1.5 text-sm text-gray-600">
        <span aria-hidden="true">💛</span>
        {t("note")}
      </p>

      {/* CTA */}
      <button
        type="button"
        disabled={!activeAmount}
        onClick={handleDonate}
        className={cn(
          "w-full rounded-lg py-3.5 font-title text-base uppercase tracking-wide transition-colors",
          activeAmount
            ? "bg-[#FECB26] text-shh-black hover:brightness-105"
            : "cursor-not-allowed bg-[#ECEBE5] text-gray-400"
        )}
      >
        {t("cta")}
      </button>
    </article>
  );
}
