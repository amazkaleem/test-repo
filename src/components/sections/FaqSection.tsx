import { useTranslations } from "next-intl";
import SectionWrapper from "../shared/SectionWrapper";

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqSection() {
  const t = useTranslations("monthlyDonation");
  
  // Get the full faqs array from the translations
  const faqs = t.raw("faq.items");

  return (
    <SectionWrapper 
      id="faq-section" 
      className="bg-shh-yellow/30 pb-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* FAQ Header */}
        <h2 className="mb-12 font-title text-4xl font-bold leading-tight text-shh-black sm:text-5xl md:text-6xl">
          {t("faq.headline")}
        </h2>

        {/* FAQ Items */}
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-left">
          {faqs.map((faq:FaqItem, i:number) => (
            <div key={i} className="flex flex-col gap-4">
              <h3 className="font-title text-lg font-bold text-shh-black sm:text-xl md:text-2xl">
                {faq.question}
              </h3>
              <p className="font-body text-base text-shh-black/90 md:text-lg">
                {faq.answer}
              </p>
              {i < faqs.length - 1 && <hr className="mt-2 border-t border-shh-black" />}
            </div>
          ))}
          {/* Add a bottom divider for the last item as well */}
          <hr className="mt-2 border-t border-shh-black" />
        </div>
      </div>
    </SectionWrapper>
  );
}
