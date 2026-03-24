import { useTranslations } from "next-intl";
import SectionWrapper from "../shared/SectionWrapper";
import VideoCard from "../shared/VideoCard";

export default function ImpactSection() {
  const t = useTranslations("monthlyDonation.impact");

  return (
    <SectionWrapper 
      id="impact-section" 
      className="bg-[#F5F4EF] px-4 py-20 md:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h2
          className="mb-12 font-title font-bold leading-tight text-shh-black
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl"
        >
          {t("headline")}
        </h2>

        {/* Video Cards Grid/List */}
        <div className="flex flex-col gap-10">
          {/* Card 1 */}
          <figure className="mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] bg-[#FBB03B] p-4 shadow-xl sm:p-8 md:p-10">
            <VideoCard
              videoId="zzsGEDYj9TY"
              title={t("headline")}
              className="border-none shadow-none !rounded-xl"
            />
            <figcaption className="mt-4 px-2 font-body text-lg font-medium leading-tight text-shh-black sm:mt-6 sm:px-8 sm:text-xl md:text-2xl">
              {t("video1Caption")}
            </figcaption>
          </figure>

          {/* Card 2 */}
          <figure className="mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] bg-[#FBB03B] p-4 shadow-xl sm:p-8 md:p-10">
            <VideoCard
              videoId="7DQIIxN6MRY"
              title={t("headline")}
              className="border-none shadow-none !rounded-xl"
            />
            <figcaption className="mt-4 px-2 font-body text-lg font-medium leading-tight text-shh-black sm:mt-6 sm:px-8 sm:text-xl md:text-2xl">
              {t("video2Caption")}
            </figcaption>
          </figure>
        </div>
      </div>
    </SectionWrapper>
  );
}
