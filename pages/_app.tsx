import "../styles/globals.css";
import Head from "next/head";
import styles from "../styles/app.module.css";
import { useState } from "react";
import Link from "next/link";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img alt="Replay" src="replay.svg" width={20} height={20} />
          <Link href="/">Replayable</Link>
        </div>
        <div>
          <a href="https://replay.io/oss" target="_blank" rel="noreferrer">
            OSS Guide
          </a>
          <Link href="/about" target="_blank" rel="noreferrer">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}

function Footer({ buggy, toggleBuggy }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a
          href="https://github.com/replayio/hasreplay"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a className={styles.buggy} href="#" onClick={() => toggleBuggy()}>
          {buggy ? "🐞" : "✅"}
        </a>
      </div>
    </footer>
  );
}

function MyApp({ Component, pageProps }) {
  const [buggy, setBuggy] = useState(false);
  const toggleBuggy = () => {
    setBuggy(!buggy);
  };
  return (
    <>
      <Head>
        <title>Replayable</title>
        <meta name="description" content="Github Issues that include replays" />
        <link rel="icon" href="/favico.svg" />
      </Head>
      <Header />
      <Component {...pageProps} buggy={buggy} />
      <Footer buggy={buggy} toggleBuggy={toggleBuggy} />
    </>
  );
}

export default MyApp;
