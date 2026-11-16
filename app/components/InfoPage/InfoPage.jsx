import styles from "./InfoPage.module.css";
import JsonLd from "../JsonLd";
import { createBreadcrumbSchema } from "../../structured-data";

export default function InfoPage({
  title,
  subtitle,
  breadcrumbPath,
  children,
}) {
  return (
    <main className={styles.page}>
      {breadcrumbPath && (
        <JsonLd
          data={createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path: breadcrumbPath },
          ])}
        />
      )}
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