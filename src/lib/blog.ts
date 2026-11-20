import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog posts are Markdown files in web/content/blog/<slug>.md with front matter:
 *
 * ---
 * title: "Post title"                 (required, ≤ 60 chars for search results)
 * description: "One-sentence summary"  (required, 120–160 chars — the Google snippet)
 * date: "2026-11-19"                  (required, ISO date)
 * updated: "2026-11-20"               (optional)
 * author: "Clippy team"               (optional)
 * tags: ["calls", "productivity"]     (optional)
 * draft: true                         (optional — hidden everywhere when true)
 * ---
 *
 * Everything is read at build time, so posts are static HTML.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function readPostFile(slug: string): { data: Record<string, unknown>; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (data.draft === true) return null;
  return { data, content };
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  const words = content.trim().split(/\s+/).length;
  const iso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v));
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: iso(data.date),
    updated: data.updated ? iso(data.updated) : undefined,
    author: data.author ? String(data.author) : "Clippy team",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 230)),
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** All published posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const raw = readPostFile(slug);
      return raw ? toMeta(slug, raw.data, raw.content) : null;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const raw = readPostFile(slug);
  if (!raw) return null;
  const html = marked.parse(raw.content, { async: false, gfm: true }) as string;
  return { ...toMeta(slug, raw.data, raw.content), html };
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
