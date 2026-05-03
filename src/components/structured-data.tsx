/**
 * Schema.org JSON-LD blocks for SEO + AEO (answer-engine optimization).
 * Rendered into the document head of the homepage so crawlers (Google,
 * ChatGPT, Perplexity, Bing) can read Edubros as a structured entity.
 */

import { site, formatAddress } from "@/lib/site";

type FaqItem = { q: string; a: string };

export function OrganizationLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
    "@id": `${site.url}#organization`,
    name: site.name,
    legalName: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og.jpg`,
    email: site.email,
    telephone: `+${site.whatsappNumber}`,
    description: site.about.short,
    foundingDate: `${site.foundedYear}-01-01`,
    foundingLocation: {
      "@type": "Place",
      name: `${site.city}, Italy`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: [
      { "@type": "Country", name: "Italy" },
      { "@type": "Country", name: "India" },
    ],
    knowsLanguage: site.languages,
    sameAs: [site.instagram.url],
    serviceType: [
      "Italian university admissions consulting",
      "Italian student visa support",
      "Bachelor's degree application",
      "Master's degree application",
      "PhD application",
      "ISEE / DSU scholarship guidance",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    name: site.name,
    url: site.url,
    description: site.about.short,
    inLanguage: "en",
    publisher: { "@id": `${site.url}#organization` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServicesLd() {
  const services = [
    {
      name: "Bachelor's degree admission to Italian universities",
      description:
        "End-to-end Bachelor's application support: program selection, TOLC preparation, document translations and Declaration of Value, application submission, scholarship and DSU coordination.",
    },
    {
      name: "Master's degree admission to Italian universities",
      description:
        "Master's application support across Italian public and private universities, including SOP and transcript preparation, scholarship applications, and visa coordination.",
    },
    {
      name: "PhD admission to Italian universities",
      description:
        "PhD application support: research-group matching, proposal drafting, supervisor outreach, and post-acceptance bureaucracy including codice fiscale and permesso di soggiorno.",
    },
    {
      name: "Italian student visa support",
      description:
        "Document checks, Statement of Purpose review, mock interview preparation, and consulate-appointment coordination for the Italian student visa (Type D).",
    },
  ];
  const data = {
    "@context": "https://schema.org",
    "@graph": services.map((s, i) => ({
      "@type": "Service",
      "@id": `${site.url}#service-${i + 1}`,
      name: s.name,
      description: s.description,
      provider: { "@id": `${site.url}#organization` },
      areaServed: { "@type": "Country", name: "Italy" },
      audience: { "@type": "EducationalAudience", educationalRole: "student" },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Silence "unused" for the import — formatAddress isn't needed here yet but
// keeping the import path consistent with site.ts public surface.
void formatAddress;
