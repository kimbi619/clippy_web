import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DownloadButtons } from "@/components/DownloadButtons";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/Button";
import { CallsPhone, ChatsPhone, HighlightsPhone, TodayPhone } from "@/components/home/mockups";
import {
  Bubble,
  CallVignette,
  DeadlineVignette,
  FlowDiagram,
  GroupVignette,
  Notification,
  Scene,
  ReplyVignette,
  ScreenshotVignette,
  VoiceVignette,
  type Tone,
} from "@/components/home/vignettes";
import { Pose } from "@/components/brand/Pose";
import { Mascot } from "@/components/home/Mascot";
import { BrandMark } from "@/components/brand/BrandMark";
import { PostList } from "@/components/blog/PostList";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

import styles from "./page.module.css";

const title = "Clippy — Your companion for WhatsApp";
const description =
  "Clippy summarizes busy groups, drafts replies, catches deadlines, reads screenshots, joins your calls and shows what matters first. Free on iPhone and Android.";

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

type Feature = {
  id: string;
  tone: Tone;
  eyebrow: string;
  title: string;
  body: ReactNode;
  visual: ReactNode;
};

const features: Feature[] = [
  {
    id: "groups",
    tone: "green",
    eyebrow: "Groups",
    title: "Busy groups, in a paragraph.",
    body: (
      <>
        Come back to 142 messages and read five lines instead. Clippy sums up what was decided, and{" "}
        <strong>points out the one question that needs you</strong>.
      </>
    ),
    visual: <GroupVignette />,
  },
  {
    id: "replies",
    tone: "blue",
    eyebrow: "Replies",
    title: "Replies, ready when you are.",
    body: (
      <>
        Clippy drafts replies from what was actually said — in the chat, on last week’s call, in the screenshot you
        saved. <strong>You pick one, tweak it, send it.</strong>
      </>
    ),
    visual: <ReplyVignette />,
  },
  {
    id: "deadlines",
    tone: "amber",
    eyebrow: "Deadlines",
    title: "Deadlines don’t slip.",
    body: (
      <>
        “Can you send it by Friday?” becomes a deadline the moment someone types it. Clippy pulls dates from your chats,
        calls, screenshots and calendar, and <strong>nudges you before they’re due</strong>.
      </>
    ),
    visual: <DeadlineVignette />,
  },
  {
    id: "screenshots",
    tone: "violet",
    eyebrow: "Screenshots",
    title: "Screenshots that remember.",
    body: (
      <>
        Boarding passes, receipts, addresses, a message someone sent you. Clippy reads your screenshots and{" "}
        <strong>notes what matters</strong>, so the details are there when you need them.
      </>
    ),
    visual: <ScreenshotVignette />,
  },
  {
    id: "calls",
    tone: "teal",
    eyebrow: "Calls",
    title: "Calls, written down.",
    body: (
      <>
        Add Clippy to a WhatsApp call and the transcript writes itself, labelled by who said it. When you hang up,{" "}
        <strong>a short summary is waiting</strong>.
      </>
    ),
    visual: <CallVignette />,
  },
  {
    id: "voice-notes",
    tone: "rose",
    eyebrow: "Voice notes",
    title: "Voice notes you can read.",
    body: (
      <>
        Forward a voice note and <strong>get it back as text</strong>. Catch up in a meeting, on a train, or anywhere
        you can’t play audio.
      </>
    ),
    visual: <VoiceVignette />,
  },
];

