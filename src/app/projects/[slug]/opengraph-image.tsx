import { ImageResponse } from "next/og";
import { getProjectBySlug, portfolioData } from "@/lib/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.en.title ?? portfolioData.profile.name;
  const tagline = project?.en.tagline ?? portfolioData.profile.en.subheadline;
  const index = project?.index ?? "01";
  const metrics = project?.en.metrics ?? [];
  const stack = project?.stack.slice(0, 4) ?? [];

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
            "radial-gradient(circle at 18% 20%, rgba(15, 76, 92, 0.78), transparent 55%), radial-gradient(circle at 86% 80%, rgba(56, 189, 248, 0.34), transparent 52%)",
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
          <span style={{ fontSize: "22px", color: "#10b981", fontWeight: 700 }}>
            CASE STUDY {index}
          </span>
          <span style={{ fontSize: "20px", color: "rgba(244,247,249,0.7)" }}>
            {portfolioData.profile.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(244, 247, 249, 0.76)",
              maxWidth: "920px",
              lineHeight: 1.45,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "28px", fontWeight: 700, color: "#38bdf8" }}>
                  {m.value}
                </span>
                <span style={{ fontSize: "16px", color: "rgba(244,247,249,0.65)" }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {stack.map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.06)",
                  fontSize: "16px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
