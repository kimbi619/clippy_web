import type { ReactNode } from "react";

import styles from "./LegalDocument.module.css";

export type LegalSection = { id: string; title: string; content: ReactNode };

/**
 * Long-form legal page. A left-aligned title, then two columns on wide
 * screens: a sticky table of contents (plain links) and the document itself
 * in a comfortable reading measure. On narrow screens the contents list sits
 * above the document.
 */
export function LegalDocument({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  /** Static, human-readable date string, e.g. "November 19, 2026". */
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <article className={`container-wide ${styles.doc}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated {updated}</p>
      </header>

      <div className={styles.layout}>
        <nav aria-labelledby="toc-title" className={styles.toc}>
          <h2 id="toc-title" className={styles.tocTitle}>
            On this page
          </h2>
          <ol className={styles.tocList} role="list">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={styles.tocLink}>
                  <span className={styles.tocNumber}>{i + 1}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.body}>
          <div className={styles.intro}>{intro}</div>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={styles.section}>
              <h2 id={`${s.id}-title`} className={styles.sectionTitle}>
                <span className={styles.number}>{i + 1}</span>
                {s.title}
              </h2>
              <div className={styles.prose}>{s.content}</div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
