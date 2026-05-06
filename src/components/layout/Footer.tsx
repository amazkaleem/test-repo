import Image from "next/image";
import { Twitter, Facebook, Youtube, Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { IconTextLink } from "@/components/ui/icon-text-link";
import { SITE_NAV_LINKS } from "@/lib/nav";

const SOCIAL_LINKS = [
  { label: "Twitter / X", href: "https://twitter.com/SHHonduras", Icon: Twitter },
  { label: "Facebook", href: "https://www.facebook.com/studentshelpinghonduras", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/user/SHHonduras", Icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/SHHonduras", Icon: Instagram },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative overflow-hidden bg-shh-black text-white">
      {/* Accent gradient line at top */}
      <div className="h-1 w-full bg-gradient-to-r from-shh-green via-shh-yellow to-shh-green" />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10">
        {/* ── Main content ── */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand column */}
          <div className="shrink-0 md:w-80">
            <a href="#monthly-hero" aria-label="One Thousand Schools — home">
              <Image
                src="/images/logo.png"
                alt="One Thousand Schools"
                width={200}
                height={56}
                className="h-8 w-auto md:h-14 invert object-contain"
                style={{ width: "auto" }}
              />
            </a>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-gray-400">
              {t("tagline")}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3 mb-8">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] transition-all duration-300 hover:bg-shh-yellow hover:shadow-[0_0_12px_rgba(47,203,163,0.3)]"
                >
                  <Icon className="h-4 w-4 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:items-center">
            <div className="flex flex-col">
              <h3 className="font-title text-[11px] uppercase tracking-[0.2em] text-gray-500">
                {t("quickLinks")}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {SITE_NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 font-body text-sm text-gray-300 transition-colors duration-200 hover:text-shh-yellow"
                    >
                      {tNav(link.key)}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact — spans 4 cols */}
          <div className="md:col-span-3">
            
            <h3 className="font-title text-[11px] uppercase tracking-[0.2em] text-gray-500">
              {t("contact")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <IconTextLink href="mailto:info@shhkids.org" icon={<Mail className="h-3.5 w-3.5 text-shh-yellow" />}>
                  info@shhkids.org
                </IconTextLink>
              </li>
              <li>
                <IconTextLink href="mailto:trips@shhkids.org" icon={<Mail className="h-3.5 w-3.5 text-shh-yellow" />}>
                  trips@shhkids.org
                </IconTextLink>
              </li>
              <li>
                <IconTextLink href="tel:+16315053745" icon={<Phone className="h-3.5 w-3.5 text-shh-yellow" />}>
                  +1 631 505 3745
                </IconTextLink>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className=" flex flex-col items-center gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between">
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
