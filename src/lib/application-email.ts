import {
  applicationEstimate,
  documentOptions,
  type ApplicationValues,
} from "./application";
import { applicationIntake } from "./application-config";

export function applicationEmailFields(
  values: ApplicationValues,
  reference: string,
) {
  const estimate = applicationEstimate(values.assistance);
  return {
    Source: applicationIntake.sourceUrl,
    "Request reference": reference,
    "Full name": values.name,
    email: values.email,
    WhatsApp: values.whatsapp,
    Nationality: values.nationality,
    "Country of residence": values.residence,
    Qualification: values.qualification,
    Subject: values.subject,
    "Grades and scale": values.grades,
    "Study level": values.level,
    Intake: values.intake,
    "Application scope": "One programme application at one university",
    "University selection": values.needsShortlist
      ? "Needs help choosing; manual review required"
      : values.university,
    Programme: values.needsShortlist ? "To be confirmed" : values.programme,
    "Programme link (student supplied; verify independently)":
      values.programmeUrl || "Not provided",
    ...Object.fromEntries(
      documentOptions.map(({ id, label }) => [label, values[id]]),
    ),
    "Requested assistance":
      estimate.items.map((item) => `${item.label}: EUR 10`).join("\n") ||
      "None requested",
    "Base service fee": "EUR 50 for one application",
    "Estimated assistance fees": `EUR ${estimate.assistance}`,
    "Estimated Edubros service charge": `EUR ${estimate.service}${values.needsShortlist ? " (provisional; university and programme not selected)" : ""}`,
    "University application fee":
      "Unknown; verify against the official programme call before quoting",
    "Final amount":
      "Not yet confirmed. Service estimate plus university application fee; send an itemized final quote.",
    "Payable now": "EUR 0. This is a request, not an order or payment.",
    "Student notes": values.notes || "None",
    Consent:
      "Student agreed to profile review and the application privacy notice; no marketing consent requested.",
    "Team checklist":
      "Review profile and deadline; arrange private document collection; confirm official fee and any applicable taxes; send final quote and terms; get student approval and payment; create private WhatsApp group with consent; obtain approval before application submission. Do not infer eligibility or promise admission.",
  };
}

export async function sendApplicationEmail(
  values: ApplicationValues,
  reference: string,
  fetcher: typeof fetch = fetch,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.APPLICATION_EMAIL_FROM;
  if (!apiKey || !from) throw new Error("Application email is not configured");
  const fields = applicationEmailFields(values, reference);
  const text = Object.entries(fields)
    .map(([label, value]) => `${label}\n${value}`)
    .join("\n\n");
  const escapeHtml = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char]!,
    );
  const rows = Object.entries(fields)
    .map(
      ([label, value]) =>
        `<tr><th scope="row" style="padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #d9d3c6;font-size:13px">${escapeHtml(label)}</th><td style="padding:12px;border-bottom:1px solid #d9d3c6;white-space:pre-wrap;overflow-wrap:anywhere;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Idempotency-Key": `application/${reference}`,
    },
    body: JSON.stringify({
      from,
      to: [applicationIntake.recipient],
      reply_to: values.email,
      subject: `Edubros application request ${reference}`,
      text,
      html: `<html lang="en"><body style="margin:0;background:#f6f3ec;color:#0e1a3a;font-family:Arial,sans-serif"><div style="max-width:760px;margin:auto;padding:24px"><h1 style="font-family:Georgia,serif">Edubros application desk</h1><p>New request · No payment collected · Manual review required</p><table style="width:100%;border-collapse:collapse;background:#fff">${rows}</table></div></body></html>`,
    }),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Email provider unavailable");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object")
    throw new Error("Invalid provider response");
  if (!("id" in result) || typeof result.id !== "string" || !result.id)
    throw new Error("Email acceptance not confirmed");
}
