import type { Metadata } from "next";
import Link from "next/link";
import { Logo, Fleur } from "@/components/logo";
import { ApplicationForm } from "@/components/application-form";
import { applicationIntake } from "@/lib/application-config";
import { site, whatsappLink } from "@/lib/site";

const title = "Apply to Italian Universities";
const description =
  "Request help with one Italian university application. €50 service fee, optional €10 assistance services, plus the confirmed university fee. No payment now.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/applynow", languages: { en: "/applynow" } },
  openGraph: {
    title: `${title} · Edubros`,
    description,
    url: "/applynow",
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · Edubros`,
    description,
  },
};

export default function ApplyNowPage() {
  return (
    <div className="min-h-screen bg-paper text-navy">
      <a
        href="#application-form"
        className="sr-only z-50 bg-white p-4 text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to application form
      </a>
      <header className="border-b border-line">
        <div className="mx-auto flex min-h-20 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Edubros home"
            className="inline-flex min-h-12 items-center"
          >
            <Logo size={34} />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center gap-2 text-sm font-medium text-navy underline-offset-4 hover:underline"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </div>
      </header>
      <main>
        <section className="mx-auto max-w-[1200px] px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:pb-14">
          <div className="mb-8 flex items-center gap-3 text-muted">
            <Fleur size={16} />
            <p className="label-caps">Edubros · Application desk</p>
          </div>
          <div className="grid items-end gap-7 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
            <div>
              <h1 className="max-w-3xl font-serif text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.03] tracking-[-0.025em]">
                Your university in Italy.
                <br />
                <em className="text-navy">Let’s make a start.</em>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Tell us where you want to apply and what you have ready. We’ll
                review your profile, check the requirements, and give you a
                final quote before you pay anything.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-5">
              <p className="font-serif text-2xl text-navy">
                One application.
                <br />A team in your corner.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                €50 base service fee · Optional help from €10
                <br />
                University application fee confirmed separately.
              </p>
            </div>
          </div>
        </section>
        <section
          id="application-form"
          aria-label="Request university application assistance"
          className="mx-auto max-w-[1200px] scroll-mt-6 px-5 pb-16 sm:px-8 lg:pb-24"
        >
          <ApplicationForm
            intakeOpen={
              applicationIntake.emailVerified ||
              process.env.NODE_ENV !== "production"
            }
          />
        </section>
        <section className="border-y border-line bg-paper-dim/50">
          <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
            <p className="label-caps text-muted">What happens next</p>
            <ol className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                [
                  "01",
                  "We check the details.",
                  "Your profile, documents, programme requirements and deadline. We contact you to arrange private document collection.",
                ],
                [
                  "02",
                  "You get the full picture.",
                  "An itemized final quote, including the official university fee. You decide whether to proceed. No payment is taken by this form.",
                ],
                [
                  "03",
                  "We apply, together.",
                  "After approval and payment, a private WhatsApp group keeps you connected. You approve the application before we submit it.",
                ],
              ].map(([number, heading, text]) => (
                <li key={number} className="border-t border-line pt-5">
                  <span className="font-mono text-xs text-muted">{number}</span>
                  <h2 className="mb-3 mt-4 font-serif text-2xl text-navy">
                    {heading}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm leading-relaxed text-muted">
              University admission is not guaranteed. Tuition, visa services,
              translations and official tests are not included in this
              application-service estimate. Any additional work must be
              separately quoted and approved.
            </p>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Edubros · Ancona, Italy</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
          >
            {site.email}
          </a>
          <a
            href={whatsappLink(
              "Hi Edubros, I have a question about the university application service.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
          >
            Ask on WhatsApp
          </a>
          <Link
            href="/applynow/privacy"
            className="inline-flex min-h-11 items-center text-navy underline underline-offset-4"
          >
            Application privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}
