import { ImageResponse } from "next/og";
import { portfolioData } from "@/lib/portfolio";

export const alt = `${portfolioData.profile.name} — ${portfolioData.profile.en.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#06090d",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(15, 76, 92, 0.72), transparent 55%), radial-gradient(circle at 85% 75%, rgba(16, 185, 129, 0.36), transparent 52%), radial-gradient(circle at 55% 100%, rgba(56, 189, 248, 0.25), transparent 50%)",
          color: "#f4f7f9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "999px",
                background: "#10b981",
              }}
            />
            <span>{portfolioData.profile.monogram}</span>
          </div>

          <div
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              fontSize: "18px",
              color: "#38bdf8",
            }}
          >
            {portfolioData.profile.en.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "980px",
            }}
          >
            {portfolioData.profile.en.headline}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(244, 247, 249, 0.76)",
              maxWidth: "880px",
              lineHeight: 1.45,
            }}
          >
            {portfolioData.profile.en.subheadline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "rgba(244, 247, 249, 0.68)",
          }}
        >
          <span>{portfolioData.profile.name}</span>
          <span>Next.js • TypeScript • Vercel Edge</span>
        </div>
      </div>
    ),
    size
  );
}
