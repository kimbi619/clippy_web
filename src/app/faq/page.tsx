import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/trust/CtaSection";
import { pageMetadata } from "@/lib/metadata";

import { faqGroups } from "./faqs";
import styles from "./faq.module.css";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about Clippy: adding it to WhatsApp calls, who can bring it in, voice notes, languages, privacy, pricing and where to download the app.",
  path: "/faq",
});

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

/** A thin plus that turns into a cross when the answer is open. */
function Plus() {
  return (
    <svg className={styles.plus} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.5v13M1.5 8h13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHeader
        pose="thinking"
        title="Questions and answers."
        lead="What people usually ask before they bring Clippy into a call."
      />

      <div className={`container-wide ${styles.groups}`}>
        {faqGroups.map((group) => (
          <section key={group.id} aria-labelledby={group.id} className={styles.group}>
            <h2 id={group.id} className={styles.groupTitle}>
              {group.title}
            </h2>
            <div className={styles.list}>
              {group.items.map((item) => (
                <details key={item.q} className={styles.item}>
                  <summary className={styles.summary}>
                    <span>{item.q}</span>
                    <Plus />
                  </summary>
                  <p className={styles.answer}>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <p className={styles.more}>
          Still have a question?{" "}
          <Link href="/contact" className="link">
            Email the Clippy team
          </Link>
          .
        </p>
      </div>

      <CtaSection />
      <JsonLd data={faqLd} />
    </>
  );
}
