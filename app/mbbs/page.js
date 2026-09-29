import styles from "./mbbs.module.css";

const countries = [
  "Kyrgyzstan",
  "Kazakhstan",
  "Russia",
  "Turkmenistan",
  "Uzbekistan",
  "Georgia",
  "Philippines",
  "Australia",
  "UK",
  "Canada",
  "USA",
  "Timor",
];

export default function MBBSPage() {
  return (
    <main className={styles.mbbsPage}>
      <section className={styles.mbbsSection}>
        <div className={styles.container}>
          <h1>Study MBBS Abroad</h1>

          <div className={styles.description}>
            <p>
              Pursuing MBBS in foreign countries has become a popular choice
              for students due to affordable fees, global exposure, and
              high-quality education. Countries like Russia, Kazakhstan, and
              the UK offer world-class medical universities with
              internationally recognized degrees.
            </p>

            <p>
              At WayAbroad, we guide you through the entire journey — from
              selecting the right country and university to visa processing,
              admission support, and post-arrival assistance. Our expert team
              ensures a smooth and hassle-free experience so you can focus on
              achieving your dream of becoming a doctor.
            </p>
          </div>

          <div className={styles.countryGrid}>
            {countries.map((country) => (
              <div key={country} className={styles.countryCard}>
                {country}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}