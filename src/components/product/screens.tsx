/**
 * Extra full phone screens for the product pages (features, how it works,
 * download), drawn in the same flat style as the home page mock-ups. Each one
 * is a single labelled image for assistive tech (PhoneFrame sets role="img").
 * Sample people, numbers and content are made up; the phone numbers use the
 * UK range reserved for drama (07700 900xxx).
 */
import Image from "next/image";
import type { ReactNode } from "react";

import { PhoneFrame, PlatformBack, type Device } from "@/components/home/PhoneFrame";
import { CheckIcon, SpeakerIcon } from "@/components/home/icons";

import styles from "./screens.module.css";

type PhoneProps = { className?: string; device?: Device };

type Tone = "amber" | "rose" | "teal" | "slate";
type Person = { name: string; initial: string; tone: Tone };

const ama: Person = { name: "Ama", initial: "A", tone: "amber" };
const daniel: Person = { name: "Daniel", initial: "D", tone: "teal" };
const priya: Person = { name: "Priya", initial: "P", tone: "rose" };
const sam: Person = { name: "Sam", initial: "S", tone: "slate" };
const you: Person = { name: "You", initial: "Y", tone: "teal" };
const yaw: Person = { name: "Yaw", initial: "Y", tone: "amber" };

function Avatar({ person, size = "sm" }: { person: Person | "clippy"; size?: "sm" | "md" }) {
  const cls = `${styles.avatar} ${size === "md" ? styles.avatarMd : ""}`;
  if (person === "clippy") {
    return (
      <span className={`${cls} ${styles.avatarClippy}`}>
        <Image src="/brand/clippy-icon.png" alt="" width={64} height={64} />
      </span>
    );
  }
  return <span className={`${cls} ${styles[person.tone]}`}>{person.initial}</span>;
}

function Live({ children = "Live" }: { children?: ReactNode }) {
  return (
    <span className={styles.live}>
      <span className={styles.liveDot} />
      {children}
    </span>
  );
}

function Line({ who, time, children }: { who: Person | "clippy"; time: string; children: ReactNode }) {
  return (
    <div className={styles.line}>
      <Avatar person={who} />
      <div className={styles.lineBody}>
        <p className={styles.lineMeta}>
          <span className={styles.lineName}>{who === "clippy" ? "Clippy" : who.name}</span>
          <span className="tabular">{time}</span>
        </p>
        <p>{children}</p>
      </div>
    </div>
  );
}

function Back({ to }: { to: string }) {
  return (
    <p className={styles.back}>
      <PlatformBack label={to} />
    </p>
  );
}

/* ---------- Asking Clippy by name, mid-call ---------- */

export function AskPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="A live call in the Clippy app. Ama asks: Clippy, what did we agree on Friday’s deadline? Clippy’s answer, which it also said out loud in the call, appears in the transcript."
    >
      <div className={styles.body}>
        <Back to="Calls" />
        <div>
          <p className={styles.title}>Weekly planning</p>
          <p className={styles.meta}>
            <Live />
            <span className="tabular">18:03</span>
            <span>4 people</span>
          </p>
        </div>
        <div className={styles.group}>
          <Line who={priya} time="17:58">
            Then the deck is basically done by Thursday.
          </Line>
          <Line who={daniel} time="18:01">
            As long as the numbers don’t change again.
          </Line>
          <Line who={ama} time="18:02">
            <mark className={styles.mention}>Clippy</mark>, what did we agree on Friday’s deadline?
          </Line>
          <div className={styles.answer}>
            <Line who="clippy" time="18:03">
              The deck goes to the client on Friday. Daniel sends the numbers by Wednesday night, and Priya does the
              design pass on Thursday morning.
            </Line>
            <p className={styles.note}>
              <SpeakerIcon />
              Answered out loud in the call
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ---------- A one-to-one call with Clippy ---------- */

