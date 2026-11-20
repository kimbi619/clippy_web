import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

/**
 * Static `lastModified` dates on purpose: the site is prerendered, and a
 * build-time `new Date()` would tell crawlers every page changed on every
 * deploy. Bump a date when that page's content really changes.
 */
const staticRoutes: {
  path: string;
  lastModified: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}[] = [
  { path: "/", lastModified: "2026-11-19", changeFrequency: "weekly", priority: 1 },
  { path: "/features", lastModified: "2026-11-19", changeFrequency: "monthly", priority: 0.9 },
  { path: "/how-it-works", lastModified: "2026-11-19", changeFrequency: "monthly", priority: 0.9 },
  { path: "/download", lastModified: "2026-11-19", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy", lastModified: "2026-11-19", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pricing", lastModified: "2026-11-20", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", lastModified: "2026-11-19", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", lastModified: "2026-11-19", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", lastModified: "2026-11-19", changeFrequency: "yearly", priority: 0.5 },
  { path: "/blog", lastModified: "2026-11-19", changeFrequency: "weekly", priority: 0.8 },
  { path: "/legal/privacy-policy", lastModified: "2026-11-19", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms", lastModified: "2026-11-19", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map(({ path, ...rest }) => ({
    url: absoluteUrl(path),
    ...rest,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updated ?? post.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
