import "../styles/globals.css";
import Head from "next/head";
import styles from "../styles/Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1> </h1>
      </div>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
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
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
