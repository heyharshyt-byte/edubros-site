import { Logo, Fleur } from "@/components/logo";
import { LeadForm } from "@/components/lead-form";
import { WhatsAppButton, WhatsAppFloating } from "@/components/whatsapp-button";
import { FaqLd } from "@/components/structured-data";
import { site, whatsappLink, formatAddress } from "@/lib/site";
import { photos, unsplash } from "@/lib/photos";
import { testimonials } from "@/lib/testimonials";
import { comparison, comparisonNote } from "@/lib/comparison";
import { universities } from "@/lib/universities";

const heroIntro =
  "Hi Edubros, I'd like a free consultation about studying in Italy.";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <WhyItaly />
        <CountryComparison />
        <Cities />
        <UniversitiesWall />
        <Programs />
        <Process />
        <Manifesto />
        <LeadFormSection />
        <About />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}

/* -------------------- Header -------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-paper)]/85 backdrop-blur-md border-b border-[var(--color-line-soft)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[76px]">
        <a href="#top" className="flex items-center">
          <Logo size={38} />
        </a>
        <nav className="hidden md:flex items-center gap-8 font-serif text-[15px] text-[var(--color-navy)]/70">
          {[
            ["Why Italy", "#why-italy"],
            ["Compare", "#side-by-side"],
            ["Cities", "#cities"],
            ["Universities", "#universities"],
            ["Programs", "#programs"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="gold-underline hover:text-[var(--color-navy)] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <WhatsAppButton
          message={heroIntro}
          className="hidden md:inline-flex btn-base btn-navy"
        >
          Talk on WhatsApp
        </WhatsAppButton>
      </div>
    </header>
  );
}

/* -------------------- Hero -------------------- */

function Hero() {
  return (
    <section
      id="top"
      className="relative paper-grain hero-grain text-white overflow-hidden bg-[var(--color-navy-deep)]"
    >
      {/* Video backdrop (with photo poster fallback) */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/video/hero.mp4"
        poster={unsplash(photos.hero, 2000, 75)}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Navy gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 18% 10%, rgba(200, 154, 58, 0.16) 0%, transparent 55%), linear-gradient(125deg, rgba(7, 16, 42, 0.92) 0%, rgba(14, 26, 58, 0.85) 55%, rgba(14, 26, 58, 0.95) 100%)",
        }}
        aria-hidden="true"
      />
      <ArchPattern />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-24 pb-32 md:pt-32 md:pb-40">
        {/* Dossier metadata strip */}
        <div className="reveal flex items-center gap-4 text-[var(--color-gold-soft)] mb-12">
          <span className="label-caps-tight">Edubros / Dossier</span>
          <span className="h-px w-10 bg-[var(--color-gold)]/50" />
          <span className="label-caps-tight">Ancona · Italia</span>
          <span className="h-px w-10 bg-[var(--color-gold)]/50" />
          <span className="label-caps-tight">MMXXVI</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <h1 className="reveal reveal-1 display-1 max-w-[14ch]">
              <span className="block">A future</span>
              <span className="block">studying in</span>
              <span className="block italic text-[var(--color-gold-soft)]">Italy.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <div className="reveal reveal-2 max-w-md">
              <p className="text-[17px] text-white/75 leading-[1.7] mb-2">
                Edubros guides international students into Italian universities
                at Bachelor&apos;s, Master&apos;s and PhD level. From
                application strategy to your student visa.
              </p>
              <p className="label-caps-tight text-[var(--color-gold-soft)] mt-6 flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--color-gold)]/60" />
                Based in Ancona, on the Adriatic coast
              </p>
            </div>
          </div>
        </div>

        <div className="reveal reveal-3 mt-16 flex flex-col sm:flex-row gap-4">
          <WhatsAppButton message={heroIntro} className="inline-flex btn-base btn-gold">
            <WhatsAppGlyph />
            Free consultation on WhatsApp
          </WhatsAppButton>
          <a href="#lead-form" className="inline-flex btn-base btn-ghost-light">
            Get a study plan
          </a>
        </div>

        {/* Hero footer / scroll cue */}
        <div className="reveal reveal-4 mt-24 flex items-center justify-between text-[var(--color-gold-soft)]">
          <span className="label-caps-tight">N° 01 / Welcome</span>
          <span className="hidden md:flex items-center gap-3 label-caps-tight">
            <span>Scroll to begin</span>
            <span aria-hidden="true">↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.526 2 2.06 6.466 2.06 11.978c0 1.882.522 3.737 1.518 5.382L2 22l4.755-1.55c1.575.86 3.348 1.314 5.16 1.314h.005c5.514 0 9.978-4.466 9.978-9.978 0-2.667-1.038-5.173-2.926-7.06A9.928 9.928 0 0 0 12.04 2z" />
    </svg>
  );
}

function ArchPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="archs" x="0" y="0" width="160" height="220" patternUnits="userSpaceOnUse">
          <path
            d="M20 220 V 110 a 60 60 0 0 1 120 0 V 220"
            fill="none"
            stroke="#C89A3A"
            strokeWidth="1"
          />
          <path
            d="M40 220 V 130 a 40 40 0 0 1 80 0 V 220"
            fill="none"
            stroke="#C89A3A"
            strokeWidth="0.6"
            strokeOpacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="1200" height="800" fill="url(#archs)" />
    </svg>
  );
}

/* -------------------- Section divider with fleur -------------------- */

function SectionDivider() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
      <div className="divider-fleur text-[var(--color-gold)]">
        <Fleur size={20} />
      </div>
    </div>
  );
}

/* -------------------- Trust Strip -------------------- */

function TrustStrip() {
  const items = [
    "Based in Ancona, Italy",
    "Bachelor · Master · PhD",
    "Italian student visa",
    "IELTS preparation",
  ];
  return (
    <section className="bg-[var(--color-paper)] border-y border-[var(--color-line-soft)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map((label, i) => (
          <div key={label} className="flex items-center gap-10">
            {i > 0 ? (
              <span className="hidden md:inline text-[var(--color-gold)]/60">
                <Fleur size={11} />
              </span>
            ) : null}
            <span className="label-caps text-[var(--color-navy)]/70">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Why Italy -------------------- */

function WhyItaly() {
  const cards = [
    {
      n: "I",
      title: "Recognized degrees",
      body: "Italian degrees carry weight across the EU and globally, so where you graduate isn't where your career has to stay.",
      tone: "feature",
    },
    {
      n: "II",
      title: "Affordable tuition",
      body: "Public universities sit between €156 and €4,000 per year, with regional scholarships available to international students.",
      tone: "regular",
    },
    {
      n: "III",
      title: "Programs in English",
      body: "A growing range of Bachelor's, Master's and PhD programs are taught entirely in English, especially in STEM and business.",
      tone: "regular",
    },
    {
      n: "IV",
      title: "EU access",
      body: "A student visa for Italy unlocks travel, internships and work across the European Union from day one.",
      tone: "regular",
    },
  ];
  return (
    <section id="why-italy" className="py-24 md:py-32 bg-[var(--color-paper)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <SectionEyebrow eyebrow="N° 02 · The destination" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-end mb-16">
          <h2 className="display-2 text-[var(--color-navy)] lg:col-span-7">
            Why Italy{" "}
            <span className="italic text-[var(--color-gold)]">earns</span> a
            second look.
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed lg:col-span-4 lg:col-start-9 text-[17px]">
            Affordable, internationally portable and built on centuries of
            scholarship. Italy quietly sits among the best places in Europe to
            do a degree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c) => (
            <article
              key={c.title}
              className="card p-9 md:p-11 min-h-[280px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-8 relative">
                <span className="label-caps-tight text-[var(--color-gold)] relative z-10">
                  {c.n}
                </span>
                <span
                  className="card-mark"
                  style={{
                    fontSize: "150px",
                    right: "12px",
                    top: "-10px",
                  }}
                >
                  {c.n}
                </span>
              </div>
              <h3 className="font-serif text-[28px] leading-tight text-[var(--color-navy)] mb-4 relative z-10">
                {c.title}
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed text-[15.5px] relative z-10">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Country comparison -------------------- */

function CountryComparison() {
  const countries: Array<{
    key: keyof Omit<(typeof comparison)[number], "label" | "edge">;
    label: string;
    note?: string;
    accent: boolean;
  }> = [
    { key: "italy", label: "Italy", note: "Edubros focus", accent: true },
    { key: "uk", label: "United Kingdom", accent: false },
    { key: "germany", label: "Germany", accent: false },
    { key: "australia", label: "Australia", accent: false },
  ];
  return (
    <section
      id="side-by-side"
      className="py-24 md:py-32 bg-[var(--color-paper-warm)] border-t border-[var(--color-line-soft)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <SectionEyebrow eyebrow="N° 03 · Side by side" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-end mb-12">
          <h2 className="display-2 text-[var(--color-navy)] lg:col-span-7">
            Italy vs the{" "}
            <span className="italic text-[var(--color-gold)]">usual</span>{" "}
            destinations.
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed lg:col-span-4 lg:col-start-9 text-[17px]">
            Cost, work, post-study and access — at a glance. Italy isn&apos;t
            for everyone, but for most South Asian students it&apos;s the
            most affordable English-friendly option in Europe.
          </p>
        </div>

        {/* Desktop / tablet table */}
        <div className="hidden md:block overflow-hidden border border-[var(--color-line-soft)] bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-line-soft)] bg-[var(--color-paper)]">
                <th className="py-5 px-6 label-caps-tight text-[var(--color-muted-soft)]">
                  Metric
                </th>
                {countries.map((c) => (
                  <th
                    key={c.key}
                    className={`py-5 px-6 align-top ${c.accent ? "bg-[var(--color-navy)] text-white" : ""}`}
                  >
                    <div className="font-serif text-[18px] leading-tight">
                      {c.label}
                    </div>
                    {c.note ? (
                      <div
                        className={`label-caps-tight mt-2 ${c.accent ? "text-[var(--color-gold-soft)]" : "text-[var(--color-muted-soft)]"}`}
                      >
                        {c.note}
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr
                  key={row.label}
                  className={
                    i < comparison.length - 1
                      ? "border-b border-[var(--color-line-soft)]"
                      : ""
                  }
                >
                  <th
                    scope="row"
                    className="py-5 px-6 align-top font-serif text-[15px] text-[var(--color-navy)] w-[24%]"
                  >
                    {row.label}
                  </th>
                  {countries.map((c) => {
                    const isItaly = c.key === "italy";
                    const highlight = isItaly && row.edge === "italy";
                    return (
                      <td
                        key={c.key}
                        className={`py-5 px-6 align-top text-[15px] ${
                          isItaly
                            ? "bg-[var(--color-navy)]/[0.04]"
                            : ""
                        } ${
                          highlight
                            ? "text-[var(--color-navy)] font-medium"
                            : "text-[var(--color-muted)]"
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          {row[c.key]}
                          {highlight ? (
                            <span
                              aria-label="Italy edge"
                              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]"
                            />
                          ) : null}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-4">
          {countries.map((c) => (
            <div
              key={c.key}
              className={`border border-[var(--color-line-soft)] ${c.accent ? "bg-[var(--color-navy)] text-white" : "bg-white"}`}
            >
              <div
                className={`p-5 border-b ${c.accent ? "border-white/10" : "border-[var(--color-line-soft)]"}`}
              >
                <div className="font-serif text-[20px] leading-none">
                  {c.label}
                </div>
                {c.note ? (
                  <div
                    className={`label-caps-tight mt-2 ${c.accent ? "text-[var(--color-gold-soft)]" : "text-[var(--color-muted-soft)]"}`}
                  >
                    {c.note}
                  </div>
                ) : null}
              </div>
              <dl className="p-5 grid grid-cols-1 gap-3 text-[14px]">
                {comparison.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt
                      className={`label-caps-tight ${c.accent ? "text-white/55" : "text-[var(--color-muted-soft)]"}`}
                    >
                      {row.label}
                    </dt>
                    <dd
                      className={`text-right ${c.accent ? "text-white" : "text-[var(--color-navy)]"}`}
                    >
                      {row[c.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[12px] text-[var(--color-muted-soft)] leading-relaxed max-w-3xl">
          {comparisonNote}
        </p>
      </div>
    </section>
  );
}

/* -------------------- Programs -------------------- */

function Programs() {
  const programs = [
    {
      level: "Bachelor's",
      blurb: "Pathways for school-leavers into Italian undergraduate programs.",
      items: [
        "Application strategy & shortlist",
        "Document legalization (CIMEA, DOV)",
        "Entrance test preparation",
      ],
      icon: <BachelorIcon />,
    },
    {
      level: "Master's",
      blurb: "Curated programs across STEM, business, design, medicine and humanities.",
      items: [
        "Program shortlisting matched to your profile",
        "Statement of purpose review",
        "Scholarship application support",
      ],
      icon: <MasterIcon />,
    },
    {
      level: "PhD",
      blurb: "Funded doctoral positions across Italian research universities.",
      items: [
        "Profile and research-area alignment",
        "Supervisor outreach guidance",
        "Proposal review",
      ],
      icon: <PhdIcon />,
    },
    {
      level: "Italian student visa",
      blurb: "End-to-end support for the Type-D study visa.",
      items: [
        "Documentation & DOV authentication",
        "Embassy interview preparation",
        "Pre-departure briefing",
      ],
      icon: <VisaIcon />,
    },
  ];
  return (
    <section
      id="programs"
      className="py-24 md:py-32 bg-[var(--color-paper-warm)] border-y border-[var(--color-line-soft)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <SectionEyebrow eyebrow="N° 06 · The work" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-end mb-16">
          <h2 className="display-2 text-[var(--color-navy)] lg:col-span-7">
            Programs we{" "}
            <span className="italic text-[var(--color-gold)]">support</span>.
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed lg:col-span-4 lg:col-start-9 text-[17px]">
            We work at every stage of the Italian higher-education journey, plus
            the visa that gets you there.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p, i) => (
            <article
              key={p.level}
              className="card p-7 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-7">
                <span className="text-[var(--color-gold)]">{p.icon}</span>
                <span className="label-caps-tight text-[var(--color-muted-soft)]">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-serif text-[26px] leading-tight text-[var(--color-navy)] mb-3">
                {p.level}
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed text-[15px] mb-6">
                {p.blurb}
              </p>
              <ul className="text-[14px] text-[var(--color-muted-soft)] space-y-2 mt-auto pt-5 border-t border-[var(--color-line-soft)]">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[var(--color-gold)] mt-1.5 shrink-0 inline-block w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BachelorIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 6 L28 12 L16 18 L4 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M28 12 V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="22" r="1.4" fill="currentColor" />
    </svg>
  );
}
function MasterIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M8 12 H24 L20 26 H12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 6 V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 6 L20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function PhdIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="8" width="20" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 14 H22" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 18 H18" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 24 V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function VisaIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="20" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 22 H21" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* -------------------- Cities -------------------- */

function Cities() {
  const cities = [
    {
      name: "Bologna",
      latin: "Bononia",
      coords: "44° 29′ N",
      note: "The oldest university in the Western world, plus a porticoed old town that just refuses to age.",
      tags: ["Università di Bologna", "Engineering", "Medicine"],
    },
    {
      name: "Milano",
      latin: "Mediolanum",
      coords: "45° 28′ N",
      note: "Italy's business capital. Home to top design, business and engineering schools.",
      tags: ["Politecnico di Milano", "Bocconi", "Domus"],
    },
    {
      name: "Roma",
      latin: "Roma",
      coords: "41° 53′ N",
      note: "Sapienza is one of Europe's largest universities. The city itself is a 3000-year-old syllabus.",
      tags: ["Sapienza", "LUISS", "Tor Vergata"],
    },
    {
      name: "Padova",
      latin: "Patavium",
      coords: "45° 24′ N",
      note: "Galileo's old classroom is still here. A serious research city, especially for medicine and physics.",
      tags: ["Università di Padova", "Medicine", "Physics"],
    },
    {
      name: "Firenze",
      latin: "Florentia",
      coords: "43° 46′ N",
      note: "Renaissance capital with strong programs in art, restoration, design and the humanities.",
      tags: ["Università di Firenze", "Design", "History of Art"],
    },
    {
      name: "Ancona",
      latin: "Ancona",
      coords: "43° 37′ N",
      note: "Our home base. A coastal university town on the Adriatic with affordable living and direct access to Marche.",
      tags: ["Politecnica delle Marche", "Engineering", "Economics"],
    },
  ];
  return (
    <section
      id="cities"
      className="py-24 md:py-32 bg-[var(--color-paper)] border-t border-[var(--color-line-soft)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <SectionEyebrow eyebrow="N° 04 · Italian cities" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-end mb-16">
          <h2 className="display-2 text-[var(--color-navy)] lg:col-span-7">
            Where you might{" "}
            <span className="italic text-[var(--color-gold)]">end up</span>.
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed lg:col-span-4 lg:col-start-9 text-[17px]">
            We work across Italy. These six cities are where most of our
            students land, but the right fit depends on your field, budget and
            preferred climate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((c, i) => {
            const photoId =
              photos.cities[c.name.toLowerCase() as keyof typeof photos.cities];
            return (
              <article
                key={c.name}
                className="card overflow-hidden flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden bg-[var(--color-navy)]">
                  {/* Photo */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    style={{
                      backgroundImage: `url(${unsplash(photoId, 900, 70, 600)})`,
                    }}
                  />
                  {/* Tint for label legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7,16,42,0.05) 0%, rgba(7,16,42,0.5) 55%, rgba(7,16,42,0.92) 100%)",
                    }}
                  />
                  <span className="absolute top-4 left-4 label-caps-tight text-[var(--color-gold-soft)]">
                    N° 0{i + 1}
                  </span>
                  <span className="absolute top-4 right-4 label-caps-tight text-white/70">
                    {c.coords}
                  </span>
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                    <h3 className="font-serif text-[30px] text-white leading-none drop-shadow-[0_2px_8px_rgba(7,16,42,0.6)]">
                      {c.name}
                    </h3>
                    <span className="font-serif italic text-[var(--color-gold-soft)] text-[14px] mb-1 whitespace-nowrap">
                      {c.latin}
                    </span>
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-[var(--color-muted)] leading-relaxed text-[15px] mb-5">
                    {c.note}
                  </p>
                  <div className="mt-auto pt-5 border-t border-[var(--color-line-soft)] flex flex-wrap gap-x-3 gap-y-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="label-caps-tight text-[var(--color-muted-soft)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* -------------------- Universities wall -------------------- */

function UniversitiesWall() {
  return (
    <section
      id="universities"
      className="py-24 md:py-32 bg-[var(--color-navy)] text-white relative overflow-hidden"
    >
      {/* subtle paper grain on navy */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.4 0'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>\")",
          mixBlendMode: "overlay",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <span className="inline-block text-[var(--color-gold)] mb-4">
            <Fleur size={18} />
          </span>
          <p className="label-caps text-[var(--color-gold-soft)] mb-3">
            N° 05 · The universities
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-end mb-14">
          <h2 className="display-2 lg:col-span-7">
            Where{" "}
            <span className="italic text-[var(--color-gold)]">our students</span>{" "}
            study.
          </h2>
          <p className="text-white/65 leading-relaxed lg:col-span-4 lg:col-start-9 text-[17px]">
            We support applications to public and private Italian
            universities across the country. A few of the institutions our
            students have enrolled at:
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 border border-white/10">
          {universities.map((u) => (
            <li
              key={u.short}
              className="bg-[var(--color-navy)] p-7 flex flex-col gap-4 group transition-colors hover:bg-[var(--color-navy-veil)]"
            >
              <UniversityCrest />
              <div>
                <p className="font-serif text-[19px] leading-tight">
                  {u.name}
                </p>
                <p className="font-serif italic text-[var(--color-gold-soft)] text-[13px] mt-1">
                  {u.short}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="label-caps-tight text-white/55">
                  {u.field}
                </span>
                <span className="font-serif italic text-[var(--color-gold)] text-[13px]">
                  {u.founded}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[12px] text-white/45 leading-relaxed max-w-2xl mx-auto">
          Founding years are public record. Inclusion here reflects
          institutions Edubros currently supports applications to. We are
          not affiliated with or endorsed by these universities.
        </p>
      </div>
    </section>
  );
}

function UniversityCrest() {
  // Generic editorial crest mark — a shield with a fleur center.
  // Keeps the wall consistent and copyright-safe until real logos are added.
  return (
    <svg
      width="42"
      height="48"
      viewBox="0 0 42 48"
      fill="none"
      aria-hidden="true"
      className="text-[var(--color-gold)] transition-transform duration-500 group-hover:scale-110"
    >
      <path
        d="M2 4 H 40 V 24 C 40 36 33 44 21 47 C 9 44 2 36 2 24 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.55"
        fill="none"
      />
      <path
        d="M6 8 H 36 V 24 C 36 33 30 40 21 43 C 12 40 6 33 6 24 Z"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeOpacity="0.3"
        fill="none"
      />
      <line
        x1="2"
        y1="14"
        x2="40"
        y2="14"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      <path
        d="M21 18 C 19 22, 16 24, 13 24 C 16 25, 19 27, 21 31 C 23 27, 26 25, 29 24 C 26 24, 23 22, 21 18 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="21" cy="36" r="1.2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* -------------------- Process -------------------- */

function Process() {
  const steps = [
    {
      n: "I",
      title: "Free consultation",
      body: "A 30-minute WhatsApp call to understand your background, goals and target intake.",
    },
    {
      n: "II",
      title: "University shortlist",
      body: "A personalized list of programs matched to your academic profile and budget.",
    },
    {
      n: "III",
      title: "Application & language",
      body: "We handle applications end to end, including IELTS preparation where needed.",
    },
    {
      n: "IV",
      title: "Visa & relocation",
      body: "Document legalization, embassy support and help finding accommodation in your destination city.",
    },
  ];
  return (
    <section id="process" className="py-24 md:py-32 bg-[var(--color-paper)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <SectionEyebrow eyebrow="N° 07 · The process" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-end mb-20">
          <h2 className="display-2 text-[var(--color-navy)] lg:col-span-7">
            How we{" "}
            <span className="italic text-[var(--color-gold)]">work</span>{" "}
            together.
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed lg:col-span-4 lg:col-start-9 text-[17px]">
            From the first call to your first day on campus. Four stages, no
            surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
          <div className="hidden lg:block absolute top-[34px] left-[3%] right-[3%] h-px bg-[var(--color-gold)]/25" />
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="flex items-center gap-5 mb-6">
                <div className="relative shrink-0">
                  <div className="w-[68px] h-[68px] rounded-full border border-[var(--color-gold)]/45 bg-[var(--color-paper)] flex items-center justify-center">
                    <span className="font-serif italic text-[var(--color-gold)] text-2xl">
                      {s.n}
                    </span>
                  </div>
                </div>
                <div className="h-px flex-1 bg-[var(--color-gold)]/15 lg:hidden" />
              </div>
              <h3 className="font-serif text-[22px] leading-tight text-[var(--color-navy)] mb-3">
                {s.title}
              </h3>
              <p className="text-[15px] text-[var(--color-muted)] leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Manifesto pull-quote -------------------- */

function Manifesto() {
  return (
    <section className="bg-[var(--color-navy)] text-white relative overflow-hidden">
      <div className="absolute inset-0 hero-grain paper-grain pointer-events-none" />
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 py-24 md:py-32 text-center">
        <span className="text-[var(--color-gold)] inline-block mb-8">
          <Fleur size={28} />
        </span>
        <p className="display-3 text-white max-w-[22ch] mx-auto">
          Italy doesn&apos;t hand out places at its universities.{" "}
          <span className="italic text-[var(--color-gold-soft)]">
            We help you earn one.
          </span>
        </p>
        <div className="mt-12 flex items-center justify-center gap-4 text-[var(--color-gold-soft)]">
          <span className="h-px w-12 bg-[var(--color-gold)]/50" />
          <span className="label-caps-tight">Edubros · Ancona · Italia</span>
          <span className="h-px w-12 bg-[var(--color-gold)]/50" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Lead Form -------------------- */

function LeadFormSection() {
  return (
    <section
      id="lead-form"
      className="relative py-24 md:py-32 bg-[var(--color-navy-deep)] text-white overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--color-gold)]/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[var(--color-gold)]/[0.04] rounded-full blur-3xl pointer-events-none" />
      <ArchPattern />
      <div className="max-w-3xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center mb-12">
          <span className="text-[var(--color-gold)] inline-block mb-6">
            <Fleur size={22} />
          </span>
          <span className="block label-caps text-[var(--color-gold-soft)] mb-5">
            N° 08 · Free assessment
          </span>
          <h2 className="display-3 text-white mb-5">
            Get your{" "}
            <span className="italic text-[var(--color-gold-soft)]">
              study-in-Italy
            </span>{" "}
            plan.
          </h2>
          <p className="text-white/65 max-w-xl mx-auto leading-relaxed">
            Tell us about yourself in under a minute. We&apos;ll review your
            profile and reply on WhatsApp within 48 hours, no obligation.
          </p>
        </div>
        <div className="bg-white/[0.025] border border-[var(--color-gold)]/15 p-8 md:p-12 backdrop-blur-sm">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

/* -------------------- About -------------------- */

function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[var(--color-paper)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <AboutPhoto />
          </div>
          <div className="md:col-span-7">
            <SectionEyebrow eyebrow="N° 09 · About us" />
            <h2 className="display-2 text-[var(--color-navy)] mt-6 mb-7">
              Built in{" "}
              <span className="italic text-[var(--color-gold)]">Ancona</span>,
              run by people who&apos;ve done this.
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed text-lg mb-8 max-w-xl">
              {site.about.bio}
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps text-[var(--color-navy)] gold-underline"
              >
                Instagram {site.instagram.handle}
              </a>
              <a
                href={whatsappLink(heroIntro)}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps text-[var(--color-navy)] gold-underline"
              >
                WhatsApp {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPhoto() {
  return (
    <div className="relative w-full max-w-[420px]">
      {/* Photo frame */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-navy)] border border-[var(--color-gold)]/30">
        {/* Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${unsplash(photos.about, 900, 75)})`,
          }}
        />
        {/* Edge tint for depth + legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,16,42,0.05) 0%, rgba(7,16,42,0.0) 35%, rgba(7,16,42,0.55) 100%)",
          }}
        />
        {/* Top-left serial */}
        <span className="absolute top-5 left-5 label-caps-tight text-[var(--color-gold-soft)]">
          MMXXVI
        </span>
        {/* Top-right coords */}
        <span className="absolute top-5 right-5 label-caps-tight text-white/70">
          43° 37′ N
        </span>
        {/* Bottom plate */}
        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-serif italic text-[var(--color-gold-soft)] text-[14px] leading-none mb-1">
            Riviera del Conero
          </p>
          <p className="font-serif text-white text-[22px] leading-none">
            Marche, Italia
          </p>
        </div>
      </div>
      {/* Gold badge under the photo */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[var(--color-gold)] text-[var(--color-navy)] label-caps px-5 py-2.5 whitespace-nowrap">
        Based in Ancona
      </div>
      {/* Decorative ornaments */}
      <div className="absolute -top-6 -right-6 text-[var(--color-gold)]/60">
        <Fleur size={22} />
      </div>
      <div className="absolute -top-6 -left-6 text-[var(--color-gold)]/60 hidden md:block">
        <Fleur size={22} />
      </div>
    </div>
  );
}

/* -------------------- Testimonials -------------------- */

function Testimonials() {
  const visible = testimonials.filter((t) => !t.placeholder);
  const palette = [
    "from-[#1a2750] to-[#0e1a3a]",
    "from-[#3a2e16] to-[#1c1709]",
    "from-[#1f3a2e] to-[#0d1c14]",
  ];
  // Duplicate the list so the marquee can loop seamlessly with translateX(-50%).
  const looped = visible.length > 0 ? [...visible, ...visible] : [];
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-[var(--color-paper-warm)] border-y border-[var(--color-line-soft)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <SectionEyebrow eyebrow="N° 10 · From students" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-end mb-12">
          <h2 className="display-2 text-[var(--color-navy)] lg:col-span-7">
            What students{" "}
            <span className="italic text-[var(--color-gold)]">say</span>.
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed lg:col-span-4 lg:col-start-9 text-[17px]">
            Direct quotes from students we&apos;ve worked with. We add a new
            one each intake.
          </p>
        </div>

        {/* Trust stats strip */}
        <TestimonialStats />

        {visible.length === 0 ? (
          <EmptyTestimonialsCard />
        ) : null}
      </div>

      {/* Full-width rolling carousel — sits outside the max-width wrapper so it can bleed edge-to-edge */}
      {visible.length > 0 ? (
        <div className="mt-14 marquee-mask overflow-hidden">
          <div className="marquee-track flex gap-6">
            {looped.map((t, i) => (
              <article
                key={i}
                className="card p-8 flex flex-col w-[340px] md:w-[380px] shrink-0"
              >
                <span
                  className="font-serif italic text-[var(--color-gold)]/35 text-[110px] leading-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="font-serif text-[19px] leading-[1.45] text-[var(--color-navy)] mt-[-30px] mb-7">
                  {t.quote}
                </p>
                <div className="mt-auto pt-6 border-t border-[var(--color-line-soft)] flex items-center gap-4">
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-br ${palette[i % palette.length]} flex items-center justify-center text-white font-serif italic text-[18px]`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-serif text-[16px] text-[var(--color-navy)] leading-tight">
                      {t.name}
                    </p>
                    <p className="text-[12px] text-[var(--color-muted-soft)] leading-tight mt-1">
                      {t.program}
                    </p>
                    <p className="text-[12px] text-[var(--color-muted-soft)] leading-tight mt-0.5">
                      {t.location}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function TestimonialStats() {
  return (
    <div className="flex items-center justify-center py-10 border-y border-[var(--color-line-soft)] bg-[var(--color-paper)]/50">
      <div className="flex items-center gap-6 md:gap-10">
        <span className="text-[var(--color-gold)]/60">
          <Fleur size={14} />
        </span>
        <div className="text-center">
          <p className="font-serif text-[52px] md:text-[64px] text-[var(--color-navy)] leading-none">
            50<span className="text-[var(--color-gold)]">+</span>
          </p>
          <p className="label-caps text-[var(--color-muted-soft)] mt-3">
            Students placed
          </p>
        </div>
        <span className="text-[var(--color-gold)]/60">
          <Fleur size={14} />
        </span>
      </div>
    </div>
  );
}

function EmptyTestimonialsCard() {
  return (
    <div className="card p-12 text-center max-w-2xl mx-auto">
      <span className="text-[var(--color-gold)] inline-block mb-5">
        <Fleur size={20} />
      </span>
      <h3 className="font-serif text-[26px] text-[var(--color-navy)] mb-3">
        New stories every intake
      </h3>
      <p className="text-[var(--color-muted)] leading-relaxed">
        We&apos;re collecting student stories from the latest cohort. If you
        want to be next, talk to us on WhatsApp.
      </p>
    </div>
  );
}

/* -------------------- FAQ -------------------- */

function FAQ() {
  const faqs = [
    {
      q: "How much does it cost to study in Italy?",
      a: "Public university tuition starts as low as €156 per year and runs up to about €4,000, depending on the university and your family income (Italian universities use ISEE-based fee tiers). Living costs in cities like Ancona, Bologna or Padua usually fall between €300 and €700 per month.",
    },
    {
      q: "Are programs taught in English?",
      a: "Yes. A growing number of Bachelor's and most Master's and PhD programs at major Italian universities are taught entirely in English. We help you find the right ones for your field.",
    },
    {
      q: "Do I need IELTS?",
      a: "Most English-taught programs ask for IELTS 6.0 to 6.5, or an equivalent like TOEFL or Duolingo. We provide preparation if you need it.",
    },
    {
      q: "How long does the student visa process take?",
      a: "From document submission to visa issuance, typically 30 to 60 days. Apply 2 to 3 months before your intended departure to be safe.",
    },
    {
      q: "Can I work while studying?",
      a: "Yes. International students on a study visa can work up to 20 hours per week during the academic year, and full time during scheduled breaks.",
    },
    {
      q: "Can I stay in Italy after graduation?",
      a: "Yes. Graduates can apply for a 12-month post-study residence permit to look for work or start a business in Italy.",
    },
    {
      q: "When are application deadlines?",
      a: "Most Italian universities have an autumn intake in September, with application windows opening between January and April. Strong applications take 6 to 9 months to assemble, so talk to us early.",
    },
    {
      q: "How do you charge?",
      a: "The first consultation is free. Service packages vary by program level and visa support needs. We share a transparent quote after the first call.",
    },
    {
      q: "What is the TOLC test?",
      a: "TOLC is the standardised online entrance test used by most Italian public universities for Bachelor's admissions. Different versions exist (TOLC-I for engineering, TOLC-E for economics, etc.). It's typically taken from your home country and the result is valid across multiple universities.",
    },
    {
      q: "What is ISEE and DSU and how do they affect tuition?",
      a: "ISEE is an Italian household-income indicator, and DSU is the form you submit to declare it. Italian public universities use your ISEE to calculate annual tuition, so two students at the same university can pay very different fees. Students from lower-income households often pay close to the legal minimum (as low as €156 a year).",
    },
    {
      q: "What is Declaration of Value (Dichiarazione di Valore)?",
      a: "Declaration of Value (DoV) is an official document issued by the Italian consulate in your home country that translates and certifies your academic qualifications for use in Italy. It is required for most university applications and student visa approvals.",
    },
    {
      q: "Can Indian students study in Italy?",
      a: "Yes. Italian universities actively recruit Indian students, and most major institutions offer English-taught Master's and PhD programs. The Italian student visa (Type D) is open to Indian nationals, and Edubros has placed students from across India into Italian Bachelor's, Master's and PhD programs.",
    },
  ];
  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-[var(--color-paper-warm)] border-y border-[var(--color-line-soft)]"
    >
      <FaqLd items={faqs} />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          <div className="lg:col-span-4">
            <SectionEyebrow eyebrow="N° 11 · FAQ" align="left" />
            <h2 className="display-2 text-[var(--color-navy)] mt-6 mb-6">
              Common{" "}
              <span className="italic text-[var(--color-gold)]">questions</span>.
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed text-[15px] max-w-xs">
              The short version of what students ask us most weeks. Anything
              missing? Send us a message.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-[var(--color-gold)]/30">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-[var(--color-line)] py-7">
                  <summary className="flex justify-between items-start gap-6">
                    <h3 className="font-serif text-[20px] md:text-[22px] text-[var(--color-navy)] flex-1 transition-colors">
                      {f.q}
                    </h3>
                    <span className="text-[var(--color-gold)] text-2xl font-light leading-none mt-1 shrink-0">
                      <span className="faq-icon-plus">+</span>
                      <span className="faq-icon-minus">−</span>
                    </span>
                  </summary>
                  <p className="mt-5 text-[var(--color-muted)] leading-relaxed pr-12">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Final CTA -------------------- */

function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-paper)] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center relative">
        <span className="text-[var(--color-gold)] inline-block mb-6">
          <Fleur size={26} />
        </span>
        <span className="label-caps text-[var(--color-gold)] mb-5 block">
          N° 12 · Ready to start
        </span>
        <h2 className="display-2 text-[var(--color-navy)] mb-7">
          Let&apos;s talk about your future in{" "}
          <span className="italic text-[var(--color-gold)]">Italia</span>.
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed text-[17px] mb-10 max-w-xl mx-auto">
          The first conversation is free, and you&apos;ll leave with a clearer
          sense of what&apos;s possible, even if you don&apos;t end up working
          with us.
        </p>
        <WhatsAppButton message={heroIntro} className="inline-flex btn-base btn-navy">
          <WhatsAppGlyph />
          Talk to us on WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}

/* -------------------- Footer -------------------- */

function Footer() {
  return (
    <footer className="bg-[var(--color-navy-deep)] text-white relative overflow-hidden">
      <div className="absolute inset-0 hero-grain paper-grain pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <Logo variant="white" size={44} />
            <p className="mt-6 text-white/60 leading-relaxed max-w-md text-[15px]">
              An education-abroad consultancy in Ancona, Italy. We help
              international students apply, qualify and arrive at Italian
              universities.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="label-caps text-[var(--color-gold-soft)] mb-5">
              Visit
            </h4>
            <p className="text-white/65 leading-relaxed text-[14px]">
              {formatAddress()}
            </p>
          </div>
          <div className="md:col-span-4">
            <h4 className="label-caps text-[var(--color-gold-soft)] mb-5">
              Talk to us
            </h4>
            <ul className="space-y-2.5 text-[14px] text-white/65">
              <li>
                <a
                  href={whatsappLink(heroIntro)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-underline hover:text-white transition-colors"
                >
                  WhatsApp · {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="gold-underline hover:text-white transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-underline hover:text-white transition-colors"
                >
                  Instagram {site.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="gold-rule mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
          <p className="label-caps-tight">
            © {new Date().getFullYear()} Edubros · {site.tagline}
          </p>
          <p className="label-caps-tight flex items-center gap-3">
            <span className="text-[var(--color-gold)]/60">
              <Fleur size={12} />
            </span>
            Made in Ancona, Italia
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Section eyebrow -------------------- */

function SectionEyebrow({
  eyebrow,
  align = "center",
}: {
  eyebrow: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex items-center gap-4 ${isCenter ? "justify-center" : ""}`}
    >
      <span className="text-[var(--color-gold)]">
        <Fleur size={14} />
      </span>
      <span className="label-caps text-[var(--color-gold)]">{eyebrow}</span>
      {isCenter ? (
        <span className="text-[var(--color-gold)]">
          <Fleur size={14} />
        </span>
      ) : null}
    </div>
  );
}
