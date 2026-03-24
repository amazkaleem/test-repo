import { useTranslations } from "next-intl";
import DonationBox from "../shared/DonationBox";
import SectionWrapper from "@/components/shared/SectionWrapper";

interface HeroProps {
    videoSrc?: string;
}

export default function Hero({ videoSrc = "/videos/hero.mp4" }: HeroProps) {
    const t = useTranslations("monthlyDonation.hero");

    return (
        <SectionWrapper
            id="monthly-hero"
            className="relative flex min-h-[90vh] items-end overflow-hidden"
        >
            {/* Video background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden="true"
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Content */}
            <section className="relative z-10 mx-auto flex w-full flex-col items-start justify-between gap-8 px-4 pb-16 pt-32 md:flex-row md:items-end md:justify-center md:px-8 lg:px-16">
                {/* Headlines */}
                <header>
                    <p className="animate-fade-in-up 
                        font-title 
                        text-lg 
                        sm:text-2xl 
                        md:text-4xl 
                        lg:text-6xl 
                        xl:text-8xl 
                        text-white">
                        {t("headline")}
                    </p>

                    <h1 className="animate-fade-in-up font-title 
                        text-4xl 
                        sm:text-5xl 
                        md:text-6xl 
                        lg:text-7xl 
                        xl:text-8xl 
                        leading-tight text-white">
                        {t("subheadline")}
                    </h1>
                </header>

                {/* Donation widget */}
                <DonationBox className="animate-fade-in w-full md:w-auto" />
            </section>
        </SectionWrapper>
    );
}
