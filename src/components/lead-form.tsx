"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

export function LeadForm() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const whatsapp = String(data.get("whatsapp") || "");
    const level = String(data.get("level") || "");
    const intake = String(data.get("intake") || "");
    const field = String(data.get("field") || "");

    const message = [
      `Hi Edubros, I'd like a free study-abroad plan.`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp}`,
      `Study level: ${level}`,
      `Intake year: ${intake}`,
      `Target field: ${field}`,
    ].join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");

    setTimeout(() => setSubmitting(false), 600);
  }

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-white/20 text-white font-sans text-[15px] focus:outline-none focus:border-[var(--color-gold)] transition-colors py-3 placeholder:text-white/30";
  const labelClass = "block label-caps-tight text-[var(--color-gold-soft)] mb-3";

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Priya Sharma"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="priya@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div>
          <label htmlFor="whatsapp" className={labelClass}>
            WhatsApp number
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            placeholder="+91 98xxx xxxxx"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="field" className={labelClass}>
            Target field of study
          </label>
          <input
            id="field"
            name="field"
            type="text"
            placeholder="e.g. Mechanical Engineering"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div>
          <label htmlFor="level" className={labelClass}>
            Study level
          </label>
          <select
            id="level"
            name="level"
            required
            defaultValue=""
            className={`${fieldClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="text-[var(--color-navy)]">
              Select a level
            </option>
            <option className="text-[var(--color-navy)]">Bachelor&apos;s</option>
            <option className="text-[var(--color-navy)]">Master&apos;s</option>
            <option className="text-[var(--color-navy)]">PhD</option>
            <option className="text-[var(--color-navy)]">Italian student visa</option>
          </select>
        </div>
        <div>
          <label htmlFor="intake" className={labelClass}>
            Intake year
          </label>
          <select
            id="intake"
            name="intake"
            required
            defaultValue=""
            className={`${fieldClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="text-[var(--color-navy)]">
              Select a year
            </option>
            <option className="text-[var(--color-navy)]">2026</option>
            <option className="text-[var(--color-navy)]">2027</option>
            <option className="text-[var(--color-navy)]">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="pt-8 flex flex-col items-center gap-5">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex btn-base btn-gold w-full md:w-auto disabled:opacity-60"
        >
          {submitting ? "Opening WhatsApp…" : "Send my plan request"}
        </button>
        <p className="text-[12px] text-white/45 text-center max-w-sm leading-relaxed">
          Your details open a pre-filled message in WhatsApp to {site.phoneDisplay}.
          You stay in control of what you send.
        </p>
      </div>
    </form>
  );
}
