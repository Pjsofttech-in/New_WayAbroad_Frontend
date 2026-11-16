import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "./stream.module.css";
import { courseStreams } from "../../data/courses";
import {
  brandedMetadataTitle,
  canonicalMetadata,
  cleanMetadataText,
} from "../../seo-utils";
import JsonLd from "../../components/JsonLd";
import { createBreadcrumbSchema } from "../../structured-data";

export function generateStaticParams() {
  return courseStreams.map((stream) => ({
    slug: stream.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stream = courseStreams.find(
    (item) => item.slug === slug
  );

  if (!stream) {
    return {
      ...canonicalMetadata(`/stream/${encodeURIComponent(slug || "")}`),
      title: brandedMetadataTitle("Study Abroad Course Stream"),
      description:
        "Explore academic streams and study abroad course options with Wayabroad, and compare fields to guide university admissions research and planning.",
    };
  }

  return {
    ...canonicalMetadata(`/stream/${encodeURIComponent(slug)}`),
    title: brandedMetadataTitle(`${stream.name} Courses Abroad`),
    description: cleanMetadataText(
      `Explore ${stream.courses.join(", ")} and other ${stream.name} study abroad courses, and find options aligned with your academic interests and goals.`
    ),
  };
}

export default async function StreamPage({ params }) {
  const { slug } = await params;
  const stream = courseStreams.find(
    (item) => item.slug === slug
  );

  if (!stream) {
    notFound();
  }

  return (
    <main className={styles.streamPage}>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Courses", path: "/courses" },
          {
            name: stream.name,
            path: `/stream/${encodeURIComponent(slug)}`,
          },
        ])}
      />

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