import type { Metadata } from "next";

import { site } from "@/lib/site";

/**
 * Per-page metadata shared by every inner page. A page that sets `openGraph` or
 * `twitter` replaces the root layout's objects rather than merging with them,
 * so the shared fields (site name, locale, card type) are repeated here. The
 * site-wide social image (app/opengraph-image.tsx) is named explicitly too:
 * a page-level `openGraph` object otherwise drops the image inherited from the
 * root segment. Twitter picks the image up from openGraph automatically.
 */
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
}: {
  title: string;
  description: string;
  path: string;
  /** Title for share cards when it should differ from the page title. */
  socialTitle?: string;
}): Metadata {
  const fullTitle = socialTitle ?? `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
