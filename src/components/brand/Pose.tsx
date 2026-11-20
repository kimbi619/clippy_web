import { getImageProps } from "next/image";

import styles from "./Pose.module.css";

/**
 * Clippy's poses, cut out of their studio backgrounds so they can stand on any
 * section. Each has a light-lit and a dark-lit render (from
 * output/mascot/clippy-sidekick); the browser picks one by colour scheme.
 */
const POSES = {
  curious: { w: 577, h: 900, alt: "Clippy, curious, with a hand to its chin" },
  welcome: { w: 542, h: 900, alt: "Clippy waving hello" },
  listening: { w: 514, h: 900, alt: "Clippy leaning in, listening" },
  thinking: { w: 583, h: 900, alt: "Clippy looking up, thinking" },
  happy: { w: 576, h: 900, alt: "Clippy smiling with its arms up" },
  presenting: { w: 565, h: 900, alt: "Clippy presenting with an open hand" },
  resting: { w: 607, h: 900, alt: "Clippy sitting down, resting with its eyes closed" },
} as const;

export type PoseName = keyof typeof POSES;

type Props = {
  pose: PoseName;
  /** Rendered height in CSS px at its largest; used for responsive image sizes. */
  height: number;
  className?: string;
  /** Override the default description, or pass "" when the pose is purely decorative. */
  alt?: string;
  priority?: boolean;
  /** A soft contact shadow so the character stands on the page. */
  ground?: boolean;
};

export function Pose({ pose, height, className, alt, priority, ground = true }: Props) {
  const p = POSES[pose];
  const width = Math.round((height * p.w) / p.h);
  const common = { alt: alt ?? p.alt, width: p.w, height: p.h, sizes: `${width}px`, priority };
  const {
    props: { srcSet: dark },
  } = getImageProps({ ...common, src: `/brand/poses/dark/${pose}.webp` });
  const { props: light } = getImageProps({ ...common, src: `/brand/poses/light/${pose}.webp` });

  return (
    <span
      className={`${styles.pose} ${ground ? styles.ground : ""} ${className ?? ""}`}
      style={{ aspectRatio: `${p.w} / ${p.h}` }}
    >
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={dark} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img {...light} className={styles.img} />
      </picture>
    </span>
  );
}
