import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

/*
 * RSS 2.0 feed of published posts. It reads only local files (no request
 * data), so with Cache Components it is prerendered at build time.
 */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC 822 date for RSS, from an ISO yyyy-mm-dd front matter date. */
function rssDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

export async function GET() {
  const posts = getAllPosts();
  const feedUrl = absoluteUrl("/blog/feed.xml");
  const blogUrl = absoluteUrl("/blog");
  const lastBuild = posts[0] ? rssDate(posts[0].updated ?? posts[0].date) : undefined;

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const categories = post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n");
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <pubDate>${rssDate(post.date)}</pubDate>`,
        `      <dc:creator>${escapeXml(post.author)}</dc:creator>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${site.name} blog`)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml("Notes on WhatsApp calls, voice notes and working with Clippy.")}</description>
    <language>en</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${lastBuild ? `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` : ""}    <image>
      <url>${escapeXml(absoluteUrl("/brand/clippy-icon.png"))}</url>
      <title>${escapeXml(`${site.name} blog`)}</title>
      <link>${escapeXml(blogUrl)}</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
