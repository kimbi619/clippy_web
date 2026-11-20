/*
 * TEMPLATE — these terms were drafted to match how Clippy works today and must
 * be reviewed by a qualified lawyer before launch. In particular, confirm: the
 * legal entity name, registered address and governing law / courts (section
 * "Governing law" is deliberately generic), the liability cap, consumer-law
 * carve-outs for each market, and the wording about the unofficial WhatsApp
 * connection. Keep the page itself free of visible disclaimers.
 */
import Link from "next/link";

import { LegalDocument, type LegalSection } from "@/components/trust/LegalDocument";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of use",
  description:
    "The terms for using Clippy: who can use it, your responsibilities when bringing it into calls, AI output, the unofficial WhatsApp connection and liability.",
  path: "/legal/terms",
});

const email = site.contactEmail;
const Mail = () => <a href={`mailto:${email}`}>{email}</a>;

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    content: (
      <>
        <p>
          These terms are an agreement between you and {site.owner} (“we”, “us” or “our”) about your use of Clippy,
          including the Clippy apps, the Clippy WhatsApp number and this website (together, the “Service”).
        </p>
        <p>
          By using the Service, you agree to these terms and to our <Link href="/legal/privacy-policy">privacy
          policy</Link>. If you do not agree, do not use the Service.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Who can use Clippy",
    content: (
      <p>
        You must be at least 13 years old to use Clippy, or at least 16 in the European Economic Area, the United
        Kingdom or any other place where a higher age applies. You must also be able to form a binding contract and be
        allowed to use the Service under the laws that apply to you. If you use Clippy on behalf of an organisation,
        you confirm you are authorised to accept these terms for it.
      </p>
    ),
  },
  {
    id: "the-service",
    title: "The Service",
    content: (
      <>
        <p>
          Clippy is an AI assistant with its own WhatsApp number. It can join WhatsApp calls it is invited to,
          transcribe them, write summaries, answer when addressed by name, turn voice notes into text, and reply to
          messages. The Clippy app for iPhone and Android lets you read and manage this content, and optionally view and reply to chats from
          your own linked WhatsApp account.
        </p>
        <p>
          Clippy is in early access. Features may change, be added or be removed, and the Service may sometimes be
          unavailable. We will try to tell you in advance about changes that significantly affect you.
        </p>
      </>
    ),
  },
  {
    id: "account",
    title: "Your account and Allowed callers",
    content: (
      <>
        <p>
          You are responsible for your account and for the phone numbers you add to your Allowed callers list. Only
          people on that list can bring Clippy into a call, and what happens on those calls is processed under your
          account.
        </p>
        <p>
          Keep your phone and WhatsApp account secure. Tell us promptly at <Mail /> if you believe someone has used your
          account without permission.
        </p>
      </>
    ),
  },
  {
    id: "consent",
    title: "Calls and consent",
    content: (
      <>
        <p>
          Clippy announces itself when it joins a call so that everyone knows it is listening. You are still
          responsible for using Clippy lawfully. Before you bring Clippy into a call, you must make sure that the other
          participants are aware of it and, where the law requires, that they consent to the call being transcribed.
        </p>
        <p>
          Laws on recording and transcribing conversations differ between countries and regions, and some require the
          consent of everyone on the call. If you are unsure, ask everyone first.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>record, transcribe or monitor anyone without the notice or consent the law requires;</li>
          <li>harass, threaten, defraud or harm anyone, or violate their privacy or other rights;</li>
          <li>break any law, or help anyone else do so;</li>
          <li>send spam or bulk messages, or impersonate another person;</li>
          <li>
            interfere with, overload, reverse engineer or try to gain unauthorised access to the Service or its systems,
            except where the law expressly allows it;
          </li>
          <li>get advice that you rely on for emergencies or for decisions about health, law, finance or safety.</li>
        </ul>
        <p>We may limit or suspend access if we reasonably believe you are breaking these rules.</p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content",
    content: (
      <>
        <p>
          Your content means the calls, voice notes, messages and other material processed through your account, and
          the transcripts, summaries and replies made from them. As between you and us, you keep your rights in your
          content.
        </p>
        <p>
          You give us a limited, worldwide, non-exclusive licence to host, process, transmit and display your content
          only as needed to provide and secure the Service for you, including sending it to the service providers
          described in our privacy policy. This licence ends when your content is deleted, except for copies we must
          keep by law.
        </p>
        <p>You confirm that you have the rights needed to share your content with Clippy.</p>
      </>
    ),
  },
  {
    id: "ai-output",
    title: "AI output",
    content: (
      <p>
        Clippy uses artificial intelligence, including third-party AI providers, to transcribe speech and generate
        answers and summaries. AI output can be incomplete or wrong. Transcripts may mishear words or attribute them to
        the wrong speaker, and answers may contain mistakes. Check anything important before you rely on it, and do not
        treat Clippy’s output as professional advice.
      </p>
    ),
  },
  {
    id: "whatsapp",
    title: "WhatsApp and third-party services",
    content: (
      <>
        <p>
          Clippy is independent and is not affiliated with, endorsed by or sponsored by WhatsApp or Meta. WhatsApp is a
          trademark of its owner.
        </p>
        <p>
          Clippy connects to WhatsApp through an unofficial connection. WhatsApp may change, limit or block this kind of
          connection at any time, which could stop some or all of Clippy from working, and WhatsApp may take action on
          accounts under its own terms. Your use of WhatsApp is governed by WhatsApp’s terms, which you remain
          responsible for following. Linking your own WhatsApp account to Clippy is optional, and you can unlink it at
          any time in WhatsApp under Linked devices.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees",
    content: (
      <p>
        Clippy is free during early access. If we introduce paid plans, we will tell you about the price and what is
        included before you are charged, and you will be able to choose whether to continue.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Our intellectual property",
    content: (
      <p>
        The Service, including its software, design, name, logo and the Clippy character, belongs to {site.owner} and
        its licensors. These terms give you a personal, non-transferable right to use the Service as intended. They do
        not give you any other rights in it.
      </p>
    ),
  },
  {
    id: "feedback",
    title: "Feedback",
    content: (
      <p>
        If you send us ideas or suggestions, we may use them to improve Clippy without any obligation to you.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Ending your use",
    content: (
      <p>
        You can stop using Clippy at any time and ask us to delete your account by emailing <Mail />. We may suspend or
        end your access if you seriously or repeatedly break these terms, if the law requires it, or if we stop
        providing the Service. Where reasonable, we will give you notice and a chance to read your content first.
        Sections that by their nature should continue after termination will continue.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>
        To the fullest extent the law allows, the Service is provided “as is” and “as available”, without warranties of
        any kind, whether express or implied, including warranties of merchantability, fitness for a particular
        purpose, accuracy and non-infringement. We do not promise that the Service will be uninterrupted, error-free,
        or that it will keep working with WhatsApp.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the fullest extent the law allows, {site.owner} will not be liable for any indirect, incidental, special,
          consequential or punitive damages, or for any loss of data, profits, revenue or goodwill, arising from your
          use of the Service. Our total liability for any claim relating to the Service is limited to the greater of
          the amount you paid us for the Service in the twelve months before the claim, or 50 US dollars.
        </p>
        <p>
          Nothing in these terms limits liability that cannot be limited by law, such as liability for death or
          personal injury caused by negligence, or for fraud. If you are a consumer, you keep the rights that consumer
          protection law gives you.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    content: (
      <p>
        If you use the Service in breach of these terms or the law, including by bringing Clippy into a call without
        the consent the law requires, you agree to cover the reasonable losses and costs that {site.owner} incurs as a
        result, to the extent the law allows.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These terms are governed by the laws of the place where {site.owner} is established, without regard to its
        conflict of law rules. If you are a consumer, you may also benefit from the mandatory laws of the country where
        you live and may bring claims in its courts.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms as Clippy changes. We will change the “Last updated” date at the top, and if a change
        is significant we will tell you in the app or by message before it takes effect. If you keep using Clippy after
        a change takes effect, you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        Questions about these terms can be sent to {site.owner} at <Mail />, or through our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of use"
      updated="November 19, 2026"
      intro={
        <p>
          Please read these terms carefully. They explain what you can expect from Clippy, what we expect from you, and
          the responsibilities that come with bringing an AI assistant into conversations with other people.
        </p>
      }
      sections={sections}
    />
  );
}
