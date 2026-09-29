import Link from "next/link";
import styles from "./exams.module.css";

const exams = [
  {
    name: "ACT",
    slug: "act",
  },
  {
    name: "SAT",
    slug: "sat",
  },
  {
    name: "GRE",
    slug: "gre",
  },
  {
    name: "GMAT",
    slug: "gmat",
  },
  {
    name: "IELTS",
    slug: "ielts",
  },
  {
    name: "TOEFL",
    slug: "toefl",
  },
  {
    name: "LSAT",
    slug: "lsat",
  },
  {
    name: "MCAT",
    slug: "mcat",
  },
  {
    name: "PTE",
    slug: "pte",
  },
  {
    name: "Duolingo English Test",
    slug: "duolingo",
  },
];

export default function ExamsPage() {
  return (
    <main className={styles.examsPage}>
      <section className={styles.examsSection}>
        <div className={styles.container}>

          <h1>Standardized Tests</h1>

          <div className={styles.headingLine}></div>

          <div className={styles.examGrid}>
            {exams.map((exam) => (
              <Link
                key={exam.slug}
                href={`/exams/${exam.slug}`}
                className={styles.examCard}
              >
                <span>{exam.name}</span>

                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>

          {/* REGISTER BOX */}

          <div className={styles.registerBox}>
            <h2>
              Ready to start your exam preparation?
            </h2>

            <p>
              Register now to get expert guidance and
              resources for your chosen exam.
            </p>

            <Link
              href="/exam-registration"
              className={styles.registerButton}
            >
              Register for Exam Preparation
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}