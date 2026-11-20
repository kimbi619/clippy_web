import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Mascot } from "@/components/home/Mascot";
import { CtaSection } from "@/components/trust/CtaSection";
import { pageMetadata } from "@/lib/metadata";

import styles from "./privacy.module.css";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "How Clippy treats your calls, voice notes and messages: it announces itself, joins only when invited, keeps only what it needs and never sells your data.",
  path: "/privacy",
});

/**
 * Privacy, the overview. A run of large principle statements, each with one
 * short paragraph, on alternating full-bleed tones. The legal detail lives in
 * /legal/privacy-policy.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Your calls. Your call."
        lead="Clippy is built to be invited in, never to listen in. Here is how it treats what you say."
      />

      <section className={`${styles.principle} ${styles.alt}`} aria-labelledby="announce">
        <div className={`container-wide ${styles.grid}`}>
          <h2 id="announce" className={styles.title}>
            It tells everyone it’s there.
          </h2>
          <p className={styles.body}>
            When Clippy joins a call, it says so out loud. Everyone on the call knows it is listening before anything is
            written down.
          </p>
        </div>
      </section>

      <section className={styles.principle} aria-labelledby="allowed">
        <div className={`container-wide ${styles.grid}`}>
          <h2 id="allowed" className={styles.title}>
            Only people you allow can bring it in.
          </h2>
          <p className={styles.body}>
            Clippy has its own WhatsApp number. Only people on your Allowed callers list can add it to a call. Anyone
            else is turned away.
          </p>
        </div>
      </section>

      {/* The page's one dark moment. */}
      <section className={`${styles.principle} ${styles.stage}`} aria-labelledby="not-a-product">
        <div className={`container-wide ${styles.grid}`}>
          <h2 id="not-a-product" className={`${styles.title} ${styles.stageTitle}`}>
            Your conversations are not a product.
          </h2>
          <p className={`${styles.body} ${styles.stageBody}`}>
            Clippy shows no ads, and it does not sell or rent what you say to anyone.
          </p>
        </div>
      </section>

      <section className={styles.principle} aria-labelledby="minimal">
        <div className={`container-wide ${styles.grid}`}>
          <h2 id="minimal" className={styles.title}>
            Only what it needs.
          </h2>
          <p className={styles.body}>
            Call audio is processed to make a transcript and a summary. Your calendar and screenshots are read on your
            phone, and only after you allow it, to fill your Today view.
          </p>
        </div>
      </section>

      <section className={`${styles.principle} ${styles.alt}`} aria-labelledby="delete">
        <div className={`container-wide ${styles.grid}`}>
          <h2 id="delete" className={styles.title}>
            Delete a call and it’s gone.
          </h2>
          <p className={styles.body}>
            Transcripts, summaries, voice-note text and messages are kept in your account so you can read them in the
            app. Delete a call and it is removed from your account.
          </p>
        </div>
      </section>

      {/* Cream matches the mascot render, so it sits on the page with no panel. */}
      <section className={styles.linked} aria-labelledby="linking">
        <div className={`container-wide ${styles.linkedGrid}`}>
          <div className={styles.linkedCopy}>
            <h2 id="linking" className={styles.linkedTitle}>
              Linking your WhatsApp is optional.
            </h2>
            <p>
              Link your own account to see the chats you choose in the app and reply from there.{" "}
              <strong>Unlink any time</strong> in WhatsApp under Linked devices.
            </p>
          </div>
          <Mascot bare size={480} alt="Clippy, thinking with a hand on its chin." className={styles.mascot} />
        </div>
      </section>

      <section className={styles.honest} aria-labelledby="honest">
        <div className={`container-wide ${styles.honestGrid}`}>
          <h2 id="honest" className={styles.honestTitle}>
            Honest about AI.
          </h2>
          <div className={styles.prose}>
            <p>
              <strong>Speech becomes text on Clippy’s own servers.</strong> To answer questions and write summaries,
              that text is sent to a third-party AI provider, which processes it on Clippy’s behalf and returns a reply.
            </p>
            <p>
              <strong>Clippy is independent.</strong> It is not made by WhatsApp or Meta, and it connects to WhatsApp
              through an unofficial connection that WhatsApp could change or limit at any time. We would rather tell
              you that up front.
            </p>
            <p className={styles.links}>
              <Button href="/legal/privacy-policy" variant="plain">
                Read the privacy policy
              </Button>
              <Button href="/contact" variant="plain">
                Ask the Clippy team
              </Button>
            </p>
          </div>
        </div>
      </section>

      <CtaSection title="Private by design. Ready when you are." />
    </>
  );
}
