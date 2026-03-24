import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "../shared/SectionWrapper";

export default function UpdatesSection() {
  const t = useTranslations("monthlyDonation.updates");

  return (
    <SectionWrapper 
      id="update-section" 
      className="bg-[#FFD58A]/90 px-4 py-20 md:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-4xl">
        {/* Headline */}
        <h2
          className="mx-auto max-w-3xl text-center font-title leading-tight text-shh-black
            text-4xl
            sm:text-2xl
            md:text-4xl  
            lg:text-6xl"
        >
          {t("headline")}
        </h2>

        {/* Images row: Day 1 → Day 68 */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 md:gap-8">
          {/* Day 1 image */}
          <div className="w-56 md:w-64 overflow-hidden rounded-lg">
            <Image
              src="/images/update-section-img1.webp"
              alt="Day 1 — school construction begins"
              width={400}
              height={300}
              className="object-cover"
            />
          </div>

          {/* Day 68 image */}
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/update-section-img2.webp"
              alt="Day 68 — school almost finished"
              width={400}
              height={300}
              className="object-cover"
            />
          </div>
        </div>

        {/* Description */}
        <p
          className="mx-auto mt-12 max-w-xl text-center font-body text-shh-black
            text-lg
            sm:text-2xl
            md:text-2xl"
        >
          {t("description")}
        </p>
      </div>
    </SectionWrapper>
  );
}
