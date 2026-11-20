"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { mainNav, type NavItem } from "@/lib/site";

import { DownloadButtons } from "./DownloadButtons";
import { LanguagePicker } from "./LanguagePicker";
import styles from "./SiteHeader.module.css";

/** Secondary links shown only in the mobile menu. */
const moreNav: NavItem[] = [
  { href: "/download", label: "Download" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Scroll distance (px) needed before a direction change hides or reveals the bar. */
const DIRECTION_THRESHOLD = 8;
const MOBILE_QUERY = "(max-width: 760px)";

/**
 * Global header.
 *
 * - Transparent at the top of the page; once you scroll past its own height a
 *   frosted, progressively blurred background fades in (strongest at the top,
 *   clear at the bottom edge — no border).
 * - On phones it hides while you scroll down and comes back as soon as you
 *   scroll up ("partially persistent" header), so reading gets the full screen.
 * - The phone menu is a full-screen sheet: big primary links, quieter secondary
 *   links, and the store badges low on the screen where the thumb rests.
 *   It behaves like a dialog: focus moves in, the page behind is inert,
 *   Escape closes it and focus returns to the menu button.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Scroll state: frosted after one header-height, hide/reveal by direction on phones.
  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      const height = headerRef.current?.offsetHeight ?? 64;
      setScrolled(y > height);

      const delta = y - lastY;
      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      setHidden(mobile.matches && delta > 0 && y > height * 2 && !focusInside);
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // While the menu is open: lock scroll, make the page behind inert, handle Escape,
  // and close it if the window grows to desktop width.
  useEffect(() => {
    if (!open) return;
    const behind = [document.getElementById("main"), document.querySelector("body > footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    behind.forEach((el) => (el.inert = true));
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const mobile = window.matchMedia(MOBILE_QUERY);
    const onChange = () => !mobile.matches && close(false);
    document.addEventListener("keydown", onKey);
    mobile.addEventListener("change", onChange);
    return () => {
      behind.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mobile.removeEventListener("change", onChange);
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-scrolled={scrolled || undefined}
      data-hidden={(hidden && !open) || undefined}
      data-open={open || undefined}
    >
      {/* Frosted background: a tint plus three stacked blur layers, each masked to fade out lower down. */}
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.blur1} />
        <span className={styles.blur2} />
        <span className={styles.blur3} />
      </div>

      <nav className={`container-wide ${styles.bar}`} aria-label="Main">
        <Link href="/" className={styles.brand} aria-label="Clippy home" onClick={() => open && close(false)}>
          <Image src="/brand/clippy-icon.png" alt="" width={32} height={32} className={styles.mark} priority />
          <span>Clippy</span>
        </Link>

        <ul role="list" className={styles.links}>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.link} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <LanguagePicker className={styles.language} />
          <Link href="/download" className={styles.cta}>
            <span className={styles.ctaLong}>Download</span>
            <span className={styles.ctaShort}>Get the app</span>
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className={styles.bar1} />
            <span className={styles.bar2} />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={styles.sheet} aria-label="Menu" role="dialog" aria-modal="true">
        <div className={styles.sheetInner}>
          <ul role="list" className={styles.primary}>
            {mainNav.map((item, i) => (
              <li key={item.href}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className={styles.primaryLink}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => close(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul role="list" className={styles.secondary}>
            {moreNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.secondaryLink}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => close(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom of the sheet, in thumb reach. */}
          <div className={styles.sheetFooter}>
            <LanguagePicker className={styles.sheetLanguage} up />
            <DownloadButtons align="center" />
          </div>
        </div>
      </div>
    </header>
  );
}