export function OneToOnePhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="A one-to-one call with Clippy in the Clippy app. You ask it to help you prepare a pitch, and Clippy suggests what to open with."
    >
      <div className={styles.body}>
        <Back to="Calls" />
        <div className={styles.callHead}>
          <Avatar person="clippy" size="md" />
          <div>
            <p className={styles.title}>Clippy</p>
            <p className={styles.meta}>
              <Live />
              <span>Just the two of you</span>
            </p>
          </div>
        </div>
        <div className={styles.group}>
          <Line who={you} time="08:40">
            Help me think through Friday’s pitch. What should I open with?
          </Line>
          <Line who="clippy" time="08:40">
            Open with why the deadline moved, then the budget: four thousand, travel kept separate. Save the design for
            last, it’s the strongest part.
          </Line>
          <Line who={you} time="08:41">
            Good. And how long should the whole thing be?
          </Line>
          <Line who="clippy" time="08:41">
            Aim for fifteen minutes, so there’s time for questions.
          </Line>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ---------- Settings: Allowed callers ---------- */

const callers: { person: Person; number: string }[] = [
  { person: ama, number: "+44 7700 900142" },
  { person: daniel, number: "+44 7700 900318" },
  { person: priya, number: "+44 7700 900575" },
  { person: sam, number: "+44 7700 900906" },
];

export function AllowedCallersPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="The Allowed callers screen in the Clippy app: four people who can bring Clippy into a call, and a button to add another person."
    >
      <div className={styles.body}>
        <Back to="You" />
        <p className={styles.largeTitle}>Allowed callers</p>
        <p className={styles.caption}>Only these people can add Clippy to a call. Anyone else is turned away.</p>
        <div className={styles.group}>
          {callers.map(({ person, number }) => (
            <div key={person.name} className={styles.row}>
              <Avatar person={person} />
              <span className={styles.rowText}>
                <span className={styles.rowTitle}>{person.name}</span>
                <span className={`${styles.rowSub} tabular`}>{number}</span>
              </span>
              <span className={styles.check}>
                <CheckIcon />
              </span>
            </div>
          ))}
        </div>
        <div className={styles.group}>
          <p className={styles.addRow}>Add a person</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ---------- WhatsApp: Add participant ---------- */

export function AddParticipantPhone({ className, device }: PhoneProps) {
  return (
    <PhoneFrame
      className={className}
      device={device}
      label="A WhatsApp call with the Add participant list open. Clippy is at the top of the contacts, ready to be added to the call."
    >
      <div className={styles.callTop}>
        <p className={styles.caption}>WhatsApp voice call</p>
        <p className={styles.title}>Weekly planning</p>
        <p className={`${styles.caption} tabular`}>03:12</p>
        <div className={styles.callPeople}>
          <Avatar person={ama} size="md" />
          <Avatar person={daniel} size="md" />
          <Avatar person={priya} size="md" />
        </div>
      </div>
      <div className={styles.sheet}>
        <span className={styles.grabber} />
        <p className={styles.sheetTitle}>Add participant</p>
        <p className={styles.search}>Search name or number</p>
        <div className={styles.rows}>
          <div className={`${styles.row} ${styles.rowPicked}`}>
            <Avatar person="clippy" />
            <span className={styles.rowText}>
              <span className={styles.rowTitle}>Clippy</span>
              <span className={styles.rowSub}>Assistant</span>
            </span>
            <span className={styles.addPill}>Add</span>
          </div>
          <div className={styles.row}>
            <Avatar person={sam} />
            <span className={styles.rowText}>
              <span className={styles.rowTitle}>Sam</span>
              <span className={styles.rowSub}>Available</span>
            </span>
          </div>
          <div className={styles.row}>
            <Avatar person={yaw} />
            <span className={styles.rowText}>
              <span className={styles.rowTitle}>{yaw.name}</span>
              <span className={styles.rowSub}>At work</span>
            </span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
