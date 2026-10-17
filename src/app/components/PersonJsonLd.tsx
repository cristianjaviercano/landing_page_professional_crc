import { getProfile, type Locale } from "../i18n";

/** schema.org Person, so search engines and AI assistants can read the profile. */
export default function PersonJsonLd({ locale }: { locale: Locale }) {
  const { academia, contact, education, headline, industry, siteUrl, summary } = getProfile(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Cristian Javier Cano Mogollón",
    url: locale === "en" ? `${siteUrl}/en` : siteUrl,
    image: `${siteUrl}/amarillo.png`,
    jobTitle: headline,
    description: summary,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Montería", addressRegion: "Córdoba", addressCountry: "CO" },
    sameAs: [contact.linkedin, contact.instagram],
    knowsLanguage: ["es", "en"],
    alumniOf: [...new Set(education.map((e) => e.org).filter(Boolean))].map((name) => ({ "@type": "CollegeOrUniversity", name })),
    worksFor: { "@type": "CollegeOrUniversity", name: academia[0].org },
    hasOccupation: industry.slice(0, 1).map((i) => ({ "@type": "Occupation", name: i.role })),
    knowsAbout:
      locale === "en"
        ? ["Logistics", "Operations management", "Simulation", "Queueing theory", "Artificial intelligence", "Open innovation"]
        : ["Logística", "Gestión de operaciones", "Simulación", "Teoría de colas", "Inteligencia artificial", "Innovación abierta"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
