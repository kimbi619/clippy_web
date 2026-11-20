import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Closing } from "@/components/product/Closing";
import { pageMetadata } from "@/lib/metadata";
import {
  allPlans,
  comparison,
  currency,
  formatPrice,
  plans,
  pricingFaqs,
  teams,
  type Cell,
  type Plan,
} from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

import styles from "./pricing.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Clippy is free to start on iPhone and Android. Plus is $9.99 a month and Pro $19.99. Compare call minutes, messages, memory and AI, and see how paying works.",
  path: "/pricing",
  socialTitle: "Clippy pricing: Free, Plus and Pro",
});

const productLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  url: absoluteUrl("/pricing"),
  applicationCategory: "ProductivityApplication",
  operatingSystem: "iOS, Android",
  offers: plans.map((p) => ({
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
  if (plan.monthly === 0) {
    return (
      <div className={styles.price}>
        <p>
          <span className={styles.amount}>{formatPrice(0)}</span>
          <span className={styles.per}>forever</span>
        </p>
        <p className={styles.yearly}>No card needed</p>
      </div>
    );
  }
  return (
    <div className={styles.price}>
      <p>
        <span className={styles.amount}>{formatPrice(plan.monthly)}</span>
        <span className={styles.per}>a month</span>
      </p>
      {plan.yearlyMonthly !== null ? (
        <p className={styles.yearly}>
          or {formatPrice(plan.yearlyMonthly)} a month billed yearly ({formatPrice(plan.yearlyMonthly * 12)})
        </p>
      ) : null}
    </div>
  );
}

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.check}>
          <path
            d="M3 8.5l3 3 7-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="visually-hidden">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className={styles.dash}>
          –
        </span>
        <span className="visually-hidden">Not included</span>
      </>
    );
  }
  return <>{value}</>;
}

export default function PricingPage() {
  return (
    <>
      <PageHeader
        pose="presenting"
        title="Start free. Upgrade when it’s earning its keep."
        lead="Clippy is free on iPhone and Android. Plus gives you room for the calls and chats that matter and a Clippy that remembers. Pro adds the most capable AI."
      />

      {/* The plans: three columns of type, no boxes. The featured plan is marked with a thin accent rule. */}
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
                  {plan.badge ? <span className={styles.badge}>{plan.badge}</span> : null}
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
                  {plan.highlights.map((f) => (
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

        <div className={`container-wide ${styles.teams}`}>
          <p className={styles.teamsName}>{teams.name}</p>
          <p className={styles.teamsText}>
            <strong>
              {formatPrice(teams.perPersonMonthly)} per person a month, or {formatPrice(teams.perPersonYearlyMonthly)}{" "}
              billed yearly.
            </strong>{" "}
            {teams.pitch} For {teams.minSeats} to {teams.maxSeats} people; more than {teams.maxSeats}, ask us about
            volume pricing.
          </p>
          <Button href="/contact" variant="plain">
            Talk to us about teams
          </Button>
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

      {/* Full breakdown: one table, tonal row bands instead of borders. Scrolls sideways on phones. */}
      <section className={styles.compare} aria-labelledby="compare-title">
        <div className="container-wide">
          <h2 id="compare-title" className={styles.sectionTitle}>
            Compare plans.
          </h2>
          <p className={styles.compareLead}>Everything each plan includes, every month.</p>
          <div className={styles.tableScroll} role="region" aria-labelledby="compare-title" tabIndex={0}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Feature</span>
                  </th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col" className={p.featured ? styles.featuredCol : undefined}>
                      <span className={styles.colName}>{p.name}</span>
                      <span className={styles.colPrice}>
                        {p.monthly === 0 ? "$0" : `${formatPrice(p.monthly)} a month`}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {comparison.map((group) => (
                <tbody key={group.title}>
                  <tr className={styles.groupRow}>
                    <th scope="colgroup" colSpan={plans.length + 1}>
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">
                        {row.label}
                        {row.note ? <span className={styles.rowNote}>{row.note}</span> : null}
                      </th>
                      {row.values.map((v, i) => (
                        <td key={plans[i].id} className={plans[i].featured ? styles.featuredCol : undefined}>
                          <CellValue value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
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

      <JsonLd data={productLd} />
      <JsonLd data={faqLd} />
    </>
  );
}
