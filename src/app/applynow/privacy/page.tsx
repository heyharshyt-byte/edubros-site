import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Application Privacy Notice",
  description:
    "How Edubros handles the details you send through the university application request form.",
  alternates: {
    canonical: "/applynow/privacy",
    languages: { en: "/applynow/privacy" },
  },
  robots: { index: false, follow: true },
};

export default function ApplicationPrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 text-navy sm:px-8">
      <Link
        href="/applynow"
        className="inline-flex min-h-12 items-center text-sm underline underline-offset-4"
      >
        ← Back to the application form
      </Link>
      <p className="label-caps mt-10 text-muted">Edubros · Application desk</p>
      <h1 className="mt-5 font-serif text-4xl sm:text-5xl">
        Your application details.
      </h1>
      <p className="mt-6 leading-relaxed text-muted">
        This notice covers the university application request form. Please read
        it before sending your details.
      </p>
      <div className="mt-10 space-y-8 text-base leading-relaxed text-muted">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-navy">What you share</h2>
          <p>
            Your name, contact details, nationality, country of residence,
            academic background, intended programme and intake, document
            availability, requested assistance and any notes you choose to
            provide. We also record your agreement to the request notice and a
            request reference.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-serif text-2xl text-navy">Why we use it</h2>
          <p>
            The Edubros team uses these details to respond to your request,
            review your profile, clarify requirements and prepare an itemized
            quote. Submitting is not a payment, an admission decision or
            permission to submit a university application. We ask for approval
            before proceeding. This form does not subscribe you to marketing.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-serif text-2xl text-navy">
            How the request reaches us
          </h2>
          <p>
            The site is hosted on Vercel. Our server uses Resend to deliver your
            request to{" "}
            <a href={`mailto:${site.email}`} className="text-navy underline">
              {site.email}
            </a>
            , hosted by Gmail. These providers process the information needed to
            host the form and deliver or store the email. Their processing may
            take place outside your country. Our application code does not log
            the form contents.
          </p>
          <p className="mt-3">
            Provider details:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline"
            >
              Vercel privacy policy
            </a>
            ,{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline"
            >
              Resend privacy policy
            </a>
            , and{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline"
            >
              Google privacy policy
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-serif text-2xl text-navy">
            Documents and WhatsApp
          </h2>
          <p>
            This initial form does not accept document files. Do not include
            passport numbers, scans, financial records or passwords in the
            notes. We contact you separately to arrange private document
            collection. A dedicated WhatsApp group is created manually only
            after quote approval and payment, with your agreement. Group
            participants can see your phone number; it is not your public
            Edubros discussions group.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-serif text-2xl text-navy">
            Storage and your choices
          </h2>
          <p>
            Your unsent answers stay in the current browser page and are not
            saved to browser storage by this form. Refreshing or closing the
            page clears them. Sent requests are held in the Edubros mailbox and
            may also be retained in the delivery provider’s logs according to
            its settings and policies. To ask about retention, request access,
            correct your details or request deletion, email{" "}
            <a href={`mailto:${site.email}`} className="text-navy underline">
              {site.email}
            </a>{" "}
            with your request reference. Edubros will explain any records it
            needs to retain for an ongoing service or other applicable
            obligations.
          </p>
        </section>
      </div>
    </main>
  );
}
