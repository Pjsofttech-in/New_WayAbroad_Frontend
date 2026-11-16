import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import styles from "./about.module.css";

export default function AboutPage() {
  const values = [
    {
      title: "Integrity",
      text: "We continually strive to earn the trust of our customers, colleagues, clients, and business partners by upholding the highest levels of personal integrity and providing a working environment built on respect, openness, and transparency.",
    },
    {
      title: "Quality",
      text: "We provide the highest level of quality in the advice and counselling we offer, with our priority always being the best outcomes for our customers in each of our businesses.",
    },
    {
      title: "Expertise",
      text: "Our expertise in our field enables us to provide detailed and current information. We pride ourselves on being knowledgeable and continually learning to ensure we are constantly evolving our services to meet the needs of our customers.",
    },
    {
      title: "Caring",
      text: "We recognise that each customer is an individual, so we listen and act with humility and empathy to tailor a solution that delivers the best possible outcome.",
    },
    {
      title: "Community",
      text: "We recognise that Wayabroad operates within both local and global education communities. We strive to ensure that our operations contribute to enhancing the quality of life in those communities.",
    },
  ];

  const studentServices = [
    {
      title: "Get the right student health cover",
      linkText: "Explore student health cover",
      text: "Student health cover helps you pay for medical and hospital care and protects your health while studying abroad.",
    },
    {
      title: "Find accommodation",
      linkText: "Explore accommodation options",
      text: "Compare accommodation options with providers, considering your preferences and budget.",
    },
    {
      title: "Student Banking",
      linkText: "Explore student banking",
      text: "Review student banking requirements and compare services before travelling.",
    },
    {
      title: "Money transfer securely",
      linkText: "Explore secure money transfers",
      text: "Compare payment methods, exchange rates and fees directly with providers before transferring funds.",
    },
    {
      title: "Student education loans made simple",
      linkText: "Explore education loan assistance",
      text: "Explore education loan options and compare terms with your chosen lender.",
    },
  ];

  return (
    <main className={styles.aboutPage}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.aboutHero}>
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <h1>About Wayabroad</h1>

          <p>
            Learn more about exciting places where you can study
          </p>

          {/* Get Started now opens the counselling page */}
          <Link href="/counselling" className={styles.getStarted}>
            Get Started
          </Link>
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <h2>Study abroad with someone who knows the way</h2>
            <span>Who we are</span>
          </div>

          <p>
            Wayabroad provides guidance for students planning international
            study, including course and university selection, application
            support, visa preparation, and pre-departure planning.
          </p>

          <h3 id="about-wayabroad-india">About Wayabroad India</h3>

          <p>
            Wayabroad in India guides students and their families through
            course and university selection, applications, visa preparation,
            and pre-departure planning.
          </p>
        </div>
      </section>

      {/* =====================================================
          OUR VALUES
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 id="our-values">Our Values</h2>

          <p>
            We are driven by values of Community, Caring, Expertise, Integrity,
            and Quality. These values are embodied by our people, our customers,
            and our work. Our commitment to our values enables our teams to
            have an impact on the outstanding service we deliver.
          </p>

          <div className={styles.cards}>
            {values.map((item) => (
              <div className={styles.infoCard} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>What we do</h2>

          <p>
            Wayabroad helps students research international study options and
            plan key steps in the university application process.
          </p>

          {/* STUDENT PLACEMENT */}

          <h3>Student Placement</h3>

          <p>
            Students can explore courses and universities in destinations
            including Australia, Canada, Ireland, New Zealand, the United
            Kingdom, and the United States. Confirm current course availability
            and admission requirements with each institution.
          </p>

          <p>
            Wayabroad counsellors can help students consider course options
            and prepare university applications.
          </p>

          <p>
            Application requirements vary by course and institution. Students
            should check the current requirements and submit accurate
            supporting documents.
          </p>

          {/* IELTS */}

          <h3>IELTS</h3>

          <p>
            IELTS is an English proficiency test used by some universities and
            other organisations. Acceptance and score requirements vary, so
            check the relevant institution's current requirements.
          </p>

          <p>
            IELTS assesses a test taker's English language proficiency across
            four skills: listening, reading, writing, and speaking. Delivered
            on computer or paper depending on available test formats and
            location. Confirm current test arrangements with the provider.
          </p>
        </div>
      </section>

      {/* =====================================================
          STUDENT ESSENTIALS SERVICES
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 id="student-essentials-services">Student Essentials Services (SES)</h2>

          <p>
            We, at Wayabroad understand how challenging it can be to pursue
            studies abroad. Hence, we provide a range of Student Essentials
            Services to eliminate complexity and stress making your
            international study experience journey, a hassle-free adventure.
            These include:
          </p>

          <div className={styles.cards}>
            {studentServices.map((service) => (
              <div className={styles.infoCard} key={service.title}>
                <h3>{service.title}</h3>

                <p>
                  {service.text}{" "}
                  <a
                    href="/about/living-abroad-support"
                    className={styles.learnMore}
                  >
                    {service.linkText}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION AND STRATEGY
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Plan your study abroad journey</h2>

          <p>
            Start by comparing courses, institutions, destinations, and
            application requirements. Wayabroad counselling can help you
            discuss these options and identify questions to confirm with
            universities and relevant authorities.
          </p>
        </div>
      </section>

      {/* =====================================================
          GET TO KNOW US BETTER
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Get support with your next steps</h2>

          <p>
            Ask about course and university selection, applications,
            scholarships, visa preparation, and practical pre-departure
            planning.
          </p>

          <Link href="/counselling" className={styles.learnMore}>
            Discuss your study plans with a counsellor
          </Link>
        </div>
      </section>

    </main>
  );
}