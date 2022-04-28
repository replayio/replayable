import '../styles/globals.css'
import Head from "next/head";
import styles from '../styles/Header.module.css'

function Header() {
  return (
    <div className={styles.header}>
     <h1>🐞 Got Bugs?</h1>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>got bugs</title>
        <meta name="description" content="got bugs?" />
        <link rel="icon" href="/question-mark.svg" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
