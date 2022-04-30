import styles from "../styles/Home.module.css";

export default function IssueSummary({ issues, filters, toggleIssueState }) {
  const { state, labels } = filters;
  return (
    <div className={styles.tableHeader}>
      <div>
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
      <div>
        {labels.map((label) => (
          <span className={styles.headerLabel} key={label}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
