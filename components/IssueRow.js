import IssueData from "../components/IssueData";
import IssueLinks from "./IssueLinks";
import styles from "../styles/Home.module.css";

export default function IssueRow({ issue }) {
  return (
    <div className={styles.row}>
      <IssueData
        title={issue.title}
        date={issue.createdAt}
        author={issue.author}
        number={issue.number}
        url={issue.url}
        labels={issue.labels.edges}
      />
      <IssueLinks issue={issue} />
    </div>
  );
}
