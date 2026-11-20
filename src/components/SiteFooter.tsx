import Image from "next/image";
import Link from "next/link";

import { DownloadButtons } from "@/components/DownloadButtons";
import { footerNav, site } from "@/lib/site";

import styles from "./SiteFooter.module.css";

/**
 * Deep Clippy green: a closing line and the store badges, the links, then the
 * name set huge across the page with the app icon — the brand's sign-off.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container-wide">
        <div className={styles.top}>
          <div className={styles.pitch}>
            <p className={styles.line}>
              Everything that matters in your chats. <span>First.</span>
            </p>
            <DownloadButtons />
          </div>
          <div className={styles.nav}>
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
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          clippy
          <Image src="/brand/clippy-icon.png" alt="" width={240} height={240} className={styles.icon} />
        </p>

        <div className={styles.legal}>
          <p>Copyright © {site.copyrightYear} Clippy. All rights reserved.</p>
          <p>
            WhatsApp is a trademark of WhatsApp LLC. Clippy is an independent product and is not affiliated with,
            endorsed by or sponsored by WhatsApp or Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}
