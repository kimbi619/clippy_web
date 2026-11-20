import type { Metadata } from "next";

import { DownloadButtons } from "@/components/DownloadButtons";
import { JsonLd } from "@/components/JsonLd";
import { Pose } from "@/components/brand/Pose";
import { SummaryPhone, TodayPhone } from "@/components/home/mockups";
import { Closing } from "@/components/product/Closing";
import { StepTrack, type TrackStep } from "@/components/product/StepTrack";
import { AddParticipantPhone, AllowedCallersPhone, AskPhone } from "@/components/product/screens";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./how-it-works.module.css";

const title = "How it works";
const description =
  "Set up Clippy in a few minutes: install the app, choose who can add it, then add Clippy to any WhatsApp call to get a live transcript and answers.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/how-it-works",
  socialTitle: "How Clippy works in WhatsApp calls",
});

/** The setup steps, shared by the page and its HowTo structured data. */
const steps = [
  {
    name: "Get the app",
    text: "Install Clippy from the App Store or Google Play and sign in.",
  },
  {
    name: "Choose who can bring it in",
    text: "Save Clippy's WhatsApp number to your contacts, then add the people allowed to bring Clippy into calls.",
  },
  {
    name: "Add Clippy to a call",
    text: "In any WhatsApp call, tap Add participant and choose Clippy. It announces itself and starts transcribing.",
  },
  {
    name: "Ask it something, or just talk",
    text: "Say “Clippy” followed by your question and it answers out loud, or read the transcript and summary in the app after the call.",
  },
];

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to add Clippy to a WhatsApp call",
  description,
  url: absoluteUrl("/how-it-works"),
  totalTime: "PT5M",
  tool: [
    { "@type": "HowToTool", name: "An iPhone or Android phone" },
    { "@type": "HowToTool", name: "WhatsApp account" },
  ],
  step: steps.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.name,
    text: step.text,
    url: absoluteUrl(`/how-it-works#step-${i + 1}`),
  })),
};

/** The scenes: each step's words, plus a phone with Clippy standing beside it. */
const scenes: TrackStep[] = [
  {
    id: "step-1",
    title: "Get the app",
    body: (
      <p>
        Download Clippy from the App Store or Google Play and sign in. <strong>That’s the only install</strong> —
        everyone else on your calls just uses WhatsApp.
      </p>
    ),
    visual: (
      <div className={styles.duo}>
        <TodayPhone device="iphone" className={styles.phone} />
        <Pose pose="presenting" height={340} className={styles.poseRight} alt="" />
      </div>
    ),
  },
  {
    id: "step-2",
    title: "Choose who can bring it in",
    body: (
      <p>
        Save Clippy’s WhatsApp number, then add the people you trust to <strong>Allowed callers</strong>. Anyone else
        who tries to add Clippy to a call is turned away.
      </p>
    ),
    visual: (
      <div className={`${styles.duo} ${styles.flip}`}>
        <AllowedCallersPhone className={styles.phone} />
        <Pose pose="thinking" height={330} className={styles.poseLeft} alt="" />
      </div>
    ),
  },
  {
    id: "step-3",
    title: "Add Clippy to a call",
    body: (
      <p>
        Start or join any WhatsApp call, tap <strong>Add participant</strong> and choose Clippy. It says hello, tells
        everyone it’s transcribing, and gets to work.
      </p>
    ),
    visual: (
      <div className={styles.duo}>
        <AddParticipantPhone className={styles.phone} />
        <Pose pose="welcome" height={340} className={styles.poseRight} alt="" />
      </div>
    ),
  },
  {
    id: "step-4",
    title: "Ask it something, or just talk",
    body: (
      <p>
        Start a sentence with <strong>“Clippy”</strong> and it answers out loud, in the call. Or ignore it completely —
        the transcript writes itself either way.
      </p>
    ),
    visual: (
      <div className={`${styles.duo} ${styles.flip}`}>
        <AskPhone className={styles.phone} />
        <Pose pose="listening" height={330} className={styles.poseLeft} alt="" />
      </div>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero: Clippy says hello; the four steps are listed right away as jump links. */}
      <section className={styles.hero}>
        <div className={`container-wide ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>Four steps, and Clippy’s on the call.</h1>
            <p className={styles.heroLead}>
              Set it up once in the app. After that, you add Clippy to a WhatsApp call the same way you’d add a friend.
            </p>
            <DownloadButtons />
          </div>
          <Pose pose="welcome" height={520} priority className={styles.heroPose} />
        </div>
        <nav className={`container-wide ${styles.overview}`} aria-label="The four steps">
          <ol role="list">
            {scenes.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span className={styles.overviewNum}>{i + 1}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <section className={styles.steps} aria-labelledby="steps-title">
        <h2 id="steps-title" className="visually-hidden">
          Setting up Clippy
        </h2>
        <StepTrack steps={scenes} />
      </section>

      {/* After the call: the payoff. */}
      <section className={styles.after} aria-labelledby="after-title">
        <div className={`container-wide ${styles.afterGrid}`}>
          <div className={styles.afterArt}>
            <SummaryPhone className={styles.afterPhone} />
            <Pose pose="happy" height={300} className={styles.afterPose} alt="" />
          </div>
          <div className={styles.afterCopy}>
            <h2 id="after-title" className={styles.sectionTitle}>
              Hang up. The notes are done.
            </h2>
            <p>
              <strong>A cleaner transcript.</strong> Clippy goes over the recording again once the call ends, so names
              and numbers come out right.
            </p>
            <p>
              <strong>A short summary.</strong> What was decided, and who’s doing what next — waiting in the app.
            </p>
            <p>
              <strong>Honest about bad audio.</strong> If a line was too poor to hear, it tells you instead of guessing.
            </p>
          </div>
        </div>
      </section>

      {/* Between calls: Clippy rests until you need it. */}
      <section className={styles.between} aria-labelledby="between-title">
        <div className={`container-wide ${styles.betweenGrid}`}>
          <div className={styles.betweenCopy}>
            <h2 id="between-title" className={styles.sectionTitle}>
              Between calls, it waits.
            </h2>
            <p>
              <strong>Send it a voice note</strong> — or forward one — and get it back as text you can skim.
            </p>
            <p>
              <strong>Text it a question</strong> or a task. It replies in the same chat, like any other contact.
            </p>
            <p>
              <strong>Link your own WhatsApp</strong> if you like, to see the chats you choose in the app. It’s
              optional, and you can unlink any time.
            </p>
          </div>
          <Pose pose="resting" height={380} className={styles.betweenPose} />
        </div>
      </section>

      <Closing
        title="Ready for your next call."
        lead="Clippy is free while in early access."
        links={[
          { href: "/features", label: "See all features" },
          { href: "/privacy", label: "Privacy" },
          { href: "/faq", label: "Questions and answers" },
        ]}
      />

      <JsonLd data={howToLd} />
    </>
  );
}
