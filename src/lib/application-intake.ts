import { createHash } from "node:crypto";
import { parseApplication, type ApplicationValues } from "./application";

type SendEmail = (
  values: ApplicationValues,
  reference: string,
) => Promise<void>;
const LIMIT = 16 * 1024;
const WINDOW = 15 * 60 * 1000;

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function readLimitedBody(request: Request) {
  if (!request.body) throw new Error("Empty body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > LIMIT) {
      await reader.cancel();
      throw new Error("Body too large");
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function createApplicationHandler({
  sendEmail,
  production,
  enabled,
}: {
  sendEmail: SendEmail;
  production: boolean;
  enabled: boolean;
}) {
  // Bounded, best-effort per-instance controls. Configure a Vercel WAF rate limit
  // for cross-instance protection; this is not a durable queue or a database.
  const attempts = new Map<string, { count: number; expires: number }>();
  const submissions = new Map<
    string,
    { digest: string; expires: number; sent: boolean }
  >();

  return async function handleApplication(request: Request) {
    if (production && !enabled)
      return json(
        {
          error:
            "Online requests are not open yet. Please contact Edubros on WhatsApp or email.",
        },
        503,
      );
    const origin = request.headers.get("origin");
    const allowed = ["https://www.edubros.in", "https://edubros.in"];
    if (!production)
      allowed.push("http://localhost:3001", "http://127.0.0.1:3001");
    if (!origin || !allowed.includes(origin))
      return json(
        {
          error: "Please send your request from the Edubros application page.",
        },
        403,
      );
    if (
      request.headers.get("content-type")?.split(";")[0].trim() !==
      "application/json"
    )
      return json(
        { error: "Use the application form to send your request." },
        415,
      );
    if (Number(request.headers.get("content-length")) > LIMIT)
      return json(
        { error: "Your request is too large. Please shorten your notes." },
        413,
      );
    const now = Date.now();
    for (const [key, record] of attempts)
      if (record.expires <= now) attempts.delete(key);
    for (const [key, record] of submissions)
      if (record.expires <= now) submissions.delete(key);
    const ip = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for") || "unknown"
      : "local";
    const key = createHash("sha256").update(ip).digest("hex");
    const record = attempts.get(key) || { count: 0, expires: now + WINDOW };
    if (record.count >= 8 || attempts.size >= 2000 || submissions.size >= 2000)
      return json(
        {
          error:
            "Too many requests. Please wait 15 minutes or contact Edubros directly.",
        },
        429,
      );
    record.count += 1;
    attempts.set(key, record);

    let body: Record<string, unknown>;
    try {
      const parsed = await readLimitedBody(request);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
        throw new Error("Invalid body");
      body = parsed;
    } catch {
      return json(
        {
          error:
            "We could not read your request. Check the form and try again.",
        },
        400,
      );
    }
    if (body.website !== "")
      return json(
        {
          error:
            "Request could not be accepted. Please contact Edubros directly.",
        },
        400,
      );
    if (
      typeof body.requestId !== "string" ||
      !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(
        body.requestId,
      )
    )
      return json({ error: "Refresh the page and try again." }, 400);
    const parsed = parseApplication(body.values);
    if (!parsed)
      return json(
        {
          error:
            "Some fields are invalid or too long. Please check your answers.",
        },
        400,
      );
    if (Object.keys(parsed.errors).length)
      return json(
        {
          error: "Please check the highlighted fields.",
          fields: parsed.errors,
        },
        422,
      );
    const reference = `EDU-${body.requestId.toUpperCase()}`;
    const digest = createHash("sha256")
      .update(JSON.stringify(parsed.values))
      .digest("hex");
    const previous = submissions.get(body.requestId);
    if (previous) {
      if (previous.digest !== digest)
        return json(
          { error: "This request has changed. Please start a new request." },
          409,
        );
      if (previous.sent) return json({ reference });
      return json(
        {
          error:
            "This request is already being sent. Please wait before trying again.",
        },
        409,
      );
    }
    submissions.set(body.requestId, {
      digest,
      expires: now + WINDOW,
      sent: false,
    });
    try {
      await sendEmail(parsed.values, reference);
      submissions.set(body.requestId, {
        digest,
        expires: now + WINDOW,
        sent: true,
      });
      return json({ reference });
    } catch {
      submissions.delete(body.requestId);
      // Never log contact details or raw provider responses.
      return json(
        {
          error: `We couldn't confirm delivery. Your answers are still here. Contact Edubros with reference ${reference} before retrying if you are unsure whether it went through.`,
          reference,
        },
        502,
      );
    }
  };
}
