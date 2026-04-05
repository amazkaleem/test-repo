"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import DonationBox from "../shared/DonationBox";
import SectionWrapper from "../shared/SectionWrapper";

const DEFAULT_SUPPORTERS = 327;
const GOAL_SUPPORTERS = 1000;

export default function DonationSection() {
  const t = useTranslations("monthlyDonation");
  const [supportersCount, setSupportersCount] = useState(DEFAULT_SUPPORTERS);

  useEffect(() => {
    async function loadSupportersCount() {
      try {
        const response = await fetch("/api/supporters", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();

        if (
          typeof data === "object" &&
          data !== null &&
          "count" in data &&
          typeof data.count === "number"
        ) {
          setSupportersCount(data.count);
        }
      } catch {
        // Keep fallback count when API is unavailable.
        setSupportersCount(DEFAULT_SUPPORTERS);
      }
    }

    loadSupportersCount();
  }, []);

  const progressPercent = Math.min((supportersCount / GOAL_SUPPORTERS) * 100, 100);
  const formattedSupporters = supportersCount.toLocaleString();
  const formattedGoal = GOAL_SUPPORTERS.toLocaleString();

  return (
    <SectionWrapper id="donation-section" className="bg-[#F5F4EF]">
      <div className="mx-auto max-w-3xl text-center">
        {/* Social-proof headline */}
        <h2 className="section-display-title">
          {t("socialProof.headline", { count: formattedSupporters })}
        </h2>
        <p className="section-display-subtitle">{t("socialProof.subheadline")}</p>

        {/* Progress bar */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="relative h-12 overflow-hidden rounded-full border-2 border-shh-black bg-white">
            {/* Filled portion */}
            <div
              className="absolute inset-y-0 left-0 m-[3px] rounded-full bg-[#FECB26] transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Label */}
            <span className="absolute inset-0 flex items-center justify-start pl-5 font-title text-sm text-shh-black">
              {t("donation.progress.label", {
                count: formattedSupporters,
                goal: formattedGoal,
              })}
            </span>
          </div>
          <p className="mt-3 font-body text-lg text-gray-600 sm:text-2xl md:text-2xl">
            {t("donation.progress.cta")}
          </p>
        </div>

        {/* "Become a monthly donor" headline */}
        <h3 className="mt-6 font-title text-4xl font-bold leading-tight text-shh-black sm:text-2xl md:text-4xl lg:text-6xl">
          {t("donation.donationSection.headline")}
        </h3>

        {/* Donation widget (reusing existing DonationBox) */}
        <div className="mt-10 flex justify-center">
          <DonationBox />
        </div>

        {/* Cancel note */}
        <p className="mt-6 font-body text-lg text-gray-500 sm:text-2xl md:text-2xl">
          {t("donation.donationSection.cancelNote")}
        </p>
      </div>
    </SectionWrapper>
  );
}
