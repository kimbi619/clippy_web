/**
 * Clippy's plans — the single source for the pricing page, its comparison
 * table, its structured data and its FAQ.
 *
 * How the numbers were set (2026-11-20, from vendor list prices):
 *   - A typical paying user costs us about $1.70 a month (AI tokens, live
 *     speech-to-text, Clippy's voice, server share). Monthly allowances keep
 *     even a user at the limit profitable after the store's ~15% cut:
 *     Plus at cap ≈ $5–6 of cost on $8.50 net, Pro at cap ≈ $14–15 on $17 net.
 *   - A call minute costs ~20× an AI message (speech-to-text per speaker,
 *     voice, a model request every few seconds), so minutes are the scarce unit.
 *   - Free stays under ~$0.20 a user: cheaper models, slower live answers,
 *     standard voice and small allowances.
 *   - Prices are USD; the stores show a lower local price in some countries.
 */

export type PlanId = "free" | "plus" | "pro";

export type Plan = {
  id: PlanId;
  name: string;
  /** One line under the plan name. */
  pitch: string;
  /** Price per month, billed monthly, in `currency`; 0 = free. */
  monthly: number;
  /** Price per month when billed yearly; null = no yearly option. */
  yearlyMonthly: number | null;
  /** Lead-in shown above the highlights. */
  includesLabel: string;
  /** The few lines that sell the plan; the full breakdown is `comparison`. */
  highlights: string[];
  /** Plan the page highlights. */
  featured?: boolean;
  /** Short tag next to the name. */
  badge?: string;
};

export const currency = "USD";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    pitch: "Try Clippy in your chats and a few calls.",
    monthly: 0,
    yearlyMonthly: null,
    includesLabel: "Includes",
    highlights: [
      "10 call minutes with Clippy a month",
      "100 messages with Clippy",
      "20 voice notes turned into text",
      "Live transcripts with who said what",
      "Summaries of 3 busy groups",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    pitch: "For people who live on WhatsApp.",
    monthly: 9.99,
    yearlyMonthly: 6.99,
    includesLabel: "Everything in Free, plus",
    highlights: [
      "150 call minutes a month",
      "1,500 messages with Clippy",
      "Unlimited voice notes to text",
      "Long-term memory: Clippy remembers what you tell it",
      "Fast spoken answers in a natural voice",
    ],
    featured: true,
    badge: "Most popular",
  },
  {
    id: "pro",
    name: "Pro",
    pitch: "For when your phone is where the work happens.",
    monthly: 19.99,
    yearlyMonthly: 14.99,
    includesLabel: "Everything in Plus, plus",
    highlights: [
      "400 call minutes a month",
      "2,000 messages with Clippy’s most capable AI",
      "Group calls with up to 10 people",
      "Ask Clippy about anything across your chats, calls and screenshots",
      "Answers through Siri and Gemini, and priority when it’s busy",
    ],
  },
];

/** Teams and larger companies, shown as one line under the plans. */
export const teams = {
  name: "Teams",
  perPersonMonthly: 18,
  perPersonYearlyMonthly: 14,
  minSeats: 3,
  maxSeats: 20,
  pitch: "Everything in Pro for each person, shared memory across the team and one bill.",
};

/** A cell in the comparison table: text, or included / not included. */
export type Cell = string | boolean;

export type ComparisonGroup = {
  title: string;
  rows: { label: string; note?: string; values: [Cell, Cell, Cell] }[];
};

/** The full breakdown, one value per plan in `plans` order (Free, Plus, Pro). */
export const comparison: ComparisonGroup[] = [
  {
    title: "Calls",
    rows: [
      {
        label: "Clippy in your WhatsApp calls",
        note: "Minutes a month. A minute counts once, however many people are on the call.",
        values: ["10 min", "150 min", "400 min"],
      },
      { label: "Live transcript with who said what", values: [true, true, true] },
      { label: "Summary and action items after the call", values: [true, true, true] },
      { label: "Clippy answers out loud", values: ["Standard voice", "Natural voice, fast", "Natural voice, fast"] },
      { label: "Group calls", values: ["Up to 3 people", "Up to 5 people", "Up to 10 people"] },
      { label: "Extra minutes", values: [false, "100 min for $4.99", "100 min for $4.99"] },
    ],
  },
  {
    title: "Chats and voice notes",
    rows: [
      {
        label: "Messages with Clippy",
        note: "A month, by text or voice note.",
        values: ["100", "1,500", "2,000"],
      },
      { label: "Voice notes turned into text", values: ["20 a month", "Unlimited", "Unlimited"] },
      { label: "Summaries of busy groups", values: ["3 groups", "20 groups", "Every chat you choose"] },
      { label: "Suggested replies", values: [true, true, true] },
      { label: "Deadlines and reminders from your chats", values: [true, true, true] },
    ],
  },
  {
    title: "Clippy’s AI",
    rows: [
      { label: "AI model", values: ["Everyday AI", "Everyday AI", "Most capable AI"] },
      {
        label: "Remembers you",
        note: "People, dates and plans you mention, across chats, voice notes and calls.",
        values: ["Last 7 days", "Long-term", "Long-term"],
      },
      { label: "Ask about anything across your chats, calls and screenshots", values: [false, false, true] },
      { label: "Answers through Siri and Gemini", values: [false, false, true] },
      { label: "Priority when it’s busy", values: [false, false, true] },
    ],
  },
];

/** What every plan gets, said once instead of repeated per plan. */
export const allPlans = [
  "On iPhone and Android",
  "You choose which chats Clippy reads",
  "Calendar and screenshots stay opt-in",
  "Delete calls and transcripts any time",
  "No ads, and your data is never sold",
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export const pricingFaqs = [
  {
    q: "Is there a free plan?",
    a: "Yes. Clippy Free includes 10 call minutes, 100 messages and 20 voice notes every month, with live transcripts and group summaries, and no time limit.",
  },
  {
    q: "What counts as a call minute?",
    a: "Every minute Clippy is in one of your WhatsApp calls. It counts once, whether two people are talking or ten. Minutes reset every month; if you run out, Plus and Pro can add 100 minutes for $4.99.",
  },
  {
    q: "Why is the price different in my country?",
    a: "The App Store and Google Play show your local price, and in many countries Plus and Pro cost less than the US prices shown here.",
  },
  {
    q: "How do I pay?",
    a: "You upgrade inside the Clippy app, and payment goes through the App Store on iPhone or Google Play on Android. Paying yearly costs about 30% less than paying monthly.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Cancel from your App Store or Google Play subscriptions. Your plan stays active until the end of the period you paid for, then your account moves to Free. Nothing Clippy remembers is deleted unless you delete it.",
  },
  {
    q: "Do the people on my calls need to pay?",
    a: "No. Only the person who brings Clippy in needs a plan. Everyone else just sees one more participant in the WhatsApp call.",
  },
  {
    q: "Is there a plan for teams?",
    a: "Yes. Clippy Teams is $18 per person a month, or $14 billed yearly, for 3 to 20 people. For more than 20, talk to us about volume pricing.",
  },
];
