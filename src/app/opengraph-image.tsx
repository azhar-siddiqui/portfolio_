import { DATA } from "@/data/resume";
import { palette } from "@/lib/theme";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = `${DATA.name} — ${DATA.title}`;
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
          background: palette.light.background,
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
            background: palette.light.primary,
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
            background: "transparent",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: palette.light.foreground,
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
            color: palette.light.primary,
            marginBottom: "24px",
          }}
        >
          {DATA.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: 400,
            color: palette.light.mutedForeground,
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          {DATA.tagline}
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
              color: palette.light.mutedForeground,
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
                color: palette.light.mutedForeground,
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
