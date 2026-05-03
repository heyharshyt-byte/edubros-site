/**
 * Country-by-country comparison for international students choosing where to study.
 * Numbers are conservative ranges drawn from public sources (gov.uk, DAAD, MIUR,
 * Universities Australia). Update before launch if anything has shifted.
 *
 * The "edge" key marks rows where Italy has a clear quantitative advantage and
 * gets a small gold accent in the rendered table.
 */

export type ComparisonRow = {
  label: string;
  italy: string;
  uk: string;
  germany: string;
  australia: string;
  edge: "italy" | "neutral";
};

export const comparison: ComparisonRow[] = [
  {
    label: "Annual public-uni tuition",
    italy: "€156–€4,000",
    uk: "£20,000–£35,000",
    germany: "€0–€1,500",
    australia: "AUD $30,000–$45,000",
    edge: "italy",
  },
  {
    label: "Monthly living cost",
    italy: "€300–€700",
    uk: "£900–£1,500",
    germany: "€850–€1,200",
    australia: "AUD $1,500–$2,500",
    edge: "italy",
  },
  {
    label: "Income-based fee waivers",
    italy: "Yes (ISEE / DSU)",
    uk: "No",
    germany: "Limited",
    australia: "No",
    edge: "italy",
  },
  {
    label: "Work hours during studies",
    italy: "20 hrs/week",
    uk: "20 hrs/week",
    germany: "20 hrs/week",
    australia: "48 hrs/fortnight",
    edge: "neutral",
  },
  {
    label: "Post-study stay-back",
    italy: "12 months",
    uk: "24 months",
    germany: "18 months",
    australia: "2–4 years",
    edge: "neutral",
  },
  {
    label: "English-taught Master's",
    italy: "Wide and growing",
    uk: "Native",
    germany: "Wide",
    australia: "Native",
    edge: "neutral",
  },
  {
    label: "Schengen / EU access",
    italy: "Yes",
    uk: "No",
    germany: "Yes",
    australia: "No",
    edge: "italy",
  },
];

export const comparisonNote =
  "Public-university and government sources, 2025. Tuition reflects regulated public-sector fees; private universities can run higher. Italian fees are tied to ISEE family-income brackets — most international students at the lower brackets pay closer to the minimum.";
