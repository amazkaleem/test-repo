"use client";

import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "ja", label: "日本語" },
];

interface LocaleSwitcherProps {
  className?: string;
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("footer");

  function switchLocale(next: string) {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;

    const { pathname, search, hash } = window.location;
    const pathWithoutLocale = pathname.replace(/^\/(en|es|ja)(?=\/|$)/, "") || "/";
    const targetPath = next === "en" ? pathWithoutLocale : `/${next}${pathWithoutLocale}`;

    window.location.href = `${targetPath}${search}${hash}`;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h3 className="font-title text-[11px] uppercase tracking-[0.2em] text-gray-500">
        {t("language")}
      </h3>
      <div className="flex items-center gap-2">
        {LOCALES.map((l) => {
          const isActive = locale === l.code;
          return (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={cn(
                "rounded-full px-3 py-1.5 font-body text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-shh-yellow text-shh-black"
                  : "bg-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-white"
              )}
              aria-label={`Switch language to ${l.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
