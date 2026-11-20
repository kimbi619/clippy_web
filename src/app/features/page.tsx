import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
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
import { Closing } from "@/components/product/Closing";
import { AllowedCallersPhone, AskPhone, OneToOnePhone } from "@/components/product/screens";
import { pageMetadata } from "@/lib/metadata";

import styles from "./features.module.css";

const title = "Features";
const description =
  "WhatsApp call transcription labelled by speaker, answers out loud when you say its name, voice notes to text, and an assistant you can message.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/features",
  socialTitle: "Clippy features: an AI assistant for WhatsApp",
});

const callChapters: Chapter[] = [
  {
    id: "transcript",
    title: "A live transcript, by speaker.",
    body: (
      <p>
        Add Clippy to a group or one-to-one call and it writes while people talk, with{" "}
        <strong>every line labelled by who said it</strong>. Follow along in the app as it happens.
      </p>
    ),
    screen: <LiveCallPhone />,
  },
  {
    id: "summary",
    title: "A summary when you hang up.",
    body: (
      <>
        <p>
          When the call ends, Clippy goes over the recording again for a more accurate transcript, then{" "}
          <strong>writes down what was decided</strong> and who does what next.
        </p>
        <p>
          <strong>If the audio is too poor</strong> to transcribe, it tells you instead of guessing.
        </p>
      </>
    ),
    screen: <SummaryPhone />,
  },
  {
    id: "ask",
    title: "Say its name. It answers out loud.",
    body: (
      <p>
        Clippy stays quiet while you talk. Start a sentence with “Clippy” and it{" "}
        <strong>answers in the call</strong>, so everyone hears the same thing.
      </p>
    ),
    screen: <AskPhone />,
  },
  {
    id: "one-to-one",
    title: "Or call it on its own.",
    body: (
      <p>
        In a one-to-one call there’s no one else to wait for. <strong>Talk to it like an assistant</strong>: ask a
        question, think out loud, plan your day.
      </p>
    ),
    screen: <OneToOnePhone />,
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="One WhatsApp contact. A lot less to remember."
        lead="Clippy has its own WhatsApp number. Add it to a call, send it a voice note or text it a question."
      />

      <section className={styles.story} aria-labelledby="calls-title">
        <h2 id="calls-title" className="visually-hidden">
          In your calls
        </h2>
        <StickyStory chapters={callChapters} />
      </section>

      {/* Between calls: copy on the left, two chats overlapping and cut off by the section edge. */}
      <section className={styles.messages} aria-labelledby="messages-title">
        <div className={`container-wide ${styles.messagesGrid}`}>
          <div className={styles.messagesCopy}>
            <h2 id="messages-title" className={styles.sectionTitle}>
              Between calls, just send it something.
            </h2>
            <p>
              <strong>Forward a voice note</strong> and get it back as text, to read in a meeting or skim later.
            </p>
            <p>
              <strong>Text it a question</strong>, or ask for help with a reply. It answers in the same chat, like any
              other contact.
            </p>
          </div>
          <div className={styles.messagesArt}>
            <VoiceNotePhone className={styles.phoneBack} />
            <AssistantPhone device="iphone" className={styles.phoneFront} />
          </div>
        </div>
      </section>

      <section className={styles.app} aria-labelledby="app-title">
        <div className="container-wide">
          <div className={styles.statement}>
            <h2 id="app-title">Everything lands in one app.</h2>{" "}
            <p>
              <strong>Today</strong> shows what’s coming up. <strong>Calls</strong> keeps every transcript and summary.{" "}
              <strong>Chats</strong> mirrors the WhatsApp chats you choose, voice notes included. <strong>You</strong>{" "}
              holds your settings.
            </p>
          </div>
        </div>
        <div className={styles.phones} data-phone-depth>
          <figure className={styles.phoneItem}>
            <TodayPhone />
            <figcaption>Today</figcaption>
          </figure>
          <figure className={`${styles.phoneItem} ${styles.phoneMain}`}>
            <CallsPhone device="iphone" />
            <figcaption>Calls</figcaption>
          </figure>
          <figure className={styles.phoneItem}>
            <ChatsPhone />
            <figcaption>Chats</figcaption>
          </figure>
        </div>
        <p className={`container-wide ${styles.availability}`}>On iPhone and Android.</p>
      </section>

      {/* Cream, so the mascot sits on the page with no panel. */}
      <section className={styles.consent} aria-labelledby="consent-title">
        <div className={`container-wide ${styles.consentGrid}`}>
          <div className={styles.consentCopy}>
            <h2 id="consent-title" className={styles.sectionTitle}>
              You decide who can bring Clippy in.
            </h2>
            <p>
              <strong>Only people on your Allowed callers list</strong> can add Clippy to a call. Anyone else is turned
              away.
            </p>
            <p>
              <strong>It announces itself</strong> when it joins, so everyone knows it’s there.
            </p>
            <p>
              <strong>Linking your own WhatsApp is optional</strong>, and you choose which chats appear in the app.
            </p>
            <Button href="/privacy" variant="plain">
              How Clippy handles your calls and messages
            </Button>
          </div>
          <div className={styles.consentArt}>
            <Mascot bare size={480} alt="Clippy, a friendly green character, thinking with a hand on its chin." className={styles.mascot} />
            <AllowedCallersPhone device="iphone" className={styles.consentPhone} />
          </div>
        </div>
      </section>

      <Closing
        title="Free while in early access."
        lead="Get Clippy on iPhone or Android and add it to your next WhatsApp call."
        links={[
          { href: "/how-it-works", label: "How it works" },
          { href: "/faq", label: "Questions and answers" },
          { href: "/blog", label: "Blog" },
        ]}
      />
    </>
  );
}
