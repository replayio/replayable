import Image from "next/image";
import { getLabelFontColor } from "../scripts/utilities";
import styles from "../styles/Issues.module.css";

export default function IssueData({ title, number, date, author, url, labels }) {
    const formattedDate = new Date(date).toLocaleDateString();
    return (
      <div className={styles.issue}>
        <Image
          className={styles.avatar}
          src={author.avatarUrl}
          alt="Picture of the author"
          layout="fixed"
          height={40}
          width={40}
        />
        <div className={styles.data}>
          <a href={url} target="_blank" rel="noreferrer">
            <span>{title}</span>
          </a>
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
        <div className={styles.labels}>
          {labels.map((label) => {
            const fontColor = getLabelFontColor(label.node.color)
            return(
            <span key={label.node.name} style={{backgroundColor:'#' + label.node.color, color: fontColor}}>{label.node.name}</span>
          )})
  }
        </div>
      </div>
    );
  }