import type { MetadataRoute } from "next";
import { locales } from "@/types";

const BASE_URL = "https://www.shhkids.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: locale === "en" ? `${BASE_URL}/` : `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1 : 0.8,
  }));
}
