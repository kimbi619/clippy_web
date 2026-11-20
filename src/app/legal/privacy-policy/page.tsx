/*
 * TEMPLATE — this privacy policy was drafted to match how Clippy works today
 * and must be reviewed by a qualified lawyer before launch. In particular,
 * confirm: the legal entity name and registered address, the controller /
 * EU-UK representative details, the named AI and hosting providers and where
 * they process data, concrete retention periods, and the transfer mechanisms
 * used. Keep the page itself free of visible disclaimers.
 */
import Link from "next/link";

import { LegalDocument, type LegalSection } from "@/components/trust/LegalDocument";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "The Clippy privacy policy: what data we collect from calls, voice notes and messages, how AI providers process it, how long we keep it and your rights.",
  path: "/legal/privacy-policy",
});

const email = site.contactEmail;
const Mail = () => <a href={`mailto:${email}`}>{email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          Clippy is an AI assistant that works inside WhatsApp. It is provided by {site.owner} (“we”, “us” or
          “our”). We are the controller of the personal information described in this policy, except
          where we say otherwise.
        </p>
        <p>
          This policy applies to the Clippy apps, the Clippy WhatsApp number, and this website (together, the
          “Service”). You can reach us about privacy at any time at <Mail />.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Account details</strong>, such as your WhatsApp phone number and the name you use in the app.
          </li>
          <li>
            <strong>Allowed callers</strong>, the phone numbers you allow to bring Clippy into a call.
          </li>
          <li>
            <strong>Messages and voice notes</strong> you send to Clippy on WhatsApp.
          </li>
          <li>
            <strong>Support requests</strong> and anything else you send us by email.
          </li>
        </ul>

        <h3>Information from calls</h3>
        <ul>
          <li>
            <strong>Call audio.</strong> When Clippy is added to a call, it receives the call audio and processes it to
            produce a transcript.
          </li>
          <li>
            <strong>Transcripts and summaries</strong>, including speaker labels, the time and length of the call, and
            the answers Clippy gives when someone addresses it.
          </li>
          <li>
            <strong>Call details</strong>, such as the phone numbers of participants and whether the call was a group or
            one-to-one call.
          </li>
        </ul>

        <h3>Linked WhatsApp account (optional)</h3>
        <p>
          If you choose to link your own WhatsApp account to Clippy as a linked device, we process the chats you choose
          to show in the app and the replies you send from the app. You can unlink at any time in WhatsApp under Linked
          devices.
        </p>

        <h3>Information on your device</h3>
        <p>
          If you grant permission, the Clippy app reads your calendar events and recent screenshots on your device to
          show your Today view. You can withdraw these permissions at any time in your phone’s settings.
        </p>

        <h3>Technical information</h3>
        <p>
          We collect limited technical information needed to run and secure the Service, such as app version, device
          type, operating system version, IP address, and error and diagnostic logs.
        </p>
      </>
    ),
  },
  {
    id: "other-people",
    title: "Information about other people",
    content: (
      <>
        <p>
          Calls involve other people. When Clippy is on a call, it processes the voices and words of everyone on that
          call, not only the person who invited it. To make this clear, Clippy announces itself when it joins, and only
          people on your Allowed callers list can bring it in.
        </p>
        <p>
          If you bring Clippy into a call, you are responsible for making sure the other participants are aware of it
          and, where the law requires, that they agree to the call being transcribed. Recording and consent laws differ
          between countries and regions.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use information",
    content: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>transcribe calls live, label speakers, and produce a more accurate transcript after the call;</li>
          <li>write call summaries and answer questions when Clippy is addressed by name;</li>
          <li>turn voice notes into text and reply to messages you send to Clippy;</li>
          <li>show your calls, chats, voice notes and Today view in the app;</li>
          <li>check that a caller is on your Allowed callers list before Clippy joins;</li>
          <li>keep the Service secure, prevent abuse, and fix problems;</li>
          <li>respond to your requests and send you important notices about the Service;</li>
          <li>comply with our legal obligations.</li>
        </ul>
        <p>
          We do not use your calls, transcripts, voice notes or messages to show you ads, and we do not sell your
          personal information.
        </p>
      </>
    ),
  },
  {
    id: "ai-providers",
    title: "AI and service providers",
    content: (
      <>
        <p>
          Clippy relies on artificial intelligence to do its job. Speech-to-text runs on servers operated for Clippy.
          To generate answers and summaries, the relevant text is sent to a third-party AI provider, which processes it
          on our behalf and returns the result.
        </p>
        <p>
          We also use providers for hosting, storage, and email. These providers act as our processors: they may only
          use personal information to provide their services to us, under contracts that require them to protect it.
        </p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases",
    content: (
      <>
        <p>
          If you are in the European Economic Area, the United Kingdom or Switzerland, we rely on the following legal
          bases:
        </p>
        <ul>
          <li>
            <strong>Contract</strong>, to provide the Service you asked for, such as transcribing a call you brought
            Clippy into.
          </li>
          <li>
            <strong>Legitimate interests</strong>, to keep the Service secure, prevent abuse, and improve how it
            works, where those interests are not overridden by your rights.
          </li>
          <li>
            <strong>Consent</strong>, for optional features such as device permissions and linking your WhatsApp
            account. You can withdraw consent at any time.
          </li>
          <li>
            <strong>Legal obligation</strong>, where we must keep or disclose information by law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    content: (
      <>
        <p>We share personal information only:</p>
        <ul>
          <li>with the service providers described above, to run the Service;</li>
          <li>
            with the people you choose, for example when Clippy answers out loud on a call that others are part of;
          </li>
          <li>
            when required by law, or to protect the rights, safety or property of our users, the public or us;
          </li>
          <li>
            as part of a merger, acquisition or sale of assets, in which case this policy continues to apply to your
            information.
          </li>
        </ul>
        <p>We do not sell personal information and do not share it for cross-context behavioural advertising.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    content: (
      <>
        <p>
          We keep transcripts, summaries, voice-note text and messages in your account for as long as your account is
          active, so you can read them in the app, or until you delete them.
        </p>
        <p>
          Call audio is processed to produce transcripts and is not kept longer than needed for that purpose and to
          make the more accurate transcript after the call. Technical logs are kept for a limited period for security
          and troubleshooting. When you delete your account, we delete or anonymise your personal information, unless
          we must keep some of it to meet a legal obligation.
        </p>
      </>
    ),
  },
  {
    id: "deletion",
    title: "Deleting your data",
    content: (
      <>
        <p>
          You can delete any call in the app, which removes its transcript and summary from your account. To delete
          your whole account and its data, email us at <Mail /> and include the WhatsApp number linked to your
          account.
        </p>
        <p>
          Deleted data may remain in encrypted backups for a short period before it is overwritten. It is not used
          during that time.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>access the personal information we hold about you and get a copy of it;</li>
          <li>correct information that is inaccurate;</li>
          <li>delete your information;</li>
          <li>object to or restrict certain processing;</li>
          <li>receive your information in a portable format;</li>
          <li>withdraw consent at any time, without affecting earlier processing;</li>
          <li>lodge a complaint with your local data protection authority.</li>
        </ul>
        <h3>California and other US states</h3>
        <p>
          If you live in California or another US state with a consumer privacy law, you have the right to know what
          personal information we collect, use and disclose, to request its deletion or correction, and to opt out of
          its sale or sharing. We do not sell or share personal information as those terms are defined in these laws.
          We will not discriminate against you for exercising your rights.
        </p>
        <p>
          To exercise any right, email <Mail />. We may need to verify your identity before acting on a request, and we
          will respond within the time the law requires. You may use an authorised agent where the law allows.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    content: (
      <p>
        We and our providers may process personal information in countries other than the one you live in, which may
        have different data protection laws. When we transfer personal information out of the European Economic Area,
        the United Kingdom or Switzerland, we use appropriate safeguards such as the European Commission’s Standard
        Contractual Clauses or an adequacy decision.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We use technical and organisational measures to protect personal information, including encryption in transit,
        access controls, and limiting access to the people and systems that need it. No method of transmission or
        storage is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        The Service is not directed to children. You must be at least 13 years old to use Clippy, or at least 16 in the
        European Economic Area, the United Kingdom or any other place where a higher age is required to consent to the
        processing of personal information. If you believe a child has given us personal information, contact us and we
        will delete it.
      </p>
    ),
  },
  {
    id: "whatsapp",
    title: "WhatsApp and other services",
    content: (
      <p>
        Clippy is independent and is not affiliated with, endorsed by or sponsored by WhatsApp or Meta. Clippy uses an
        unofficial connection to WhatsApp. Your use of WhatsApp itself is governed by WhatsApp’s own terms and privacy
        policy, and WhatsApp processes your calls and messages under those terms.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy as Clippy changes. We will change the “Last updated” date at the top, and if a change
        is significant we will tell you in the app or by message before it takes effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        If you have questions about this policy or how we handle your information, email {site.owner} at <Mail /> or
        visit our <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy policy"
      updated="November 19, 2026"
      intro={
        <>
          <p>
            This policy explains what personal information Clippy collects, how we use it, who we share it with, and
            the choices and rights you have. For a shorter overview, see{" "}
            <Link href="/privacy">how Clippy treats your data</Link>.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
