"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

/** After this delay we show the fallback link, but keep polling until the SDK appears or the component unmounts. */
const SDK_TIMEOUT_MS = 8_000;
const DONATION_FALLBACK_URL =
  "https://www.gofundme.com/f/sbkkpx-students-helping-honduras";

interface DonationBoxProps {
  className?: string;
}

export default function DonationBox({ className }: DonationBoxProps) {
  const t = useTranslations("monthlyDonation.donation");
  const [loading, setLoading] = useState(true);
  const [sdkFailed, setSdkFailed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const form = document.querySelector("cl-donation-form");

      if (
        form &&
        (form as HTMLElement).shadowRoot?.querySelector(".donation-form-container")
      ) {
        setSdkFailed(false);
        setLoading(false);
        clearInterval(interval);
      }
    }, 120);

    const timeout = setTimeout(() => {
      setLoading((prev) => {
        if (prev) {
          setSdkFailed(true);
        }
        return prev;
      });
    }, SDK_TIMEOUT_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
      <article
        className={cn(
          "relative w-full max-w-[380px] shrink-0 min-h-[520px] rounded-xl bg-[#F9F7F3] p-6 shadow-xl",
          className
        )}
      >
      {/* ── Skeleton loader ── */}
      {loading && !sdkFailed && (
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

      {/* ── Fallback CTA ── */}
      {sdkFailed && (
        <div className="flex w-full flex-col items-start gap-4 pt-2">
          <h3 className="font-title text-2xl font-bold text-shh-black">
            {t("fallback.heading")}
          </h3>
          <p className="font-body text-base leading-relaxed text-gray-500">
            {t("fallback.description")}
          </p>
          <p className="font-body text-base leading-relaxed text-gray-500">
            {t("fallback.subdescription")}
          </p>
          <a
            href={DONATION_FALLBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-shh-yellow px-8 py-3.5 font-title text-sm font-bold uppercase tracking-widest text-shh-black transition-all duration-200 hover:brightness-105 active:scale-95"
          >
            {t("fallback.cta")}
            <span aria-hidden="true">↗</span>
          </a>
          <Image
            src="/images/form-error.webp"
            alt=""
            width={224}
            height={224}
            className="mx-auto mt-2 w-56"
            aria-hidden="true"
          />
        </div>
      )}

      {/* ── Classy SDK embed container ── */}
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