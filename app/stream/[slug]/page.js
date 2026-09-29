import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "./stream.module.css";
import { courseStreams } from "../../data/courses";

export function generateStaticParams() {
  return courseStreams.map((stream) => ({
    slug: stream.slug,
  }));
}

export async function generateMetadata({ params }) {
  const stream = courseStreams.find(
    (item) => item.slug === params.slug
  );

  if (!stream) {
    return {
      title: "Course Stream | Wayabroad",
    };
  }

  return {
    title: `${stream.name} | Wayabroad`,
    description: `Explore ${stream.name} courses and study opportunities with Wayabroad.`,
  };
}

export default function StreamPage({ params }) {
  const stream = courseStreams.find(
    (item) => item.slug === params.slug
  );

  if (!stream) {
    notFound();
  }

  return (
    <main className={styles.streamPage}>

      {/* =========================================
          HERO
      ========================================= */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>

          <Link
            href="/courses"
            className={styles.backLink}
          >
            ← Back to Courses
          </Link>

          <span className={styles.eyebrow}>
            STUDY ABROAD
          </span>

          <h1>{stream.name}</h1>

          <p>
            Explore courses, study options and future
            opportunities in {stream.name}.
          </p>

        </div>
      </section>


      {/* =========================================
          COURSES
      ========================================= */}
      <section className={styles.coursesSection}>
        <div className={styles.container}>

          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>
                AVAILABLE COURSES
              </span>

              <h2>
                Courses in {stream.name}
              </h2>
            </div>

            <span className={styles.courseCount}>
              {stream.courses.length} Courses
            </span>
          </div>


          <div className={styles.courseGrid}>
            {stream.courses.map((course, index) => (
                <div
                    key={course}
                    className={styles.courseCard}
                    >
                    <span className={styles.number}>
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.courseName}>
                        {course}
                    </span>
                    </div>
            ))}
            </div>

        </div>
      </section>

    </main>
  );
}