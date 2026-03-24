export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script async src="https://giving.gofundme.com/embedded/api/sdk/js/38471"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
