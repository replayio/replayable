import Image from "next/image";
import IssueLinks from "./IssueLinks";
import styles from "../styles/Home.module.css";
import { getLabelFontColor } from "../scripts/utilities";
import BuggyIssueLinks from "./BuggyIssueLinks";

const showLabels = true;

export default function IssueRow({
  issue,
  toggleLabel,
  toggleRepo,
  filters,
  buggy,
}) {
  const title = issue.title;
  const date = issue.createdAt;
  const author = issue.author;
  const number = issue.number;
  const url = issue.url;
  const labels = issue.labels.edges;
  const filteredByRepo = filters.repo;

  const formattedDate = buggy
    ? new Date(date).getDate()
    : new Date(date).toLocaleDateString();

  return (
    <div className={`issue-row ${styles.row}`}>
      {/* Left Side Issue Summary */}
      <div className={styles.issue}>
        {/* Avatar */}
        <div className={styles.avatarContainer}>
          {author?.avatarUrl ? (
            <Image
              className={styles.avatar}
              src={author.avatarUrl}
              alt="Picture of the author"
              layout="fixed"
              height={30}
              width={30}
            />
          ) : (
            <div className={styles.defaultAvatar}></div>
          )}
        </div>

        <div className={styles.data}>
          {/* Title and Labels */}
          <div>
            <a
              className="issue-link"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <span>{title}</span>
            </a>
            {showLabels && (
              <div className={styles.labels}>
                {labels
                  .filter((label) => label.node.name != "has-replay")
                  .slice(0, 2)
                  .map((label) => (
                    <Label
                      key={label.node.name}
                      label={label}
                      toggleLabel={toggleLabel}
                      buggy={buggy}
                    />
                  ))}
              </div>
            )}
          </div>

          {/* Secondary summary row */}
          <div className={styles.muted}>
            {!filteredByRepo && (
              <a
                href="#"
                onClick={() =>
                  toggleRepo(
                    issue.repository?.name,
                    issue.repository?.owner.login
                  )
                }
              >
                {issue.repository?.owner.login}/{issue.repository?.name}{" "}
              </a>
            )}
            <a href={issue.url} target="_blank" rel="noreferrer">
              Issue #{number}{" "}
            </a>
            {filteredByRepo && <span>Created on {formattedDate} </span>}
            {author?.name ? (
              <span>
                by{" "}
                <a href={author.url} target="_blank" rel="noreferrer">
                  {author.name}
                </a>
              </span>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      {buggy ? <BuggyIssueLinks issue={issue} /> : <IssueLinks issue={issue} />}
    </div>
  );
}

function Label({ label, toggleLabel, buggy }) {
  const fontColor = buggy
    ? getLabelFontColor(label)
    : getLabelFontColor(label.node.color);

  return (
    <span
      className={`issue-label ${styles.label}`}
      onClick={() => toggleLabel(label.node.name)}
      style={{
        backgroundColor: "#" + label.node.color,
        color: fontColor,
      }}
    >
      {label.node.name}
    </span>
  );
}
