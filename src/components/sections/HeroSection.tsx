"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import heroPoster from "../../../public/images/hero-poster.webp";
import mobileBg from "../../../public/images/mobile-bg.webp";
import DonationBox from "../shared/DonationBox";
import { useMobileDonationModal } from "@/components/shared/MobileDonationModalContext";
import SectionWrapper from "@/components/shared/SectionWrapper";

interface HeroProps {
    videoSrc?: string;
    mobileVideoSrc?: string;
}

export default function Hero({
    videoSrc = "/videos/hero.mp4",
    mobileVideoSrc = "/videos/hero.mp4",
}: HeroProps) {
    const t = useTranslations("monthlyDonation.hero");
    const { isOpen: showDonationModal, open: openModal, close: closeModal } = useMobileDonationModal();

    /* Lock body scroll when the mobile donation modal is open */
    useEffect(() => {
        if (showDonationModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showDonationModal]);

    return (
        <>
            <SectionWrapper
                id="monthly-hero"
                className="relative flex min-h-[100svh] items-center overflow-hidden bg-neutral-900"
            >
                {/* Desktop Video background */}
                {/* Desktop poster — preloaded by Next.js to prevent white flash on first load */}
                <Image
                    src={heroPoster}
                    placeholder="blur"
                    alt=""
                    fill
                    priority
                    quality={60}
                    sizes="100vw"
                    className="hidden object-cover md:block"
                    aria-hidden="true"
                />

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 hidden h-full w-full object-cover md:block"
                    aria-hidden="true"
                >
                    <source src={videoSrc} type="video/mp4" media="(min-width: 768px)" />
                </video>

                {/* Mobile: static image loads first, acts as poster/fallback if video is blocked */}
                <Image
                    src={mobileBg}
                    placeholder="blur"
                    alt="School construction in Honduras"
                    fill
                    priority
                    quality={60}
                    sizes="(max-width: 767px) 100vw, 0px"
                    className="block object-cover md:hidden"
                />

                {/* Mobile: video overlays the image above once it loads */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 block h-full w-full object-cover md:hidden"
                    aria-hidden="true"
                >
                    <source src={mobileVideoSrc} type="video/mp4" />
                </video>

                {/* Mobile dark overlay for text legibility */}
                <div className="absolute inset-0 bg-black/15 md:hidden" aria-hidden="true" />

                {/* Content */}
                <section className="relative z-10 mx-auto flex w-full flex-col items-center justify-center gap-6 px-4 pb-24 text-center md:flex-row md:items-center md:justify-center md:gap-8 md:px-8 md:pb-16 md:pt-[35px] md:text-left">
                    {/* Headlines */}
                    <header>
                        <h1 className="animate-fade-in-up font-title text-white md:text-white">
                            <span className="block text-2xl lg:text-4xl xl:text-6xl mb-2">
                                {t("headline")}
                            </span>
                            <span className="block max-w-[1000px] text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
                                {t("subheadline")}
                            </span>
                        </h1>

                        {/* Mobile-only GIVE TODAY button */}
                        <div className="mt-8 flex justify-center md:hidden">
                            <button
                                type="button"
                                onClick={openModal}
                                className="hero-give-btn rounded-md bg-shh-yellow px-10 py-3.5 font-title text-sm font-bold uppercase tracking-widest text-shh-black transition-all duration-200 hover:brightness-105 active:scale-95"
                            >
                                {t("giveToday")}
                            </button>
                        </div>
                    </header>

                    {/* Desktop-only inline Donation widget */}
                    <DonationBox className="hidden animate-fade-in md:block md:w-[380px] md:shrink-0" />
                </section>
            </SectionWrapper>

            {/* ─── Mobile Fullscreen Donation Modal ─── */}
            <div
                className={`fixed inset-0 z-50 flex items-start justify-center bg-white md:hidden transition-all duration-300 ${
                    showDonationModal
                        ? "visible opacity-100 translate-y-0"
                        : "invisible opacity-0 translate-y-full pointer-events-none"
                }`}
                role="dialog"
                aria-modal={showDonationModal ? true : undefined}
                aria-hidden={!showDonationModal}
                aria-label="Donation form"
            >
                {/* Close button */}
                <button
                    type="button"
                    onClick={closeModal}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-shh-black transition-colors hover:bg-gray-100"
                    aria-label="Close donation form"
                >
                    ✕
                </button>

                {/* Donation widget */}
                <div className="w-full overflow-y-auto px-4 pt-14 pb-8">
                    <DonationBox className="mx-auto max-w-[400px] shadow-none" />
                </div>
            </div>
        </>
    );
}
