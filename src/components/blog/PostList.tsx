import Link from "next/link";

import { formatDate, type PostMeta } from "@/lib/blog";

import styles from "./PostList.module.css";

type Props = {
  posts: PostMeta[];
  /** Heading level for each title, so the page outline stays correct. */
  as?: "h2" | "h3";
};

/**
 * Posts as a table of contents: date in a narrow left column, title and a
 * one-line description on the right. No cards; rows are grouped by space with
 * a hairline between them. The title is the link and covers the whole row.
 */
export function PostList({ posts, as: Heading = "h3" }: Props) {
  return (
    <ul role="list" className={styles.list}>
      {posts.map((post) => (
        <li key={post.slug} className={styles.row}>
          <p className={styles.date}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <div className={styles.text}>
            <Heading className={styles.title}>
              <Link href={`/blog/${post.slug}`} className={styles.link}>
                {post.title}
              </Link>
            </Heading>
            <p className={styles.description}>{post.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
