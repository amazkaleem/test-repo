import dynamic from "next/dynamic";
import { Hero } from "@/components/sections";

const PitchSection = dynamic(() => import("@/components/sections/PitchSection"));
const DonationSection = dynamic(() => import("@/components/sections/DonationSection"));
const UpdatesSection = dynamic(() => import("@/components/sections/UpdatesSection"));
const ImpactSection = dynamic(() => import("@/components/sections/ImpactSection"));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"));

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "One Thousand Schools",
    alternateName: "Students Helping Honduras",
    url: "https://www.milescuelas.org",
    logo: "https://www.milescuelas.org/images/logo.png",
    inLanguage: locale,
    description:
      "One Thousand Schools builds schools across rural Honduras and trains teachers to alleviate violence and extreme poverty through education.",
    areaServed: "Honduras",
    nonprofitStatus: "Nonprofit501c3",
    sameAs: [
      "https://www.facebook.com/studentshelpinghonduras",
      "https://twitter.com/SHHonduras",
      "https://www.instagram.com/SHHonduras",
      "https://www.youtube.com/user/SHHonduras",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@shhkids.org",
      contactType: "customer support",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <PitchSection />
      <DonationSection />
      <UpdatesSection />
      <ImpactSection />
      <FaqSection />
    </>
  );
}
