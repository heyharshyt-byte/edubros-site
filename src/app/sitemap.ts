import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const sections = [
    "",
    "#why-italy",
    "#side-by-side",
    "#cities",
    "#universities",
    "#programs",
    "#process",
    "#lead-form",
    "#about",
    "#testimonials",
    "#community",
    "#faq",
  ];
  return sections.map((s) => ({
    url: `${site.url}/${s}`,
    lastModified,
    changeFrequency: "weekly",
    priority: s === "" ? 1 : 0.7,
  }));
}
