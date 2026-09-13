import type { BeforeSendEvent } from "@vercel/analytics/next";

const publicPaths = new Set(["/", "/applynow", "/applynow/privacy"]);

// Page views only: never forward form contents, custom events, query strings,
// fragments, or unknown paths that could contain a student's identifiers.
export function sanitizeAnalyticsEvent(
  event: BeforeSendEvent,
): BeforeSendEvent | null {
  if (event.type !== "pageview") return null;

  try {
    const url = new URL(event.url);
    if (!publicPaths.has(url.pathname)) return null;
    if (!["https:", "http:"].includes(url.protocol)) return null;
    url.search = "";
    url.hash = "";
    url.username = "";
    url.password = "";
    return { type: "pageview", url: url.toString() };
  } catch {
    return null;
  }
}
