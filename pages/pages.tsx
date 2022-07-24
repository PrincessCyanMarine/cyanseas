import Link from "../components/Link";

export default () => (
  <div>
    <h1>Pages</h1>
    <p>
      <Link href="/japanese/kana/practice">
        <big>Kana practice</big>
      </Link>{" "}
      - A minigame to help studying japanese kana
    </p>
    <p>
      <Link href="/profilepics">
        <big>Profile pics</big>
      </Link>{" "}
      - Some profile pics I often use, because I tend to lose them
    </p>
  </div>
);