/** A day with Clippy: when each thing actually helps. */
const day: { time: string; tone: Tone; when: string; what: string; visual: ReactNode }[] = [
  {
    time: "07:30",
    tone: "green",
    when: "Before breakfast",
    what: "Three busy groups, caught up overnight.",
    visual: (
      <Notification
        time="07:30"
        title="Clippy"
        body={
          <>
            <strong>3 groups summed up:</strong> Family, Design team and Sunday football.
          </>
        }
      />
    ),
  },
  {
    time: "09:10",
    tone: "rose",
    when: "On the train",
    what: "A voice note, read instead of played.",
    visual: (
      <Bubble from="Ama · voice note 0:48" time="09:10">
        “Tomorrow I call the bank, and on Thursday I renew the shop insurance.”
      </Bubble>
    ),
  },
  {
    time: "12:45",
    tone: "teal",
    when: "In the call",
    what: "“Clippy, what was the budget cap?”",
    visual: (
      <Bubble from="Clippy, out loud" time="12:45">
        “Four thousand, with travel kept separate. You agreed that last Tuesday.”
      </Bubble>
    ),
  },
  {
    time: "16:00",
    tone: "amber",
    when: "Before it’s due",
    what: "The deadline someone mentioned on Tuesday.",
    visual: (
      <Notification
        time="16:00"
        title="Clippy"
        body={
          <>
            <strong>Due at 17:00:</strong> send the deck to Daniel.
          </>
        }
      />
    ),
  },
  {
    time: "21:30",
    tone: "violet",
    when: "Packing",
    what: "Gate and seat, from the screenshot you forgot you took.",
    visual: (
      <Notification
        time="21:30"
        title="Clippy"
        body={
          <>
            <strong>Tomorrow 22:10</strong> · LH 569 to Frankfurt · gate B12 · seat 14C
          </>
        }
      />
    ),
  },
];

/** Three beats, each with Clippy acting it out. */
const beats = [
  { pose: "welcome", title: "Add it to a call", text: "Tap Add participant in any WhatsApp call and choose Clippy." },
  { pose: "curious", title: "Ask it anything", text: "Say “Clippy” and a question. It answers out loud, in the call." },
  { pose: "happy", title: "Read it later", text: "The transcript and a short summary are waiting in the app." },
] as const;

/** The app's three tabs, each shown as the top of a phone screen. */
const tabs = [
  { name: "Today", text: "Your day at a glance: events, plans and the screenshots you saved." },
  { name: "Calls", text: "Every transcript and summary, live or finished." },
  { name: "Chats", text: "Your chats in one place, summarized, with replies ready." },
];

