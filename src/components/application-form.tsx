"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import Link from "next/link";
import {
  applicationEstimate,
  applicationRequestId,
  assistanceOptions,
  documentOptions,
  documentStatuses,
  initialApplication,
  studyLevels,
  validateApplication,
  type ApplicationErrors,
  type ApplicationValues,
} from "@/lib/application";
import { site, whatsappLink } from "@/lib/site";

const steps = [
  "Your profile",
  "Your application",
  "Documents & help",
  "Review & send",
];
const stepFields: (keyof ApplicationValues)[][] = [
  [
    "name",
    "email",
    "whatsapp",
    "nationality",
    "residence",
    "qualification",
    "subject",
    "grades",
  ],
  ["level", "intake", "university", "programme", "programmeUrl"],
  documentOptions.map((item) => item.id),
  ["consent"],
];
const inputClass =
  "w-full min-h-12 rounded-sm border border-navy/25 bg-white px-4 py-3 text-base text-navy placeholder:text-muted-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:bg-paper-dim";
const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-50";

function TextField({
  label,
  error,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <label htmlFor={props.id} className="block text-sm font-medium text-navy">
        {label}
        {props.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        {...props}
        className={inputClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${props.id}-hint` : "", error ? `${props.id}-error` : ""]
            .filter(Boolean)
            .join(" ") || undefined
        }
      />
      {hint ? (
        <p
          id={`${props.id}-hint`}
          className="text-sm leading-relaxed text-muted"
        >
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${props.id}-error`} className="text-sm text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Estimate({ values }: { values: ApplicationValues }) {
  const estimate = applicationEstimate(values.assistance);
  return (
    <aside
      className="min-w-0 self-start overflow-hidden rounded-sm border border-navy/15 lg:sticky lg:top-24"
      aria-label="Live service estimate"
    >
      <div className="bg-navy p-6 text-paper sm:p-8">
        <p className="label-caps text-gold-soft">Your service estimate</p>
        <div className="mt-5 flex items-end gap-3">
          <p
            className="font-serif text-6xl leading-none tabular-nums"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">Estimated service charge: </span>€
            {estimate.service}
          </p>
          <span className="pb-1 text-sm text-paper/80">+ university fee</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-paper/85">
          One programme. One university.
          <br />
          Personal support from the Edubros team.
        </p>
      </div>
      <div className="space-y-5 bg-white/70 p-6 sm:p-8">
        <dl className="space-y-4 text-sm text-navy">
          <div className="flex justify-between gap-4">
            <dt>Application service</dt>
            <dd className="shrink-0 tabular-nums">€50</dd>
          </div>
          {estimate.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4">
              <dt>{item.label}</dt>
              <dd className="shrink-0 tabular-nums">€10</dd>
            </div>
          ))}
          {estimate.items.length === 0 ? (
            <div className="flex justify-between gap-4 text-muted">
              <dt>Optional assistance</dt>
              <dd>€0</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-4 border-t border-line pt-4 font-semibold">
            <dt>Service subtotal</dt>
            <dd className="tabular-nums">€{estimate.service}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>University fee</dt>
            <dd className="max-w-32 text-right text-muted">To be confirmed</dd>
          </div>
        </dl>
        {values.needsShortlist ? (
          <p className="border-l-2 border-gold pl-3 text-sm leading-relaxed text-muted">
            Provisional estimate. We must confirm your university and programme
            first.
          </p>
        ) : null}
        <p className="text-sm leading-relaxed text-muted">
          Not a final quote. We verify the official application fee and confirm
          the full amount, including any applicable taxes, before you decide.
        </p>
        <div className="flex items-center justify-between gap-4 border-y border-line py-4 text-navy">
          <span className="font-medium">Payable now</span>
          <strong className="text-2xl tabular-nums">€0</strong>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          No payment details. No automatic charges. Only request the assistance
          you want.
        </p>
      </div>
    </aside>
  );
}

export function ApplicationForm({ intakeOpen }: { intakeOpen: boolean }) {
  const [values, setValues] = useState<ApplicationValues>({
    ...initialApplication,
    assistance: [],
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [failedReference, setFailedReference] = useState("");
  const [reference, setReference] = useState("");
  const estimate = applicationEstimate(values.assistance);
  const heading = useRef<HTMLHeadingElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const requestId = useRef("");
  const attemptedRequests = useRef(new Map<string, string>());
  const honeypot = useRef<HTMLInputElement>(null);
  const hasNavigated = useRef(false);
  const submitting = useRef(false);

  useEffect(() => {
    if (hasNavigated.current) heading.current?.focus();
  }, [step]);
  useEffect(() => {
    if (reference) successHeading.current?.focus();
  }, [reference]);

  function setField<K extends keyof ApplicationValues>(
    key: K,
    value: ApplicationValues[K],
  ) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  function navigate(index: number) {
    hasNavigated.current = true;
    setStep(index);
    setErrors({});
  }

  function showErrors(nextErrors: ApplicationErrors) {
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0] as keyof ApplicationValues;
    const index = stepFields.findIndex((fields) => fields.includes(first));
    if (index !== -1 && index !== step) {
      hasNavigated.current = true;
      setStep(index);
    }
    // Wait for the target step to mount before focusing its first invalid field.
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.getElementById(`apply-${first}`)?.focus(),
      ),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateApplication(
      values,
      step === 3 ? undefined : step,
    );
    if (Object.keys(nextErrors).length) {
      showErrors(nextErrors);
      return;
    }
    if (step < 3) {
      navigate(step + 1);
      return;
    }
    if (!intakeOpen) return;
    submitting.current = true;
    setSending(true);
    setSendError("");
    requestId.current = applicationRequestId(
      values,
      attemptedRequests.current,
      () => crypto.randomUUID(),
    );
    setFailedReference(`EDU-${requestId.current.toUpperCase()}`);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values,
          requestId: requestId.current,
          website: honeypot.current?.value || "",
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.fields) showErrors(result.fields);
        setSendError(
          typeof result.error === "string"
            ? result.error
            : "We couldn't send your request. Your answers are still here; please try again or contact Edubros.",
        );
        return;
      }
      if (
        typeof result.reference !== "string" ||
        !result.reference.startsWith("EDU-")
      )
        throw new Error("Missing reference");
      setReference(result.reference);
      setValues({ ...initialApplication, assistance: [] });
    } catch {
      setSendError(
        "We couldn't confirm delivery. Your answers are still here. Check your connection or contact Edubros before retrying if you are unsure whether it went through.",
      );
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }

  if (reference)
    return (
      <section
        className="mx-auto max-w-3xl rounded-sm border border-line bg-white/70 p-6 sm:p-12"
        aria-labelledby="application-sent"
      >
        <p className="label-caps text-muted">Request sent · No payment taken</p>
        <h2
          id="application-sent"
          ref={successHeading}
          tabIndex={-1}
          className="mt-5 font-serif text-4xl text-navy focus:outline-none sm:text-5xl"
        >
          Your next chapter
          <br />
          <em>starts here.</em>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted">
          Your request has been sent to the Edubros team. We’ll contact you
          using the details you provided to review your profile and arrange
          document collection before preparing your final quote.
        </p>
        <div className="my-8 space-y-2 border-y border-line py-5">
          <p className="text-sm text-muted">Keep your request reference</p>
          <p className="break-all font-mono text-sm font-semibold text-navy">
            {reference}
          </p>
        </div>
        <ol className="list-decimal space-y-3 pl-5 text-base leading-relaxed text-muted">
          <li>We review your profile, documents and programme requirements.</li>
          <li>
            You receive an itemized quote. Nothing proceeds until you approve
            and pay.
          </li>
          <li>
            With your agreement, we create a private WhatsApp group for
            questions and application updates.
          </li>
        </ol>
        <p className="mt-6 text-sm text-muted">
          No university application has been submitted yet. Admission is decided
          by the university.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink(
              `Hi Edubros, I'd like an update on my application request ${reference}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass} bg-navy text-white hover:bg-navy-veil`}
          >
            Ask about my request <span aria-hidden="true">↗</span>
          </a>
          <Link
            href="/"
            className={`${buttonClass} border border-navy/25 text-navy hover:bg-paper-dim`}
          >
            Back to Edubros
          </Link>
        </div>
      </section>
    );

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
      <div className="min-w-0">
        <nav aria-label="Application form steps" className="mb-8">
          <ol className="grid grid-cols-4 gap-2 sm:gap-4">
            {steps.map((label, index) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => navigate(index)}
                  disabled={index > step || sending}
                  aria-current={index === step ? "step" : undefined}
                  className={`flex min-h-16 w-full flex-col items-start gap-2 border-t-2 py-3 text-left text-xs leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-navy sm:text-sm ${index <= step ? "border-navy text-navy" : "border-line text-muted"} disabled:cursor-default`}
                >
                  <span className="font-mono text-xs" aria-hidden="true">
                    0{index + 1}
                    {index < step ? " ✓" : ""}
                  </span>
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-sm border border-line bg-white/70 p-5 sm:p-8 lg:p-10"
          aria-busy={sending}
        >
          <div className="mb-8 space-y-3">
            <p className="label-caps text-muted">Step {step + 1} of 4</p>
            <h2
              ref={heading}
              tabIndex={-1}
              className="font-serif text-3xl text-navy focus:outline-none sm:text-4xl"
            >
              {steps[step]}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {
                [
                  "A little about you and your academic background. Fields marked * are required.",
                  "The €50 base fee covers one programme application at one university.",
                  "Missing something? That’s okay. A No or Not sure never adds a fee by itself.",
                  "Check your answers and estimate. Sending this request does not commit you to paying.",
                ][step]
              }
            </p>
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="apply-website">Leave this field empty</label>
            <input
              id="apply-website"
              name="website"
              ref={honeypot}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <fieldset disabled={sending} className="min-w-0 space-y-7">
            <legend className="sr-only">{steps[step]}</legend>
            {step === 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField
                  id="apply-name"
                  label="Full name"
                  required
                  autoComplete="name"
                  maxLength={100}
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  error={errors.name}
                />
                <TextField
                  id="apply-email"
                  label="Email address"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  error={errors.email}
                />
                <TextField
                  id="apply-whatsapp"
                  label="WhatsApp number"
                  type="tel"
                  required
                  autoComplete="tel"
                  maxLength={40}
                  hint="Include the country code, for example +39."
                  value={values.whatsapp}
                  onChange={(e) => setField("whatsapp", e.target.value)}
                  error={errors.whatsapp}
                />
                <TextField
                  id="apply-nationality"
                  label="Nationality"
                  required
                  maxLength={100}
                  value={values.nationality}
                  onChange={(e) => setField("nationality", e.target.value)}
                  error={errors.nationality}
                />
                <TextField
                  id="apply-residence"
                  label="Country of residence"
                  required
                  autoComplete="country-name"
                  maxLength={100}
                  value={values.residence}
                  onChange={(e) => setField("residence", e.target.value)}
                  error={errors.residence}
                />
                <TextField
                  id="apply-qualification"
                  label="Current / latest qualification"
                  required
                  maxLength={200}
                  hint="For example: Class 12, BSc, or MSc (in progress)."
                  value={values.qualification}
                  onChange={(e) => setField("qualification", e.target.value)}
                  error={errors.qualification}
                />
                <TextField
                  id="apply-subject"
                  label="Your subject / field"
                  required
                  maxLength={200}
                  value={values.subject}
                  onChange={(e) => setField("subject", e.target.value)}
                  error={errors.subject}
                />
                <TextField
                  id="apply-grades"
                  label="Grades and grading scale"
                  required
                  maxLength={120}
                  hint="For example: 82%, 8.2/10, or results pending."
                  value={values.grades}
                  onChange={(e) => setField("grades", e.target.value)}
                  error={errors.grades}
                />
              </div>
            ) : null}
            {step === 1 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="apply-level"
                      className="block text-sm font-medium text-navy"
                    >
                      Study level *
                    </label>
                    <select
                      id="apply-level"
                      required
                      className={inputClass}
                      value={values.level}
                      onChange={(e) => setField("level", e.target.value)}
                      aria-invalid={errors.level ? true : undefined}
                      aria-describedby={
                        errors.level ? "apply-level-error" : undefined
                      }
                    >
                      <option value="">Select a level</option>
                      {studyLevels.map((level) => (
                        <option key={level}>{level}</option>
                      ))}
                    </select>
                    {errors.level ? (
                      <p
                        id="apply-level-error"
                        className="text-sm text-red-800"
                      >
                        {errors.level}
                      </p>
                    ) : null}
                  </div>
                  <TextField
                    id="apply-intake"
                    label="Target intake"
                    required
                    maxLength={100}
                    hint="For example: September 2027, or Not sure."
                    value={values.intake}
                    onChange={(e) => setField("intake", e.target.value)}
                    error={errors.intake}
                  />
                </div>
                <label className="flex min-h-14 cursor-pointer items-start gap-3 rounded-sm border border-line bg-paper p-4 text-sm leading-relaxed text-navy">
                  <input
                    type="checkbox"
                    checked={values.needsShortlist}
                    onChange={(e) =>
                      setField("needsShortlist", e.target.checked)
                    }
                    className="mt-0.5 size-5 shrink-0 accent-navy"
                  />
                  <span>
                    <strong className="block font-medium">
                      I need help choosing a university / programme
                    </strong>
                    <span className="text-muted">
                      Your request will go to manual review. The estimate stays
                      provisional until we agree on one application.
                    </span>
                  </span>
                </label>
                {!values.needsShortlist ? (
                  <div className="space-y-6">
                    <TextField
                      id="apply-university"
                      label="University name"
                      required
                      maxLength={200}
                      value={values.university}
                      onChange={(e) => setField("university", e.target.value)}
                      error={errors.university}
                    />
                    <TextField
                      id="apply-programme"
                      label="Programme name"
                      required
                      maxLength={250}
                      value={values.programme}
                      onChange={(e) => setField("programme", e.target.value)}
                      error={errors.programme}
                    />
                    <TextField
                      id="apply-programmeUrl"
                      label="Official programme link (optional)"
                      type="url"
                      maxLength={1500}
                      placeholder="https://…"
                      value={values.programmeUrl}
                      onChange={(e) => setField("programmeUrl", e.target.value)}
                      error={errors.programmeUrl}
                    />
                  </div>
                ) : null}
              </>
            ) : null}
            {step === 2 ? (
              <>
                <div className="space-y-6">
                  {documentOptions.map(({ id, label }) => (
                    <fieldset key={id} className="space-y-3">
                      <legend className="text-sm font-medium text-navy">
                        {label} *
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {documentStatuses.map((status, index) => (
                          <label
                            key={status}
                            className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border px-4 py-3 text-sm text-navy ${values[id] === status ? "border-navy bg-paper-dim" : "border-line bg-white"}`}
                          >
                            <input
                              id={
                                index === 0
                                  ? `apply-${id}`
                                  : `apply-${id}-${index}`
                              }
                              type="radio"
                              name={id}
                              value={status}
                              required
                              checked={values[id] === status}
                              onChange={() => setField(id, status)}
                              className="size-4 accent-navy"
                              aria-describedby={
                                errors[id] ? `apply-${id}-error` : undefined
                              }
                            />
                            {status}
                          </label>
                        ))}
                      </div>
                      {errors[id] ? (
                        <p
                          id={`apply-${id}-error`}
                          className="text-sm text-red-800"
                        >
                          {errors[id]}
                        </p>
                      ) : null}
                    </fieldset>
                  ))}
                </div>
                <div className="border-t border-line pt-7">
                  <h3 className="font-serif text-2xl text-navy">
                    Choose the help you want.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Optional, €10 each. Nothing is selected automatically. Only
                    select a service you want Edubros to provide.
                  </p>
                  <div className="mt-5 space-y-3">
                    {assistanceOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-sm border p-4 ${values.assistance.includes(option.id) ? "border-navy bg-paper" : "border-line bg-white"}`}
                      >
                        <input
                          type="checkbox"
                          checked={values.assistance.includes(option.id)}
                          onChange={(e) =>
                            setField(
                              "assistance",
                              e.target.checked
                                ? [...values.assistance, option.id]
                                : values.assistance.filter(
                                    (id) => id !== option.id,
                                  ),
                            )
                          }
                          className="mt-1 size-5 shrink-0 accent-navy"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap justify-between gap-2 text-sm font-semibold text-navy">
                            <span>{option.label}</span>
                            <span>+€10</span>
                          </span>
                          <span className="mt-2 block text-sm leading-relaxed text-muted">
                            {option.description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="border-l-2 border-gold bg-paper p-4 text-sm leading-relaxed text-muted">
                  <strong className="block font-medium text-navy">
                    Documents come after the first review.
                  </strong>
                  Don’t share passport scans, ID numbers, financial records or
                  passwords here. We’ll contact you to arrange private document
                  collection. We cannot issue passports, academic certificates
                  or IELTS results.
                </div>
              </>
            ) : null}
            {step === 3 ? (
              <>
                <section
                  aria-label="Final service estimate"
                  className="space-y-3 border border-line bg-paper p-5 text-sm text-navy"
                >
                  <h3 className="font-serif text-2xl">Your service estimate</h3>
                  <p>
                    Application service for one programme at one university: €50
                  </p>
                  {estimate.items.length ? (
                    <ul className="space-y-2">
                      {estimate.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between gap-3"
                        >
                          <span>{item.label}</span>
                          <span className="shrink-0">€10</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">
                      No optional assistance requested.
                    </p>
                  )}
                  <p className="border-t border-line pt-3 font-semibold">
                    Estimated service charge: €{estimate.service} + university
                    application fee to be confirmed.
                  </p>
                  {values.needsShortlist ? (
                    <p className="text-muted">
                      Provisional until we confirm a university and programme.
                    </p>
                  ) : null}
                  <p className="font-semibold">Payable now: €0</p>
                </section>
                <div className="space-y-6">
                  {[
                    {
                      title: "Your profile",
                      edit: 0,
                      rows: [
                        ["Name", values.name],
                        ["Email", values.email],
                        ["WhatsApp", values.whatsapp],
                        [
                          "Nationality / residence",
                          `${values.nationality} / ${values.residence}`,
                        ],
                        [
                          "Education",
                          `${values.qualification}, ${values.subject}`,
                        ],
                        ["Grades", values.grades],
                      ],
                    },
                    {
                      title: "Your application",
                      edit: 1,
                      rows: [
                        [
                          "Level / intake",
                          `${values.level} / ${values.intake}`,
                        ],
                        [
                          "University",
                          values.needsShortlist
                            ? "Help choosing requested"
                            : values.university,
                        ],
                        [
                          "Programme",
                          values.needsShortlist
                            ? "To be confirmed"
                            : values.programme,
                        ],
                        [
                          "Programme link",
                          values.needsShortlist
                            ? "Not selected"
                            : values.programmeUrl || "Not provided",
                        ],
                      ],
                    },
                    {
                      title: "Your documents",
                      edit: 2,
                      rows: documentOptions.map(({ id, label }) => [
                        label,
                        values[id],
                      ]),
                    },
                  ].map((section) => (
                    <section
                      key={section.title}
                      className="border-b border-line pb-6"
                    >
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <h3 className="font-serif text-2xl text-navy">
                          {section.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => navigate(section.edit)}
                          className="min-h-11 px-2 text-sm font-medium text-navy underline underline-offset-4"
                          aria-label={`Edit ${section.title.toLowerCase()}`}
                        >
                          Edit
                        </button>
                      </div>
                      <dl className="space-y-3 text-sm leading-relaxed">
                        {section.rows.map(([label, value]) => (
                          <div
                            key={label}
                            className="grid gap-1 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4"
                          >
                            <dt className="text-muted">{label}</dt>
                            <dd className="min-w-0 break-words text-navy [overflow-wrap:anywhere]">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="apply-notes"
                    className="block text-sm font-medium text-navy"
                  >
                    Anything else we should know? (optional)
                  </label>
                  <textarea
                    id="apply-notes"
                    value={values.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    rows={4}
                    maxLength={2000}
                    className={inputClass}
                    aria-describedby="apply-notes-hint"
                  />
                  <p id="apply-notes-hint" className="text-sm text-muted">
                    Mention deadlines or questions. Please leave out sensitive
                    document details.
                  </p>
                </div>
                <div className="space-y-3 rounded-sm border border-line bg-paper p-5">
                  <p className="font-medium text-navy">
                    No payment required now.
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    We’ll review your profile and documents, confirm the
                    university’s application fee, and send you an itemized final
                    quote. We only proceed after you approve the quote and
                    complete payment.
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    Your private WhatsApp group is created manually, with your
                    agreement, after payment. University admission is not
                    guaranteed.
                  </p>
                </div>
                <div>
                  <label className="flex min-h-12 cursor-pointer items-start gap-3 text-sm leading-relaxed text-navy">
                    <input
                      id="apply-consent"
                      type="checkbox"
                      required
                      checked={values.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      className="mt-1 size-5 shrink-0 accent-navy"
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby="apply-consent-description"
                    />
                    <span>
                      I agree that Edubros may review my details and contact me
                      about this request. I understand this is an estimate, not
                      a paid order.
                    </span>
                  </label>
                  <p
                    id="apply-consent-description"
                    className="mt-3 pl-8 text-sm leading-relaxed text-muted"
                  >
                    Read how we handle your details in the{" "}
                    <Link
                      href="/applynow/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy underline underline-offset-4"
                    >
                      application privacy notice (opens a new tab)
                    </Link>
                    . No marketing subscription.
                  </p>
                  {errors.consent ? (
                    <p className="mt-3 text-sm text-red-800">
                      {errors.consent}
                    </p>
                  ) : null}
                </div>
              </>
            ) : null}
          </fieldset>
          {Object.values(errors).some(Boolean) ? (
            <p role="alert" className="mt-6 text-sm text-red-800">
              Please check the highlighted fields before continuing.
            </p>
          ) : null}
          {sendError ? (
            <div
              role="alert"
              className="mt-6 space-y-3 border border-red-800/30 bg-red-50 p-4 text-sm leading-relaxed text-red-900"
            >
              <p>{sendError}</p>
              <a
                href={whatsappLink(
                  `Hi Edubros, I need help sending my application request ${failedReference}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Contact Edubros on WhatsApp
              </a>
            </div>
          ) : null}
          {!intakeOpen ? (
            <p
              role="status"
              className="mt-6 border border-line bg-paper p-4 text-sm leading-relaxed text-muted"
            >
              Online requests are opening soon. In the meantime, contact{" "}
              <a className="text-navy underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or{" "}
              <a
                className="text-navy underline"
                href={whatsappLink(
                  "Hi Edubros, I'd like help with one university application.",
                )}
              >
                WhatsApp us
              </a>
              .
            </p>
          ) : null}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => navigate(step - 1)}
                disabled={sending}
                className={`${buttonClass} border border-navy/25 text-navy hover:bg-paper-dim`}
              >
                <span aria-hidden="true">←</span> Back
              </button>
            ) : (
              <p className="text-center text-sm text-muted sm:text-left">
                No payment details needed.
              </p>
            )}
            <button
              type="submit"
              disabled={sending || (step === 3 && !intakeOpen)}
              className={`${buttonClass} bg-navy text-white hover:bg-navy-veil`}
            >
              {sending
                ? "Sending your request…"
                : step === 3
                  ? "Send my request"
                  : "Continue"}
              <span aria-hidden="true">{sending ? "" : "→"}</span>
            </button>
          </div>
          {step === 3 ? (
            <p className="mt-4 text-center text-sm font-medium text-navy sm:text-right">
              Payable now: €0 · University fee confirmed after review
            </p>
          ) : null}
        </form>
      </div>
      <Estimate values={values} />
    </div>
  );
}
