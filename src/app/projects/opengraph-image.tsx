import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

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
          background: "linear-gradient(135deg, #0f1419 0%, #171c24 50%, #0f1419 100%)",
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
            background: "#284563",
          }}
        />
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#f5f5f4",
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
            color: "#7a9ec8",
            marginBottom: "24px",
          }}
        >
          {totalCount} Products · {featuredCount} Featured · 10+ Industries
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 400,
            color: "#a8a29e",
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
            color: "#78716c",
          }}
        >
          {DATA.url.replace("https://", "")}/projects
        </div>
      </div>
    ),
    { ...size }
  );
}
