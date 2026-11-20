import type { Metadata } from "next";
import Image from "next/image";

import { DownloadButtons } from "@/components/DownloadButtons";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/Button";
import { Mascot } from "@/components/home/Mascot";
import {
  AssistantPhone,
  CallsPhone,
  ChatsPhone,
  LiveCallPhone,
  SummaryPhone,
  TodayPhone,
  VoiceNotePhone,
} from "@/components/home/mockups";
import { StickyStory, type Chapter } from "@/components/home/StickyStory";
import { absoluteUrl, site } from "@/lib/site";

import styles from "./page.module.css";

const title = "Clippy — The assistant inside your WhatsApp calls";
const description =
  "Clippy joins your WhatsApp calls, transcribes who said what, answers when you ask, and turns voice notes into text. Free on iPhone and Android.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  description,
  url: site.url,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "iOS, Android",
  image: absoluteUrl("/brand/clippy-icon.png"),
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: { "@type": "Organization", name: site.name, url: site.url },
};

const chapters: Chapter[] = [
  {
    id: "transcript",
    title: "Every word, with a name on it.",
    body: (
      <p>
        Add Clippy to a WhatsApp call and the transcript starts writing itself, line by line, labelled by who said it.{" "}
        <strong>Follow along live in the app</strong>, or read it later.
      </p>
    ),
    screen: <LiveCallPhone />,
  },
  {
    id: "summary",
    title: "Checked again when you hang up.",
    body: (
      <p>
        After the call, Clippy goes back over the recording for a cleaner transcript, then writes{" "}
        <strong>what was decided and who’s doing what next</strong>. If the audio was too poor, it says so instead of
        guessing.
      </p>
    ),
    screen: <SummaryPhone />,
  },
  {
    id: "voice-notes",
    title: "Voice notes you can read.",
    body: (
      <p>
        Forward a voice note to Clippy and <strong>get it back as text</strong>. Catch up in a meeting, on a train, or
        anywhere you can’t play audio.
      </p>
    ),
    screen: <VoiceNotePhone />,
  },
  {
    id: "messages",
    title: "Or just text it.",
    body: (
      <p>
        Clippy is a WhatsApp contact like any other. <strong>Ask it to draft a reply</strong>, check a detail from last
        week’s call, or think something through.
      </p>
    ),
    screen: <AssistantPhone />,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero: cream, the same colour as Clippy's render, so the mascot needs no frame. */}
      <section className={styles.hero}>
        <div className={`container-wide ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>The assistant that joins your WhatsApp calls.</h1>
            <p className={styles.heroLead}>
              Clippy writes down who said what, answers when you ask it something, and turns voice notes into text.
            </p>
            <DownloadButtons align="start" />
          </div>
          <div className={styles.heroArt}>
            <Mascot bare priority size={560} alt="Clippy, a friendly green character." className={styles.heroMascot} />
            <LiveCallPhone className={styles.heroPhone} />
          </div>
        </div>
      </section>

      {/* One sentence instead of three feature cards. */}
      <section className={styles.statement}>
        <p className={`container-wide ${styles.statementText}`}>
          One WhatsApp contact that <strong>joins your calls</strong>, <strong>keeps the transcript</strong>,{" "}
          <strong>answers out loud</strong> when you say its name, and <strong>reads your voice notes</strong> for you.
          <span className={styles.statementAside}> Nothing to install for anyone else on the call.</span>
        </p>
      </section>

      <section className={styles.story} aria-labelledby="story-title">
        <h2 id="story-title" className="visually-hidden">
          What Clippy does
        </h2>
        <StickyStory chapters={chapters} />
      </section>

      {/* The one dark moment: the conversation itself is the picture. */}
      <section className={styles.stage} aria-labelledby="say-its-name">
        <div className="container-wide">
          <h2 id="say-its-name" className={styles.stageTitle}>
            Just say its name.
          </h2>
          <p className={styles.stageLead}>
            Clippy stays quiet while you talk. Ask it something and it answers out loud, in the call, so everyone hears
            the same thing.
          </p>

          <figure className={styles.dialogue}>
            <figcaption className={styles.dialogueCaption}>
              <span className={styles.liveDot} aria-hidden="true" />
              Weekly planning, live
            </figcaption>
            <blockquote className={styles.utterance}>
              <p className={styles.speaker}>Daniel</p>
              <p className={styles.said}>“Clippy, what did we say the budget cap was last week?”</p>
            </blockquote>
            <blockquote className={`${styles.utterance} ${styles.reply}`}>
              <p className={styles.speaker}>Clippy</p>
              <p className={styles.said}>“Four thousand, with travel kept separate. You agreed on it last Tuesday.”</p>
            </blockquote>
          </figure>
        </div>
      </section>

      <section className={styles.app} aria-labelledby="app-title">
        <div className="container-wide">
          <div className={styles.appHead}>
            <h2 id="app-title" className={styles.sectionTitle}>
              Everything lands in the app.
            </h2>
            <p className={styles.sectionLead}>
              Today shows what’s coming up. Calls keeps every transcript and summary. Chats lets you link your own
              WhatsApp and reply from one place.
            </p>
          </div>
          <div className={styles.phones}>
            <figure className={styles.phoneItem}>
              <TodayPhone device="iphone" />
              <figcaption>Today</figcaption>
            </figure>
            <figure className={`${styles.phoneItem} ${styles.phoneRaised}`}>
              <CallsPhone />
              <figcaption>Calls</figcaption>
            </figure>
            <figure className={styles.phoneItem}>
              <ChatsPhone device="iphone" />
              <figcaption>Chats</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Cream again, so the mascot sits on the page with no panel. */}
      <section className={styles.control} aria-labelledby="control-title">
        <div className={`container-wide ${styles.controlGrid}`}>
          <Mascot bare size={520} alt="Clippy, thinking with a hand on its chin." className={styles.controlMascot} />
          <div className={styles.controlCopy}>
            <h2 id="control-title" className={styles.sectionTitle}>
              You decide who it listens to.
            </h2>
            <p>
              <strong>Only people you approve</strong> can bring Clippy into a call. Anyone else is turned away.
            </p>
            <p>
              <strong>It always introduces itself</strong>, so everyone on the call knows it’s there before anything is
              written down.
            </p>
            <p>
              <strong>Linking your own WhatsApp is optional</strong>, and you choose which chats appear in the app.
            </p>
            <Button href="/privacy" variant="plain">
              How Clippy handles your data
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <div className={`container-wide ${styles.closingInner}`}>
          <div className={styles.closingCopy}>
            <h2 id="closing-title" className={styles.closingTitle}>
              Bring Clippy to your next call.
            </h2>
            <p className={styles.sectionLead}>Free on iPhone and Android.</p>
            <DownloadButtons align="start" showNote={false} />
            <p className={styles.closingLinks}>
              <Button href="/how-it-works" variant="plain">
                See how it works
              </Button>
              <Button href="/blog" variant="plain">
                Read the blog
              </Button>
            </p>
          </div>
          <Image
            src="/brand/clippy-icon.png"
            alt="The Clippy app icon"
            width={240}
            height={240}
            className={styles.appIcon}
          />
        </div>
      </section>

      <JsonLd data={appLd} />
    </>
  );
}
