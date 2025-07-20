import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome to the Saber Regex Dashboard</h1>
      <p className={styles.intro}>
        This dashboard lets you experiment with regular expressions on sample text. 
        Add, edit, and approve regex patterns, and instantly see what they extract from the document.
      </p>
      <Link href="/dashboard" className={styles.button}>
        Go to Dashboard
      </Link>
    </div>
  );
}