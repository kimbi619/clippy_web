/* eslint-disable @next/next/no-img-element -- store badges are static SVGs; next/image adds nothing for them */
import { downloads } from "@/lib/site";

import styles from "./DownloadButtons.module.css";

type Props = {
  /** Badge height: "lg" 52px (heroes, closing sections), "md" 44px. */
  size?: "md" | "lg";
  /** Centre the badges or left-align them. */
  align?: "center" | "start";
  /** Show the one-line note under the badges. */
  showNote?: boolean;
};

/**
 * The official App Store and Google Play badges, linking to each listing.
 * Both badges render at the same height, as Apple's and Google's guidelines
 * ask, and are never recoloured or redrawn.
 */
export function DownloadButtons({ size = "lg", align = "start", showNote = false }: Props) {
  const height = size === "lg" ? 52 : 44;
  return (
    <div className={`${styles.wrap} ${align === "center" ? styles.center : ""}`}>
      <div className={styles.row}>
        {[downloads.ios, downloads.android].map((store) => (
          <a key={store.store} href={store.url} className={styles.badge} rel="noopener" target="_blank">
            <img
              src={store.badge}
              alt={store.badgeAlt}
              width={Math.round(height * store.ratio)}
              height={height}
              decoding="async"
            />
          </a>
        ))}
      </div>
      {showNote ? <p className={styles.note}>Free on iPhone and Android.</p> : null}
    </div>
  );
}
