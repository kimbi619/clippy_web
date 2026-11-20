/**
 * HTML mock-ups of Clippy in use. They are illustrations, so each one is a
 * single labelled image for assistive tech (role="img" + aria-label) and its
 * contents are not announced line by line. Sample people and content are
 * made up.
 */
import Image from "next/image";
import type { ReactNode } from "react";

import { PhoneFrame, PlatformBack, type Device } from "./PhoneFrame";
import { CheckIcon, PlayIcon, SpeakerIcon } from "./icons";
import styles from "./mockups.module.css";

type PhoneProps = { className?: string; device?: Device };

type Tone = "amber" | "rose" | "teal" | "slate";

type Person = { name: string; initial: string; tone: Tone };

const ama: Person = { name: "Ama", initial: "A", tone: "amber" };
const daniel: Person = { name: "Daniel", initial: "D", tone: "teal" };
const priya: Person = { name: "Priya", initial: "P", tone: "rose" };
const sam: Person = { name: "Sam", initial: "S", tone: "slate" };

function Avatar({ person, size = "md" }: { person: Person | "clippy"; size?: "sm" | "md" }) {
  const cls = `${styles.avatar} ${size === "sm" ? styles.avatarSm : ""}`;
  if (person === "clippy") {
    return (
      <span className={`${cls} ${styles.avatarClippy}`}>
        <Image src="/brand/clippy-icon.png" alt="" width={64} height={64} />
      </span>
    );
  }
  return <span className={`${cls} ${styles[person.tone]}`}>{person.initial}</span>;
}

function LiveBadge({ label = "Live" }: { label?: string }) {
  return (
    <span className={styles.live}>
      <span className={styles.liveDot} />
      {label}
    </span>
  );
}

type Line = { who: Person | "clippy"; time: string; text: ReactNode; partial?: boolean };

function TranscriptLine({ line }: { line: Line }) {
  const name = line.who === "clippy" ? "Clippy" : line.who.name;
  return (
    <div className={styles.line}>
      <Avatar person={line.who} size="sm" />
      <div className={styles.lineBody}>
        <div className={styles.lineMeta}>
          <span className={styles.lineName}>{name}</span>
          <span className={styles.lineTime}>{line.time}</span>
        </div>
        <p className={line.partial ? styles.partial : undefined}>{line.text}</p>
      </div>
    </div>
  );
}

/* ---------- Hero: live call transcript ---------- */

const liveLines: Line[] = [
  { who: ama, time: "12:31", text: "So the client wants the pitch deck on Friday, not Monday." },
  { who: daniel, time: "12:36", text: "Then I’ll have the numbers finished by Wednesday night." },
  { who: priya, time: "12:40", text: "I can do the design pass on Thursday morning." },
  { who: ama, time: "12:44", text: "Great. Daniel, can you send me the draft budget too?" },
  { who: daniel, time: "12:45", text: "Sure. Clippy, what did we say the budget cap was last week?" },
  { who: "clippy", time: "12:45", text: "Last Tuesday you agreed on a cap of 4,000, with travel kept separate." },
  { who: priya, time: "12:47", text: "Perfect, then I’ll keep the design within that and share it on", partial: true },
];

