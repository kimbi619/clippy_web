import type { ReactNode } from "react";

import { Pose, type PoseName } from "./brand/Pose";
import styles from "./PageHeader.module.css";

type Props = {
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  /** Optional Clippy pose standing to the right of the title on wide screens. */
  pose?: PoseName;
};

/** Top-of-page title block for inner pages: big headline, optional lead, optional Clippy. */
export function PageHeader({ title, lead, children, pose }: Props) {
  return (
    <header className={`container-wide ${styles.header} ${pose ? styles.withPose : ""}`}>
      <div className={styles.copy}>
        <h1 className={styles.title}>{title}</h1>
        {lead ? <p className={`lead ${styles.lead}`}>{lead}</p> : null}
        {children}
      </div>
      {pose ? <Pose pose={pose} height={320} priority className={styles.pose} alt="" /> : null}
    </header>
  );
}
