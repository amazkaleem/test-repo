import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Script
          src="https://giving.gofundme.com/embedded/api/sdk/js/38471"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
