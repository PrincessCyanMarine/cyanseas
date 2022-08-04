import Head from "next/head";
import Image from "next/image";

export default () => (
  <div>
    <Head>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <h1>Profile pics</h1>
    <p>
      Some profile pics and other images I often use, because I tend to lose
      them
    </p>
    <p>
      Honestly, mostly personal use. It's way easier to "store" them here than
      anywhere else
    </p>
    {[
      "kokoro_pfp",
      "a",
      "a_transflag",
      "b",
      "b_transflag",
      "madeline2",
      "madeline1",
      "space",
    ].map((a, i) => (
      <p key={i}>
        <img src={`/assets/images/pfp/${a}.png`} />
      </p>
    ))}
  </div>
);
