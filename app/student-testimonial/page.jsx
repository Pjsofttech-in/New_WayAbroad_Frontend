import InfoPage from "../components/InfoPage/InfoPage";
import styles from "../components/InfoPage/InfoPage.module.css";

const categories = [
  {
    title: "Most Popular",
    text: "View popular FastLane courses, find one you're interested in and see if you qualify.",
  },
  {
    title: "Engineering",
    text: "Discover top engineering FastLane courses and see if you qualify.",
  },
  {
    title: "Business",
    text: "Discover top business FastLane courses and see if you qualify.",
  },
  {
    title: "Computing and IT",
    text: "Discover top computing and IT FastLane courses and see if you qualify.",
  },
  {
    title: "Teaching and Education",
    text: "Discover teaching and education FastLane courses and see if you qualify.",
  },
];

export default function InstantOfferPage() {
  return (
    <InfoPage
      title="Get started with FastLane today!"
      subtitle="Answer a few questions to see if you're eligible for a course before you apply"
    >
      <section className={styles.section}>
        <h2>We have a range of FastLane courses to choose from</h2>

        <p>
          See if you're eligible before you apply. Get started today!
        </p>

        <ul className={styles.list}>
          <li>Click on a course and select "See if I qualify".</li>
          <li>Answer a few quick questions.</li>
          <li>Receive your eligibility status in minutes.</li>
          <li>Get expert help from friendly counsellors anytime.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Explore FastLane Courses</h2>

        <div className={styles.grid}>
          {categories.map((category) => (
            <article className={styles.card} key={category.title}>
              <h3>{category.title}</h3>

              <p>{category.text}</p>

              <br />

              <a href="#courses" className={styles.button}>
                Explore Courses
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Explore our full range of FastLane courses today!</h2>

        <p>
          Make your university application stress-free and discover in minutes
          whether you could get into the university you've always dreamed of.
        </p>
      </section>
    </InfoPage>
  );
}