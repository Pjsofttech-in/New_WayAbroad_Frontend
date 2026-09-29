import styles from "./InfoPage.module.css";

export default function InfoPage({
  title,
  subtitle,
  children,
}) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>{title}</h1>

          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>

      <div className={styles.container}>
        {children}
      </div>
    </main>
  );
}