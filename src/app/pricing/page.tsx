import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Closing } from "@/components/product/Closing";
import { pageMetadata } from "@/lib/metadata";
import { allPlans, currency, formatPrice, plans, pricingFaqs, type Plan } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

import styles from "./pricing.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Clippy is free to start on iPhone and Android. See what Free includes, what Pro adds, and how paying and cancelling work.",
  path: "/pricing",
  socialTitle: "Clippy pricing: Free and Pro",
});

/** Only plans with an announced price go into structured data. */
const priced = plans.filter((p) => p.monthly !== null);

const productLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  url: absoluteUrl("/pricing"),
  applicationCategory: "ProductivityApplication",
  operatingSystem: "iOS, Android",
  offers: priced.map((p) => ({
    "@type": "Offer",
    name: `${site.name} ${p.name}`,
    price: String(p.monthly),
    priceCurrency: currency,
    ...(p.monthly
      ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(p.monthly),
            priceCurrency: currency,
            unitCode: "MON",
          },
        }
      : {}),
  })),
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function Price({ plan }: { plan: Plan }) {
  if (plan.monthly === null) {
    return (
      <p className={styles.price}>
        <span className={styles.pending}>Price announced soon</span>
      </p>
    );
  }
  if (plan.monthly === 0) {
    return (
      <p className={styles.price}>
        <span className={styles.amount}>{formatPrice(0)}</span>
        <span className={styles.per}>forever</span>
      </p>
    );
  }
  return (
    <p className={styles.price}>
      <span className={styles.amount}>{formatPrice(plan.monthly)}</span>
      <span className={styles.per}>
        a month
        {plan.yearly !== null ? <> · or {formatPrice(plan.yearly)} a year</> : null}
      </span>
    </p>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHeader
        pose="presenting"
        title="Start free. Upgrade when it’s earning its keep."
        lead="Clippy is free on iPhone and Android. Pro adds more capable AI and more room for the calls and chats that matter."
      />

      {/* The plans: two columns of type, no boxes. Pro is marked with a thin accent rule. */}
      <section className={styles.plans} aria-labelledby="plans-title">
        <h2 id="plans-title" className="visually-hidden">
          Plans
        </h2>
        <div className={`container-wide ${styles.planGrid}`}>
          {plans.map((plan) => (
            <article key={plan.id} className={`${styles.plan} ${plan.featured ? styles.featured : ""}`}>
              <div className={styles.planHead}>
                <h3 className={styles.planName}>
                  {plan.name}
                  {plan.featured ? <span className={styles.badge}>Most capable</span> : null}
                </h3>
                <p className={styles.pitch}>{plan.pitch}</p>
              </div>
              <Price plan={plan} />
              <Button href="/download" variant={plan.featured ? "primary" : "secondary"} size="lg">
                {plan.monthly === 0 ? "Get Clippy free" : `Get ${plan.name} in the app`}
              </Button>
              <div className={styles.features}>
                <p className={styles.includes}>{plan.includesLabel}</p>
                <ul role="list">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path
                          d="M3 8.5l3 3 7-7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className={`container-wide ${styles.every}`}>
          <p className={styles.everyLabel}>Every plan</p>
          <ul role="list" className={styles.everyList}>
            {allPlans.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Billing questions: plain type in two columns, no accordions — there are only a few. */}
      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={`container-wide ${styles.faqGrid}`}>
          <div className={styles.faqHead}>
            <h2 id="faq-title" className={styles.sectionTitle}>
              Questions about paying.
            </h2>
            <Button href="/faq" variant="plain">
              All questions and answers
            </Button>
          </div>
          <dl className={styles.faqList}>
            {pricingFaqs.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Closing
        title="Free to start. Today."
        lead="Download Clippy and upgrade from the app whenever you like."
        links={[
          { href: "/features", label: "See all features" },
          { href: "/privacy", label: "Privacy" },
          { href: "/contact", label: "Talk to us about teams" },
        ]}
      />

      {priced.length > 0 ? <JsonLd data={productLd} /> : null}
      <JsonLd data={faqLd} />
    </>
  );
}
