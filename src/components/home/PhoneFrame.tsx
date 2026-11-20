import type { CSSProperties, ReactNode } from "react";

import styles from "./PhoneFrame.module.css";

export type Device = "pixel" | "iphone";

type Props = {
  /** Describes the screen for screen readers; the contents are presentational. */
  label: string;
  children: ReactNode;
  className?: string;
  /**
   * Which hardware to draw. Clippy is Android-first, so Pixel is the default.
   * - "pixel": Pixel 10 Pro class — 410 × 914 dp display, centred punch-hole camera,
   *   flat aluminium frame, power + volume rocker on the right, gesture bar.
   * - "iphone": iPhone 18 Pro Max class (Pro Max proportions) — 440 × 956 pt display,
   *   Dynamic Island, titanium frame, action button + volume on the left, side
   *   button + Camera Control on the right, home indicator.
   */
  device?: Device;
};

/**
 * A realistic phone. The whole device is drawn in the phone's own logical units
 * (pt / dp) and scales with the width you give it, so proportions stay true at
 * any size. Screen content is laid out on a 360-unit-wide canvas (`--u`), which
 * puts body text at the platforms' real reading size.
 */
/** Layers stacked behind the display to give the phone thickness in 3D scenes. */
const BODY_LAYERS = Array.from({ length: 14 }, (_, i) => i + 1);

export function PhoneFrame({ label, children, className, device = "pixel" }: Props) {
  return (
    <div className={`${styles.device} ${styles[device]} ${className ?? ""}`} role="img" aria-label={label}>
      <div className={styles.body} aria-hidden="true">
        {BODY_LAYERS.map((i) => (
          <span key={i} className={styles.layer} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
      <div className={styles.buttons} aria-hidden="true">
        {device === "iphone" ? (
          <>
            <span className={`${styles.btn} ${styles.left} ${styles.action}`} />
            <span className={`${styles.btn} ${styles.left} ${styles.volUp}`} />
            <span className={`${styles.btn} ${styles.left} ${styles.volDown}`} />
            <span className={`${styles.btn} ${styles.right} ${styles.side}`} />
            <span className={`${styles.btn} ${styles.right} ${styles.cameraControl}`} />
          </>
        ) : (
          <>
            <span className={`${styles.btn} ${styles.right} ${styles.power}`} />
            <span className={`${styles.btn} ${styles.right} ${styles.rocker}`} />
          </>
        )}
      </div>

      <div className={styles.glass}>
        <div className={styles.screen}>
          {device === "iphone" ? <IosStatusBar /> : <AndroidStatusBar />}
          <div className={styles.content}>{children}</div>
          <span className={styles.homeBar} aria-hidden="true" />
        </div>
        {device === "iphone" ? (
          <span className={styles.island} aria-hidden="true">
            <span className={styles.islandLens} />
          </span>
        ) : (
          <span className={styles.punchHole} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

function IosStatusBar() {
  return (
    <div className={styles.statusIos} aria-hidden="true">
      <span className={styles.timeIos}>9:41</span>
      <span className={styles.iconsIos}>
        {/* Cellular */}
        <svg viewBox="0 0 18 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.9" />
          <rect x="4.9" y="5" width="3.2" height="7" rx="0.9" />
          <rect x="9.8" y="2.5" width="3.2" height="9.5" rx="0.9" />
          <rect x="14.7" y="0" width="3.2" height="12" rx="0.9" />
        </svg>
        {/* Wi-Fi */}
        <svg viewBox="0 0 16 12">
          <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 008 .6 10.4 10.4 0 00.8 3.5L2 4.8a8.6 8.6 0 016-2.4z" />
          <path d="M8 6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 008 4.2 6.7 6.7 0 003.4 6l1.2 1.3C5.5 6.5 6.7 6 8 6z" />
          <path d="M8 9.6l2.1-2.2a3 3 0 00-4.2 0z" />
        </svg>
        {/* Battery */}
        <svg viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" opacity="0.35" />
          <rect x="2" y="2" width="20" height="9" rx="2.5" />
          <path d="M25 4.5v4a2.2 2.2 0 000-4z" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

function AndroidStatusBar() {
  return (
    <div className={styles.statusAndroid} aria-hidden="true">
      <span className={styles.timeAndroid}>9:41</span>
      <span className={styles.iconsAndroid}>
        {/* Wi-Fi (Material) */}
        <svg viewBox="0 0 24 24">
          <path d="M12 21l-12-12.2C3.2 5.7 7.4 4 12 4s8.8 1.7 12 4.8z" />
        </svg>
        {/* Signal (Material) */}
        <svg viewBox="0 0 24 24">
          <path d="M2 22L22 2v20z" />
        </svg>
        {/* Battery (Material, vertical) */}
        <svg viewBox="0 0 24 24">
          <path d="M15.7 4H14V2h-4v2H8.3C7.6 4 7 4.6 7 5.3v15.4c0 .7.6 1.3 1.3 1.3h7.4c.7 0 1.3-.6 1.3-1.3V5.3C17 4.6 16.4 4 15.7 4z" />
        </svg>
      </span>
    </div>
  );
}

/**
 * A back control that follows the platform of the phone it's drawn in:
 * iOS shows "‹ Title" in the tint colour, Android shows a plain ← arrow.
 */
export function PlatformBack({ label }: { label: string }) {
  return (
    <span className={styles.back}>
      <span className={styles.backIos}>
        <svg viewBox="0 0 12 20" aria-hidden="true">
          <path
            d="M10 2L2 10l8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}
      </span>
      <span className={styles.backAndroid}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}
