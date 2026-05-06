"use client";

import { useTranslations } from "next-intl";
import { X, Copy, Check, Link, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SaveContactCardIcon, WhatsappGlyphIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const t = useTranslations("monthlyDonation.whatsappModal");
  const [mounted, setMounted] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const phone = "50498842528";
  const displayPhone = "+504-9884-2528";
  const message = t("prefill");
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const waShortLink = `wa.me/${phone}`;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(displayPhone);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${waShortLink}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleVCFDownload = () => {
    const vcfData = `BEGIN:VCARD\nVERSION:3.0\nN:;One Thousand Schools;;;\nFN:One Thousand Schools\nTEL;type=CELL;type=VOICE;waid=${phone}:${displayPhone}\nEND:VCARD`;
    const blob = new Blob([vcfData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "One_Thousand_Schools.vcf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
        isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="wa-modal-title"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )} 
        onClick={onClose} 
      />
      <div 
        className={cn(
          "relative w-full max-w-lg scale-95 transform rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 sm:p-8 text-center font-body border border-gray-100",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
          aria-label={t("close")}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#EBF8EB]">
          <WhatsappGlyphIcon size={40} className="text-[#25D366]" />
          <div className="absolute -top-4 -left-6 h-2 w-2 rounded-full bg-yellow-400 rotate-12"></div>
          <div className="absolute top-2 -right-4 h-1.5 w-1.5 rounded-full bg-[#1AA14A] rotate-45"></div>
          <div className="absolute -bottom-2 -left-3 h-2 w-1.5 rounded-sm bg-[#1AA14A] -rotate-12"></div>
          <div className="absolute -top-3 right-5 h-2.5 w-1 rounded-full bg-[#1AA14A] rotate-45"></div>
          <div className="absolute bottom-1 right-[-10px] h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
          <div className="absolute top-1/2 -left-10 h-1.5 w-1.5 rounded-full bg-[#1AA14A]"></div>
        </div>
        
        <h2 id="wa-modal-title" className="mb-2 font-title text-3xl font-extrabold text-[#111827]">
          {t("title")}
        </h2>
        <p className="mb-6 text-base text-gray-500 font-medium">
          {t("description")}
        </p>
        
        <div className="w-full rounded-2xl border border-gray-100 p-5 mb-5 pb-6 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)]">
          <p className="mb-1 text-sm font-medium text-gray-500">
            {t("ourNumber")}
          </p>
          <p className="font-title text-[1.7rem] font-bold text-[#111827] mb-6">
            {displayPhone}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              onClick={handleVCFDownload}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#F4FCF4] border border-[#E3F4E3] hover:border-[#25D366]/40 transition-colors group"
            >
              <div className="mb-2 text-[#25D366]">
                <SaveContactCardIcon size={28} />
              </div>
              <span className="text-sm font-bold text-[#25D366] mb-1 group-hover:text-[#1AA14A]">
                {t("saveVcfTitle")}
              </span>
              <span className="text-xs text-center text-gray-500 leading-tight px-1">
                {t("saveVcfDesc")}
              </span>
            </button>
            
            <button 
              onClick={handleCopyNumber}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="text-[#1AA14A] mb-2">
                {copiedNumber ? <Check size={28} /> : <Copy size={28} />}
              </div>
              <span className="text-sm font-bold text-[#111827] mb-1">
                {copiedNumber ? t("copied") : t("copyNumberTitle")}
              </span>
              <span className="text-xs text-center text-gray-500 leading-tight px-1">
                {t("copyNumberDesc")}
              </span>
            </button>
          </div>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex w-full items-center justify-between gap-3 rounded-xl bg-[#24D366] px-5 py-4 font-title text-base font-bold text-white transition-all hover:bg-[#15803D] active:scale-[0.98]"
        >
          <div className="flex items-center gap-2">
            <WhatsappGlyphIcon size={24} className="shrink-0" />
            {t("chatAction")}
          </div>
          <ChevronRight className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
        </a>
        <p className="mt-2.5 text-xs font-medium text-gray-500">
          {t("chatDesc")}
        </p>

        <div className="relative mt-7 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative bg-white px-4 text-xs font-bold uppercase text-gray-500">
            {t("or")}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-[#F9FAFB] border border-gray-100 p-3 pl-4">
          <div className="flex items-center gap-3">
            <div className="text-[#1AA14A]">
              <Link size={18} strokeWidth={2.5} />
            </div>
            <div className="text-left font-medium">
              <div className="text-xs text-[#111827]">{t("useLink")}</div>
              <div className="text-sm text-[#1AA14A] tracking-tight">{waShortLink}</div>
            </div>
          </div>
          <button
            onClick={handleCopyLink}
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-[#1AA14A] hover:bg-gray-50 transition-colors"
          >
            {copiedLink ? t("copied") : t("copyLink")}
          </button>
        </div>
        
      </div>
    </div>
  );
}
