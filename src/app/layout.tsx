import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        {children}
        <Script
          src="https://giving.gofundme.com/embedded/api/sdk/js/38471"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
