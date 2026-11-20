/**
 * FAQ content. Answers are plain strings on purpose: the same text is rendered
 * on the page and in the FAQPage JSON-LD, and Google requires the two to match.
 */
export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        q: "What is Clippy?",
        a: "Clippy is an AI assistant that lives in WhatsApp with its own WhatsApp number. Add it to a call and it writes down who said what, summarises the call afterwards and answers when you ask it something by name.",
      },
      {
        q: "How do I add Clippy to a call?",
        a: "Set up Clippy in the app and add the people you trust to your Allowed callers list. Then add Clippy’s WhatsApp number to a group or one-to-one WhatsApp call, the same way you would add a person.",
      },
      {
        q: "Is Clippy free?",
        a: "Yes. Clippy is free during early access.",
      },
    ],
  },
  {
    id: "calls",
    title: "Calls",
    items: [
      {
        q: "Does everyone on the call know Clippy is there?",
        a: "Yes. Clippy announces itself as soon as it joins, so everyone on the call knows it is listening.",
      },
      {
        q: "Who can bring Clippy into a call?",
        a: "Only people on your Allowed callers list. If someone else tries to add Clippy to a call, it will not join.",
      },
      {
        q: "What does Clippy do during a call?",
        a: "It transcribes the call live with a label for each speaker. When the call ends, it makes a second, more accurate pass over the recording and writes a summary you can read in the app.",
      },
      {
        q: "Will Clippy talk during my call?",
        a: "Only when you address it by name. Say “Clippy” and ask your question, and it answers out loud. Otherwise it stays quiet and listens.",
      },
      {
        q: "Which languages does Clippy understand?",
        a: "Clippy transcribes many languages. It works best with clear audio, so a quiet room and one person speaking at a time give the most accurate transcript.",
      },
    ],
  },
  {
    id: "voice-notes-and-messages",
    title: "Voice notes and messages",
    items: [
      {
        q: "Can I send Clippy voice notes?",
        a: "Yes. Send a voice note to Clippy on WhatsApp and it turns it into text you can skim in the app.",
      },
      {
        q: "Can I message Clippy?",
        a: "Yes. Send Clippy a text message on WhatsApp and it replies like an assistant would.",
      },
      {
        q: "Do I have to link my own WhatsApp account?",
        a: "No, it is optional. Linking your account as a linked device lets you see the chats you choose in the Clippy app and reply from there. You can unlink anytime in WhatsApp under Linked devices.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    items: [
      {
        q: "What happens to my call transcripts?",
        a: "Transcripts, summaries, voice-note text and messages are stored in your account so you can read them in the app. Clippy turns speech into text on its own servers and uses a third-party AI provider to write answers and summaries. Clippy does not sell your data or show ads.",
      },
      {
        q: "Can I delete a call?",
        a: "Yes. You can delete any call in the app, and its transcript and summary are removed from your account.",
      },
      {
        q: "Is Clippy made by WhatsApp?",
        a: "No. Clippy is independent and is not affiliated with WhatsApp or Meta. It uses an unofficial connection to WhatsApp, which WhatsApp could change or limit.",
      },
    ],
  },
  {
    id: "availability",
    title: "Availability",
    items: [
      {
        q: "Is Clippy on iPhone and Android?",
        a: "Yes. Download Clippy from the App Store on iPhone or from Google Play on Android.",
      },
      {
        q: "Is there a desktop app?",
        a: "No. Clippy works inside WhatsApp and through the app on your iPhone or Android phone. There is no desktop app.",
      },
    ],
  },
];
