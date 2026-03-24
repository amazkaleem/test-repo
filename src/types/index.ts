export type Locale = "en" | "es" | "ja";

export const locales: Locale[] = ["en", "es", "ja"];

export interface SiteMetadata {
  title: string;
  siteUrl: string;
  blogUrl: string;
  description: string;
  keywords: string[];
  author: string;
  infoEmail: string;
  tripsEmail: string;
  twitter: string;
  facebook: string;
  youtube: string;
  vimeo: string;
  instagram: string;
  github: string;
}
