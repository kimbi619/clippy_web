import { getImageProps } from "next/image";

import styles from "./Mascot.module.css";

type Props = {
  alt: string;
  /** Rendered width in CSS pixels, used for `sizes`. */
  size: number;
  className?: string;
  priority?: boolean;
  /** No panel: for sections whose background already matches the render. */
  bare?: boolean;
};

/**
 * Clippy, the mascot. The light render sits on cream, the dark render on near-black;
 * the panel takes the matching colour and the image fills it edge to edge, so
 * the two always blend. The dark file is swapped in by the browser through
 * `prefers-color-scheme`, no script involved.
 */
export function Mascot({ alt, size, className, priority, bare }: Props) {
  const common = { alt, width: 640, height: 640, sizes: `${size}px`, priority };
  const {
    props: { srcSet: dark },
  } = getImageProps({ ...common, src: "/brand/clippy-wave-dark.jpg" });
  const { props: light } = getImageProps({ ...common, src: "/brand/clippy-wave-light.jpg" });

  return (
    <div className={`${bare ? styles.bare : styles.panel} ${className ?? ""}`}>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={dark} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img {...light} className={styles.image} />
      </picture>
    </div>
  );
}
