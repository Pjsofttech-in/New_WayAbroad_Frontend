import InfoPage from "../components/InfoPage/InfoPage";
import styles from "../components/InfoPage/InfoPage.module.css";
import Link from "next/link";

export default function StudentVisaPage() {
  return (
    <InfoPage
      title="Student Visa Application Assistance"
      subtitle="Need to apply for a visa? Here's all you need to know"
      breadcrumbPath="/student-visa"
    >
      <section className={styles.section}>
        <h2>Need to apply for a visa?</h2>

        <p>
          A student visa or permit is the immigration authorization or status
          required to study in a destination country. Its name, format, and
          conditions vary by country.
        </p>
      </section>

      <section className={styles.section}>
        <h2>When should I apply for my student visa?</h2>

        <p>
          You can begin your student visa application once you receive
          confirmation of your enrolment in your chosen university or
          institution.
        </p>

        <p>
          It is best to apply as early as possible because visa processing
          times vary from country to country.
        </p>

        <p>
          If you plan to apply for scholarships or education loans, you should
          begin the process early because financial aid and visa procedures can
          take time.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How do I apply for a student visa?</h2>

        <p>
          There are several steps involved in applying for a student visa. The
          requirements may vary depending on the country where you plan to
          study.
        </p>

        <p>Depending on the destination, applicants may be asked for:</p>

        <ul className={styles.list}>
          <li>Enrolment in a recognised educational institution.</li>

          <li>
            Proof that you can cover tuition fees, travel and living expenses.
          </li>

          <li>
            Passport-size photographs and a valid passport.
          </li>

          <li>
            English language proficiency where required.
          </li>

          <li>
            Health examinations or police checks where required.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>How can Wayabroad help in your visa application?</h2>

        <p>
          Our expert team can guide students throughout the visa application
          process and help them organise application documents. Requirements
          and conditions change and vary by destination; check the relevant
          immigration authority for current rules.
        </p>

        <p>
          Wayabroad can help students find official information. Immigration
          advice or representation should be obtained from an appropriately
          authorised professional where required.
        </p>

        <p>
          Ask a counsellor whether document certification, translation, or
          courier support is available for your case.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Discuss your student visa preparation</h2>
        <p>
          Contact Wayabroad to ask about study-abroad counselling and
          application support.
        </p>
        <Link href="/counselling" className={styles.button}>
          Book a counselling appointment
        </Link>
      </section>
    </InfoPage>
  );
}