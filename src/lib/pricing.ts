/**
 * Clippy's plans — the single source for the pricing page, its structured data
 * and its FAQ.
 *
 * TODO(pricing): fill in the real prices. Set `monthly` (and `yearly` if you
 * offer it) as numbers in `currency`. While a price is `null`, the page shows
 * "Price announced soon" in its place and the plan is left out of the
 * structured data, so nothing wrong reaches Google.
 *
 * TODO(pricing): confirm which features sit in which plan. The split below is a
 * sensible starting point, not a product decision.
 */

export type Plan = {
  id: "free" | "pro";
  name: string;
  /** One line under the plan name. */
  pitch: string;
  /** Price per month in `currency`; 0 = free; null = not announced yet. */
  monthly: number | null;
  /** Price per year (billed yearly); null = no yearly option or not announced. */
  yearly: number | null;
  /** Lead-in shown above the feature list. */
  includesLabel: string;
  features: string[];
  /** Plan the page highlights. */
  featured?: boolean;
};

export const currency = "USD";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    pitch: "Everything you need to keep up with your chats.",
    monthly: 0,
    yearly: null,
    includesLabel: "Includes",
    features: [
      "Summaries of busy groups",
      "Suggested replies",
      "Deadlines and reminders from your chats",
      "Voice notes turned into text",
      "Live transcripts of WhatsApp calls",
      "Screenshot notes and your calendar on Today",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    pitch: "For when your phone is where the work happens.",
    monthly: null,
    yearly: null,
    includesLabel: "Everything in Free, plus",
    features: [
      "Clippy’s most capable AI for answers, replies and summaries",
      "More calls, longer calls and more voice notes each month",
      "Answers through Siri and Gemini",
      "Ask Clippy about anything across your chats, calls and screenshots",
      "Priority processing when it’s busy",
    ],
    featured: true,
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
    a: "Yes. Clippy Free includes group summaries, suggested replies, deadlines, voice notes to text and call transcripts, with no time limit.",
  },
  {
    q: "How do I pay for Pro?",
    a: "You upgrade inside the Clippy app, and payment goes through the App Store on iPhone or Google Play on Android, using the account you already have there.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Cancel from your App Store or Google Play subscriptions. Pro stays active until the end of the period you paid for, then your account moves to Free.",
  },
  {
    q: "Do the people on my calls need to pay?",
    a: "No. Only you need Clippy. Everyone else just sees one more participant in the WhatsApp call.",
  },
  {
    q: "Is there a plan for teams?",
    a: "Not yet. If your team wants to use Clippy together, email us and tell us what you need.",
  },
];
