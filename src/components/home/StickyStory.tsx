"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./StickyStory.module.css";

export type Chapter = {
  id: string;
  title: string;
  body: ReactNode;
  screen: ReactNode;
};

/**
 * Apple-style scrolling story: on wide screens the phone stays pinned while the
 * chapters scroll past, and its screen changes to match the chapter in view
 * (a short cross-fade, none with Reduce Motion). On narrow screens each
 * chapter simply shows its own screen under the text.
 */
export function StickyStory({
  chapters,
  inlineScreens = true,
}: {
  chapters: Chapter[];
  /** On narrow screens, show each chapter's phone under its text. Off = text only. */
  inlineScreens?: boolean;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      // A chapter is "current" while it crosses the middle of the viewport.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`container-wide ${styles.story}`}>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.stageInner}>
          {chapters.map((c, i) => (
            <div key={c.id} className={`${styles.screen} ${i === active ? styles.current : ""}`}>
              {c.screen}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chapters}>
        {chapters.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={styles.chapter}
            aria-labelledby={`${c.id}-title`}
          >
            <h3 id={`${c.id}-title`} className={styles.title}>
              {c.title}
            </h3>
            <div className={styles.body}>{c.body}</div>
            {inlineScreens ? <div className={styles.inlineScreen}>{c.screen}</div> : null}
          </section>
        ))}
      </div>
    </div>
  );
}
