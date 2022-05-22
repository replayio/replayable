import styles from "../styles/about.module.css";

export default function About() {
  return (
    <footer>
      <div className={styles.description}>
        <p>
          Use the has-replay label for bug reports that{" "}
          <a
            href="https://replay.io/record-bugs"
            target="_blank"
            rel="noreferrer"
          >
            include a replay
          </a>{" "}
          to feature your issue below.
        </p>
        <ul>
          <li>
            🟩 <b>Contribute</b> to projects by investigating <b>open</b> issues
            using Replay to debug
          </li>
          <li>
            👀 <b>Learn</b> by reviewing <b>closed</b> issues for real-world
            debugging examples
          </li>
        </ul>
        <p>
          Have an open source project? Check out the{" "}
          <a href="https://replay.io/oss" target="_blank" rel="noreferrer">
            Replay OSS Guide
          </a>{" "}
          to get reproducible bug reports from your users.
        </p>
      </div>
    </footer>
  );
}
