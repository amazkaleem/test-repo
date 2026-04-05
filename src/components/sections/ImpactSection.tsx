import { useTranslations } from "next-intl";
import SectionWrapper from "../shared/SectionWrapper";
import VideoCard from "../shared/VideoCard";

export default function ImpactSection() {
  const t = useTranslations("monthlyDonation.impact");
  const videos = [
    { videoId: "zzsGEDYj9TY", captionKey: "video1Caption" },
    { videoId: "7DQIIxN6MRY", captionKey: "video2Caption" },
  ];

  return (
    <SectionWrapper 
      id="impact-section" 
      className="bg-shh-cream"
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
          {videos.map((video) => (
            <figure key={video.videoId} className="mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] bg-shh-yellow p-4 shadow-xl sm:p-8 md:p-10">
              <VideoCard
                videoId={video.videoId}
                className="border-none shadow-none !rounded-xl"
              />

              <figcaption className="mt-4 px-2 font-body text-lg font-medium leading-tight text-shh-black sm:mt-6 sm:px-8 sm:text-xl md:text-2xl">
                {t(video.captionKey)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
