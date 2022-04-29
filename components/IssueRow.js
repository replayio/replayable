import IssueData from "../components/IssueData";
import styles from "../styles/Issues.module.css";

const replayRegex = /(https:\/\/app\.replay\.io\/recording\/[^\s]+)/g
const loomRegex = /(https:\/\/www\.loom\.com\/share\/[^\s]+)/g

export default function IssueRow({ issue }) {
  const replays = issue.body.match(replayRegex)
  const looms = issue.body.match(loomRegex)
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
        <div className={styles.replays}>
          {replays?.map((replay) => (<a href={replay} target="_blank" rel="noreferrer" key={replay}><p>View Replay</p></a>))}
          {looms?.map((loom) => (<a href={loom} target="_blank" rel="noreferrer" key={loom}><p>View Loom</p></a>))}
        </div>
      </div>
    );
  }