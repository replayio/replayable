import Image from "next/image";
import { getLabelFontColor } from "../scripts/utilities";
import styles from "../styles/Home.module.css";

export default function IssueData({
  title,
  number,
  date,
  author,
  url,
  labels,
}) {
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <div className={styles.issue}>
      <div className={styles.avatarContainer}>
        <Image
          className={styles.avatar}
          src={author.avatarUrl}
          alt="Picture of the author"
          layout="fixed"
          height={30}
          width={30}
        />
      </div>

      <div className={styles.data}>
        <div>
          <a href={url} target="_blank" rel="noreferrer">
            <span>{title}</span>
          </a>
          <div className={styles.labels}>
            {labels
              .filter((label) => label.node.name != "has-replay 🚀")
              .map((label) => {
                const fontColor = getLabelFontColor(label.node.color);
                return (
                  <span
                    className={styles.label}
                    key={label.node.name}
                    style={{
                      backgroundColor: "#" + label.node.color,
                      color: fontColor,
                    }}
                  >
                    {label.node.name}
                  </span>
                );
              })}
          </div>
        </div>
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
  );
}
