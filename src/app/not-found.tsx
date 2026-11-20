import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Pose } from "@/components/brand/Pose";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`container-wide ${styles.wrap}`}>
      <Pose pose="curious" height={260} priority className={styles.pose} alt="" />
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>This page doesn’t exist.</h1>
      <p className={styles.lead}>It may have moved, or the link may be mistyped.</p>
      <div className={styles.actions}>
        <Button href="/" size="lg">
          Go to the home page
        </Button>
        <Button href="/faq" variant="plain">
          Read the FAQ
        </Button>
      </div>
    </section>
  );
}
