import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>got bugs</title>
        <meta name="description" content="got bugs?" />
        <link rel="icon" href="/question-mark.svg" />
      </Head>

      <main className={styles.main}>
        <h1>got bugs?</h1>
      </main>
    </div>
  );
}
