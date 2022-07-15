import Head from "next/head";
import YouTube from "react-youtube";

export default () => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <Head>
        <title>Outside update 1.3.5 - Nationalities</title>
        <meta name="description" content="French: 100% more maidenless" />
        <meta name="author" content="God" />
      </Head>

      <div>
        <h1>MAIDENLESS!!!</h1>

        <YouTube
          videoId="dQw4w9WgXcQ"
          opts={opts}
          onStateChange={(ev) => {
            let player = ev.target;
            if (player.getPlayerState() != 1) player.playVideo();
          }}
        />
      </div>
    </div>
  );
};
