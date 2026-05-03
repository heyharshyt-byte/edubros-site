import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import {
  OrganizationLd,
  WebsiteLd,
  ServicesLd,
} from "@/components/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0e1a3a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Study in Italy | Bachelor, Master, PhD & Italian Student Visa`,
    template: `%s · ${site.name}`,
  },
  description:
    "Edubros is an Ancona-based education consultancy that helps international students apply to Italian universities. Bachelor's, Master's and PhD admissions, plus full Italian student visa support.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  generator: "Next.js",
  keywords: [
    "study in Italy",
    "Italian universities",
    "Italian student visa",
    "study abroad consultant Italy",
    "Bachelor in Italy",
    "Master in Italy",
    "PhD in Italy",
    "Politecnico di Milano admission",
    "Università di Bologna admission",
    "Sapienza admission",
    "DSU scholarship Italy",
    "ISEE international students",
    "TOLC test preparation",
    "Italy student visa India",
    "study in Italy from India",
    "education consultant Ancona",
    "Edubros",
  ],
  category: "Education",
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
    languages: { en: "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Study in Italy`,
    description:
      "Bachelor's, Master's, PhD and student visa support for international students applying to Italian universities. Based in Ancona.",
    // Image is provided by app/opengraph-image.tsx (file convention)
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Study in Italy`,
    description:
      "Bachelor's, Master's, PhD and student visa support for international students applying to Italian universities.",
    // Image is provided by app/twitter-image.tsx (file convention)
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationLd />
        <WebsiteLd />
        <ServicesLd />
        {children}
      </body>
    </html>
  );
}
