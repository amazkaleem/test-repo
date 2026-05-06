"use client";

import { ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "ja", label: "JA" },
];

interface LocaleSwitcherProps {
  className?: string;
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const currentLocaleLabel =
    LOCALES.find((item) => item.code === locale)?.label ?? locale.toUpperCase();

  function switchLocale(next: string) {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;

    const { pathname, search, hash } = window.location;
    const pathWithoutLocale = pathname.replace(/^\/(en|es|ja)(?=\/|$)/, "") || "/";
    const targetPath = next === "en" ? pathWithoutLocale : `/${next}${pathWithoutLocale}`;

    window.location.href = `${targetPath}${search}${hash}`;
  }

  return (
    <label
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full px-2 py-1 font-body text-sm text-shh-black transition-colors duration-200 hover:bg-shh-black/[0.05]",
        className
      )}
    >
      <Globe className="h-4 w-4 text-shh-black/80" aria-hidden="true" />
      <span aria-hidden="true">{currentLocaleLabel}</span>
      <ChevronDown className="h-3.5 w-3.5 text-shh-black/70" aria-hidden="true" />

      <select
        value={locale}
        onChange={(event) => switchLocale(event.target.value)}
        className="absolute inset-0 cursor-pointer appearance-none rounded-full opacity-0"
        aria-label={t("language")}
      >
        {LOCALES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
