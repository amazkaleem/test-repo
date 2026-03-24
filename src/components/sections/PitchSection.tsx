import { useTranslations } from "next-intl";
import VideoCard from "../shared/VideoCard";
import SectionWrapper from "../shared/SectionWrapper";

interface PitchSectionProps {
  videoId?: string;
}

export default function PitchSection({ videoId = "10jYvPEGtt0" }: PitchSectionProps) {
  const t = useTranslations("monthlyDonation.pitch");

  return (
    <SectionWrapper 
      id="pitch-section" 
      className="bg-[#FFD58A]/90 px-4 py-20 md:px-8 lg:px-16"
    >
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="font-title leading-tight text-shh-black
          text-4xl 
          sm:text-2xl 
          md:text-4xl 
          lg:text-6xl"
        >
          {t("headline")}
        </h2>
        <p className="mt-2
          font-title 
          text-lg 
          sm:text-2xl 
          md:text-2xl  
          text-shh-black"
        >
          {t("subheadline")}
        </p>
      </header>

      <VideoCard
        videoId={videoId}
        title={t("headline")}
        className="mx-auto max-w-3xl md:border-[35px] border-[#FBB03B]"
      />
    </SectionWrapper>
  );
}
