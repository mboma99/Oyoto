import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        Oyotō © 2026
      </div>
      <div className={styles.links}>
        <a 
          href="https://github.com/mboma99" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.socialLink}
        >
          GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/james-mboma/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.socialLink}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
