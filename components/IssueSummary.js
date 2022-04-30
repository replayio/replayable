import styles from "../styles/Home.module.css";

export default function IssueSummary({ issues, state, toggleIssueState }) {
  return (
    <div className={styles.tableHeader}>
      <span
        className={styles.headerLabel}
        style={
          state === "OPEN"
            ? { fontWeight: "bold" }
            : { textDecoration: "underline" }
        }
        onClick={() => toggleIssueState("OPEN")}
      >
        {state === "OPEN" ? issues.length : null}{" "}
        {state === "OPEN" ? "Open" : "View Open"}
      </span>
      <span
        className={styles.headerLabel}
        style={
          state === "CLOSED"
            ? { fontWeight: "bold" }
            : { textDecoration: "underline" }
        }
        onClick={() => toggleIssueState("CLOSED")}
      >
        {state === "CLOSED" ? issues.length : null}{" "}
        {state === "OPEN" ? "View Closed" : "Closed"}
      </span>
    </div>
  );
}
