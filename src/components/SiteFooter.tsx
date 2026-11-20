import Link from "next/link";

import { footerNav, site } from "@/lib/site";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container-wide">
        <div className={styles.grid}>
          <div className={styles.about}>
            <p className={styles.brand}>Clippy</p>
            <p className={styles.blurb}>{site.tagline} On the App Store and Google Play.</p>
          </div>
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className={styles.group}>
              <h2 className={styles.groupTitle}>{group.title}</h2>
              <ul role="list">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.legal}>
          <p>
            Copyright © {site.copyrightYear} Clippy. All rights reserved.
          </p>
          <p>
            WhatsApp is a trademark of WhatsApp LLC. Clippy is an independent product and is not affiliated with,
            endorsed by or sponsored by WhatsApp or Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}
