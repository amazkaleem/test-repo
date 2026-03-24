import { useTranslations } from "next-intl";
import { Facebook, Instagram, Youtube } from "lucide-react";
import SectionWrapper from "../shared/SectionWrapper";

export default function FaqSection() {
  const t = useTranslations("monthlyDonation");
  
  // Hardcoded to 8 items since we know there are 8 FAQs in the JSON.
  const faqIndices = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <SectionWrapper 
      id="faq-section" 
      className="bg-[#FFD58A] px-4 py-20 pb-32 md:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* FAQ Header */}
        <h2 className="mb-12 font-title text-4xl font-bold leading-tight text-shh-black sm:text-5xl md:text-6xl">
          {t("faq.headline")}
        </h2>

        {/* FAQ Items */}
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-left">
          {faqIndices.map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <h3 className="font-title text-lg font-bold text-shh-black sm:text-xl md:text-2xl">
                {t(`faq.items.${i}.question`)}
              </h3>
              <p className="font-body text-base text-shh-black/90 md:text-lg">
                {t(`faq.items.${i}.answer`)}
              </p>
              {i < 7 && <hr className="mt-2 border-t border-shh-black" />}
            </div>
          ))}
          {/* Add a bottom divider for the last item as well */}
          <hr className="mt-2 border-t border-shh-black" />
        </div>
      </div>
    </SectionWrapper>
  );
}
