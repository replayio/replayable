import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import IssueRow from "../components/IssueRow";
import IssueSummary from "../components/IssueSummary";
import { useGithubSearch } from "../hooks/useGithubSearch";
import { GetStaticProps } from "next";
import { fetchFromGitHub } from "../util/fetchFromGitHub";

export default function Home({ buggy, initialIssues }) {
  const { query } = useRouter();
  const [filters, setFilters] = useState({
    labels: [] as string[],
    org: "",
    repo: "",
    state: "OPEN",
  });

  const { issues, error } = useGithubSearch(filters, buggy);

  // Set the filters from the query string
  useEffect(() => {
    setFilters((filters) => ({
      ...filters,
      repo: (query.repo as string) || filters.repo,
      org: (query.org as string) || filters.org,
    }));
  }, [query]);

  const toggleRepo = (repo, org) => {
    setFilters((filters) => ({
      ...filters,
      repo,
      org,
    }));
  };

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

  return (
    <div className={styles.container}>
      <IssueSummary
        issues={initialIssues || issues}
        filters={filters}
        toggleRepo={toggleRepo}
        toggleIssueState={toggleIssueState}
      />
      {(initialIssues || issues).map((issue) => (
        <IssueRow
          key={issue.number}
          toggleLabel={toggleLabel}
          toggleRepo={toggleRepo}
          filters={filters}
          issue={issue}
          buggy={buggy}
        />
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const issues = await fetchFromGitHub();
  return {
    props: {
      initialIssues: issues,
    },
    revalidate: true,
  };
};
