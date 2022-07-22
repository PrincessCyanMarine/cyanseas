import Link from "../components/Link";

export default () => (
  <div>
    <h1>Mods</h1>
    <p>
      <Link href="https://www.curseforge.com/minecraft/mc-mods/simple-veinminer">
        <big>Simple veinminer</big>
        <small>external</small>
      </Link>{" "}
      - a veinminer made for the fabric modloader
    </p>
    <p>
      <Link href="https://www.curseforge.com/minecraft/mc-mods/cyans-faster-minecarts/">
        <big>Faster Minecarts</big>
        <small>external</small>
      </Link>{" "}
      - serverside mod for the fabric modloader that makes minecarts faster
    </p>
  </div>
);
