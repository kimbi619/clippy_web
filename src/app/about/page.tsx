import { PageHeader } from "@/components/PageHeader";
import { Mascot } from "@/components/home/Mascot";
import { CtaSection } from "@/components/trust/CtaSection";
import { pageMetadata } from "@/lib/metadata";

import styles from "./about.module.css";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Why Clippy exists: decisions happen on calls and nobody writes them down. Meet the assistant that lives in WhatsApp, the principles behind it and what is next.",
  path: "/about",
});

/** About, as a short essay: opening statement, narrative column, principles on cream, what is next. */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Calls are where decisions happen."
        lead="And almost nobody writes them down. Clippy exists so you can keep talking while someone keeps track."
      />

      <section className={styles.essay} aria-label="Why we built Clippy">
        <div className="container-wide">
          <div className={styles.column}>
            <p className={styles.opening}>
              Plans get made on calls every day. Who is picking up the kids, which supplier to use, what the client
              actually agreed to. A few hours later, everyone remembers it slightly differently.
            </p>
            <p>
              Meeting assistants exist for video conferences at work. But a lot of life runs on WhatsApp calls with
              family, friends, customers and small teams, and nothing was there to help.
            </p>
            <p>
              So we built an assistant with its own WhatsApp number. Add it to a call and it writes down who said what,
              summarises the call when you hang up, and answers when you ask it something.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.statement} aria-label="What Clippy is">
        <p className={`container-wide ${styles.statementText}`}>
          No new app for anyone else on the call. Clippy is <strong>a contact in the WhatsApp you already use</strong>,
          and it <strong>works inside the calls you already make</strong>.
        </p>
      </section>

      {/* Cream matches the mascot render, so it sits on the page with no panel. */}
      <section className={styles.beliefs} aria-labelledby="beliefs-title">
        <div className={`container-wide ${styles.beliefsGrid}`}>
          <Mascot bare size={500} alt="Clippy, smiling with a hand on its chin." className={styles.mascot} />
          <div className={styles.beliefsCopy}>
            <h2 id="beliefs-title" className={styles.sectionTitle}>
              What we believe.
            </h2>
            <p>
              <strong>Invited, never hidden.</strong> Clippy joins only when someone you allow brings it in, and it
              announces itself the moment it arrives.
            </p>
            <p>
              <strong>Quiet until asked.</strong> It listens and writes. It speaks only when someone says its name, then
              gets out of the way.
            </p>
            <p>
              <strong>Where you already are.</strong> Nobody on the call has to install a meeting app.
            </p>
            <p>
              <strong>Honest by default.</strong> We say plainly what Clippy can and cannot do, which AI providers it
              relies on, and what is still in development.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.essay} aria-labelledby="next-title">
        <div className="container-wide">
          <div className={styles.column}>
            <h2 id="next-title" className={styles.sectionTitle}>
              What’s next.
            </h2>
            <p>
              Clippy is available on iPhone and Android, and free during early access.
              Later, we want Clippy to help in more of the places you talk, such as Telegram and email.
            </p>
            <p className={styles.company}>
              Clippy is independent and is not affiliated with WhatsApp or Meta.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
