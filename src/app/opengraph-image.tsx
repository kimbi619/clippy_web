import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

// Site-wide default social image. Pages without their own image inherit it.
export const alt = "Clippy — Your assistant inside WhatsApp calls.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The icon never changes per request, so read it once at module scope.
const iconData = await readFile(join(process.cwd(), "public/brand/clippy-icon.png"), "base64");
const iconSrc = `data:image/png;base64,${iconData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background: "#FFF4E6",
          color: "#1d1d1f",
        }}
      >
        <img src={iconSrc} width={168} height={168} alt="" style={{ borderRadius: 38 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 48, lineHeight: 1.2, letterSpacing: -1, maxWidth: 900 }}>{site.tagline}</div>
          <div style={{ display: "flex", marginTop: 12, width: 72, height: 8, borderRadius: 4, background: "#167A55" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
