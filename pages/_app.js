import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { LazyMotion, domAnimation } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>once.</title>
        <meta name="description" content="ONCE: A profile website for Timmy" />
        <meta property="og:url" content="https://www.lionceu.live/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="once" />
        <meta
          property="og:description"
          content="ONCE: A profile website for Timmy"
        />
        <meta property="og:image" content="https://lionceu.live/card.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="lionceu.live" />
        <meta property="twitter:url" content="https://www.lionceu.live/" />
        <meta name="twitter:title" content="once" />
        <meta
          name="twitter:description"
          content="ONCE: A profile website for Timmy"
        />
        <meta name="twitter:image" content="https://lionceu.live/card.png" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system">
        <LazyMotion features={domAnimation}>
          <Component {...pageProps} />
          <Analytics />
        </LazyMotion>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
