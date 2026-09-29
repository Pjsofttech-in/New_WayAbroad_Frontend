import InfoPage from "../components/InfoPage/InfoPage";
import styles from "../components/InfoPage/InfoPage.module.css";

const offices = [
  "Wayabroad Pune - Hinjawadi",
  "Wayabroad Ahmedabad",
  "Wayabroad Agra",
  "Wayabroad Amritsar",
  "Wayabroad Anand",
  "Wayabroad Bangalore - St. Marks Road",
];

export default function CounsellingOfficePage() {
  return (
    <InfoPage
      title="Wayabroad Office Locator"
      subtitle="Find expert counselling and support near you"
    >
      <section className={styles.section}>
        <h2>Find a Wayabroad Office</h2>

        <p>
          Enter a town or city to find a Wayabroad office near you.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Wayabroad offices in India</h2>

        <div className={styles.grid}>
          {offices.map((office) => (
            <article className={styles.card} key={office}>
              <h3>{office}</h3>

              <p>
                Connect with our expert counsellors for guidance on your study
                abroad journey.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Six Dream Destinations to Study Abroad</h2>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Australia</h3>
            <p>Explore top universities and enjoy a great lifestyle.</p>
          </article>

          <article className={styles.card}>
            <h3>Canada</h3>
            <p>Discover a renowned education system and cultural diversity.</p>
          </article>

          <article className={styles.card}>
            <h3>Ireland</h3>
            <p>Get world-class education in a welcoming environment.</p>
          </article>

          <article className={styles.card}>
            <h3>United Kingdom</h3>
            <p>Study in historic universities and enjoy vibrant student life.</p>
          </article>

          <article className={styles.card}>
            <h3>United States</h3>
            <p>Choose from a wide range of programs and institutions.</p>
          </article>

          <article className={styles.card}>
            <h3>New Zealand</h3>
            <p>Experience academic excellence and stunning natural beauty.</p>
          </article>
        </div>
      </section>
    </InfoPage>
  );
}