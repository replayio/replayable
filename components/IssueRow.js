import Image from "next/image";
import IssueLinks from "./IssueLinks";
import styles from "../styles/Home.module.css";
import { getLabelFontColor } from "../scripts/utilities";

export default function IssueRow({ issue, toggleLabel }) {
  const title = issue.title;
  const date = issue.createdAt;
  const author = issue.author;
  const number = issue.number;
  const url = issue.url;
  const labels = issue.labels.edges;
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className={styles.row}>
      {/* Left Side Issue Summary */}
      <div className={styles.issue}>
        {/* Avatar */}
        <div className={styles.avatarContainer}>
          {author.avatarUrl && (
            <Image
              className={styles.avatar}
              src={author.avatarUrl}
              alt="Picture of the author"
              layout="fixed"
              height={30}
              width={30}
            />
          )}
        </div>

        <div className={styles.data}>
          {/* Title and Labels */}
          <div>
            <a href={url} target="_blank" rel="noreferrer">
              <span>{title}</span>
            </a>
            <div className={styles.labels}>
              {labels
                .filter((label) => label.node.name != "has-replay 🚀")
                .map((label) => (
                  <Label
                    key={label.node.name}
                    label={label}
                    toggleLabel={toggleLabel}
                  />
                ))}
            </div>
          </div>

          {/* Secondary summary row */}
          <div className={styles.muted}>
            <span>Issue #{number}</span> <span>Created on {formattedDate}</span>{" "}
            <span>
              by{" "}
              <a href={author.url} target="_blank" rel="noreferrer">
                {author.name}
              </a>
            </span>
          </div>
        </div>
      </div>

      <IssueLinks issue={issue} />
    </div>
  );
}

function Label({ label, toggleLabel }) {
  const fontColor = getLabelFontColor(label.node.color);

  return (
    <span
      className={styles.label}
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