export default function HomePage() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero: cream with a green glow; Clippy behind with feathered edges, one iPhone in front with two of
          Clippy's notifications resting on it. */}
      <section className={styles.hero}>
        <div className={`container-wide ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <BrandMark name="whatsapp" tone="brand" className={styles.eyebrowMark} />
              Your companion for WhatsApp
            </p>
            <h1 className={styles.heroTitle}>
              Everything that matters in your chats. <span className={styles.accent}>First.</span>
            </h1>
            <p className={styles.heroLead}>
              Clippy sums up busy groups, drafts your replies, catches deadlines, reads your screenshots and joins your
              calls — then shows you what’s important.
            </p>
            <DownloadButtons />
            <ul role="list" className={styles.pills} aria-label="Works with">
              <li>
                <BrandMark name="whatsapp" tone="brand" className={styles.pillMark} />
                WhatsApp
              </li>
              <li>
                <BrandMark name="apple" className={styles.pillMark} />
                Siri
              </li>
              <li>
                <BrandMark name="gemini" tone="brand" className={styles.pillMark} />
                Gemini
              </li>
              <li>
                <BrandMark name="googleCalendar" tone="brand" className={styles.pillMark} />
                Google Calendar
              </li>
              <li>
                <BrandMark name="apple" className={styles.pillMark} />
                Apple Calendar
              </li>
            </ul>
          </div>
          <div className={styles.heroArt}>
            <Mascot bare priority size={560} alt="Clippy, a friendly green character." className={styles.heroMascot} />
            <HighlightsPhone device="iphone" className={styles.heroPhone} />
            <div className={styles.heroNotes} aria-hidden="true">
              <Scene className={styles.heroScene}>
              <Notification
                className={styles.heroNote1}
                time="now"
                title="Family · 142 messages"
                body="Lunch moved to Sunday at 1. Ama needs the beach photos."
              />
              <Notification
                className={styles.heroNote2}
                time="9:00"
                title="Due tomorrow"
                body="Send the deck to Daniel"
              />
              </Scene>
            </div>
          </div>
        </div>
      </section>

      {/* One sentence, then the idea drawn out: what goes in, what comes back. */}
      <section className={styles.statement} aria-labelledby="statement-title">
        <div className="container-wide">
          <h2 id="statement-title" className={styles.statementText}>
            WhatsApp shows you everything. Clippy shows you <strong>what matters</strong>: the{" "}
            <strong>decision in the group</strong>, the <strong>reply you owe</strong>, the{" "}
            <strong>deadline on Friday</strong>, the <strong>gate on your boarding pass</strong>.
          </h2>
          <div className={styles.flowWrap}>
            <FlowDiagram />
          </div>
        </div>
      </section>

      {/* Add it. Ask it. Read it. — Clippy acts each one out. */}
      <section className={styles.beats} aria-labelledby="beats-title">
        <div className="container-wide">
          <h2 id="beats-title" className={styles.beatsTitle}>
            Add it. Ask it. <span className={styles.muted}>Read it.</span>
          </h2>
          <ol role="list" className={styles.beatList}>
            {beats.map((b) => (
              <li key={b.title}>
                <Pose pose={b.pose} height={220} className={styles.beatPose} alt="" />
                <h3 className={styles.beatTitle}>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ol>
          <Button href="/how-it-works" variant="plain">
            See how it works
          </Button>
        </div>
      </section>

      {/* What it does: six rows, each with a colour panel of the real UI. */}
      <section className={styles.features} aria-labelledby="features-title">
        <div className="container-wide">
          <h2 id="features-title" className={styles.featuresTitle}>
            Six things it does, <span className={styles.muted}>so you don’t have to.</span>
          </h2>
          <div className={styles.rows}>
            {features.map((f) => (
              <article key={f.id} id={f.id} className={styles.row} data-tone={f.tone}>
                <div className={styles.rowCopy}>
                  <p className={styles.rowEyebrow}>{f.eyebrow}</p>
                  <h3 className={styles.rowTitle}>{f.title}</h3>
                  <p className={styles.rowBody}>{f.body}</p>
                </div>
                <div className={styles.rowVisual}>{f.visual}</div>
              </article>
            ))}
          </div>
          <Button href="/features" variant="plain">
            See every feature
          </Button>
        </div>
      </section>

      {/* The one dark moment: two conversations — on a call, and through the phone's own assistant. */}
      <section className={styles.stage} aria-labelledby="just-ask">
        <div className="container-wide">
          <h2 id="just-ask" className={styles.stageTitle}>
            Just ask.
          </h2>
          <p className={styles.stageLead}>
            In a call, say its name and it answers out loud. Anywhere else, ask Siri or Gemini and Clippy answers from
            your chats, calls and calendar.
          </p>

          <div className={styles.exchanges}>
            <figure className={styles.dialogue}>
              <figcaption className={styles.dialogueCaption}>
                <span className={styles.liveDot} aria-hidden="true" />
                On a WhatsApp call
              </figcaption>
              <blockquote className={styles.utterance}>
                <p className={styles.speaker}>Daniel</p>
                <p className={styles.said}>“Clippy, what did we say the budget cap was?”</p>
              </blockquote>
              <blockquote className={`${styles.utterance} ${styles.reply}`}>
                <p className={styles.speaker}>Clippy</p>
                <p className={styles.said}>“Four thousand, with travel kept separate.”</p>
              </blockquote>
            </figure>

            <figure className={styles.dialogue}>
              <figcaption className={styles.dialogueCaption}>
                <span className={styles.assistDot} aria-hidden="true" />
                With Siri or Gemini
              </figcaption>
              <blockquote className={styles.utterance}>
                <p className={styles.speaker}>You</p>
                <p className={styles.said}>“Ask Clippy what I missed in Family.”</p>
              </blockquote>
              <blockquote className={`${styles.utterance} ${styles.reply}`}>
                <p className={styles.speaker}>Clippy</p>
                <p className={styles.said}>“Lunch moved to Sunday at 1, and Ama needs the photos by Friday.”</p>
              </blockquote>
            </figure>
          </div>
        </div>
      </section>

      {/* A day with Clippy: big times down the left, what it did on the right. */}
      <section className={styles.day} aria-labelledby="day-title">
        <div className="container-wide">
          <h2 id="day-title" className={styles.sectionTitle}>
            A day with Clippy.
          </h2>
          <ol role="list" className={styles.dayList}>
            {day.map((d) => (
              <li key={d.time} className={styles.dayRow}>
                <p className={styles.dayTime}>{d.time}</p>
                <div className={styles.dayCopy}>
                  <p className={styles.dayWhen}>{d.when}</p>
                  <p className={styles.dayWhat}>{d.what}</p>
                </div>
                <div className={styles.dayVisual} aria-hidden="true">
                  <Scene tone={d.tone}>{d.visual}</Scene>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* One place for every conversation: today WhatsApp, next email, Telegram and Slack. */}
      <section className={styles.channels} aria-labelledby="channels-title">
        <div className={`container-wide ${styles.channelsGrid}`}>
          <div className={styles.channelsCopy}>
            <h2 id="channels-title" className={styles.sectionTitle}>
              One place for every conversation.
            </h2>
            <p className={styles.sectionLead}>
              Messages are scattered across apps, and the important ones get buried. Clippy keeps them together and
              sorts them by what needs you, so nothing slips between apps.
            </p>
          </div>
          <ul role="list" className={styles.channelList}>
            <li className={styles.channelNow}>
              <BrandMark name="whatsapp" tone="brand" className={styles.channelMark} />
              WhatsApp <span className={styles.channelState}>Today</span>
            </li>
            <li>
              <BrandMark name="gmail" className={styles.channelMark} />
              Email <span className={styles.channelState}>Next</span>
            </li>
            <li>
              <BrandMark name="telegram" className={styles.channelMark} />
              Telegram <span className={styles.channelState}>Next</span>
            </li>
            <li>
              <BrandMark name="chat" className={styles.channelMark} />
              Slack <span className={styles.channelState}>Next</span>
            </li>
          </ul>
        </div>
      </section>

      {/* The app: three tabs, each labelled, phones cropped at the section edge so only their content shows. */}
      <section className={styles.app} aria-labelledby="app-title">
        <div className="container-wide">
          <h2 id="app-title" className={styles.sectionTitle}>
            Everything lands in the app.
          </h2>
          <ul role="list" className={styles.tabs}>
            {tabs.map((t, i) => (
              <li key={t.name} className={i === 1 ? styles.tabMain : styles.tabSide}>
                <h3 className={styles.tabName}>{t.name}</h3>
                <p className={styles.tabText}>{t.text}</p>
                <div className={styles.crop}>
                  {i === 0 ? <TodayPhone device="iphone" /> : i === 1 ? <CallsPhone /> : <ChatsPhone device="iphone" />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cream again: Clippy listening, beside who gets to bring it in. */}
      <section className={styles.control} aria-labelledby="control-title">
        <div className={`container-wide ${styles.controlGrid}`}>
          <Pose pose="listening" height={460} className={styles.controlPose} alt="" />
          <div className={styles.controlCopy}>
            <h2 id="control-title" className={styles.sectionTitle}>
              You decide what it sees.
            </h2>
            <p>
              <strong>You choose the chats.</strong> Clippy only reads the conversations you pick, and you can change
              that any time.
            </p>
            <p>
              <strong>Calendar and screenshots stay opt-in.</strong> Nothing is read until you allow it on your phone.
            </p>
            <p>
              <strong>On calls, it introduces itself</strong>, and only people you approve can bring it in.
            </p>
            <Button href="/privacy" variant="plain">
              How Clippy handles your data
            </Button>
          </div>
        </div>
      </section>

      {latest.length > 0 ? (
        <section className={styles.blog} aria-labelledby="blog-title">
          <div className="container-wide">
            <div className={styles.blogHead}>
              <h2 id="blog-title" className={styles.sectionTitle}>
                From the blog.
              </h2>
              <Button href="/blog" variant="plain">
                All posts
              </Button>
            </div>
            <PostList posts={latest} />
          </div>
        </section>
      ) : null}

      <JsonLd data={appLd} />
    </>
  );
}
