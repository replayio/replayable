import styles from "../styles/about.module.css";

export default function About() {
  return (
    <div className={styles.description}>
      <div className={styles.content}>
        <p>
          Replayable is a collection of Github Issues that include replays.{" "}
        </p>

        <p>
          Replayable is great for finding OSS issues to contribute to. When an
          issue has a replay, you have everything you need to get started.
        </p>

        <p>
          Replayable is also great for finding real world issues. If you’re
          stuck on a React Hooks bug, odds are there is a similar issue that has
          already been solved.
        </p>
      </div>
    </div>
  );
}
