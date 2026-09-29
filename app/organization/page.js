import styles from "./page.module.css";

export const metadata = {
  title: "Organization | PJSoftTech",
  description: "PJSoftTech Core Values and Culture.",
};

const coreValues = [
  {
    title: "Transparent and Friendly Workplace",
    description:
      "We value every team member, fostering an open and amicable environment to cultivate strong, healthy working relationships.",
  },
  {
    title: "Embrace Change",
    description:
      "We actively embrace change, continuously refining our methodologies and products by incorporating the latest technological advancements.",
  },
  {
    title: "Going the Extra Mile",
    description:
      "Whether for our team members, customers, or partners, we consistently go above and beyond to provide assistance and support.",
  },
  {
    title: "Customers Come First",
    description:
      "Our decisions are centered around our customers, prioritizing their needs to deliver high-quality ERP solutions.",
  },
  {
    title: "Collaborating with Academicians",
    description:
      "Our products are developed in consultation with knowledgeable educationists, ensuring they meet the specific needs of educational institutions.",
  },
  {
    title: "Commitment to Integrity",
    description:
      "We uphold the highest standards of integrity, always doing what is right to deliver exceptional service.",
  },
];

export default function OrganizationPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>

        {/* =========================
            CORE VALUES
        ========================= */}

        <section className={styles.coreValuesSection}>
          <h1>PJSoftTech Core Values and Culture</h1>

          <div className={styles.valuesGrid}>
            {coreValues.map((value, index) => (
              <div className={styles.valueCard} key={index}>
                <h2>{value.title}</h2>

                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>


        {/* =========================
            OUR CULTURE BANNER
        ========================= */}

        <section className={styles.cultureBanner}>
          <h2>Our Culture</h2>

          <p>Dedication, Creativity, and Integrity.</p>
        </section>


        {/* =========================
            CULTURE CONTENT
        ========================= */}

        <section className={styles.cultureContent}>
          <h2>Our Culture at PJSoftTech</h2>

          <p>
            At PJSoftTech, collaboration is at the heart of everything we do.
            We believe in the power of teamwork and synergy, where every team
            member's voice is valued and respected. Our open-door policy fosters
            communication and encourages the sharing of ideas, leading to
            innovative solutions and successful outcomes.
          </p>

          <p>
            We are committed to the personal and professional growth of our
            employees. Our culture of continuous learning provides ample
            opportunities for skill development and career advancement. From
            workshops and training programs to mentorship and coaching, we
            invest in our team members' success and empower them to reach their
            full potential.
          </p>

          <p>
            We understand the importance of maintaining a healthy work-life
            balance. That's why we offer flexible work arrangements and remote
            work options to accommodate the diverse needs of our employees. By
            prioritizing well-being and flexibility, we ensure that our team
            members can thrive both personally and professionally.
          </p>

          <p>
            Innovation is in our DNA. We encourage creativity and out-of-the-box
            thinking, challenging our team members to push the boundaries and
            explore new possibilities. Whether it's developing cutting-edge
            solutions or refining existing processes, we embrace change and
            strive for excellence in everything we do.
          </p>

          <p>
            We celebrate diversity and believe in creating an inclusive
            workplace where everyone feels welcome and valued. By embracing
            different perspectives and backgrounds, we foster a culture of
            creativity, empathy, and mutual respect. We are committed to
            building a diverse team that reflects the world we live in and
            drives innovation through diversity.
          </p>
        </section>

      </div>
    </main>
  );
}