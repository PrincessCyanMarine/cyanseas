import Image from "next/image";
import style from "../../../styles/pages/tc/emoji/tutorial.module.scss";
import Head from "next/head";
import { useEffect } from "react";
import $ from "jquery";

export default () => {
  useEffect(() => {
    let elm = $(":root");
    let defaultValue = elm.css("--text-font-family");
    console.log("default", defaultValue);
    $(":root").css("--text-font-family", "'Open Sans', sans-serif");
    return () => {
      $(":root").css("--text-font-family", defaultValue);
    };
  }, []);
  return (
    <div className={style.main}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style>{`
        :root {
            --background-color: #313338;
            --topbar-outer-background-color: #1e1f22;
        }
        `}</style>
      <div>
        <h1>Rolling</h1>
        <p>
          When the /rotate command is used on a server without an activate
          rotation, D20 will respond with the following
        </p>
        <p>
          <Image
            src="/assets/tc/emoji/tutorial/0.png"
            width={674}
            height={171}
          />
        </p>

        <p>
          <span>Clicking on the </span>
          <span className={style.image}>
            <img
              src="/assets/tc/emoji/tutorial/roll.png"
              width={112}
              height={40}
            />
          </span>{" "}
          <span> or </span>
          <span className={style.image}>
            <img
              src="/assets/tc/emoji/tutorial/reroll.png"
              width={133}
              height={40}
            />
          </span>
          <span>
            {" "}
            buttons at any point will randomize the emoji rotation for the
            server and update the image to reflect the new rotation.
          </span>
        </p>
        <h1>"Removal phase"</h1>
        <p>
          <Image
            src="/assets/tc/emoji/tutorial/1.png"
            width={911}
            height={605}
          />
        </p>
        <p>
          If D20 detects any emojis that need to be removed from the server, the{" "}
          <span className={style.image}>
            <img
              src="/assets/tc/emoji/tutorial/remove.png"
              width={204}
              height={40}
            />
          </span>{" "}
          button will be displayed. Clicking this button will prompt D20 to
          start removing them
        </p>
        <p>
          But he won't start the process imediately. As he will prompt for
          confirmation
        </p>
        <p>
          <Image
            src="/assets/tc/emoji/tutorial/2.png"
            width={946}
            height={607}
          />
        </p>
        <p>
          Upon receiving confirmation, D20 will remove one emoji every 1-2
          seconds, and update the image after each removal
        </p>
        <h1>"Creation phase"</h1>
        <p>
          <Image
            src="/assets/tc/emoji/tutorial/3.png"
            width={894}
            height={600}
          />
        </p>
        <p>
          Once there are no emojis left to be removed, if there are any emojis
          that need to be added, the{" "}
          <span className={style.image}>
            <img
              src="/assets/tc/emoji/tutorial/add.png"
              width={167}
              height={40}
            />
          </span>{" "}
          button will be displayed. Clicking this button will show another
          confirmation prompt. Upon confirmation, D20 will start adding emojis
          to the server
        </p>
        <h1>Other buttons</h1>
        <p>
          <Image
            src="/assets/tc/emoji/tutorial/4.png"
            width={734}
            height={618}
          />
        </p>
        <p>
          <span className={style.image}>
            <img
              src="/assets/tc/emoji/tutorial/announce.png"
              width={112}
              height={40}
            />
          </span>{" "}
          sends an{" "}
          <b>
            <i>UPDATED</i>
          </b>{" "}
          emoji rotation image (without buttons) to the selected channel
        </p>
        <p>
          <span className={style.image}>
            <img
              src="/assets/tc/emoji/tutorial/reload.png"
              width={134}
              height={40}
            />
          </span>{" "}
          updates the message to reflect the current state
        </p>
        <p>
          <span className={style.image}>
            <img
              src="/assets/tc/emoji/tutorial/lock.png"
              width={112}
              height={40}
            />
          </span>{" "}
          removes the buttons from the message in question
        </p>
      </div>
    </div>
  );
};
