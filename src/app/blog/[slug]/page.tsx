import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostList } from "@/components/blog/PostList";
import { Button } from "@/components/Button";
import { DownloadButtons } from "@/components/DownloadButtons";
import { JsonLd } from "@/components/JsonLd";
import { formatDate, getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

import styles from "./post.module.css";

type Params = { slug: string };

/*
 * Every post is prerendered from content/blog. `dynamicParams = false` is not
 * available with Cache Components, so unknown slugs fall through to notFound().
 */
export function generateStaticParams(): Params[] {
  const slugs = getPostSlugs();
  // Cache Components needs at least one param; the placeholder 404s.
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "__none__" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.description,
      siteName: site.name,
      locale: site.locale,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${path}/opengraph-image`],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const postingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en",
    keywords: post.tags.join(", "),
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/clippy-icon.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 2, name: post.title, item: url },
    ],
  };

  const showUpdated = post.updated && post.updated !== post.date;

  return (
    <>
      <article className={styles.article}>
        <header className={styles.header}>
          <nav aria-label="Breadcrumb">
            <ol role="list" className={styles.breadcrumb}>
              <li>
                <Link href="/blog" className={styles.crumbLink}>
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className={styles.crumbCurrent}>
                {post.title}
              </li>
            </ol>
          </nav>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.lead}>{post.description}</p>

          <dl className={styles.meta}>
            <div className={styles.metaItem}>
              <dt className="visually-hidden">Author</dt>
              <dd>{post.author}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt className="visually-hidden">Published</dt>
              <dd>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </dd>
            </div>
            {showUpdated ? (
              <div className={styles.metaItem}>
                <dt>Updated</dt>
                <dd>
                  <time dateTime={post.updated}>{formatDate(post.updated!)}</time>
                </dd>
              </div>
            ) : null}
            <div className={styles.metaItem}>
              <dt className="visually-hidden">Reading time</dt>
              <dd>{post.readingMinutes} min read</dd>
            </div>
          </dl>
        </header>

        <div className={styles.prose} dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.tags.length > 0 ? (
          <p className={styles.tags}>
            Filed under {post.tags.join(", ")}
          </p>
        ) : null}
      </article>

      {/* Full-bleed cream, like the home page: a statement and the buttons, no card. */}
      <section aria-labelledby="try-clippy" className={styles.cta}>
        <div className={`container-wide ${styles.ctaInner}`}>
          <div className={styles.ctaCopy}>
            <h2 id="try-clippy" className={styles.ctaTitle}>
              Bring Clippy to your next call.
            </h2>
            <p className={styles.ctaText}>
              A live transcript while you talk, a summary when you hang up. Free while in early access.
            </p>
            <DownloadButtons align="start" />
          </div>
          <Image
            src="/brand/clippy-icon.png"
            alt="The Clippy app icon"
            width={200}
            height={200}
            className={styles.ctaIcon}
          />
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="more-from-blog" className={`container-wide ${styles.related}`}>
          <div className={styles.relatedHead}>
            <h2 id="more-from-blog" className={styles.relatedTitle}>
              More from the blog
            </h2>
            <Button href="/blog" variant="plain">
              All posts
            </Button>
          </div>
          <PostList posts={related} as="h3" />
        </section>
      ) : null}

      <JsonLd data={[postingLd, breadcrumbLd]} />
    </>
  );
}
