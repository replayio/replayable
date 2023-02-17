import styles from "../styles/Home.module.css";

function State({ active, count, label, onSelect }) {
  return (
    <span
      className={`view-${label} ${styles.headerLabel}`}
      onClick={() => onSelect()}
      style={
        active
          ? { fontWeight: "bold" }
          : { textDecoration: "underline", cursor: "pointer" }
      }
    >
      {active ? `${count} ${label}` : `View ${label}`}
    </span>
  );
}

export default function IssueSummary({
  issues,
  filters,
  toggleRepo,
  toggleIssueState,
}) {
  const { state, labels } = filters;

  return (
    <>
      {filters.repo && (
        <h2>
          <a href="#" onClick={() => toggleRepo("", "")} className={`filter-repo`}>
            {filters.org}/{filters.repo}
          </a>
        </h2>
      )}
      <div className={styles.tableHeader}>
        <div>
          <State
            active={state == "OPEN"}
            label="Open"
            onSelect={() => toggleIssueState("OPEN")}
            count={issues.length}
          />
          <State
            active={state == "CLOSED"}
            label="Closed"
            onSelect={() => toggleIssueState("CLOSED")}
            count={issues.length}
          />
        </div>
        <div>
          {labels.map((label) => (
            <span className={`filter-label ${styles.headerLabel}`} key={label}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
