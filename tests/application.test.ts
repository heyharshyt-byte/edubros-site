import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import {
  applicationEstimate,
  applicationRequestId,
  initialApplication,
  parseApplication,
  validateApplication,
  type ApplicationValues,
} from "../src/lib/application";
import {
  applicationEmailFields,
  sendApplicationEmail,
} from "../src/lib/application-email";
import { createApplicationHandler } from "../src/lib/application-intake";

const valid: ApplicationValues = {
  ...initialApplication,
  name: "Edubros QA Student",
  email: "qa@example.com",
  whatsapp: "+390000000000",
  nationality: "Test nationality",
  residence: "Test country",
  qualification: "BSc (test)",
  subject: "Engineering (test)",
  grades: "80/100 (test)",
  level: "Master's",
  intake: "September 2027",
  university: "Test University",
  programme: "Test Programme",
  cvStatus: "Yes",
  sopStatus: "No",
  englishStatus: "Not sure",
  academicStatus: "Yes",
  passportStatus: "Yes",
  assistance: [],
  consent: true,
};

test("base is EUR 50, with no payment due", () => {
  assert.equal(applicationEstimate([]).service, 50);
  assert.equal(applicationEstimate([]).payableNow, 0);
});
test("only requested assistance affects price", () => {
  assert.equal(applicationEstimate(["cv"]).service, 60);
  assert.equal(applicationEstimate(["cv", "sop"]).service, 70);
  assert.equal(applicationEstimate(["cv", "sop", "english"]).service, 80);
  assert.equal(applicationEstimate(["cv", "cv"]).service, 60);
});
test("all No answers do not add charges", () => {
  const values = {
    ...valid,
    cvStatus: "No",
    sopStatus: "No",
    englishStatus: "No",
    academicStatus: "No",
    passportStatus: "No",
  };
  const parsed = parseApplication(values);
  assert.ok(parsed);
  assert.deepEqual(parsed.errors, {});
  assert.equal(applicationEstimate(parsed.values.assistance).service, 50);
});
test("valid application normalizes whitespace and ignores forged totals", () => {
  const parsed = parseApplication({
    ...valid,
    name: "  Edubros QA Student  ",
    total: 0,
    recipient: "attacker@example.com",
  });
  assert.ok(parsed);
  assert.deepEqual(parsed.errors, {});
  assert.equal(parsed.values.name, valid.name);
  assert.equal("total" in parsed.values, false);
  assert.equal("recipient" in parsed.values, false);
});
test("shortlisting needs manual review and clears hidden choices", () => {
  const parsed = parseApplication({ ...valid, needsShortlist: true });
  assert.ok(parsed);
  assert.equal(parsed.values.university, "");
  assert.equal(parsed.values.programme, "");
  assert.deepEqual(parsed.errors, {});
  assert.match(
    applicationEmailFields(parsed.values, "EDU-TEST")["University selection"],
    /manual review/,
  );
});
test("specific applications need university and programme", () => {
  const errors = validateApplication({
    ...valid,
    university: "",
    programme: "",
  });
  assert.ok(errors.university);
  assert.ok(errors.programme);
});

test("invalid hidden programme URL cannot block a shortlisting request", () => {
  const values = {
    ...valid,
    needsShortlist: true,
    programmeUrl: "www.example.com/course",
  };
  assert.deepEqual(validateApplication(values, 1), {});
  assert.deepEqual(parseApplication(values)?.errors, {});
});

test("retry identity survives reverted edits, whitespace and selection order", () => {
  const attempts = new Map<string, string>();
  const first = applicationRequestId(
    { ...valid, assistance: ["cv", "sop"] },
    attempts,
    randomUUID,
  );
  const edited = applicationRequestId(
    { ...valid, name: "Changed", assistance: ["cv", "sop"] },
    attempts,
    randomUUID,
  );
  const reverted = applicationRequestId(
    { ...valid, name: ` ${valid.name} `, assistance: ["sop", "cv"] },
    attempts,
    randomUUID,
  );
  assert.notEqual(first, edited);
  assert.equal(first, reverted);
});
test("step validation doesn't ask for future-step fields", () => {
  assert.deepEqual(
    validateApplication(
      { ...valid, university: "", programme: "", consent: false },
      0,
    ),
    {},
  );
});
test("consent must be explicit", () => {
  assert.ok(validateApplication({ ...valid, consent: false }).consent);
  assert.equal(parseApplication({ ...valid, consent: "true" }), null);
});
test("all document questions need an answer", () => {
  assert.ok(validateApplication({ ...valid, cvStatus: "" }).cvStatus);
});
test("malformed emails and country-code-free phone numbers fail", () => {
  assert.ok(validateApplication({ ...valid, email: "wrong" }).email);
  assert.ok(validateApplication({ ...valid, whatsapp: "123456789" }).whatsapp);
  assert.ok(
    validateApplication({ ...valid, whatsapp: "+1234567890123456" }).whatsapp,
  );
});
for (const url of [
  "javascript:alert(1)",
  "file:///etc/passwd",
  "https://user:password@example.com",
  "not-a-url",
]) {
  test(`unsafe programme URL rejected: ${url}`, () =>
    assert.ok(
      validateApplication({ ...valid, programmeUrl: url }).programmeUrl,
    ));
}
for (const bad of [
  null,
  [],
  {},
  { ...valid, name: "x".repeat(101) },
  { ...valid, notes: "x".repeat(2001) },
  { ...valid, email: "qa@example.com\r\nBcc: bad@example.com" },
  { ...valid, assistance: ["passport"] },
  { ...valid, assistance: ["cv", "cv"] },
  { ...valid, needsShortlist: "false" },
]) {
  test("rejects malformed, oversized, forged or duplicate field data", () =>
    assert.equal(parseApplication(bad), null));
}

