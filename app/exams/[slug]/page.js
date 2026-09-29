import Link from "next/link";
import { notFound } from "next/navigation";

import exams from "../../data/exams";
import styles from "./exam-detail.module.css";

export default function ExamDetailPage({ params }) {
  const slug = params?.slug;

  const exam = exams?.[slug];

  if (!exam) {
    notFound();
  }

  return (
    <main className={`${styles.examPage} ${styles[slug] || ""}`}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>

          <div className={styles.breadcrumb}>
            {exam.breadcrumb ||
              `wayabroad India / ${exam.name} Preparation`}
          </div>

          <h1>{exam.fullName}</h1>

          {exam.description && (
            <p>{exam.description}</p>
          )}

        </div>
      </section>


      {/* =====================================================
          ABOUT / WHAT IS THE EXAM?
      ===================================================== */}
      {(exam.whatIsIt || exam.whatIsTitle) && (
        <section className={styles.section}>
          <div className={styles.container}>

            <h2>
              {exam.whatIsTitle ||
                `What is ${exam.name}?`}
            </h2>

            {exam.whatIsIt && (
              <p className={styles.description}>
                {exam.whatIsIt}
              </p>
            )}

          </div>
        </section>
      )}


      {/* =====================================================
          HIGHLIGHTS / KEY REQUIREMENT
      ===================================================== */}
      {Array.isArray(exam.highlights) &&
        exam.highlights.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>

              <div className={styles.highlightGrid}>

                {exam.highlights.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.highlightCard} ${
                      item?.variant === "banner"
                        ? styles.highlightBanner
                        : styles[`highlight${index % 4}`] || ""
                    }`}
                  >

                    {item?.icon && (
                      <div className={styles.highlightIcon}>
                        {item.icon}
                      </div>
                    )}

                    {item?.label && (
                      <span className={styles.highlightLabel}>
                        {item.label}
                      </span>
                    )}

                    {item?.value && (
                      <span className={styles.highlightValue}>
                        {item.value}
                      </span>
                    )}

                    {item?.title && (
                      <h3>{item.title}</h3>
                    )}

                    {item?.description && (
                      <p>{item.description}</p>
                    )}

                  </div>
                ))}

              </div>

            </div>
          </section>
        )}


      {/* =====================================================
          TEST STRUCTURE
      ===================================================== */}
      {Array.isArray(exam.sections) &&
        exam.sections.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>

              <h2>Test Structure</h2>

              <div className={styles.structureGrid}>

                {exam.sections.map((section, index) => (
                  <div
                    key={index}
                    className={`${styles.structureCard} ${
                      styles[`card${index % 5}`] || ""
                    }`}
                  >

                    {section?.icon && (
                      <div className={styles.sectionIcon}>
                        {section.icon}
                      </div>
                    )}

                    <h3>{section?.name}</h3>

                    {section?.questions && (
                      <p className={styles.sectionQuestions}>
                        {section.questions}
                      </p>
                    )}

                    {section?.time && (
                      <p className={styles.sectionTime}>
                        {section.time}
                      </p>
                    )}

                    {section?.description && (
                      <p className={styles.sectionDescription}>
                        {section.description}
                      </p>
                    )}

                  </div>
                ))}

              </div>


              {/* =================================================
                  EXPERIMENTAL SECTION + WRITING SAMPLE
              ================================================= */}
              {Array.isArray(exam.structureNotes) &&
                exam.structureNotes.length > 0 && (
                  <div className={styles.structureNotes}>

                    {exam.structureNotes.map(
                      (note, index) => (
                        <div
                          key={index}
                          className={`${styles.structureNote} ${
                            styles[`note${index % 3}`] || ""
                          }`}
                        >

                          {note?.icon && (
                            <div className={styles.structureNoteIcon}>
                              {note.icon}
                            </div>
                          )}

                          <div className={styles.structureNoteContent}>

                            {note?.title && (
                              <strong>
                                {note.title}
                              </strong>
                            )}

                            {note?.description && (
                              <span>
                                {note.description}
                              </span>
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

            </div>
          </section>
        )}


      {/* =====================================================
          SCORING
      ===================================================== */}
      {(exam.scoringIntro ||
        (Array.isArray(exam.scoring) &&
          exam.scoring.length > 0) ||
        (Array.isArray(exam.scoreStats) &&
          exam.scoreStats.length > 0)) && (
        <section className={styles.section}>
          <div className={styles.container}>

            <h2>Scoring</h2>


            {/* SCORING INTRO */}
            {exam.scoringIntro && (
              <div className={styles.scoringIntro}>
                <p>{exam.scoringIntro}</p>
              </div>
            )}


            {/* SCORE STATISTICS */}
            {Array.isArray(exam.scoreStats) &&
              exam.scoreStats.length > 0 && (
                <div className={styles.scoreStatsGrid}>

                  {exam.scoreStats.map(
                    (item, index) => (
                      <div
                        key={index}
                        className={`${styles.scoreStatCard} ${
                          styles[
                            `scoreStat${index % 3}`
                          ] || ""
                        }`}
                      >

                        <div className={styles.scoreStatValue}>
                          {item?.value}
                        </div>

                        <div className={styles.scoreStatLabel}>
                          {item?.label}
                        </div>

                      </div>
                    )
                  )}

                </div>
              )}


            {/* SCORING CARDS */}
            {Array.isArray(exam.scoring) &&
              exam.scoring.length > 0 && (
                <div className={styles.scoringGrid}>

                  {exam.scoring.map(
                    (item, index) => (
                      <div
                        key={index}
                        className={`${styles.scoringCard} ${
                          styles[
                            `scoring${index % 5}`
                          ] || ""
                        }`}
                      >

                        {item?.icon && (
                          <div className={styles.scoringIcon}>
                            {item.icon}
                          </div>
                        )}

                        {item?.name && (
                          <h3>{item.name}</h3>
                        )}

                        {item?.score && (
                          <div className={styles.score}>
                            {item.score}
                          </div>
                        )}

                        {item?.description && (
                          <p>{item.description}</p>
                        )}

                      </div>
                    )
                  )}

                </div>
              )}


            {/* =================================================
                GREEN SCORE VALIDITY CALLOUT
            ================================================= */}
            {exam.scoreValidity && (
              <div className={styles.scoreValidity}>

                {exam.scoreValidity.icon && (
                  <div className={styles.scoreValidityIcon}>
                    {exam.scoreValidity.icon}
                  </div>
                )}

                <div className={styles.scoreValidityContent}>

                  {exam.scoreValidity.title && (
                    <h3>
                      {exam.scoreValidity.title}
                    </h3>
                  )}

                  {exam.scoreValidity.description && (
                    <p>
                      {exam.scoreValidity.description}
                    </p>
                  )}

                </div>

              </div>
            )}

          </div>
        </section>
      )}

            {/* =====================================================
          TEST ATTEMPTS
      ===================================================== */}
      {exam.testAttempts && (
        <section className={styles.section}>
          <div className={styles.container}>

            <div className={styles.testAttempts}>

              {exam.testAttempts.icon && (
                <div className={styles.testAttemptsIcon}>
                  {exam.testAttempts.icon}
                </div>
              )}

              <div className={styles.testAttemptsContent}>

                {exam.testAttempts.title && (
                  <div className={styles.testAttemptsTitle}>
                    {exam.testAttempts.title}
                  </div>
                )}

                {exam.testAttempts.description && (
                  <p>
                    {exam.testAttempts.description}
                  </p>
                )}

              </div>

            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          TEST TYPES
      ===================================================== */}
      {Array.isArray(exam.testTypes) &&
        exam.testTypes.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>

              <h2 className={styles.centerTitle}>
                Test Types
              </h2>

              <div className={styles.testTypesList}>

                {exam.testTypes.map(
                  (type, index) => (
                    <div
                      key={index}
                      className={`${styles.testTypeCard} ${
                        styles[
                          `testType${index % 3}`
                        ] || ""
                      }`}
                    >

                      {type?.icon && (
                        <div className={styles.testTypeIcon}>
                          {type.icon}
                        </div>
                      )}

                      {type?.name && (
                        <h3>{type.name}</h3>
                      )}

                      {type?.description && (
                        <p>{type.description}</p>
                      )}

                    </div>
                  )
                )}

              </div>

            </div>
          </section>
        )}

      {/* =====================================================
    GLOBAL RECOGNITION
    ===================================================== */}
    {exam.globalRecognition && (
      <section className={styles.section}>
        <div className={styles.container}>

          <div className={styles.globalRecognition}>

            {exam.globalRecognition.icon && (
              <div className={styles.globalRecognitionIcon}>
                {exam.globalRecognition.icon}
              </div>
            )}

            <div className={styles.globalRecognitionContent}>

              {exam.globalRecognition.title && (
                <h3>
                  {exam.globalRecognition.title}
                </h3>
              )}

              {exam.globalRecognition.description && (
                <p>
                  {exam.globalRecognition.description}
                </p>
              )}

            </div>

          </div>

        </div>
      </section>
    )}

      {/* =====================================================
          KEY FEATURES
      ===================================================== */}
      {Array.isArray(exam.keyFeatures) &&
        exam.keyFeatures.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>

              <h2 className={styles.centerTitle}>
                Key Features
              </h2>

              <div className={styles.featuresGrid}>

                {exam.keyFeatures.map(
                  (feature, index) => (
                    <div
                      key={index}
                      className={`${styles.featureCard} ${
                        styles[
                          `feature${index % 3}`
                        ] || ""
                      }`}
                    >

                      {feature?.icon && (
                        <div className={styles.featureIcon}>
                          {feature.icon}
                        </div>
                      )}

                      {feature?.title && (
                        <h3>
                          {feature.title}
                        </h3>
                      )}

                      {feature?.description && (
                        <p>{feature.description}</p>
                      )}

                    </div>
                  )
                )}

              </div>

            </div>
          </section>
        )}


      {/* =====================================================
          WHY CHOOSE WAYABROAD
      ===================================================== */}
      {Array.isArray(exam.reasons) &&
        exam.reasons.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>

              <h2>
                Why Choose Wayabroad for{" "}
                {exam.name} Preparation?
              </h2>

              <div className={styles.reasonsList}>

                {exam.reasons.map(
                  (reason, index) => (
                    <div
                      key={index}
                      className={styles.reasonCard}
                    >

                      {reason?.icon && (
                        <div className={styles.reasonIcon}>
                          {reason.icon}
                        </div>
                      )}

                      <div className={styles.reasonContent}>

                        {reason?.title && (
                          <h3>
                            {reason.title}
                          </h3>
                        )}

                        {reason?.description && (
                          <p>
                            {reason.description}
                          </p>
                        )}

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>
          </section>
        )}


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className={styles.ctaSection}>

        <div className={styles.container}>

          {exam.journeyTitle && (
            <h2>{exam.journeyTitle}</h2>
          )}

          {exam.journeyText && (
            <p>{exam.journeyText}</p>
          )}

          <Link
            href="/exam-registration"
            className={styles.ctaButton}
          >
            {exam.journeyButton ||
              "Contact us today to begin your preparation!"}
          </Link>

        </div>

      </section>

    </main>
  );
}