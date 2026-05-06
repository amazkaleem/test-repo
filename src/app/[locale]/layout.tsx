import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { locales, type Locale } from "@/types";
import Script from "next/script";
import GlobalWhatsAppModal from "@/components/shared/GlobalWhatsAppModal";
import { MobileDonationModalProvider } from "@/components/shared/MobileDonationModalContext";

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const BASE_URL = "https://www.shhkids.org";

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  ja: "ja_JP",
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(BASE_URL),

    title: {
      template: `%s | ${t("site_name")}`,
      default: t("default_title"),
    },
    description: t("description"),
    keywords: t("keywords").split(","),

    openGraph: {
      type: "website",
      siteName: t("site_name"),
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      alternateLocale: Object.values(OG_LOCALE_MAP).filter((l) => l !== OG_LOCALE_MAP[locale]),
      title: t("default_title"),
      description: t("description"),
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    },

    twitter: {
      card: "summary_large_image",
      site: "@SHHonduras",
      title: t("default_title"),
      description: t("description"),
      images: ["/images/og-image.jpg"],
    },

    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: {
        "en-US": "/",
        "es-ES": "/es",
        "ja-JP": "/ja",
      },
    },

    icons: {
      icon: [
        { url: "/favicon/favicon.ico" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      other: [
        { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      <Script
        src="https://giving.gofundme.com/embedded/api/sdk/js/38471"
        strategy="lazyOnload"
      />
      <NextIntlClientProvider messages={messages}>
        <MobileDonationModalProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <GlobalWhatsAppModal />
        </MobileDonationModalProvider>
      </NextIntlClientProvider>
      {/* GoFundMe SDK requires this container to validate the installation */}
      <div className="classy-inline-embed" data-campaign-id="782216" />
    </>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
