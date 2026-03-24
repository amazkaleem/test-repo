import { createNavigation } from "next-intl/navigation";
import { locales } from "@/types";

// Use these instead of next/navigation to keep locale-prefix and NEXT_LOCALE cookie in sync
export const { useRouter, usePathname, Link, redirect } = createNavigation({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