export function LiveCallPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="The Clippy app during a live call called Weekly planning, showing a transcript with each line labelled by speaker."
    >
      <div className={styles.screenBody}>
        <div className={styles.navBack}>
          <PlatformBack label="Calls" />
        </div>
        <div className={styles.screenTitleBlock}>
          <p className={styles.screenTitle}>Weekly planning</p>
          <p className={styles.screenMeta}>
            <LiveBadge />
            <span className="tabular">12:48</span>
            <span>4 people</span>
          </p>
        </div>
        <div className={styles.people}>
          <Avatar person={ama} size="sm" />
          <Avatar person={daniel} size="sm" />
          <Avatar person={priya} size="sm" />
          <Avatar person="clippy" size="sm" />
          <span className={styles.peopleNote}>Clippy is transcribing</span>
        </div>
        <div className={styles.group}>
          {liveLines.map((line) => (
            <TranscriptLine key={line.time} line={line} />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ---------- Ask Clippy mid-call ---------- */

export function AskClippyCard() {
  return (
    <div
      className={styles.card}
      role="img"
      aria-label="In a live call, Ama asks: Clippy, what did we agree on Friday’s deadline? Clippy answers out loud in the call: the pitch deck goes to the client on Friday, Daniel sends the numbers by Wednesday night and Priya does the design pass on Thursday."
    >
      <div className={styles.cardHeader}>
        <LiveBadge />
        <span>Weekly planning</span>
      </div>
      <div className={styles.stack}>
        <TranscriptLine
          line={{
            who: ama,
            time: "18:02",
            text: (
              <>
                <mark className={styles.mention}>Clippy</mark>, what did we agree on Friday’s deadline?
              </>
            ),
          }}
        />
        <div className={styles.answer}>
          <TranscriptLine
            line={{
              who: "clippy",
              time: "18:03",
              text: "The pitch deck goes to the client on Friday. Daniel sends the numbers by Wednesday night, and Priya does the design pass on Thursday morning.",
            }}
          />
          <p className={styles.spoken}>
            <SpeakerIcon />
            Answered out loud in the call
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Summary after the call ---------- */

export function SummaryCard() {
  return (
    <div
      className={styles.card}
      role="img"
      aria-label="A call summary for Weekly planning: 24 minutes, 4 people. It lists the decisions made and next steps for Daniel, Priya and Ama, and notes that the transcript was checked again after the call."
    >
      <div className={styles.summaryHead}>
        <p className={styles.cardTitle}>Weekly planning</p>
        <p className={styles.muted}>Today, 10:00 · 24 min · 4 people</p>
      </div>

      <div className={styles.summarySection}>
        <p className={styles.label}>Summary</p>
        <p>
          The client moved the pitch deck deadline to Friday. The team split the work so the deck is ready a day early.
        </p>
      </div>

      <div className={styles.summarySection}>
        <p className={styles.label}>Next steps</p>
        <ul className={styles.todo}>
          <li>
            <Avatar person={daniel} size="sm" />
            <span>Send final numbers by Wednesday night</span>
          </li>
          <li>
            <Avatar person={priya} size="sm" />
            <span>Design pass on Thursday morning</span>
          </li>
          <li>
            <Avatar person={ama} size="sm" />
            <span>Share the draft budget with Daniel</span>
          </li>
        </ul>
      </div>

      <p className={styles.checked}>
        <CheckIcon />
        Transcript checked again after the call
      </p>
    </div>
  );
}

/* ---------- Voice note to text ---------- */

// Fixed bar heights (px) — static so the page renders the same every time.
const bars = [
  6, 10, 16, 22, 14, 8, 12, 20, 26, 18, 10, 6, 14, 22, 16, 10, 8, 12, 18, 24, 14, 8, 6, 10, 16, 12, 8, 14, 20, 10, 6,
];

function Waveform({ played = 0 }: { played?: number }) {
  return (
    <span className={styles.waveform}>
      {bars.map((h, i) => (
        <span key={i} className={i < played ? styles.barPlayed : undefined} style={{ height: h }} />
      ))}
    </span>
  );
}

function ChatHeader() {
  return (
    <div className={styles.chatHeader}>
      <Avatar person="clippy" />
      <div>
        <p className={styles.chatName}>Clippy</p>
        <p className={styles.muted}>Assistant</p>
      </div>
    </div>
  );
}

export function VoiceNoteChat() {
  return (
    <div
      className={styles.card}
      role="img"
      aria-label="A chat with Clippy. A forwarded voice note, 1 minute 42 seconds long, is sent to Clippy, and Clippy replies with the message written out as text."
    >
      <ChatHeader />
      <div className={styles.chat}>
        <div className={`${styles.bubble} ${styles.out}`}>
          <p className={styles.forwarded}>Forwarded</p>
          <div className={styles.voice}>
            <span className={styles.play}>
              <PlayIcon />
            </span>
            <Waveform played={9} />
          </div>
          <p className={styles.bubbleMeta}>
            <span className="tabular">1:42</span>
            <span className="tabular">09:14</span>
          </p>
        </div>
        <div className={`${styles.bubble} ${styles.in}`}>
          <p>
            Hi, it’s Sam. The venue can’t do Saturday any more, so we’re moving the dinner to Sunday at 7. Same place.
            Can you let your sister know, and tell me by tonight if Sunday doesn’t work for you?
          </p>
          <p className={styles.bubbleMeta}>
            <span className="tabular">09:14</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Messaging Clippy ---------- */

export function AssistantChat() {
  return (
    <div
      className={styles.card}
      role="img"
      aria-label="A chat with Clippy. You ask it to draft a reply to Sam saying Sunday works and you will tell your sister. Clippy replies with a short draft message."
    >
      <ChatHeader />
      <div className={styles.chat}>
        <div className={`${styles.bubble} ${styles.out}`}>
          <p>Draft a reply to Sam: Sunday works, and I’ll tell my sister.</p>
          <p className={styles.bubbleMeta}>
            <span className="tabular">09:16</span>
          </p>
        </div>
        <div className={`${styles.bubble} ${styles.in}`}>
          <p>Here’s one you can send:</p>
          <p className={styles.quote}>
            “Sunday at 7 works for me. I’ll let my sister know today. Thanks for sorting the venue.”
          </p>
          <p className={styles.bubbleMeta}>
            <span className="tabular">09:16</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- The app: Today, Calls, Chats ---------- */

function TabBar({ active }: { active: "Today" | "Calls" | "Chats" }) {
  return (
    <div className={styles.tabBar}>
      {(["Today", "Calls", "Chats"] as const).map((tab) => (
        <span key={tab} className={tab === active ? styles.tabActive : undefined}>
          {tab}
        </span>
      ))}
    </div>
  );
}

export function TodayPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="The Today screen in the Clippy app, showing upcoming calendar events and recent screenshots."
    >
      <div className={styles.screenBody}>
        <p className={styles.largeTitle}>Today</p>
        <p className={styles.sectionLabel}>Coming up</p>
        <div className={styles.group}>
          <div className={styles.row}>
            <span className={styles.rowTime}>14:00</span>
            <span>
              <span className={styles.rowTitle}>Design review</span>
              <span className={styles.rowSub}>30 min</span>
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowTime}>16:30</span>
            <span>
              <span className={styles.rowTitle}>Call with Sam</span>
              <span className={styles.rowSub}>WhatsApp</span>
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowTime}>19:00</span>
            <span>
              <span className={styles.rowTitle}>Dinner with family</span>
              <span className={styles.rowSub}>2 hr</span>
            </span>
          </div>
        </div>
        <p className={styles.sectionLabel}>Recent screenshots</p>
        <div className={styles.shots}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <TabBar active="Today" />
    </PhoneFrame>
  );
}

export function CallsPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="The Calls screen in the Clippy app, listing a live call and finished calls with their summaries."
    >
      <div className={styles.screenBody}>
        <p className={styles.largeTitle}>Calls</p>
        <div className={styles.group}>
          <div className={styles.row}>
            <span>
              <span className={styles.rowTitle}>Weekly planning</span>
              <span className={styles.rowSub}>
                <LiveBadge /> 4 people
              </span>
            </span>
          </div>
        </div>
        <p className={styles.sectionLabel}>Earlier</p>
        <div className={styles.group}>
          <div className={styles.row}>
            <span>
              <span className={styles.rowTitle}>Client check-in</span>
              <span className={styles.rowSub}>Yesterday · 32 min</span>
              <span className={styles.rowText}>Agreed on the new scope and a review next Tuesday.</span>
            </span>
          </div>
          <div className={styles.row}>
            <span>
              <span className={styles.rowTitle}>Sam</span>
              <span className={styles.rowSub}>Monday · 8 min</span>
              <span className={styles.rowText}>Dinner moved to Sunday at 7.</span>
            </span>
          </div>
          <div className={styles.row}>
            <span>
              <span className={styles.rowTitle}>Design team</span>
              <span className={styles.rowSub}>Friday · 45 min</span>
              <span className={styles.rowText}>Two logo options to test with five customers.</span>
            </span>
          </div>
          <div className={styles.row}>
            <span>
              <span className={styles.rowTitle}>Landlord</span>
              <span className={styles.rowSub}>Thursday · 6 min</span>
              <span className={styles.rowText}>Plumber visits Saturday between 9 and 11.</span>
            </span>
          </div>
        </div>
      </div>
      <TabBar active="Calls" />
    </PhoneFrame>
  );
}

export function ChatsPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="The Chats screen in the Clippy app, showing WhatsApp chats you chose to mirror, including a voice note."
    >
      <div className={styles.screenBody}>
        <p className={styles.largeTitle}>Chats</p>
        <div className={styles.group}>
          <div className={styles.row}>
            <Avatar person={sam} size="sm" />
            <span>
              <span className={styles.rowTitle}>Sam</span>
              <span className={styles.rowSubWave}>
                <Waveform />
                <span className="tabular">1:42</span>
              </span>
            </span>
          </div>
          <div className={styles.row}>
            <Avatar person={priya} size="sm" />
            <span>
              <span className={styles.rowTitle}>Design team</span>
              <span className={styles.rowText}>Priya: Thursday works for the pass</span>
            </span>
          </div>
          <div className={styles.row}>
            <Avatar person="clippy" size="sm" />
            <span>
              <span className={styles.rowTitle}>Clippy</span>
              <span className={styles.rowText}>Here’s one you can send…</span>
            </span>
          </div>
          <div className={styles.row}>
            <Avatar person={ama} size="sm" />
            <span>
              <span className={styles.rowTitle}>Ama</span>
              <span className={styles.rowText}>Sending the deck tonight</span>
            </span>
          </div>
          <div className={styles.row}>
            <Avatar person={daniel} size="sm" />
            <span>
              <span className={styles.rowTitle}>Daniel</span>
              <span className={styles.rowSubWave}>
                <Waveform />
                <span className="tabular">0:38</span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <TabBar active="Chats" />
    </PhoneFrame>
  );
}

/* ---------- Full phone screens for the scrolling story ---------- */

export function SummaryPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="A finished call in the Clippy app: a short summary of what was decided and the next steps for each person, with a note that the transcript was checked again after the call."
    >
      <div className={styles.screenBody}>
        <div className={styles.navBack}>
          <PlatformBack label="Calls" />
        </div>
        <div className={styles.screenTitleBlock}>
          <p className={styles.screenTitle}>Weekly planning</p>
          <p className={styles.screenMeta}>
            <span>Today, 10:00</span>
            <span>24 min</span>
            <span>4 people</span>
          </p>
        </div>
        <p className={styles.sectionLabel}>Summary</p>
        <div className={styles.group}>
          <p>The client moved the pitch deck deadline to Friday. The team split the work so the deck is ready a day early.</p>
        </div>
        <p className={styles.sectionLabel}>Next steps</p>
        <div className={styles.group}>
          <ul className={styles.todo}>
            <li>
              <Avatar person={daniel} size="sm" />
              <span>Send final numbers by Wednesday night</span>
            </li>
            <li>
              <Avatar person={priya} size="sm" />
              <span>Design pass on Thursday morning</span>
            </li>
            <li>
              <Avatar person={ama} size="sm" />
              <span>Share the draft budget with Daniel</span>
            </li>
          </ul>
        </div>
        <p className={styles.checked}>
          <CheckIcon />
          Transcript checked again after the call
        </p>
      </div>
    </PhoneFrame>
  );
}

