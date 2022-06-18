import Link from "next/link";
import styles from "../styles/components/Link.module.scss";

export default ({
  children,
  className,
  href,
}: {
  children?: any;
  className?: string;
  href: string;
}) => (
  <Link href={href}>
    <a className={`${styles.Link}${className ? ` ${className}` : ""}`}>
      <span>{children}</span>
    </a>
  </Link>
);
