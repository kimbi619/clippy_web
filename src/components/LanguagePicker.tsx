"use client";

import { useEffect, useId, useRef, useState } from "react";

import { defaultLanguage, languageCookie, languages, type LanguageCode } from "@/lib/languages";

import styles from "./LanguagePicker.module.css";

function readCookie(): LanguageCode {
  const match = document.cookie.match(new RegExp(`(?:^|; )${languageCookie}=([^;]+)`));
  const code = match?.[1];
  return languages.some((l) => l.code === code) ? (code as LanguageCode) : defaultLanguage;
}

function saveCookie(code: LanguageCode) {
  document.cookie = `${languageCookie}=${code}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Language dropdown for the header: a small pill showing the current language,
 * opening a menu of languages in their own names. Escape or a click outside
 * closes it; arrow keys move between options. The choice is kept in a cookie.
 */
export function LanguagePicker({ className, up = false }: { className?: string; up?: boolean }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LanguageCode>(defaultLanguage);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  // eslint-disable-next-line react-hooks/set-state-in-effect -- the cookie only exists in the browser
  useEffect(() => setCurrent(readCookie()), []);

  useEffect(() => {
    if (!open) return;
    const index = languages.findIndex((l) => l.code === current);
    itemRefs.current[Math.max(0, index)]?.focus();

    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, current]);

  const choose = (code: LanguageCode) => {
    setCurrent(code);
    saveCookie(code);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onMenuKey = (e: React.KeyboardEvent) => {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const go = (n: number) => {
      e.preventDefault();
      items[(n + items.length) % items.length]?.focus();
    };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(items.length - 1);
    else if (e.key === "Tab") setOpen(false);
  };

  const active = languages.find((l) => l.code === current) ?? languages[0];

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ""}`} data-open={open || undefined} data-up={up || undefined}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Language: ${active.name}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <svg className={styles.globe} viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="7.25" />
          <ellipse cx="10" cy="10" rx="3.25" ry="7.25" />
          <path d="M3 7.5h14M3 12.5h14" />
        </svg>
        <span>{active.short}</span>
        <svg className={styles.chevron} viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 4.75 6 7.75l3-3" />
        </svg>
      </button>

      <div id={menuId} role="menu" aria-label="Language" className={styles.menu} hidden={!open} onKeyDown={onMenuKey}>
        {languages.map((l, i) => (
          <button
            key={l.code}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            type="button"
            role="menuitemradio"
            aria-checked={l.code === current}
            lang={l.code}
            className={styles.item}
            tabIndex={-1}
            onClick={() => choose(l.code)}
          >
            <span>{l.name}</span>
            {l.code === current && (
              <svg className={styles.check} viewBox="0 0 16 16" aria-hidden="true">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
