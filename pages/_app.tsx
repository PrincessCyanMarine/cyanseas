import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import $ from "jquery";
import { useEffect } from "react";
import { useRouter } from "next/router";
// import CursorDot from "../components/CursorDot";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let shouldContinue = () => true;
    let titles = $("h1, h2, h3, h4, h5, h6").not(".no-animation");
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

  const onDialogClick = (ev: MouseEvent) => {
    let el = ev.target as HTMLDialogElement;
    console.log(el.classList);
    const dialogDimensions = el.getBoundingClientRect();
    if (
      ev.clientX < dialogDimensions.left ||
      ev.clientX > dialogDimensions.right ||
      ev.clientY < dialogDimensions.top ||
      ev.clientY > dialogDimensions.bottom
    )
      el.close();
  };

  useEffect(() => {
    let dialog = $("dialog").not(".no-close");
    dialog.each((i, el) => {
      el.addEventListener("mousedown", onDialogClick);
    });
    return () => {
      let dialog = $("dialog").not(".no-close");
      dialog.each((i, el) => {
        el.removeEventListener("mousedown", onDialogClick);
      });
    };
  }, [router.asPath]);

  return (
    <div>
      <Head>
        <title>The Cyan seas</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {!["/japanese/sensei/debt"].includes(router.asPath) && (
          <>
            <meta property="og:title" content="The Cyan seas" />
            <meta property="og:site_name" content="The Cyan seas" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://cyanmarine.net" />
            <meta
              property="og:image"
              content="https://www.cyanmarine.net/assets/images/thumb.png"
            />
            <meta name="twitter:card" content="summary_large_image" />
          </>
        )}
        <meta property="og:author" content="CyanMarine" />
        <meta property="author" content="CyanMarine" />
        <meta name="theme-color" content="#00FFFF" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>

      {/* <CursorDot /> */}
    </div>
  );
}

export default MyApp;
