import Link from "next/link";
import styles from "./mbbs.module.css";
import JsonLd from "../components/JsonLd";
import { createBreadcrumbSchema } from "../structured-data";

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
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "MBBS Abroad", path: "/mbbs" },
        ])}
      />
      <section className={styles.mbbsSection}>
        <div className={styles.container}>
          <h1>Study MBBS Abroad</h1>

          <div className={styles.description}>
            <p>
              Students considering medical studies abroad should compare
              admission requirements, total costs, degree recognition, and
              licensing rules using current information from official
              institutions and regulators.
            </p>

            <p>
              Wayabroad provides guidance with university selection,
              admissions, and visa preparation. Requirements vary by
              destination and institution, so confirm details before applying.
            </p>
          </div>

          <div className={styles.countryGrid}>
            {countries.map((country) => (
              <div key={country} className={styles.countryCard}>
                {country}
              </div>
            ))}
          </div>

          <div className={styles.consultationCta}>
            <Link href="/counselling">Discuss MBBS abroad options</Link>
          </div>
        </div>
      </section>
    </main>
  );
}