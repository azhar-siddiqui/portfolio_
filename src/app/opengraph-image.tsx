import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const runtime = "edge";

export const alt = `${DATA.name} — Senior Product Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative accent elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "80px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {DATA.name}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#3b82f6",
            marginBottom: "24px",
          }}
        >
          Senior Product Engineer
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: 400,
            color: "#94a3b8",
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          5+ years · 15+ products · 10 industries — Building software that
          drives revenue, cuts costs, and scales operations.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#64748b",
            }}
          >
            {DATA.url.replace("https://", "")}
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#64748b",
              }}
            >
              {DATA.location}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
