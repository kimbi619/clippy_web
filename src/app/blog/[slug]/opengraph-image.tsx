import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { formatDate, getPost, getPostSlugs } from "@/lib/blog";

export const alt = "Clippy blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "__none__" }];
}

// The icon never changes per request, so read it once at module scope.
const iconData = await readFile(join(process.cwd(), "public/brand/clippy-icon.png"), "base64");
const iconSrc = `data:image/png;base64,${iconData}`;

const INK = "#1d1d1f";
const MUTED = "#6e6e73";
const GREEN = "#167A55";
const CREAM = "#FCEEE1"; // the site's --cream, so share cards match the pages

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Clippy blog";
  // Long titles step down so they stay within three lines.
  const fontSize = title.length > 48 ? 64 : title.length > 32 ? 72 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: CREAM,
          color: INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={iconSrc} width={56} height={56} alt="" style={{ borderRadius: 14 }} />
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>Clippy</div>
          <div style={{ display: "flex", fontSize: 32, color: MUTED, marginLeft: 4 }}>Blog</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: MUTED }}>
          <div style={{ display: "flex", width: 40, height: 6, borderRadius: 3, background: GREEN }} />
          <div style={{ display: "flex" }}>
            {post ? `${formatDate(post.date)} · ${post.readingMinutes} min read` : "clippy.chat"}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
