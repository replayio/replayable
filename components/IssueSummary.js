import styles from "../styles/Home.module.css";

export default function IssueSummary({ issues }) {
  return (
    <div className={styles.tableHeader}>
      <span className={styles.headerLabel}>{issues.length} Open</span>
    </div>
  );
}
