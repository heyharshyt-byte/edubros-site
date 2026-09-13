import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeAnalyticsEvent } from "../src/lib/analytics";

test("analytics accepts each current public page", () => {
  for (const path of ["/", "/applynow", "/applynow/privacy"]) {
    const event = { type: "pageview" as const, url: `https://www.edubros.in${path}` };
    assert.deepEqual(sanitizeAnalyticsEvent(event), event);
  }
});

test("analytics strips query strings and fragments without mutating the input", () => {
  const event = {
    type: "pageview" as const,
    url: "https://www.edubros.in/applynow?email=qa%40example.com&utm_source=test#EDU-test",
  };
  assert.deepEqual(sanitizeAnalyticsEvent(event), {
    type: "pageview",
    url: "https://www.edubros.in/applynow",
  });
  assert.ok(event.url.includes("email="));
});

test("analytics does not forward custom events", () => {
  assert.equal(sanitizeAnalyticsEvent({ type: "event", url: "https://www.edubros.in/" }), null);
});

test("analytics rejects private, API, unknown and malformed URLs", () => {
  for (const url of [
    "https://www.edubros.in/api/applications",
    "https://www.edubros.in/admin",
    "https://www.edubros.in/applynow/EDU-test",
    "https://www.edubros.in/student/qa@example.com",
    "not a URL",
    "file:///applynow",
  ]) {
    assert.equal(sanitizeAnalyticsEvent({ type: "pageview", url }), null);
  }
});

test("analytics removes URL credentials", () => {
  assert.deepEqual(sanitizeAnalyticsEvent({
    type: "pageview", url: "https://test:secret@www.edubros.in/",
  }), { type: "pageview", url: "https://www.edubros.in/" });
});
