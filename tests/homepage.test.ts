import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import sitemap from "../src/app/sitemap";

const homepage = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

test("homepage omits the retired About section without removing adjacent sections", () => {
  assert.doesNotMatch(homepage, /id="about"|<About\b|function About(?:Photo)?\b/);
  assert.match(homepage, /<LeadFormSection\s*\/>\s*<Testimonials\s*\/>\s*<InstagramStories\s*\/>/);
  assert.match(homepage, /<InstagramReels\s*\/>/);
  for (const label of ["N° 09 · From students", "N° 10 · Community", "N° 11 · FAQ", "N° 12 · Ready to start"]) {
    assert.ok(homepage.includes(label), label);
  }
});

test("sitemap no longer links to the removed About section", () => {
  const urls = sitemap().map((entry) => entry.url);
  assert.ok(urls.every((url) => !url.endsWith("#about")));
  assert.ok(urls.some((url) => url.endsWith("#lead-form")));
  assert.ok(urls.some((url) => url.endsWith("#testimonials")));
});
