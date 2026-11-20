import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "plain";
type Size = "md" | "lg";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "children">;

/**
 * Apple-style pill button. One `primary` per view at most; `secondary` is a
 * tinted fill; `plain` is a text link with a chevron.
 */
export function Button({ href, children, variant = "primary", size = "md", icon, className, ...rest }: Props) {
  const cls = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");

  return (
    <Link href={href} className={cls} {...rest}>
      {icon}
      <span>{children}</span>
      {variant === "plain" ? (
        <svg className={styles.chevron} viewBox="0 0 8 14" aria-hidden="true">
          <path
            d="M1 1l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </Link>
  );
}
