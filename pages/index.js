import { useState } from "react";
import useSWR from "swr";

import styles from "../styles/Home.module.css";
import IssueRow from "../components/IssueRow";
import IssueSummary from "../components/IssueSummary";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function filtersToQuery(filters) {
  return Object.keys(filters)
    .map((key) => key + "=" + encodeURIComponent(filters[key]))
    .join("&");
}

export default function Home() {
  const [filters, setFilters] = useState({
    labels: ["has-replay 🚀"],
    owner: "RecordReplay",
    repo: "devtools",
    state: "CLOSED",
  });
  const { data: issues, error } = useSWR(
    `/api/issues?${filtersToQuery(filters)}`,
    fetcher
  );

  const toggleLabel = (label) => {
    const labels = filters.labels.includes(label)
      ? filters.labels.filter((l) => l !== label)
      : [...filters.labels, label];

    setFilters({ ...filters, labels });
  };

  const toggleIssueState = (view) => {
    const state = filters.state === view ? filters.state : view;
    setFilters({ ...filters, state });
  };

  if (error) return <div>failed to load</div>;
  if (!issues) return <div></div>;

  return (
    <div className={styles.container}>
      <IssueSummary
        issues={issues}
        state={filters.state}
        toggleIssueState={toggleIssueState}
      />
      {issues.map((issue) => (
        <IssueRow
          key={issue.node.number}
          toggleLabel={toggleLabel}
          issue={issue.node}
        />
      ))}
    </div>
  );
}
