import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ONCE: A profile website for Timmy" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ONCE" />
        <meta
          property="og:description"
          content="ONCE: A profile website for Timmy"
        />
        <meta property="og:url" content="https://lionceu.live" />
        <meta property="og:image" content="/card.png" />
        <meta name="author" content="Timmy" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>once.</title>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
