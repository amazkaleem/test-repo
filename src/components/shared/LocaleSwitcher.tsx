"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
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
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    if (next === locale) return;
    router.push(pathname, { locale: next });
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {LOCALES.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => switchLocale(l.code)}
            className={cn(
              "font-body text-sm transition-colors hover:text-shh-green",
              locale === l.code ? "font-bold text-shh-green" : "text-gray-500"
            )}
            aria-label={`Switch language to ${l.label}`}
            aria-current={locale === l.code ? "true" : undefined}
          >
            {l.label}
          </button>
          {i < LOCALES.length - 1 && (
            <span className="mx-1 select-none text-gray-300">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
