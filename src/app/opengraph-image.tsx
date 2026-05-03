import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Image metadata
export const alt = `${site.name} — Study in Italy. Bachelor, Master, PhD and Italian student visa support, based in Ancona.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(spec: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    spec,
  )}&text=${encodeURIComponent(text)}`;
  try {
    const css = await (
      await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })
    ).text();
    const match = css.match(/src:\s*url\((https:[^)]+)\)\s+format/);
    if (!match) return null;
    return await (await fetch(match[1])).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const text =
    "A future studying in Italy. Edubros Bachelor Master PhD Visa Ancona Italia MMXXVI edubros.in";

  const [newsregular, newsitalic, intersemi] = await Promise.all([
    loadGoogleFont("Newsreader:wght@500", text),
    loadGoogleFont("Newsreader:ital,wght@1,500", text),
    loadGoogleFont("Inter:wght@600", text),
  ]);

  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    style: "normal" | "italic";
    weight: 400 | 500 | 600;
  }> = [];
  if (newsregular)
    fonts.push({
      name: "Newsreader",
      data: newsregular,
      style: "normal",
      weight: 500,
    });
  if (newsitalic)
    fonts.push({
      name: "NewsreaderItalic",
      data: newsitalic,
      style: "italic",
      weight: 500,
    });
  if (intersemi)
    fonts.push({
      name: "Inter",
      data: intersemi,
      style: "normal",
      weight: 600,
    });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "70px 80px",
          color: "white",
          // Editorial navy with a warm gold radial top-left + cool deep navy bottom-right
          backgroundImage:
            "radial-gradient(ellipse 50% 80% at 18% 10%, rgba(200, 154, 58, 0.18) 0%, rgba(7,16,42,0) 55%), radial-gradient(ellipse 60% 80% at 90% 100%, rgba(7, 16, 42, 0.95) 0%, rgba(14, 26, 58, 0.85) 70%), linear-gradient(135deg, #07102A 0%, #0E1A3A 50%, #182547 100%)",
          fontFamily: "Inter",
        }}
      >
        {/* Top dossier strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            color: "#ECD28F",
            fontSize: 18,
            letterSpacing: "5px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span>Edubros / Dossier</span>
          <span
            style={{ width: "44px", height: "1px", background: "#C89A3A" }}
          />
          <span>Ancona · Italia</span>
          <span
            style={{ width: "44px", height: "1px", background: "#C89A3A" }}
          />
          <span>MMXXVI</span>
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Newsreader",
            fontSize: 132,
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
          }}
        >
          <span style={{ fontWeight: 500 }}>A future</span>
          <span style={{ fontWeight: 500 }}>studying in</span>
          <span
            style={{
              fontFamily: "NewsreaderItalic",
              fontStyle: "italic",
              fontWeight: 500,
              color: "#ECD28F",
            }}
          >
            Italy.
          </span>
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Brand mark + wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border: "1px solid rgba(200,154,58,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Mortarboard mark */}
              <svg
                width="34"
                height="34"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M32 18 L52 26 L32 34 L12 26 Z" fill="#F6F3EC" />
                <path
                  d="M20 30 V40 C20 44 25 47 32 47 C39 47 44 44 44 40 V30"
                  stroke="#F6F3EC"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M52 26 L52 38" stroke="#C89A3A" strokeWidth="1.8" />
                <circle cx="52" cy="40" r="2.6" fill="#C89A3A" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Edubros
            </span>
          </div>

          {/* Tagline + URL */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: "#C89A3A",
                letterSpacing: "5px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Bachelor · Master · PhD · Visa
            </span>
            <span
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
              }}
            >
              edubros.in
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
