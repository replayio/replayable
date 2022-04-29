import styles from "../styles/Home.module.css";

export default function IssueLinks({ issue }) {
  const replayRegex = /(https:\/\/app\.replay\.io\/recording\/[^\s]+)/g;
  const loomRegex = /(https:\/\/www\.loom\.com\/share\/[^\s]+)/g;
  const replays = issue.body.match(replayRegex);
  const looms = issue.body.match(loomRegex);
  return (
    <div className={styles.labels}>
            {looms?.map((loom) => (
        <a href={loom} target="_blank" rel="noreferrer" key={loom}>
          <span className={styles.loom}>
            <img src="/loom.png" alt="" />
            View Loom
          </span>
        </a>
      ))}
      {replays?.map((replay) => (
        <a href={replay} target="_blank" rel="noreferrer" key={replay}>
          <span className={styles.replay}>
            <img src="/replay.png" alt="" />
            View Replay
          </span>
        </a>
      ))}
    </div>
  );
}
