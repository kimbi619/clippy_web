import type { Metadata } from "next";
import Image from "next/image";

import { DownloadButtons } from "@/components/DownloadButtons";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/Button";
import {
  CallsPhone,
  ChatsPhone,
  DeadlinesPhone,
  GroupSummaryPhone,
  HighlightsPhone,
  LiveCallPhone,
  ReplyPhone,
  ScreenshotPhone,
  TodayPhone,
  VoiceNotePhone,
} from "@/components/home/mockups";
import { StickyStory, type Chapter } from "@/components/home/StickyStory";
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

const chapters: Chapter[] = [
  {
    id: "groups",
    title: "Busy groups, in a paragraph.",
    body: (
      <p>
        Come back to 142 messages and read five lines instead. Clippy sums up what was decided, and{" "}
        <strong>points out the one question that needs you</strong>.
      </p>
    ),
    screen: <GroupSummaryPhone />,
  },
  {
    id: "replies",
    title: "Replies, ready when you are.",
    body: (
      <p>
        Clippy drafts replies from what was actually said — in the chat, on last week’s call, in the screenshot you
        saved. <strong>You pick one, tweak it, send it.</strong>
      </p>
    ),
    screen: <ReplyPhone />,
  },
  {
    id: "deadlines",
    title: "Deadlines don’t slip.",
    body: (
      <p>
        “Can you send it by Friday?” becomes a deadline the moment someone types it. Clippy pulls dates from your chats,
        calls, screenshots and calendar, and <strong>nudges you before they’re due</strong>.
      </p>
    ),
    screen: <DeadlinesPhone />,
  },
  {
    id: "screenshots",
    title: "Screenshots that remember.",
    body: (
      <p>
        Boarding passes, receipts, addresses, a message someone sent you. Clippy reads your screenshots and{" "}
        <strong>notes what matters</strong>, so the details are there when you need them.
      </p>
    ),
    screen: <ScreenshotPhone />,
  },
  {
    id: "calls",
    title: "Calls, written down.",
    body: (
      <p>
        Add Clippy to a WhatsApp call and the transcript writes itself, labelled by who said it. When you hang up,{" "}
        <strong>a short summary is waiting</strong>.
      </p>
    ),
    screen: <LiveCallPhone />,
  },
  {
    id: "voice-notes",
    title: "Voice notes you can read.",
    body: (
      <p>
        Forward a voice note and <strong>get it back as text</strong>. Catch up in a meeting, on a train, or anywhere
        you can’t play audio.
      </p>
    ),
    screen: <VoiceNotePhone />,
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
      {/* Hero: cream; Clippy behind with feathered edges, one iPhone in front cut off by the section edge. */}
      <section className={styles.hero}>
        <div className={`container-wide ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>Everything that matters in your chats. First.</h1>
            <p className={styles.heroLead}>
              Clippy is a companion for WhatsApp. It sums up busy groups, drafts your replies, catches deadlines, reads
              your screenshots and joins your calls — then shows you what’s important.
            </p>
            <DownloadButtons />
            <p className={styles.heroNote}>Free on iPhone and Android. Works with Siri and Gemini.</p>
          </div>
          <div className={styles.heroArt}>
            <Mascot bare priority size={560} alt="Clippy, a friendly green character." className={styles.heroMascot} />
            <HighlightsPhone device="iphone" className={styles.heroPhone} />
          </div>
        </div>
      </section>

      {/* Familiar names: what Clippy already works with. Monochrome so it reads as "works with", not an endorsement. */}
      <section className={styles.worksWith} aria-label="Works with">
        <div className={`container-wide ${styles.worksWithInner}`}>
          <p className={styles.worksWithLabel}>Works with</p>
          <ul role="list" className={styles.worksWithList}>
            <li>
              <BrandMark name="whatsapp" className={styles.mark} />
              WhatsApp
            </li>
            <li>
              <BrandMark name="apple" className={styles.mark} />
              Siri
            </li>
            <li>
              <BrandMark name="gemini" className={styles.mark} />
              Gemini
            </li>
            <li>
              <BrandMark name="googleCalendar" className={styles.mark} />
              Google Calendar
            </li>
            <li>
              <BrandMark name="apple" className={styles.mark} />
              Apple Calendar
            </li>
          </ul>
        </div>
      </section>

      {/* One sentence instead of three feature cards. */}
      <section className={styles.statement}>
        <p className={`container-wide ${styles.statementText}`}>
          WhatsApp shows you everything. Clippy shows you <strong>what matters</strong>: the{" "}
          <strong>decision in the group</strong>, the <strong>reply you owe</strong>, the{" "}
          <strong>deadline on Friday</strong>, the <strong>gate on your boarding pass</strong>.
        </p>
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

      <section className={styles.story} aria-labelledby="story-title">
        <h2 id="story-title" className="visually-hidden">
          What Clippy does
        </h2>
        {/* Phones only on wide screens; on a phone the chapters read as text. */}
        <StickyStory chapters={chapters} inlineScreens={false} />
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

      <section className={styles.closing} aria-labelledby="closing-title">
        <div className={`container-wide ${styles.closingInner}`}>
          <div className={styles.closingCopy}>
            <h2 id="closing-title" className={styles.closingTitle}>
              Let Clippy keep up for you.
            </h2>
            <p className={styles.sectionLead}>Free on iPhone and Android.</p>
            <DownloadButtons />
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
