"use client";

import { useState } from "react";
import styles from "./StudyAbroad.module.css";

const countryFlags = {
  canada: "🇨🇦",
  usa: "🇺🇸",
  "united states": "🇺🇸",
  australia: "🇦🇺",
  "united kingdom": "🇬🇧",
  uk: "🇬🇧",
  germany: "🇩🇪",
  france: "🇫🇷",
  ireland: "🇮🇪",
  newzealand: "🇳🇿",
  "new zealand": "🇳🇿",
};

function getFlag(country = "") {
  return countryFlags[country.trim().toLowerCase()] || "🌍";
}

function getParagraphs(content = "") {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function StudyAbroadClient({ studyAbroad }) {
  const contents = Array.isArray(studyAbroad.contents)
    ? studyAbroad.contents
        .filter(
          (item) =>
            item &&
            typeof item.title === "string" &&
            item.title.trim()
        )
        .map((item, index) => ({
          ...item,
          id: String(item.id ?? index),
          title: item.title.trim(),
          content:
            typeof item.content === "string" ? item.content : "",
          displayOrder: Number.isFinite(Number(item.displayOrder))
            ? Number(item.displayOrder)
            : Number.MAX_SAFE_INTEGER,
        }))
        .sort((a, b) => a.displayOrder - b.displayOrder)
    : [];
  const [activeContentId, setActiveContentId] = useState(
    contents[0]?.id ?? null
  );
  const activeContent = contents.find(
    (item) => item.id === activeContentId
  );
  const country =
    typeof studyAbroad.country === "string"
      ? studyAbroad.country
      : "";
  const title =
    typeof studyAbroad.title === "string" &&
    studyAbroad.title.trim()
      ? studyAbroad.title.trim()
      : country
        ? `Study Abroad in ${country}`
        : "Study Abroad Guide";
  const subtitle =
    typeof studyAbroad.subTitle === "string"
      ? studyAbroad.subTitle
      : "";
  const description =
    typeof studyAbroad.description === "string"
      ? studyAbroad.description
      : "";

  function selectContent(item) {
    setActiveContentId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        style={
          typeof studyAbroad.image === "string" &&
          studyAbroad.image.trim()
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(5, 35, 72, .90), rgba(5, 35, 72, .30)), url("${studyAbroad.image}")`,
              }
            : undefined
        }
      >
        <div className={styles.heroInner}>
          <span className={styles.flag} aria-label={country}>
            {getFlag(country)}
          </span>

          <h1>{title}</h1>

          {subtitle && <h2>{subtitle}</h2>}
          {description && <p>{description}</p>}
        </div>
      </section>

      {contents.length > 0 && (
        <nav className={styles.topTabs} aria-label="Study guide sections">
          {contents.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.topTab} ${
                item.id === activeContentId ? styles.activeTopTab : ""
              }`}
              onClick={() => selectContent(item)}
              aria-current={
                item.id === activeContentId ? "page" : undefined
              }
            >
              {item.title}
            </button>
          ))}
        </nav>
      )}

      <section className={styles.contentLayout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarHeading}>Study Guide</h2>

          <nav aria-label="Study guide contents">
            {contents.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.sidebarLink} ${
                  item.id === activeContentId
                    ? styles.activeSidebarLink
                    : ""
                }`}
                onClick={() => selectContent(item)}
                aria-current={
                  item.id === activeContentId ? "page" : undefined
                }
              >
                {item.title}
              </button>
            ))}
          </nav>
        </aside>

        <article className={styles.article}>
          {activeContent ? (
            <>
              <h2 className={styles.articleHeading}>
                {activeContent.title}
              </h2>

              <div className={styles.articleBody}>
                {getParagraphs(activeContent.content).map(
                  (paragraph, index) => {
                    const isBullet = /^[-•]\s*/.test(paragraph);
                    const text = paragraph.replace(/^[-•]\s*/, "");

                    return isBullet ? (
                      <div className={styles.bullet} key={index}>
                        <span aria-hidden="true">•</span>
                        <p>{text}</p>
                      </div>
                    ) : (
                      <p key={index}>{paragraph}</p>
                    );
                  }
                )}

                {!activeContent.content && (
                  <p className={styles.emptyContent}>
                    Content for this section has not been added yet.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className={styles.emptyContent}>
              No content sections are available for this country yet.
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
