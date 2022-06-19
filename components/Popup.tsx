import styles from "../styles/components/popup.module.scss";

export default ({
  children,
  close,
  className,
}: {
  children?: any;
  close: () => void;
  className?: string;
}) => (
  <div className={`${styles.popupOuter}${className ? ` ${className}` : ""}`}>
    <div onClick={close} className={styles.closeDiv} />
    <div className={styles.popupInner}>
      <a onClick={close} className={styles.x}>
        x
      </a>
      <div className={styles.popupInnerInner}>{children}</div>
    </div>
  </div>
);
