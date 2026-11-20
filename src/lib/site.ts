/**
 * Single source of truth for site-wide facts. Pages, metadata, sitemap,
 * structured data and download buttons all read from here — change a store
 * link or the domain once and every page follows.
 */

export const site = {
  name: "Clippy",
  /** Production origin. Override per environment with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://clippy.chat").replace(/\/$/, ""),
  tagline: "Your assistant inside WhatsApp calls.",
  description:
    "Clippy joins your WhatsApp calls, writes down who said what as it happens, answers when you ask it something, and turns voice notes into text you can skim.",
  locale: "en_US",
  /** Static so pages stay fully prerendered (no request-time Date). */
  copyrightYear: 2026,
  /** Who provides Clippy, as named in legal text, copyright and structured data. */
  owner: "the Clippy team",
  contactEmail: "hello@clippy.chat",
  twitter: undefined as string | undefined,
} as const;

/**
 * Where people get the app. Clippy is on the App Store and Google Play; there is
 * no desktop app. Every store badge on the site reads its link from here.
 */
export const downloads = {
  ios: {
    store: "App Store",
    /*
     * TODO(app-store-link): replace with the real listing, e.g.
     * https://apps.apple.com/app/clippy/id1234567890 — or set NEXT_PUBLIC_IOS_URL.
     */
    url: process.env.NEXT_PUBLIC_IOS_URL ?? "https://apps.apple.com/app/clippy/id0000000000",
    badge: "/badges/app-store.svg",
    badgeAlt: "Download on the App Store",
    /** Official badge artwork, 119.66 × 40. */
    ratio: 119.66407 / 40,
  },
  android: {
    store: "Google Play",
    /** Listing for the app's package id (app/app.json → android.package). */
    url:
      process.env.NEXT_PUBLIC_ANDROID_URL ?? "https://play.google.com/store/apps/details?id=com.kimbi619.clippy",
    badge: "/badges/google-play.svg",
    badgeAlt: "Get it on Google Play",
    /** Official badge artwork, 180 × 53.333. */
    ratio: 180 / 53.333,
  },
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/privacy", label: "Privacy" },
  { href: "/blog", label: "Blog" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { href: "/features", label: "Features" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/download", label: "Download" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/privacy", label: "Privacy" },
      { href: "/legal/privacy-policy", label: "Privacy policy" },
      { href: "/legal/terms", label: "Terms of use" },
    ],
  },
];

/** Absolute URL for a site path — for canonical links, sitemap and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