function ChatScreen({ children }: { children: ReactNode }) {
  return (
    <div className={styles.screenBody}>
      <div className={styles.chatHeader}>
        <Avatar person="clippy" />
        <div>
          <p className={styles.chatName}>Clippy</p>
          <p className={styles.muted}>Assistant</p>
        </div>
      </div>
      <div className={`${styles.chat} ${styles.chatFill}`}>{children}</div>
    </div>
  );
}

export function VoiceNotePhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="A WhatsApp chat with Clippy. A forwarded voice note, 1 minute 42 seconds long, and Clippy's reply with the message written out as text."
    >
      <ChatScreen>
        <div className={`${styles.bubble} ${styles.out}`}>
          <p className={styles.forwarded}>Forwarded</p>
          <div className={styles.voice}>
            <span className={styles.play}>
              <PlayIcon />
            </span>
            <Waveform played={9} />
          </div>
          <p className={styles.bubbleMeta}>
            <span className="tabular">1:42</span>
            <span className="tabular">09:14</span>
          </p>
        </div>
        <div className={`${styles.bubble} ${styles.in}`}>
          <p>
            Hi, it’s Sam. The venue can’t do Saturday any more, so we’re moving the dinner to Sunday at 7. Same place. Can
            you let your sister know, and tell me by tonight if Sunday doesn’t work for you?
          </p>
          <p className={styles.bubbleMeta}>
            <span className="tabular">09:14</span>
          </p>
        </div>
      </ChatScreen>
    </PhoneFrame>
  );
}

