import type { ReactNode } from "react";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import "./globals.css";

const fontTitle = localFont({
  src: "../../public/fonts/gt-walsheim-bold.ttf",
  variable: "--font-title",
  display: "swap",
});

const fontBody = localFont({
  src: "../../public/fonts/gt-walsheim-regular.ttf",
  variable: "--font-body",
  display: "swap",
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontTitle.variable} ${fontBody.variable}`}>{children}</body>
    </html>
  );
}
