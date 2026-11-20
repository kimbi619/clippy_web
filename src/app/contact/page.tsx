import Link from "next/link";

import { pageMetadata } from "@/lib/metadata";
import { Pose } from "@/components/brand/Pose";
import { site } from "@/lib/site";

import styles from "./contact.module.css";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with the Clippy team by email for help with the app, calls, voice notes or your data, and see what to include so we can answer quickly.",
  path: "/contact",
});

const include = [
  "Your phone model and its iOS or Android version",
  "The version of the Clippy app, if you know it",
  "What you expected to happen, and what happened instead",
  "Roughly when it happened, so we can find the right call or message",
  "A screenshot, if it helps show the problem",
];

/** Contact: one statement, the address as the page's centrepiece, then quiet prose. No form. */
export default function ContactPage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={`container-wide ${styles.heroGrid}`}>
          <div>
            <h1 id="contact-title" className={styles.title}>
              Talk to a person.
            </h1>
            <p className={styles.lead}>
              Questions, problems or ideas. Email reaches someone on the Clippy team, and we reply as soon as we can.
            </p>
            <a href={`mailto:${site.contactEmail}`} className={styles.email}>
              {site.contactEmail}
            </a>
          </div>
          <Pose pose="welcome" height={340} priority className={styles.heroPose} alt="" />
        </div>
      </section>

      <section className={styles.help} aria-labelledby="help-title">
        <div className={`container-wide ${styles.helpGrid}`}>
          <h2 id="help-title" className={styles.helpTitle}>
            A few details get you a better first reply.
          </h2>
          <div className={styles.helpBody}>
            <ul className={styles.list} role="list">
              {include.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.note}>
              Please don’t send passwords or verification codes. We will never ask for them.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.more} aria-label="Your data and quick answers">
        <div className={`container-wide ${styles.moreGrid}`}>
          <p>
            <strong>Your data.</strong> To access, export or delete it, email us from the account you want to act on and
            say what you need. The{" "}
            <Link href="/legal/privacy-policy" className="link">
              privacy policy
            </Link>{" "}
            explains your rights.
          </p>
          <p>
            <strong>Quick answers.</strong> Many questions about calls, voice notes and availability are already
            answered in the{" "}
            <Link href="/faq" className="link">
              FAQ
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
