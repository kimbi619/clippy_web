"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./StepTrack.module.css";

export type TrackStep = {
  id: string;
  title: string;
  body: ReactNode;
  visual: ReactNode;
};

/**
 * Set-up steps as scenes. On wide screens a pinned rail on the left lists the
 * steps; the current one is highlighted and a thin accent line fills as you
 * scroll, so you always know where you are and how much is left. Each rail
 * item is a link to its scene. On narrow screens the scenes simply stack.
 */
export function StepTrack({ steps }: { steps: TrackStep[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const scenes = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    scenes.current.forEach((el) => el && io.observe(el));

    let ticking = false;
    const measure = () => {
      ticking = false;
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      setProgress(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`container-wide ${styles.track}`}>
      <nav className={styles.rail} aria-label="Steps">
        <div className={styles.railInner}>
          <span className={styles.line} aria-hidden="true">
            <span className={styles.fill} style={{ transform: `scaleY(${progress})` }} />
          </span>
          <ol role="list" className={styles.railList}>
            {steps.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={styles.railItem}
                  data-state={i === active ? "current" : i < active ? "done" : undefined}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className={styles.railNum}>{i + 1}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <ol role="list" ref={listRef} className={styles.scenes}>
        {steps.map((s, i) => (
          <li
            key={s.id}
            id={s.id}
            data-index={i}
            ref={(el) => {
              scenes.current[i] = el;
            }}
            className={styles.scene}
          >
            <div className={styles.copy}>
              <p className={styles.kicker}>
                Step {i + 1} of {steps.length}
              </p>
              <h3 className={styles.title}>{s.title}</h3>
              <div className={styles.body}>{s.body}</div>
            </div>
            <div className={styles.visual}>{s.visual}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