export function AssistantPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="A WhatsApp chat with Clippy. You ask it to draft a reply to Sam, and Clippy replies with a short message you can send."
    >
      <ChatScreen>
        <div className={`${styles.bubble} ${styles.out}`}>
          <p>Draft a reply to Sam: Sunday works, and I’ll tell my sister.</p>
          <p className={styles.bubbleMeta}>
            <span className="tabular">09:16</span>
          </p>
        </div>
        <div className={`${styles.bubble} ${styles.in}`}>
          <p>Here’s one you can send:</p>
          <p className={styles.quote}>“Sunday at 7 works for me. I’ll let my sister know today. Thanks for sorting the venue.”</p>
          <p className={styles.bubbleMeta}>
            <span className="tabular">09:16</span>
          </p>
        </div>
        <div className={`${styles.bubble} ${styles.out}`}>
          <p>Perfect. And remind me what time the plumber comes on Saturday?</p>
          <p className={styles.bubbleMeta}>
            <span className="tabular">09:17</span>
          </p>
        </div>
        <div className={`${styles.bubble} ${styles.in}`}>
          <p>Between 9 and 11. Your landlord said so on Thursday’s call.</p>
          <p className={styles.bubbleMeta}>
            <span className="tabular">09:17</span>
          </p>
        </div>
      </ChatScreen>
    </PhoneFrame>
  );
}
