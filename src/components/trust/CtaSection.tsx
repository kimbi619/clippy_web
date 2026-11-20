import { DownloadButtons } from "@/components/DownloadButtons";

import styles from "./CtaSection.module.css";

/**
 * Closing call to action for the trust pages: a left-aligned headline on a
 * full-bleed tone, then the download buttons. No box, no centring.
 */
export function CtaSection({
  title = "Try Clippy on your next call.",
  tone = "alt",
}: {
  title?: string;
  /** Background of the section: page white or the grey section tone. */
  tone?: "plain" | "alt";
}) {
  return (
    <section className={`${styles.cta} ${tone === "alt" ? styles.alt : ""}`} aria-labelledby="cta-title">
      <div className={`container-wide ${styles.inner}`}>
        <h2 id="cta-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.lead}>Free on iPhone and Android.</p>
        <DownloadButtons align="start" showNote={false} />
      </div>
    </section>
  );
}
