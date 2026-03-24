"use client";

import { useTranslations } from "next-intl";
import DonationBox from "../shared/DonationBox";
import SectionWrapper from "../shared/SectionWrapper";

const CURRENT_SUPPORTERS = 327;
const GOAL_SUPPORTERS = 1000;
const PROGRESS_PERCENT = (CURRENT_SUPPORTERS / GOAL_SUPPORTERS) * 100;

export default function DonationSection() {
  const t = useTranslations("monthlyDonation");

  return (
    <SectionWrapper 
      id="donation-section" 
      className="bg-[#F5F4EF] px-4 py-20 md:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Social-proof headline */}
        <h2
          className="font-title leading-tight text-shh-black
            text-4xl
            sm:text-2xl
            md:text-4xl
            lg:text-6xl"
        >
          {t("socialProof.headline")}
        </h2>
        <p
          className="mt-2
            font-title
            text-lg
            sm:text-2xl
            md:text-2xl
            text-shh-black"
        >
          {t("socialProof.subheadline")}
        </p>

        {/* Progress bar */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="relative h-12 overflow-hidden rounded-full border-2 border-shh-black bg-white">
            {/* Filled portion */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#FECB26] m-[3px] transition-all duration-700"
              style={{ width: `${PROGRESS_PERCENT}%` }}
            />
            {/* Label */}
            <span className="absolute inset-0 flex items-center justify-start pl-5 font-title text-sm text-shh-black">
              {t("donation.progress.label")}
            </span>
          </div>
          <p className="mt-3 font-body text-lg sm:text-2xl md:text-2xl text-gray-600">
            {t("donation.progress.cta")}
          </p>
        </div>

        {/* "Become a monthly donor" headline */}
        <h3
          className="mt-6 font-title font-bold leading-tight text-shh-black
            text-4xl
            sm:text-2xl
            md:text-4xl
            lg:text-6xl"
        >
          {t("donation.donationSection.headline")}
        </h3>

        {/* Donation widget (reusing existing DonationBox) */}
        <div className="mt-10 flex justify-center">
          <DonationBox />
        </div>

        {/* Cancel note */}
        <p className="mt-6 font-body text-lg sm:text-2xl md:text-2xl text-gray-500">
          {t("donation.donationSection.cancelNote")}
        </p>
      </div>
    </SectionWrapper>
  );
}