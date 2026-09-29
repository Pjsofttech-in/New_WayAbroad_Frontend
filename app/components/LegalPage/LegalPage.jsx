import styles from "./LegalPage.module.css";

export default function LegalPage({ title, sections }) {
  return (
    <main className={styles.page}>
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