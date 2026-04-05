import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { locales, type Locale } from "@/types";
import localFont from "next/font/local";
import Script from "next/script";

const fontTitle = localFont({
  src: "../../../public/fonts/gt-walsheim-bold.ttf",
  variable: "--font-title",
  display: "swap",
});

const fontBody = localFont({
  src: "../../../public/fonts/gt-walsheim-regular.ttf",
  variable: "--font-body",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const BASE_URL = "https://www.shhkids.org";

const DESCRIPTION =
  "One Thousand Schools builds schools across rural Honduras and trains teachers to break the cycle of poverty through education.";

// Locale → Open Graph locale format
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

  return {
    metadataBase: new URL(BASE_URL),

    title: {
      template: "%s | One Thousand Schools",
      default: "One Thousand Schools — Education in Honduras",
    },
    description: DESCRIPTION,
    keywords: [
      "Honduras",
      "education",
      "nonprofit",
      "donate",
      "schools",
      "One Thousand Schools",
      "Students Helping Honduras",
    ],

    openGraph: {
      type: "website",
      siteName: "One Thousand Schools",
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      url: locale === "en" ? BASE_URL : `${BASE_URL}/${locale}`,
      title: "One Thousand Schools — Education in Honduras",
      description: DESCRIPTION,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }], // TODO: add real 1200×630 image to /public/og-image.jpg
    },

    twitter: {
      card: "summary_large_image",
      site: "@SHHonduras",
      title: "One Thousand Schools — Education in Honduras",
      description: DESCRIPTION,
      images: ["/og-image.jpg"],
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

  // Load translations server-side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script 
          src="https://giving.gofundme.com/embedded/api/sdk/js/38471" 
          strategy="lazyOnload" 
        />
      </head>
      <body className={`${fontTitle.variable} ${fontBody.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {/* GoFundMe SDK requires this container to validate the installation */}
        <div className="classy-inline-embed" data-campaign-id="782216" />
      </body>
    </html>
  );
}

// Pre-render all 3 locale variants at build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
