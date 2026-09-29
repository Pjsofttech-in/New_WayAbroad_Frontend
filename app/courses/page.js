import Link from "next/link";

import styles from "./courses.module.css";
import { courseStreams } from "../data/courses";

export default function CoursesPage() {
  return (
    <main className={styles.coursesPage}>
      <section className={styles.coursesSection}>
        <div className={styles.container}>

          {/* =========================================
              PAGE HEADING
          ========================================= */}
          <header className={styles.header}>
            <h1>Explore by Stream</h1>

            <p className={styles.intro}>
              Choosing the right stream is one of the most important
              decisions in your study abroad journey. At WayAbroad, we
              help you explore a wide range of academic fields including
              Engineering, Medical, Business, IT, Arts, and more, based
              on your interests, career goals, and future opportunities.
              Our expert counsellors guide you in selecting the best
              stream aligned with global demand, top universities, and
              scholarship options across countries like the USA, UK,
              Canada, Australia, and Europe. Whether you aim for
              high-paying careers or passion-driven paths, we ensure you
              make a confident and informed choice for your future.
            </p>
          </header>


          {/* =========================================
              STREAM GRID
              MAIN STREAMS ARE CLICKABLE
          ========================================= */}
          <div className={styles.courseGrid}>
            {courseStreams.map((stream) => (
              <Link
                key={stream.slug}
                href={`/stream/${stream.slug}`}
                className={styles.courseCard}
              >
                <div className={styles.cardContent}>
                  <span className={styles.cardNumber}>
                    {String(stream.id).padStart(2, "0")}
                  </span>

                  <h2>{stream.name}</h2>

                  <p>
                    {stream.courses.length} courses available
                  </p>
                </div>
              </Link>
            ))}
          </div>


          {/* =========================================
              BOTTOM DESCRIPTION
          ========================================= */}
          <div className={styles.bottomInfo}>
            <p>
              Our expert counsellors can help you choose the right
              academic stream, universities, scholarships, and career
              pathway across countries like the USA, UK, Canada,
              Australia, and Europe.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}