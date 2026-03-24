import Image from "next/image";
import { Twitter, Facebook, Youtube, Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const SOCIAL_LINKS = [
  { label: "Twitter / X", href: "https://twitter.com/SHHonduras", Icon: Twitter },
  { label: "Facebook", href: "https://www.facebook.com/studentshelpinghonduras", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/user/SHHonduras", Icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/SHHonduras", Icon: Instagram },
];

const QUICK_LINKS = [
  { labelKey: "mission" as const, href: "#pitch-section" },
  { labelKey: "donate" as const, href: "#donation-section" },
  { labelKey: "whatsapp" as const, href: "#update-section" },
  { labelKey: "impact" as const, href: "#impact-section" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative overflow-hidden bg-shh-black text-white">
      {/* Accent gradient line at top */}
      <div className="h-1 w-full bg-gradient-to-r from-shh-green via-shh-yellow to-shh-green" />

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 lg:px-10">
        {/* ── Main grid ── */}
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand column — spans 5 cols */}
          <div className="md:col-span-5">
            <a href="/" aria-label="One Thousand Schools — home">
              <Image
                src="/images/logo.png"
                alt="One Thousand Schools"
                width={200}
                height={56}
                className="h-8 w-auto md:h-14 lg:h-14 object-contain"
              />
            </a>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-gray-400">
              {t("tagline")}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] transition-all duration-300 hover:bg-shh-green hover:shadow-[0_0_12px_rgba(47,203,163,0.3)]"
                >
                  <Icon className="h-4 w-4 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — spans 3 cols */}
          <div className="md:col-span-3">
            <h3 className="font-title text-[11px] uppercase tracking-[0.2em] text-gray-500">
              {t("quickLinks")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 font-body text-sm text-gray-300 transition-colors duration-200 hover:text-white"
                  >
                    {tNav(link.labelKey)}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — spans 4 cols */}
          <div className="md:col-span-4">
            <h3 className="font-title text-[11px] uppercase tracking-[0.2em] text-gray-500">
              {t("contact")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:info@shhkids.org"
                  className="group inline-flex items-center gap-2.5 font-body text-sm text-gray-300 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 text-shh-green" />
                  info@shhkids.org
                </a>
              </li>
              <li>
                <a
                  href="mailto:trips@shhkids.org"
                  className="group inline-flex items-center gap-2.5 font-body text-sm text-gray-300 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 text-shh-green" />
                  trips@shhkids.org
                </a>
              </li>
              <li>
                <a
                  href="tel:+16315053745"
                  className="group inline-flex items-center gap-2.5 font-body text-sm text-gray-300 transition-colors duration-200 hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 text-shh-green" />
                  +1 631 505 3745
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="font-body text-xs text-gray-600">
            {t("nonprofit")}
          </p>
        </div>
      </div>
    </footer>
  );
}
