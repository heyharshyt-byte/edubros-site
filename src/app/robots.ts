import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all standard crawlers + the major answer engines (AEO).
      // GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot are all explicitly
      // welcomed because their referrals are valuable for a consultancy.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
