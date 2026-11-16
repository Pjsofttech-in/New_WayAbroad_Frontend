import styles from "./LegalPage.module.css";
import JsonLd from "../JsonLd";
import { createBreadcrumbSchema } from "../../structured-data";

export default function LegalPage({ title, sections, breadcrumbPath }) {
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
      <div className={styles.container}>

        <h1>{title}</h1>

        <div className={styles.titleLine}></div>

        <div className={styles.content}>
          {sections.map((section, index) => (
            <section
              className={styles.section}
              key={index}
            >
              <h2>{section.title}</h2>

              {section.paragraphs?.map(
                (paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>
                    {paragraph}
                  </p>
                )
              )}

              {section.items && (
                <ul>
                  {section.items.map(
                    (item, itemIndex) => (
                      <li key={itemIndex}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              )}
            </section>
          ))}
        </div>

      </div>
    </main>
  );
}