import { DonationSection, FaqSection, Hero,ImpactSection,PitchSection, UpdatesSection } from "@/components/sections";

// Schema.org structured data for the nonprofit — helps Google show rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "One Thousand Schools",
  alternateName: "Students Helping Honduras",
  url: "https://www.shhkids.org",
  logo: "https://www.shhkids.org/images/logo.png",
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <PitchSection />
      <DonationSection/>
      <UpdatesSection/>
      <ImpactSection/>
      <FaqSection/>
    </>
  );
}
