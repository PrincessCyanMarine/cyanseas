import styles from "../styles/components/Layout.module.scss";
import Link from "./Link";

export default ({ children }: { children: any }) => (
  <div>
    <div className={styles.topbar_outer}>
      <div className={styles.topbar_inner}>
        <Link href="/" className={styles.home}>
          Home
        </Link>
        <div className={styles.rightside}>
          <Link href="https://github.com/PrincessCyanMarine">
            Github
            <small>external</small>
          </Link>
          <Link href="/pages">Pages</Link>
        </div>
      </div>
    </div>
    <div className={styles.main}>
      <main>{children}</main>
    </div>
  </div>
);
