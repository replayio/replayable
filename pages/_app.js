import '../styles/globals.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>got bugs</title>
        <meta name="description" content="got bugs?" />
        <link rel="icon" href="/question-mark.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
