"use client";

import Link from "next/link";
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
      text: "Student health cover helps you pay for medical and hospital care and protects your health while studying abroad.",
    },
    {
      title: "Find accommodation",
      text: "We can help find a great place to live according to your age, preference, and budget.",
    },
    {
      title: "Student Banking",
      text: "Getting your finances organised is important, with Wayabroad we can simplify the process whilst in another country.",
    },
    {
      title: "Money transfer securely",
      text: "Securely pay tuition fees, living expenses and other essentials, in your local currency, with competitive FX rates and no fees.",
    },
    {
      title: "Student education loans made simple",
      text: "Applying for an Education Loan is made simple and easy with Wayabroad's trusted financial partners.",
    },
  ];

  return (
    <main className={styles.aboutPage}>

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
            Wayabroad is a leader in global education services, helping people
            achieve their international education goals for 55 years. An
            Australian-listed company, we operate in more than 50 countries
            around the world.
          </p>

          <h3>About Wayabroad India</h3>

          <p>
            Wayabroad in India has more than 2 offices spanning over 2 cities
            in India. We guide students and their families through the entire
            study overseas process – university/course selection, submission
            of application, assistance with the visa process and pre-departure
            planning.
          </p>

          <p>
            Wayabroad India has also been recognised as a Great Place to Work
            in India for, the third time in a row (2023-2024) and was also
            recognised as India's Best Workplaces™ for Women 2022 by Great
            Place to Work®. It is a landmark achievement and a testimony to
            Wayabroad Education being an employee-centric organisation that
            focuses on maintaining a healthy work environment and encourages
            building high-quality relationships in the workplace.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>
        </div>
      </section>

      {/* =====================================================
          OUR VALUES
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Our Values</h2>

          <p>
            We are driven by values of Community, Caring, Expertise, Integrity,
            and Quality. These values are embodied by our people, our customers,
            and our work. Our commitment to our values enables our teams to
            have an impact on the outstanding service we deliver.
          </p>

          <div className={styles.cards}>
            {values.map((item) => (
              <div className={styles.infoCard} key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>
        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>What we do</h2>

          <p>
            We specialise in combining human expertise with our leading
            technology to help people get accepted into their ideal course,
            take an English language test, or learn English in our schools.
          </p>

          {/* STUDENT PLACEMENT */}

          <h3>Student Placement</h3>

          <p>
            Wayabroad combines experience and technology to help students get
            into their dream international courses. Our global digital
            platform connects leading institutions, services, and alumni with
            prospective students. We have more than 2 offices based in India.
            To add, Wayabroad partners with quality universities and
            institutions across Australia, Canada, Ireland, New Zealand, the
            United Kingdom, and the United States.
          </p>

          <p>
            But these advantages would mean little without our expert people.
            Our highly trained counsellors are by our students' side from the
            first course search until day one in the classroom, and beyond.
          </p>

          <p>
            We have a team of expert education counsellors around the world.
            All of them are experts and highly trained in ensuring students
            can submit quality, verified applications, resulting in a
            world-class education for our customers, and genuine students for
            our institution clients.
          </p>

          {/* IELTS */}

          <h3>IELTS</h3>

          <p>
            IELTS (the International English Language Testing System) is the
            world's most popular English language test for work, study, and
            migration. More than 50 organisations including universities,
            professional bodies, immigration authorities and other government
            agencies trust IELTS as a reliable indicator of true-to-life
            ability to communicate in English.
          </p>

          <p>
            IELTS assesses a test taker's English language proficiency across
            four skills: listening, reading, writing, and speaking. Delivered
            on either a computer or paper, IELTS is the only high-stakes
            language test recognised for migration across Australia, Canada,
            New Zealand, and the United Kingdom.
          </p>

          <p>
            With a focus on human conversations, IELTS was a pioneer of
            four-skills English language testing more than 4 years ago. IELTS
            continues to set the standard for English language testing today.
          </p>

          <p>
            Wayabroad has more than 2 test locations in India. This includes
            more than 2 computer-delivered IELTS centres.
          </p>

          <p>
            In August 2021, Wayabroad acquired the British Council's IELTS
            business in India.
          </p>
        </div>
      </section>

      {/* =====================================================
          STUDENT ESSENTIALS SERVICES
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h3>Student Essentials Services (SES)</h3>

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
                <h4>{service.title}</h4>

                <p>
                  {service.text}{" "}
                  <a
                    href="https://wayabroad.in/about#"
                    className={styles.learnMore}
                  >
                    Learn more
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WAYABROAD CONNECT
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h3>Wayabroad Connect</h3>

          <p>
            In January 2017 Wayabroad acquired The Hotcourses Group, which was
            later integrated into Wayabroad's client services as a new B2B
            division, Wayabroad Connect.
          </p>

          <p>
            The strategic partner of choice for institutions seeking access to
            engaged student communities, Wayabroad Connect uses its global
            expertise, data-driven insights, and trusted human connections to
            match universities, schools and colleges with the right students
            from around the world.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>
        </div>
      </section>

      {/* =====================================================
          GROWTH STORY
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h3>Wayabroad's Growth Story</h3>

          <p>
            Wayabroad has been a global leader in international education
            services for over 50 years. By focusing on our customers' needs and
            using technology to enable their success, Wayabroad will continue
            to experiment, innovate, and transform the sector.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>
        </div>
      </section>

      {/* =====================================================
          VISION AND STRATEGY
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h3>Our Vision and Strategy</h3>

          <p>
            Over the past five years, we’ve been transforming our business by
            building a digital platform and unmatched global dataset to
            complement our human expertise and connections. Now that we have
            delivered our global platform, it is time to realise our vision of
            building a connected community to guide people with global
            ambitions on their journey to achieve lifelong learning and career
            aspirations.
          </p>

          <p>
            Wayabroad’s vision is to build a global platform and connected
            community to guide international students along their journey to
            achieve their lifelong learning and career aspirations.
          </p>

          <p>
            To achieve this, Wayabroad is transforming the way international
            student recruitment services are delivered.
          </p>

          <p>
            Together with our customers, we are co-designing a digital
            platform that connects our students with people, courses, services,
            and employers so they can pursue their journey with clarity and
            confidence.
          </p>

          <p>
            To put it simply, we will become the bridge that connects students
            from where they are today, to where they aspire to be.
          </p>
        </div>
      </section>

      {/* =====================================================
          GET TO KNOW US BETTER
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Get to know us better</h2>

          {/* OUR PEOPLE */}

          <h3>Our People</h3>

          <p>
            Our global team is comprised of over 25 expert education
            counsellors and globally we have more than 50 people of various
            nationalities, ages, and cultural backgrounds. It is this diversity
            and experience that enables our success and motivates our
            continuous investment in our team's personal and professional
            development.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>

          {/* OUR LEADERS */}

          <h3>Our Leaders</h3>

          <p>
            Wayabroad's Global Leadership Team brings more than 5 years of
            combined experience.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>

          {/* BOARD OF DIRECTORS */}

          <h3>Our Board of Directors</h3>

          <p>
            Wayabroad's Board of Directors possess decades of combined
            experience and expertise.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>
        </div>
      </section>

      {/* =====================================================
          SUSTAINABLE FUTURE
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h3>Committed to a sustainable future</h3>

          <p>
            Wayabroad is committed to building sustainable futures and
            improving the lives of our customers and our people. We have in
            place a range of partnerships which aim to support the environment
            and empower the communities where we operate.
          </p>

          <p>
            Our Sustainable Futures initiative creates positive change through
            education. Aligning with the UN Sustainable Development Goals, we
            champion education and its real impact on people, communities, and
            the environment.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>
        </div>
      </section>

      {/* =====================================================
          INVESTOR RELATIONS
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h3>Investor relations</h3>

          <p>
            Our outstanding team of people from around the world come to work
            each day to support our customers to achieve their dreams and
            aspirations through the power of international education.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>
        </div>
      </section>

      {/* =====================================================
          NEWS CENTRE
      ===================================================== */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h3>News centre</h3>

          <p>
            Stay up to date with Wayabroad's latest news from our teams around
            the world. Read press releases, and annual reports and get updates
            from Wayabroad.
          </p>

          <a
            href="https://wayabroad.in/about#"
            className={styles.learnMore}
          >
            Learn more
          </a>
        </div>
      </section>

    </main>
  );
}