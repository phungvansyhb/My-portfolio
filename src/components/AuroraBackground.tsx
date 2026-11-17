import styles from "./AuroraBackground.module.css";

export function AuroraBackground() {
  return (
    <div className={styles.canvas} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orbPrimary}`} />
      <div className={`${styles.orb} ${styles.orbSecondary}`} />
      <div className={`${styles.orb} ${styles.orbTertiary}`} />
      <div className={styles.grain} />
    </div>
  );
}
