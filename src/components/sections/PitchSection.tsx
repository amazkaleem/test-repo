import { useTranslations } from "next-intl";
import VideoCard from "../shared/VideoCard";
import SectionWrapper from "../shared/SectionWrapper";

interface PitchSectionProps {
  videoId?: string;
}

export default function PitchSection({ videoId = "AvUAG6X-qaA" }: PitchSectionProps) {
  const t = useTranslations("monthlyDonation.pitch");

  return (
    <SectionWrapper 
      id="pitch-section" 
      className="bg-shh-yellow/30"
    >
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="section-display-title">
          {t("headline")}
        </h2>
        <p className="section-display-subtitle">
          {t("subheadline")}
        </p>
      </header>

      <VideoCard
        videoId={videoId}
        className="mx-auto max-w-3xl md:border-[35px] border-shh-yellow"
      />
    </SectionWrapper>
  );
}
