# One Thousand Schools — Donation Website

Single-page donation website for [One Thousand Schools / Students Helping Honduras](https://onethousandschools.com). Built with Next.js 14, Tailwind CSS, ShadCN UI, and next-intl.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + ShadCN UI |
| Internationalization | next-intl v4 |
| Language | TypeScript |
| Package manager | npm |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app auto-redirects to the correct locale based on your browser language.

Other commands:

```bash
npm run build   # production build
npm run lint    # ESLint check
```

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # all page routes live here
│   │   ├── layout.tsx      # SEO metadata + locale provider
│   │   └── page.tsx        # single-page composition
│   ├── api/
│   │   ├── donate/         # Phase 3: Classy integration
│   │   └── whatsapp/       # Phase 3: WhatsApp broadcast signup
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # one file per page section
│   ├── shared/             # SectionWrapper, StatCard, LocaleSwitcher
│   └── ui/                 # ShadCN components (button, input)
├── messages/               # translation files (en, es, ja)
├── types/index.ts          # Locale type + SiteMetadata interface
├── navigation.ts           # locale-aware router — import from here, not next/navigation
├── middleware.ts           # locale routing
└── i18n.ts                 # next-intl config
```

---

## Internationalization

Supported locales: **English** (`/`), **Spanish** (`/es`), **Japanese** (`/ja`).

The default locale (English) has no URL prefix. Browser language detection is automatic — a Spanish-language browser visiting `/` is redirected to `/es`.

### Adding or editing strings

All UI strings live in `src/messages/`. Each file has the same key structure:

```
src/messages/
├── en.json
├── es.json
└── ja.json
```

To add a new string:
1. Add the key to `en.json`
2. Add the translated value to `es.json` and `ja.json`
3. Use it in a component: `const t = useTranslations("namespace"); t("key")`

### Adding a new locale

1. Add the locale code to `src/types/index.ts` → `locales` array
2. Add the same code to `src/middleware.ts` → `locales` array
3. Add the same code to `src/navigation.ts` → `locales` array
4. Create `src/messages/<code>.json` with all keys translated
5. Add an entry to `src/app/sitemap.ts`

### Important: locale-aware navigation

Always import `useRouter`, `usePathname`, and `Link` from `@/navigation`, **not** from `next/navigation`. Using `next/navigation` directly will break locale switching because it won't update the `NEXT_LOCALE` cookie.

```ts
// correct
import { useRouter, Link } from "@/navigation";

// wrong — breaks locale switching
import { useRouter } from "next/navigation";
```

---

## Brand Tokens

| Token | Value | Usage |
|---|---|---|
| `shh-green` | `#2fcba3` | Primary action colour, headings |
| `shh-yellow` | `#f9c947` | CTA buttons, accent borders |
| `shh-black` | `#282424` | Body text, footer background |
| `font-title` | GT-Walsheim-Bold | All headings |
| `font-body` | GT-Walsheim-Regular | All body text |

Font files: `public/fonts/gt-walsheim-bold.ttf` and `gt-walsheim-regular.ttf`.

---

## Adding a New Page Section

1. Create `src/components/sections/YourSection.tsx`
2. Add translation keys to all three `src/messages/*.json` files
3. Import and add `<YourSection />` to `src/app/[locale]/page.tsx`
4. Use `<SectionWrapper id="your-id">` to keep padding consistent

---

## Environment Variables

Create a `.env.local` file (never commit this):

```bash
# Phase 3 — Classy donation integration
CLASSY_CLIENT_ID=
CLASSY_CLIENT_SECRET=

# Phase 3 — WhatsApp broadcast (WATI or Twilio)
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
```

---

## Open Items (Phase 3)

- `src/components/sections/DonationForm.tsx` — Classy embed or API-driven form
- `src/components/sections/WhatsAppSignup.tsx` — broadcast list signup form
- `src/app/api/donate/route.ts` — Classy webhook handler
- `src/app/api/whatsapp/route.ts` — WhatsApp signup trigger
- `public/og-image.jpg` — add a real 1200×630 hero image for social sharing

---

## Deployment

Recommended: [Vercel](https://vercel.com). Connect the repo, set environment variables in the Vercel dashboard, and deploy. No extra configuration needed — `next.config.mjs` is production-ready.
