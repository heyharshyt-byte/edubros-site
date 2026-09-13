"use client";

import dynamic from "next/dynamic";
import { sanitizeAnalyticsEvent } from "@/lib/analytics";

// Keep the root layout server-rendered; load analytics after hydration.
const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((module) => module.Analytics),
  { ssr: false },
);

export function SiteAnalytics() {
  return <Analytics beforeSend={sanitizeAnalyticsEvent} debug={false} />;
}
