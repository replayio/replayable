import styles from "../styles/Issues.module.css";

export default function IssueSummary({ issues }) {
    return (
      <div className={styles.row}>
        <span style={{ fontWeight: "bold" }}>{issues.length} open issues</span>
      </div>
    );
  }