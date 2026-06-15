import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

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
            fontSize: "64px",
            fontWeight: 800,
            color: "#f5f5f4",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {DATA.name}
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#7a9ec8",
            marginBottom: "24px",
          }}
        >
          {DATA.title}
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
          {DATA.metrics[0].value}
          {DATA.metrics[0].suffix} years · {DATA.metrics[1].value}
          {DATA.metrics[1].suffix} apps · {DATA.metrics[2].value} industries —{" "}
          {DATA.description.slice(0, 100)}…
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
          {DATA.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
