import { DATA } from "@/data/resume";
import { palette } from "@/lib/theme";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = `${DATA.name} — Projects Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const featuredCount = DATA.projects.filter((p) => p.featured).length;
  const totalCount = DATA.projects.length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: palette.light.background,
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: palette.light.primary,
          }}
        />
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: palette.light.foreground,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          Projects by {DATA.name}
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: palette.light.primary,
            marginBottom: "24px",
          }}
        >
          {totalCount} Products · {featuredCount} Featured · 10+ Industries
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 400,
            color: palette.light.mutedForeground,
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          Maritime, logistics, fintech, EdTech, e-commerce, healthcare — mission-critical software that drives measurable business results.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            fontSize: "18px",
            fontWeight: 500,
            color: palette.light.mutedForeground,
          }}
        >
          {DATA.url.replace("https://", "")}/projects
        </div>
      </div>
    ),
    { ...size }
  );
}
