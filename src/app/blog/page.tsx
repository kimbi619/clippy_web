import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PostList } from "@/components/blog/PostList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { formatDate, getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, site } from "@/lib/site";

import styles from "./blog.module.css";

const title = "Blog";
const description =
  "Notes on WhatsApp calls, voice notes and working with Clippy: practical guides to transcripts, call summaries and getting more out of every conversation.";

const base = pageMetadata({ title, description, path: "/blog" });

export const metadata: Metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: { "application/rss+xml": [{ url: "/blog/feed.xml", title: `${site.name} blog` }] },
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog"),
    url: absoluteUrl("/blog"),
    name: `${site.name} blog`,
    description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/clippy-icon.png") },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Organization", name: post.author },
      keywords: post.tags.join(", "),
    })),
  };

  return (
    <>
      <PageHeader
        title="Blog"
        lead="Notes on calls, voice notes and working with Clippy. How to get a clear record of what was said, and what to do with it."
      />

      <div className={`container-wide ${styles.body}`}>
        {featured ? (
          <>
            {/* The newest post, set as a feature: type does the work, the icon is the only picture. */}
            <article className={styles.feature}>
              <div className={styles.featureText}>
                <p className={styles.kicker}>Latest</p>
                <h2 className={styles.featureTitle}>
                  <Link href={`/blog/${featured.slug}`} className={styles.featureLink}>
                    {featured.title}
                  </Link>
                </h2>
                <p className={styles.featureLead}>{featured.description}</p>
                <p className={styles.featureMeta}>
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden="true"> · </span>
                  {featured.readingMinutes} min read
                </p>
              </div>
              <div className={styles.featureArt} aria-hidden="true">
                <Image
                  src="/brand/clippy-icon.png"
                  alt=""
                  width={240}
                  height={240}
                  priority
                  className={styles.featureIcon}
                />
              </div>
            </article>

            {rest.length > 0 ? (
              <section aria-labelledby="earlier-posts" className={styles.earlier}>
                <h2 id="earlier-posts" className={styles.earlierTitle}>
                  Earlier posts
                </h2>
                <PostList posts={rest} as="h3" />
              </section>
            ) : null}

            <p className={styles.feed}>
              {/* A plain anchor: the feed is a route handler, not a page to navigate to client-side. */}
              <a href="/blog/feed.xml" className="link">
                Follow the blog by RSS
              </a>
            </p>
          </>
        ) : (
          <p className={styles.empty}>The first posts are on their way.</p>
        )}
      </div>

      <JsonLd data={blogLd} />
    </>
  );
}
