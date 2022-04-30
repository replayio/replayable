import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import IssueRow from "../components/IssueRow";
import IssueSummary from "../components/IssueSummary";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function filtersToQuery(filters) {
  return Object.keys(filters)
    .map((key) => key + "=" + encodeURIComponent(filters[key]))
    .join("&");
}

function useGithubSearch(filters) {
  const { data: resp, error } = useSWR(
    `/api/issues?${filtersToQuery(filters)}`,
    fetcher
  );

  // Filter issues that do not match all of the labels
  const issues = resp?.filter(
    (issue) =>
      filters.labels.filter((label) =>
        issue.node.labels.edges?.map((label) => label.node.name).includes(label)
      ).length == filters.labels.length
  );

  return { issues, error };
}

export default function Home() {
  const { query } = useRouter();
  const [filters, setFilters] = useState({
    labels: ["has-replay 🚀"],
    org: "RecordReplay",
    repo: "devtools",
    state: "CLOSED",
  });

  const { issues, error } = useGithubSearch(filters);

  useEffect(() => {
    setFilters((filters) => ({
      ...filters,
      repo: query.repo || filters.repo,
      org: query.org || filters.org,
    }));
  }, [query]);

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
        filters={filters}
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
