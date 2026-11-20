import Image from "next/image";

import { Button } from "@/components/Button";
import { DownloadButtons } from "@/components/DownloadButtons";

import styles from "./Closing.module.css";

type Props = {
  title: string;
  lead: string;
  links: { href: string; label: string }[];
};

/** The large, left-aligned download close that ends a product page (same shape as the home page's). */
export function Closing({ title, lead, links }: Props) {
  return (
    <section className={styles.closing} aria-labelledby="closing-title">
      <div className={`container-wide ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="closing-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.lead}>{lead}</p>
          <DownloadButtons align="start" showNote={false} />
          <p className={styles.links}>
            {links.map((l) => (
              <Button key={l.href} href={l.href} variant="plain">
                {l.label}
              </Button>
            ))}
          </p>
        </div>
        <Image src="/brand/clippy-icon.png" alt="The Clippy app icon" width={240} height={240} className={styles.icon} />
      </div>
    </section>
  );
}
