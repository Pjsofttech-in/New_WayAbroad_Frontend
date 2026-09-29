import InfoPage from "../components/InfoPage/InfoPage";
import styles from "../components/InfoPage/InfoPage.module.css";

export const metadata = {
  title: "Study Abroad Programs | Wayabroad",
};

const destinations = [
  {
    title: "Study Abroad in Australia",
    text: "Explore top universities in Australia and enjoy a great lifestyle.",
  },
  {
    title: "Study Abroad in Canada",
    text: "Discover Canada's renowned education system and cultural diversity.",
  },
  {
    title: "Study Abroad in Ireland",
    text: "Get world-class education in Ireland's welcoming environment.",
  },
  {
    title: "Study Abroad in UK",
    text: "Study in historic universities and enjoy vibrant student life.",
  },
  {
    title: "Study Abroad in USA",
    text: "Choose from a wide range of programs and leading institutions.",
  },
  {
    title: "Study Abroad in New Zealand",
    text: "Experience academic excellence and stunning natural beauty.",
  },
];

export default function TrustedStudentsPage() {
  return (
    <InfoPage
      title="Study Abroad Programs – Apply now for 2025 Intake | Free Counselling"
      subtitle="Learn more about exciting places where you can study"
    >
      <section className={styles.section}>
        <h2>Six Dream Destinations to Study Abroad</h2>

        <div className={styles.grid}>
          {destinations.map((destination) => (
            <article className={styles.card} key={destination.title}>
              <h3>{destination.title}</h3>
              <p>{destination.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Start your study abroad journey today!</h2>

        <p>
          Studying abroad is a transformative experience and a life-changing
          moment for international students. Not only do you study at
          prestigious universities, but you also develop important life skills
          that help you throughout your career and life.
        </p>

        <p>
          This experience broadens perspectives, fosters resilience, enhances
          problem-solving abilities, and helps students build global networks.
          You are exposed to different ideas, technology and cultures while
          studying at internationally recognised institutions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Why should you study abroad?</h2>

        <ul className={styles.list}>
          <li>
            <strong>Increased Employability:</strong> International education
            can help students improve their career opportunities.
          </li>

          <li>
            <strong>Enhanced Career Skills:</strong> Develop problem-solving,
            adaptability and cross-cultural communication skills.
          </li>

          <li>
            <strong>Broader Worldview:</strong> Experience different cultures,
            perspectives and global issues.
          </li>

          <li>
            <strong>Real-World Work Experience:</strong> Many programs offer
            internships and practical experience.
          </li>

          <li>
            <strong>Global Networking:</strong> Connect with students,
            professionals and mentors from around the world.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Popular programs to study abroad</h2>

        <ul className={styles.list}>
          <li>Business Analytics</li>
          <li>Data Science & Analytics</li>
          <li>Cybersecurity</li>
          <li>Artificial Intelligence & Machine Learning</li>
          <li>Renewable Energy Engineering</li>
          <li>Healthcare Management</li>
          <li>Robotics & Automation</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Frequently Asked Questions</h2>

        <h3>Why should I study abroad?</h3>

        <p>
          Studying abroad exposes you to a wider perspective of the world. It
          can improve employability and helps you develop important life skills.
        </p>

        <h3>What is the application process?</h3>

        <p>
          The process involves choosing your course, destination and
          universities, submitting applications, applying for scholarships and
          completing your visa application.
        </p>

        <h3>Can I work while studying abroad?</h3>

        <p>
          Many countries allow international students to work part-time,
          depending on their visa conditions.
        </p>
      </section>
    </InfoPage>
  );
}