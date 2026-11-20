import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { DownloadButtons } from "@/components/DownloadButtons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CallsPhone, LiveCallPhone } from "@/components/home/mockups";
import { absoluteUrl, downloads, site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./download.module.css";

const title = "Download";
const description =
  "Download Clippy for iPhone from the App Store or for Android from Google Play. Free, with install steps and what you need to get started.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/download",
  socialTitle: "Download Clippy for iPhone and Android",
});

const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  description: site.description,
  url: absoluteUrl("/download"),
  applicationCategory: "ProductivityApplication",
  operatingSystem: "iOS, Android",
  downloadUrl: [downloads.ios.url, downloads.android.url],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: site.name, url: site.url },
};

const requirements = ["An iPhone or an Android phone", "A WhatsApp account", "An internet connection"];

const installSteps = [
  "Get Clippy from the App Store or Google Play.",
  "Open Clippy and sign in.",
  "Save Clippy’s WhatsApp number to your contacts.",
  "Add the people allowed to bring Clippy into calls.",
];

export default function DownloadPage() {
  return (
    <>
      <PageHeader
        pose="happy"
        title="Get Clippy"
        lead="Free on iPhone and Android. Clippy works inside the WhatsApp you already use."
      >
        <DownloadButtons />
      </PageHeader>

      {/* Both phones, side by side, each with its own store badge. */}
      <section className={styles.android} aria-labelledby="platforms-title">
        <div className={`container-wide ${styles.androidGrid}`}>
          <div className={styles.androidCopy}>
            <h2 id="platforms-title" className={styles.androidTitle}>
              On the phone you already have.
            </h2>

            <div id="iphone" className={styles.store}>
              <p>
                <strong>iPhone.</strong> Download Clippy from the App Store.
              </p>
              <a href={downloads.ios.url} className={styles.badge} rel="noopener" target="_blank">
                {/* eslint-disable-next-line @next/next/no-img-element -- official static badge */}
                <img src={downloads.ios.badge} alt={downloads.ios.badgeAlt} width={156} height={52} />
              </a>
            </div>

            <div id="android" className={styles.store}>
              <p>
                <strong>Android.</strong> Get Clippy on Google Play.
              </p>
              <a href={downloads.android.url} className={styles.badge} rel="noopener" target="_blank">
                {/* eslint-disable-next-line @next/next/no-img-element -- official static badge */}
                <img src={downloads.android.badge} alt={downloads.android.badgeAlt} width={176} height={52} />
              </a>
            </div>

            <div className={styles.reqs}>
              <p id="requirements" className={styles.reqsLabel}>
                What you need
              </p>
              <ul aria-labelledby="requirements" className={styles.reqsList}>
                {requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.androidArt}>
            <CallsPhone device="iphone" className={styles.phoneBack} />
            <LiveCallPhone className={styles.phoneFront} />
          </div>
        </div>
      </section>

      <section className={styles.install} aria-labelledby="install-title">
        <div className="container-wide">
          <h2 id="install-title" className={styles.sectionTitle}>
            Set up in four steps.
          </h2>
          <ol role="list" className={styles.steps}>
            {installSteps.map((step, i) => (
              <li key={step}>
                <span className={styles.numeral} aria-hidden="true">
                  {i + 1}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <p className={styles.after}>
            Then add Clippy to any WhatsApp call.{" "}
            <Link href="/how-it-works" className="link">
              See how it works
            </Link>
          </p>
        </div>
      </section>

      {/* Two short statements side by side, no boxes. */}
      <section className={styles.platforms} aria-label="Good to know">
        <div className={`container-wide ${styles.platformsGrid}`}>
          <div className={styles.platform}>
            <h2 className={styles.platformTitle}>
              Everyone else? <span className={styles.muted}>Nothing to install.</span>
            </h2>
            <p>
              <strong>Other people on a call with Clippy don’t need the app.</strong> They just see one more participant
              in the WhatsApp call, on any phone.
            </p>
          </div>
          <div id="desktop" className={styles.platform}>
            <h2 className={styles.platformTitle}>
              Desktop? <span className={styles.muted}>Not needed.</span>
            </h2>
            <p>
              Clippy works from your phone and inside WhatsApp itself. <strong>Calls, voice notes and messages</strong>{" "}
              happen in WhatsApp; <strong>transcripts and summaries</strong> live in the app.
            </p>
          </div>
        </div>
        <p className={`container-wide ${styles.links}`}>
          <Button href="/how-it-works" variant="plain">
            How it works
          </Button>
          <Button href="/features" variant="plain">
            Features
          </Button>
          <Button href="/privacy" variant="plain">
            Privacy
          </Button>
          <Button href="/faq" variant="plain">
            Questions and answers
          </Button>
        </p>
      </section>

      <JsonLd data={appLd} />
    </>
  );
}