function request(
  values: unknown = valid,
  requestId: string = randomUUID(),
  extras: Record<string, unknown> = {},
) {
  return new Request("http://localhost:3001/api/applications", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3001",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values, requestId, website: "", ...extras }),
  });
}
const handler = (
  sendEmail: (
    values: ApplicationValues,
    ref: string,
  ) => Promise<void> = async () => {},
) => createApplicationHandler({ sendEmail, production: false, enabled: true });

test("successful send has a reference; duplicate uses the same result", async () => {
  let calls = 0;
  const send = handler(async () => {
    calls++;
  });
  const id = randomUUID();
  const first = await send(request(valid, id));
  const second = await send(request(valid, id));
  assert.equal(first.status, 200);
  assert.equal(calls, 1);
  assert.deepEqual(await first.json(), await second.json());
});
test("changed payload under same reference is rejected", async () => {
  const send = handler();
  const id = randomUUID();
  await send(request(valid, id));
  assert.equal(
    (await send(request({ ...valid, name: "Other name" }, id))).status,
    409,
  );
});
test("email failure never gives a success response", async () => {
  const response = await handler(async () => {
    throw new Error("Provider down");
  })(request());
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /couldn't confirm delivery/);
});
test("production stays closed until email is verified", async () => {
  const send = createApplicationHandler({
    production: true,
    enabled: false,
    sendEmail: async () => {
      throw new Error("Must not send");
    },
  });
  assert.equal((await send(request())).status, 503);
});
test("missing consent is blocked server-side", async () => {
  const response = await handler()(request({ ...valid, consent: false }));
  assert.equal(response.status, 422);
});
test("cross-origin and missing Origin requests are rejected", async () => {
  for (const origin of [
    null,
    "https://evil.example",
    "https://www.edubros.in.evil.example",
  ]) {
    const req = request();
    if (origin) req.headers.set("origin", origin);
    else req.headers.delete("origin");
    assert.equal((await handler()(req)).status, 403);
  }
});
test("localhost is not allowed in production", async () => {
  const send = createApplicationHandler({
    production: true,
    enabled: true,
    sendEmail: async () => {},
  });
  assert.equal((await send(request())).status, 403);
});
test("both real site origins are accepted in production", async () => {
  const send = createApplicationHandler({
    production: true,
    enabled: true,
    sendEmail: async () => {},
  });
  for (const origin of ["https://edubros.in", "https://www.edubros.in"]) {
    const req = request();
    req.headers.set("origin", origin);
    assert.equal((await send(req)).status, 200);
  }
});
test("honeypot and invalid request IDs are rejected", async () => {
  assert.equal(
    (await handler()(request(valid, randomUUID(), { website: "spam" }))).status,
    400,
  );
  assert.equal((await handler()(request(valid, "not-a-uuid"))).status, 400);
});
test("wrong content type and oversized bodies fail before sending", async () => {
  const req = request();
  req.headers.set("content-type", "text/plain");
  assert.equal((await handler()(req)).status, 415);
  const large = request();
  large.headers.set("content-length", "17000");
  assert.equal((await handler()(large)).status, 413);
  assert.equal(
    (
      await handler()(
        request(valid, randomUUID(), { padding: "x".repeat(17000) }),
      )
    ).status,
    400,
  );
});
test("request bursts are rate limited", async () => {
  const send = handler();
  for (let i = 0; i < 8; i++) assert.equal((await send(request())).status, 200);
  assert.equal((await send(request())).status, 429);
});
test("email fields explain assistance, unknown fee and EUR 0 due", () => {
  const fields = applicationEmailFields(
    { ...valid, assistance: ["cv", "sop"] },
    "EDU-TEST",
  );
  assert.equal(fields["Estimated Edubros service charge"], "EUR 70");
  assert.match(fields["University application fee"], /Unknown/);
  assert.match(fields["Payable now"], /EUR 0/);
});
test("Resend payload is fixed-recipient, escaped, idempotent and truthful", async () => {
  const oldKey = process.env.RESEND_API_KEY;
  const oldFrom = process.env.APPLICATION_EMAIL_FROM;
  process.env.RESEND_API_KEY = "TEST_KEY_NOT_REAL";
  process.env.APPLICATION_EMAIL_FROM =
    "Edubros <applications@updates.edubros.in>";
  try {
    const mockFetch: typeof fetch = async (url, init) => {
      assert.equal(url, "https://api.resend.com/emails");
      const payload = JSON.parse(String(init?.body));
      assert.deepEqual(payload.to, ["edubros.in@gmail.com"]);
      assert.equal(payload.reply_to, valid.email);
      assert.equal(
        new Headers(init?.headers).get("Idempotency-Key"),
        "application/EDU-TEST",
      );
      assert.ok(!payload.html.includes("<script>"));
      assert.match(payload.html, /&lt;script&gt;/);
      return Response.json({ id: "test-email-id" });
    };
    await sendApplicationEmail(
      { ...valid, notes: "<script>alert('x')</script>" },
      "EDU-TEST",
      mockFetch,
    );
    await assert.rejects(
      sendApplicationEmail(valid, "EDU-TEST", async () =>
        Response.json({ error: "failure" }, { status: 403 }),
      ),
    );
    await assert.rejects(
      sendApplicationEmail(valid, "EDU-TEST", async () =>
        Response.json({ success: true }),
      ),
    );
  } finally {
    if (oldKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = oldKey;
    if (oldFrom === undefined) delete process.env.APPLICATION_EMAIL_FROM;
    else process.env.APPLICATION_EMAIL_FROM = oldFrom;
  }
});
