import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function BuggyIssueLinks({ issue }) {
  const replayRegex = /(https:\/\/app\.replay\.io\/recording\/[^\s]+)/g;
  const loomRegex = /(https:\/\/www\.loom\.com\/share\/[^\s]+)/g;
  const replays = issue.body.match(replayRegex);
  const looms = issue.body.match(loomRegex);
  const [fontWeight, setFontWeight] = useState('normal')
  return (
    <div className={styles.labels}>
      {looms?.map((loom) => (
        <a onMouseEnter={() => setFontWeight('bold')} href={loom} target="_blank" rel="noreferrer" key={loom} >
          <span className={styles.loom} style={{fontWeight: fontWeight}}>
            <img src="/loom.svg" alt="" />
            Loom
          </span>
        </a>
      ))}
      {replays?.map((replay) => (
        <a onMouseEnter={() => setFontWeight('bold')} href={replay} target="_blank" rel="noreferrer" key={replay} >
          <span className={styles.replay} style={{fontWeight: fontWeight}}>
            <img src="/replay.svg" alt="" />
            Replay
          </span>
        </a>
      ))}
    </div>
  );
}
