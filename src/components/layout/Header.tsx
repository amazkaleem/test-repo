"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X, Heart } from "lucide-react";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "mission" as const, href: "#pitch-section" },
  { key: "donate" as const, href: "#donation-section" },
  { key: "whatsapp" as const, href: "#update-section" },
  { key: "impact" as const, href: "#impact-section" },
];

export default function Header() {
  const t = useTranslations("nav");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* Scroll-triggered background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection observer — highlight the nav link for the section in view */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [navOpen]);

  const closeNav = useCallback(() => setNavOpen(false), []);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 transition-all duration-500">
      {/* Floating pill container */}
      <div
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:px-6",
          scrolled
            ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white/95 shadow-[0_2px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm"
        )}
      >
        {/* Logo */}
        <a href="#monthly-hero" aria-label="One Thousand Schools — home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="One Thousand Schools"
            width={200}
            height={56}
            priority
            className="h-8 w-auto md:h-14 lg:h-14 object-contain"
          />
        </a>

        {/* Desktop center nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.key}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 font-body text-[13px] font-medium transition-all duration-300",
                  isActive
                    ? "bg-shh-green/10 text-shh-green"
                    : "text-shh-black/60 hover:bg-gray-100/80 hover:text-shh-black"
                )}
              >
                {t(link.key)}
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-shh-green" />
                )}
              </a>
            );
          })}

          {/* Divider */}
          <div className="mx-2 h-5 w-px bg-gray-200" />

          <LocaleSwitcher />
        </nav>

        {/* Desktop CTA */}
        <a
          href="#donation-section"
          className="group hidden items-center gap-1.5 rounded-full bg-shh-green px-5 py-2 font-body text-sm font-bold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_4px_16px_rgba(47,203,163,0.35)] active:scale-[0.97] md:inline-flex"
        >
          <Heart className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
          {t("donate")}
        </a>

        {/* Mobile menu trigger */}
        <button
          className="flex items-center gap-1.5 md:hidden"
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
          aria-expanded={navOpen}
        >
          <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-shh-black">
            {t("menu")}
          </span>
          <Menu className="h-5 w-5 text-shh-black" />
        </button>
      </div>

      {/* ── Mobile fullscreen drawer ── */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-white transition-all duration-500",
          navOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5">
          <a href="#monthly-hero" onClick={closeNav}>
            <Image
              src="/images/logo.png"
              alt="One Thousand Schools"
              width={130}
              height={38}
              className="h-8 w-auto object-contain"
            />
          </a>
          <button
            onClick={closeNav}
            aria-label="Close menu"
            className="rounded-full bg-gray-100 p-2.5 transition-all duration-200 hover:bg-gray-200 hover:rotate-90"
          >
            <X className="h-5 w-5 text-shh-black" />
          </button>
        </div>

        {/* Nav links */}
        <nav
          className="flex flex-col items-center gap-1 px-6 pt-10"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={closeNav}
              className="w-full rounded-2xl py-4 text-center font-title text-xl text-shh-black transition-all duration-200 active:scale-[0.98] hover:bg-shh-green/5 hover:text-shh-green"
            >
              {t(link.key)}
            </a>
          ))}

          <div className="my-4 h-px w-12 bg-gray-200" />

          <a
            href="#donation-section"
            onClick={closeNav}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-shh-green py-4 font-title text-xl text-white shadow-[0_4px_16px_rgba(47,203,163,0.25)] transition-all duration-300 active:scale-[0.97] hover:brightness-110"
          >
            <Heart className="h-5 w-5" fill="currentColor" />
            {t("donate")}
          </a>

          <div className="mt-6">
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
