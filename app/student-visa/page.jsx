import InfoPage from "../components/InfoPage/InfoPage";
import styles from "../components/InfoPage/InfoPage.module.css";

export default function StudentVisaPage() {
  return (
    <InfoPage
      title="Student Visa Application Assistance"
      subtitle="Need to apply for a visa? Here's all you need to know"
    >
      <section className={styles.section}>
        <h2>Need to apply for a visa?</h2>

        <p>
          A student visa is an endorsement by immigration authorities on your
          passport. It indicates that you are allowed to enter and stay in a
          country to study for a specified period.
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

        <p>Most students will require evidence of:</p>

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
          process and help them understand the latest visa requirements and
          conditions.
        </p>

        <p>
          We can help you prepare the required documents and direct you to
          official sources and authorised immigration representatives.
        </p>

        <p>
          To reduce your hassle, we can also help with document certification,
          translation and courier support where applicable.
        </p>
      </section>
    </InfoPage>
  );
}