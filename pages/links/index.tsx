import Image from "next/image";
import Link from "../../components/Link";

export default () => {
  return (
    <div>
      <h1>Links</h1>
      <p>
        <Link href="https://steamcommunity.com/id/cyanmarine">
          <big>Steam</big>
          <small>external</small>
        </Link>{" "}
        - I play stuff, sometimes
      </p>
      <p>
        <Link href="https://discord.com/users/305883924310261760">
          <big>Discord</big>
          <small>external</small>
        </Link>{" "}
        - Chat with me here
      </p>
      {/* https://github.com/PrincessCyanMarine */}
      <p>
        <Link href="https://github.com/PrincessCyanMarine">
          <big>Github</big>
          <small>external</small>
        </Link>
        - I have stuff like this here
      </p>
      <p>
        <Link href="https://www.youtube.com/@cyanmarine">
          <big>Youtube</big>
          <small>external</small>
        </Link>{" "}
        - Not much to see here
      </p>
      <p>
        <Link href="https://www.speedrun.com/users/CyanMarine">
          <big>Speedrun.com</big>
          <small>external</small>
        </Link>{" "}
        - Not much to see here either, tbh
      </p>
      <p>
        <Link href="https://www.twitch.tv/princesscyanmarine">
          <big>Twitch</big>
          <small>external</small>
        </Link>{" "}
        - Empty...
      </p>
      <p>
        <Link href="https://twitter.com/cyan_marine">
          <big>Twitter</big>
          <small>external</small>
        </Link>{" "}
        - Why am I even doing this?
      </p>
      <p>
        <Link href="https://www.instagram.com/princesscyanmarine">
          <big>Instagram</big>
          <small>external</small>
        </Link>{" "}
        - Like, I don't even use half of these
      </p>
      <p>
        <Link href="https://www.reddit.com/user/CyanMarine">
          <big>Reddit</big>
          <small>external</small>
        </Link>{" "}
        - idk man...
      </p>
    </div>
  );
};
