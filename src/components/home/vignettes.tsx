/**
 * Small, still compositions of Clippy's UI — chat bubbles, Clippy's cards and
 * notifications on soft colour panels. They carry the home page's feature
 * rows, the flow diagram, the day timeline and the hero. Each composition is
 * one labelled image for assistive tech; people and content are made up.
 */
import Image from "next/image";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/brand/BrandMark";

import styles from "./vignettes.module.css";

export type Tone = "green" | "blue" | "amber" | "violet" | "teal" | "rose";

/* ---------- Building blocks ---------- */

export function Panel({
  tone,
  label,
  children,
  className,
}: {
  tone: Tone;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div role="img" aria-label={label} className={`${styles.panel} ${styles[tone]} ${className ?? ""}`}>
      <div className={styles.panelInner} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

/** Gives loose pieces (outside a panel) the same colours as the panels. */
export function Scene({ tone = "green", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return <div className={`${styles.scene} ${styles[tone]} ${className ?? ""}`}>{children}</div>;
}

function ClippyAvatar({ size = 28 }: { size?: number }) {
  return (
    <span className={styles.clippyAvatar} style={{ width: size, height: size }}>
      <Image src="/brand/clippy-icon.png" alt="" width={64} height={64} />
    </span>
  );
}

function Initial({ letter, hue }: { letter: string; hue: "amber" | "rose" | "teal" | "slate" | "blue" }) {
  return <span className={`${styles.initial} ${styles[`i_${hue}`]}`}>{letter}</span>;
}

export function Bubble({
  from,
  time,
  out,
  children,
  faded,
}: {
  from?: string;
  time: string;
  out?: boolean;
  faded?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.bubble} ${out ? styles.out : ""} ${faded ? styles.faded : ""}`}>
      {from ? <span className={styles.from}>{from}</span> : null}
      <span className={styles.bubbleText}>{children}</span>
      <span className={styles.time}>{time}</span>
    </div>
  );
}

export function ClippyCard({ title, children, wide }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`${styles.card} ${wide ? styles.cardWide : ""}`}>
      <div className={styles.cardHead}>
        <ClippyAvatar size={22} />
        <span className={styles.cardBrand}>Clippy</span>
        <span className={styles.cardTitle}>{title}</span>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

export function Notification({
  title,
  body,
  time = "now",
  className,
}: {
  title: string;
  body: ReactNode;
  time?: string;
  className?: string;
}) {
  return (
    <div className={`${styles.notif} ${className ?? ""}`}>
      <ClippyAvatar size={34} />
      <div className={styles.notifText}>
        <p className={styles.notifTop}>
          <span>{title}</span>
          <span className={styles.notifTime}>{time}</span>
        </p>
        <p className={styles.notifBody}>{body}</p>
      </div>
    </div>
  );
}

function Waveform({ bars = 34, played = 0 }: { bars?: number; played?: number }) {
  // Deterministic heights so server and client render the same thing.
  const heights = Array.from({ length: bars }, (_, i) => 5 + ((i * 7 + (i % 3) * 5) % 15));
  return (
    <span className={styles.wave}>
      {heights.map((h, i) => (
        <span key={i} className={i < played ? styles.wavePlayed : undefined} style={{ height: h }} />
      ))}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className={styles.check}>
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Feature vignettes ---------- */

export function GroupVignette() {
  return (
    <Panel
      tone="green"
      label="A WhatsApp group called Family with 142 new messages, and Clippy's five-line summary: lunch moved to Sunday at 1, everyone brings a dessert, and one question needs you."
    >
      <div className={styles.chatHead}>
        <Initial letter="F" hue="rose" />
        <span>
          <strong>Family</strong>
          <small>142 new messages</small>
        </span>
      </div>
      <Bubble from="Sam" time="08:12" faded>
        Can we do Sunday instead? Saturday is packed
      </Bubble>
      <Bubble from="Ama" time="08:15" faded>
        Sunday at 1 then. Who has the beach photos?
      </Bubble>
      <ClippyCard title="Summary · 142 messages" wide>
        <ul className={styles.bullets}>
          <li>Lunch moved to Sunday at 1, at Mum’s.</li>
          <li>Everyone brings a dessert. Sam is doing the cake.</li>
        </ul>
        <p className={styles.needs}>
          <span className={styles.tagAccent}>Needs you</span>
          Ama asked who has the beach photos.
        </p>
      </ClippyCard>
    </Panel>
  );
}

export function ReplyVignette() {
  return (
    <Panel
      tone="blue"
      label="Daniel asks whether the deck can be sent by Friday. Clippy suggests three replies; the first, I'll send it Thursday night, is selected."
    >
      <Bubble from="Daniel" time="14:02">
        Client moved the date. Can you send the deck by Friday?
      </Bubble>
      <ClippyCard title="Suggested replies" wide>
        <div className={styles.replies}>
          <span className={`${styles.reply} ${styles.replyPicked}`}>Yes, I’ll send it Thursday night.</span>
          <span className={styles.reply}>Friday works. Want the numbers too?</span>
          <span className={styles.reply}>Could we say Monday morning?</span>
        </div>
      </ClippyCard>
      <Bubble time="14:03" out>
        Yes, I’ll send it Thursday night. <span className={styles.ticks}>✓✓</span>
      </Bubble>
    </Panel>
  );
}

export function DeadlineVignette() {
  return (
    <Panel
      tone="amber"
      label="A chat message asking for the deck by Friday, with the words by Friday highlighted, and a Clippy reminder the day before: send the deck to Daniel, due tomorrow."
    >
      <Bubble from="Daniel" time="Tue 14:02">
        Can you send the deck <mark className={styles.mark}>by Friday</mark>?
      </Bubble>
      <Notification title="Clippy" time="Thu 09:00" body={<><strong>Due tomorrow:</strong> send the deck to Daniel</>} />
      <ClippyCard title="Coming up" wide>
        <ul className={styles.agenda}>
          <li>
            <span className={styles.day}>Fri</span>Send the deck to Daniel<small>Design team</small>
          </li>
          <li>
            <span className={styles.day}>Sat</span>Pay the landlord<small>Landlord</small>
          </li>
          <li>
            <span className={styles.day}>Mon</span>Visa photos<small>Screenshot</small>
          </li>
        </ul>
      </ClippyCard>
    </Panel>
  );
}

export function ScreenshotVignette() {
  return (
    <Panel
      tone="violet"
      label="A boarding pass screenshot from Accra to Frankfurt, and Clippy's note: flight LH 569, Tuesday 22:40, gate B12, seat 14C, added to Today."
    >
      <div className={styles.pass}>
        <div className={styles.passTop}>
          <span>Boarding pass</span>
          <span>LH 569</span>
        </div>
        <div className={styles.passRoute}>
          <span>
            <b>ACC</b>
            <small>Accra</small>
          </span>
          <svg viewBox="0 0 24 24" className={styles.plane}>
            <path fill="currentColor" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
          </svg>
          <span>
            <b>FRA</b>
            <small>Frankfurt</small>
          </span>
        </div>
        <div className={styles.passGrid}>
          <span>
            <small>Date</small>Tue 24 Nov
          </span>
          <span>
            <small>Boards</small>22:10
          </span>
          <span>
            <small>Gate</small>B12
          </span>
          <span>
            <small>Seat</small>14C
          </span>
        </div>
      </div>
      <ClippyCard title="From a screenshot" wide>
        <p className={styles.noteLine}>
          <Check /> Flight LH 569 to Frankfurt, <strong>Tue 22:40</strong>, gate <strong>B12</strong>, seat 14C.
        </p>
        <p className={styles.noteMeta}>Added to Today · reminder at 19:30</p>
      </ClippyCard>
    </Panel>
  );
}

export function CallVignette() {
  return (
    <Panel
      tone="teal"
      label="A live WhatsApp call called Weekly planning. Clippy writes each line under the speaker's name, then a three-point summary when the call ends."
    >
      <div className={styles.callHead}>
        <span className={styles.liveDot} />
        <strong>Weekly planning</strong>
        <span className={styles.callMeta}>Live · 32:08</span>
        <span className={styles.faces}>
          <Initial letter="A" hue="amber" />
          <Initial letter="D" hue="teal" />
          <Initial letter="P" hue="rose" />
          <ClippyAvatar size={26} />
        </span>
      </div>
      <div className={styles.lines}>
        <p>
          <b>Ama</b>The client wants the deck on Friday, not Monday.
        </p>
        <p>
          <b>Daniel</b>Then I’ll finish the numbers by Wednesday night.
        </p>
      </div>
      <ClippyCard title="When you hang up" wide>
        <ul className={styles.bullets}>
          <li>Deck goes to the client on Friday.</li>
          <li>Daniel: numbers by Wednesday night.</li>
          <li>Priya: design pass Thursday morning.</li>
        </ul>
      </ClippyCard>
    </Panel>
  );
}

export function VoiceVignette() {
  return (
    <Panel
      tone="rose"
      label="A 48-second voice note from Ama, and Clippy's text of it: tomorrow I call the bank, and on Thursday I renew the shop insurance."
    >
      <div className={styles.voice}>
        <Initial letter="A" hue="amber" />
        <span className={styles.play}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" />
          </svg>
        </span>
        <Waveform played={9} />
        <span className={styles.voiceLen}>0:48</span>
      </div>
      <ClippyCard title="Voice note, as text" wide>
        <p className={styles.quote}>
          “Hi! Quick one: tomorrow I call the bank about the transfer, and on Thursday I renew the shop insurance.
          Can you check we still have the old policy number?”
        </p>
        <p className={styles.needs}>
          <span className={styles.tagAccent}>Needs you</span>
          Find the old policy number.
        </p>
      </ClippyCard>
    </Panel>
  );
}

/* ---------- Flow: what you send it → what you get back ---------- */

const inputs: { icon: ReactNode; title: string; meta: string }[] = [
  { icon: <BrandMark name="whatsapp" tone="brand" />, title: "Family", meta: "142 new messages" },
  { icon: <MicGlyph />, title: "Voice note", meta: "0:48 from Ama" },
  { icon: <ImageGlyph />, title: "Screenshot", meta: "Boarding pass" },
  { icon: <PhoneGlyph />, title: "WhatsApp call", meta: "Weekly planning · 32 min" },
  { icon: <BrandMark name="googleCalendar" tone="brand" />, title: "Calendar", meta: "Dinner with Sam · 19:00" },
];

const outputs: { kind: string; text: string }[] = [
  { kind: "Summary", text: "Lunch moved to Sunday at 1" },
  { kind: "Text", text: "Bank tomorrow, insurance Thursday" },
  { kind: "Note", text: "Gate B12, boards 22:10" },
  { kind: "Minutes", text: "3 decisions, 2 to-dos" },
  { kind: "Nudge", text: "Leave at 18:30 for dinner" },
];

/** Five things in, Clippy in the middle, five useful things out. Lines are drawn in fixed units. */
export function FlowDiagram() {
  const ys = [32, 116, 200, 284, 368];
  return (
    <div
      className={styles.flow}
      role="img"
      aria-label="Five things go into Clippy — a busy group, a voice note, a screenshot, a WhatsApp call and a calendar event — and five come out: a summary, the voice note as text, a note with the gate, call minutes and a nudge to leave on time."
    >
      <ul className={styles.flowCol} aria-hidden="true">
        {inputs.map((i) => (
          <li key={i.title} className={styles.flowIn}>
            <span className={styles.flowIcon}>{i.icon}</span>
            <span>
              <strong>{i.title}</strong>
              <small>{i.meta}</small>
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.flowHub} aria-hidden="true">
        <svg viewBox="0 0 240 400" className={styles.flowLines} preserveAspectRatio="none">
          {ys.map((y) => (
            <path key={`l${y}`} d={`M0 ${y} C 52 ${y}, 40 200, 92 200`} />
          ))}
          {ys.map((y) => (
            <path key={`r${y}`} className={styles.flowOut} d={`M148 200 C 200 200, 188 ${y}, 240 ${y}`} />
          ))}
        </svg>
        <span className={styles.hubIcon}>
          <Image src="/brand/clippy-icon.png" alt="" width={160} height={160} />
        </span>
        <span className={styles.hubLabel}>Clippy</span>
      </div>

      <ul className={styles.flowCol} aria-hidden="true">
        {outputs.map((o) => (
          <li key={o.kind} className={styles.flowResult}>
            <span className={styles.flowKind}>{o.kind}</span>
            <strong>{o.text}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MicGlyph() {
  return (
    <svg viewBox="0 0 24 24">
      <path fill="#e8467c" d="M12 14a3 3 0 003-3V6a3 3 0 00-6 0v5a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.92V21h2v-3.08A7 7 0 0019 11z" />
    </svg>
  );
}

function ImageGlyph() {
  return (
    <svg viewBox="0 0 24 24">
      <path fill="#7c5cff" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 14l3.5-4.5 2.5 3 3.5-4.5L19 17zm3-9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24">
      <path fill="#0f9d8a" d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" />
    </svg>
  );
}
