import styles from "./LoadingLogo.module.css";

type LoadingLogoProps = {
  fullScreen?: boolean;
};

export function LoadingLogo({ fullScreen = false }: LoadingLogoProps) {
  return (
    <div className={`${styles.loader} ${fullScreen ? styles.fullScreen : ""}`}>
      <div className={styles.mark}>oyotō</div>
    </div>
  );
}
