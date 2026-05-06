"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_NAV_LINKS } from "@/lib/nav";
import { useMobileDonationModal } from "@/components/shared/MobileDonationModalContext";
import { DonateDrawerTriggerButton, DonateSectionLink } from "@/components/ui/donate-section-link";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const { open: openMobileDonationModal } = useMobileDonationModal();
  const [navOpen, setNavOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  /* Show header on scroll down past hero, hide when back at top */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Show header once user scrolls past 100px
      if (y > 5) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection observer — highlight the nav link for the section in view */
  useEffect(() => {
    const ids = SITE_NAV_LINKS.map((l) => l.href.replace("#", ""));
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
    <>
      <header
        className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        visible
          ? "translate-y-0 bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          : "bg-white/95 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none md:-translate-y-full"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-10">
        {/* Logo */}
        <a href="#monthly-hero" aria-label="One Thousand Schools — home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="One Thousand Schools"
            width={200}
            height={56}
            priority
            sizes="(max-width: 768px) 150px, 200px"
            className="h-8 w-auto object-contain md:h-14"
            style={{ width: "auto" }}
          />
        </a>

        {/* Desktop center nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {SITE_NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.key}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 font-body text-[13px] font-medium transition-all duration-300",
                  isActive
                    ? "bg-shh-yellow text-shh-black font-bold"
                    : "text-shh-black hover:font-bold"
                )}
              >
                {t(link.key)}
              </a>
            );
          })}

          {/* End Desktop nav links */}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <DonateSectionLink variant="header">{t("donate")}</DonateSectionLink>
        </div>

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
    </header>

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
              style={{ width: "auto" }}
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
          {SITE_NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={closeNav}
              className="w-full rounded-2xl py-4 text-center font-title text-xl text-shh-black transition-all duration-200 active:scale-[0.98] hover:bg-shh-yellow/10 hover:text-shh-yellow"
            >
              {t(link.key)}
            </a>
          ))}

          <LocaleSwitcher className="mt-4" />

          <div className="my-4 h-px w-12 bg-gray-200" />

          <DonateDrawerTriggerButton
            onClick={() => {
              closeNav();
              openMobileDonationModal();
            }}
          >
            {t("donate")}
          </DonateDrawerTriggerButton>
        </nav>
      </div>
    </>
  );
}
