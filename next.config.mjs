import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "onethousandschools.com" },
      { protocol: "https", hostname: "www.shhkids.org" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://giving.gofundme.com https://www.youtube.com https://cdn.jsdelivr.net;`,
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;",
              "img-src 'self' blob: data: https:;",
              "font-src 'self' data:;",
              "connect-src 'self' https://giving.gofundme.com https://*.gofundme.com https://giving.classy.org;",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://giving.gofundme.com https://giving.classy.org;",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'none';",
              "upgrade-insecure-requests;"
            ].join(" ")
          }
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
