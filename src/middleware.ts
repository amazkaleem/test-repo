import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es", "ja"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
