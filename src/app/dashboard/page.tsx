import Link from "next/link"
import styles from "./modeSelect.module.css"

export default function DashboardDefaultPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Select a mode:</h2>
      <div className={styles.linkGroup}>
        <Link className={styles.link} href="/dashboard/edit">Edit Mode</Link>
        <Link className={styles.link} href="/dashboard/approval">Approval Mode</Link>
      </div>
    </div>
  );
}