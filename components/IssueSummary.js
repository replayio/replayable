import styles from "../styles/Home.module.css";

export default function IssueSummary({ issues }) {
  return (
    <div className={styles.row}>
      <span style={{ fontWeight: "bold" }}>{issues.length} open issues</span>
    </div>
  );
}
