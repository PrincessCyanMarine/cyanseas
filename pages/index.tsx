import type { NextPage } from "next";
import Head from "next/head";
import Link from "../components/Link";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="CyanMarine's portifolio and personal website. Explore the Cyan seas, to find what I've done"
        />
        <meta
          property="og:description"
          content="CyanMarine's portifolio and personal website. Explore the Cyan seas, to find what I've done"
        />
      </Head>

      <div>
        <h1>Howdy there</h1>
        <p>
          I'm currently a information systems student, so I made this to
          showcase a bit of what I've done before
        </p>
        <h1>Some of my past projects</h1>

        <p>
          <Link href="https://github.com/PrincessCyanMarine/tictactoe">
            <big>Tictactoe</big>
            <small>external</small>
          </Link>{" "}
          - Made in x64 assembly for a school project
        </p>

        <p>
          <Link href="/mods">
            <big>Minecraft mods</big>
          </Link>{" "}
          - Made in Java using for the{" "}
          <Link href="https://fabricmc.net/">
            fabric modloader <small>external</small>
          </Link>
        </p>

        <p>
          <Link href="https://github.com/PrincessCyanMarine/TriviumComicsBots">
            <big>Discord bots</big>
            <small>external</small>
          </Link>{" "}
          - Made in typescript using the{" "}
          <Link href="https://discord.js.org/#/">
            Discord.js
            <small>external</small>
          </Link>{" "}
          module
        </p>
        <p>
          <Link href="https://github.com/PrincessCyanMarine/cyanseas">
            <big>This website</big>
            <small>external</small>
          </Link>{" "}
          - Made using the nextjs framework
        </p>
        {/*
        <p>
          <Link href="https://old.cyanmarine.net">
            <big>My old website</big>
            <small>external</small>
          </Link>{" "}
          - Made with a mix of nextjs and stock HTML, JS and CSS
        </p>
        */}
      </div>
    </div>
  );
};

export default Home;
