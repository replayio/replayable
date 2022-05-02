import "../styles/globals.css";
import Head from "next/head";
import styles from "../styles/Header.module.css";
import { useState } from "react";

function Header( {buggy, toggleBuggy}) {

  return (
    <div className={styles.header}>
        <span onClick={() => toggleBuggy()}>{buggy ? "🐞" : "✅" }</span>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  const [buggy, setBuggy] = useState(false);
  const toggleBuggy = () => {
    setBuggy(!buggy)
  }
  return (
    <>
      <Head>
        <title>Has Replay 🚀</title>
        <meta
          name="description"
          content="Github Issues that have a has-replay label"
        />
        <link rel="icon" href="/favico.svg" />
      </Head>
      <Header buggy={buggy} toggleBuggy={toggleBuggy} />
      <Component {...pageProps} buggy={buggy}/>
    </>
  );
}

export default MyApp;
