import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

type SocialImageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags: readonly string[];
};

export function createSocialImage({
  eyebrow,
  title,
  subtitle,
  tags,
}: SocialImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0a09",
          color: "#f5f5f4",
          padding: "72px 80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              color: "#60a5fa",
              fontSize: 25,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 44,
                height: 6,
                borderRadius: 999,
                background: "#60a5fa",
              }}
            />
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              color: "#a8a29e",
              fontSize: 20,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            kevinasramoska-portfolio.vercel.app
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1020 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 20 ? 68 : 80,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 950,
              color: "#d6d3d1",
              fontSize: 32,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "nowrap", gap: 12 }}>
          {tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              style={{
                display: "flex",
                border: "2px solid #44403c",
                borderRadius: 999,
                padding: "9px 14px",
                color: "#e7e5e4",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    socialImageSize,
  );
}
