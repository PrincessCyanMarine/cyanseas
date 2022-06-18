import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import $ from "jquery";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let shouldContinue = () => true;
    let titles = $("h1, h2, h3, h4, h5, h6");
    const applyAnimation = (el: JQuery<HTMLElement>) =>
      setTimeout(() => {
        el.animate(
          {
            backgroundPositionX: `${
              Math.floor(Math.random() * 2) ? "+" : "-"
            }=${el.width()}px`,
          },
          {
            duration: 5000,
            easing: "linear",
            done: ({ elem }) => {
              let e = $(elem);
              if (shouldContinue()) applyAnimation(e);
            },
          }
        );
      }, Math.floor(Math.random() * 2000));
    applyAnimation(titles);
    return () => {
      shouldContinue = () => false;
    };
  }, [router.asPath]);

  return (
    <div>
      <Head>
        <title>The Cyan seas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
