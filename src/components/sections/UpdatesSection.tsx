import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "../shared/SectionWrapper";

export default function UpdatesSection() {
  const t = useTranslations("monthlyDonation.updates");

  return (
    <SectionWrapper id="update-section" className="bg-shh-yellow/30">
      <div className="mx-auto max-w-4xl">
        {/* Headline */}
        <h2 className="section-display-title mx-auto max-w-3xl text-center">{t("headline")}</h2>

        {/* Images row: Day 1 → Day 68 */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 md:gap-8">
          {/* Day 1 image */}
          <div className="w-56 overflow-hidden rounded-lg md:w-64">
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
        <p className="mx-auto mt-12 max-w-xl text-center font-body text-lg text-shh-black sm:text-2xl md:text-2xl">
          {t("description")}
        </p>

        {/* WhatsApp Broadcast Channel CTA */}
        <div className="mx-auto mt-10 flex flex-col items-center gap-4 rounded-2xl bg-white/60 px-6 py-8 shadow-sm backdrop-blur-sm max-w-md">
          {/* WhatsApp icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-12 w-12"
            aria-hidden="true"
          >
            <path
              fill="#25D366"
              d="M24 4C12.954 4 4 12.954 4 24c0 3.53.93 6.93 2.68 9.95L4 44l10.35-2.62A19.86 19.86 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4Z"
            />
            <path
              fill="#fff"
              d="M34.6 28.8c-.55-.28-3.27-1.62-3.78-1.8-.51-.18-.88-.28-1.25.28-.37.55-1.43 1.8-1.76 2.17-.32.37-.65.41-1.2.14-.55-.28-2.33-.86-4.44-2.74-1.64-1.46-2.75-3.27-3.07-3.82-.32-.55-.03-.85.24-1.13.25-.25.55-.65.83-.97.27-.33.37-.55.55-.92.18-.37.09-.69-.05-.97-.14-.28-1.25-3.01-1.71-4.12-.45-1.08-.91-0.93-1.25-0.95h-1.07c-.37 0-.97.14-1.47.69-.51.55-1.93 1.89-1.93 4.6 0 2.72 1.98 5.34 2.25 5.71.28.37 3.89 5.93 9.42 8.32 1.32.57 2.35.91 3.15 1.16 1.32.42 2.53.36 3.48.22 1.06-.16 3.27-1.34 3.73-2.63.46-1.29.46-2.4.32-2.63-.14-.23-.51-.37-1.07-.65Z"
            />
          </svg>

          <p className="text-center font-display text-lg font-semibold text-shh-black sm:text-xl">
            {t("broadcastHeadline")}
          </p>
    

          {/* Button + QR Code row */}
          <div className="mt-2 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
            {/* Join Now button */}
            <a
              href="https://whatsapp.com/channel/0029VbCzgyG90x30OG8uUx0K"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 font-display text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#1da851] hover:shadow-lg hover:scale-105 active:scale-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.77.462 3.47 1.34 4.97L2 22l5.18-1.32A9.95 9.95 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm5.3 13.4c-.275-.14-1.635-.81-1.89-.9-.255-.09-.44-.14-.625.14-.185.275-.715.9-.88 1.085-.16.185-.325.205-.6.07-.275-.14-1.165-.43-2.22-1.37-.82-.73-1.375-1.635-1.535-1.91-.16-.275-.015-.425.12-.565.125-.125.275-.325.415-.485.135-.165.185-.275.275-.46.09-.185.045-.345-.025-.485-.07-.14-.625-1.505-.855-2.06-.225-.54-.455-.465-.625-.475h-.535c-.185 0-.485.07-.735.345-.255.275-.965.945-.965 2.3 0 1.36.99 2.67 1.125 2.855.14.185 1.945 2.965 4.71 4.16.66.285 1.175.455 1.575.58.66.21 1.265.18 1.74.11.53-.08 1.635-.67 1.865-1.315.23-.645.23-1.2.16-1.315-.07-.115-.255-.185-.53-.325Z" />
              </svg>
              {t("broadcastCta")}
            </a>

            {/* "or" divider */}
            <div className="flex items-center gap-3 sm:flex-col sm:gap-2">
              <div className="h-px w-8 bg-shh-black/20 sm:h-8 sm:w-px" />
              <span className="font-body text-sm text-shh-black/50">{t("broadcastOr")}</span>
              <div className="h-px w-8 bg-shh-black/20 sm:h-8 sm:w-px" />
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center gap-2">
              <div className="overflow-hidden rounded-xl border-2 border-[#25D366]/30 bg-white p-2 shadow-sm">
                <Image
                  src="/images/qr-code.png"
                  alt="Scan to join WhatsApp broadcast channel"
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              </div>
              <span className="font-body text-xs text-shh-black/60">{t("broadcastScan")}</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
