import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "../shared/SectionWrapper";

export default function UpdatesSection() {
  const t = useTranslations("monthlyDonation.updates");

  return (
    <SectionWrapper 
      id="update-section" 
      className="bg-shh-yellow/30"
    >
      <div className="mx-auto max-w-4xl p-8">
        {/* Headline */}
        <h2
          className="section-display-title mx-auto max-w-3xl text-center"
        >
          {t("headline")}
        </h2>

        {/* Images row: Day 1 → Day 68 */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 md:gap-8">
          {/* Day 1 image */}
          <div className="w-56 md:w-64 overflow-hidden rounded-lg">
            <Image
              src="/images/update-section-img1.webp"
              alt={t("imageDay1Alt")}
              width={400}
              height={300}
              className="w-full object-cover"
              style={{ height: "auto" }}
            />
          </div>

          {/* Day 68 image */}
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/update-section-img2.webp"
              alt={t("imageDay68Alt")}
              width={400}
              height={300}
              className="w-full object-cover"
              style={{ height: "auto" }}
            />
          </div>
        </div>

        {/* Description */}
        <p
          className="mx-auto mt-12 max-w-3xl text-center font-body text-shh-black
            text-lg
            sm:text-2xl"
        >
          {t("description")}
        </p>
        
      </div>
    </SectionWrapper>
  );
}
