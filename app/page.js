import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css";
import {
  ContinentTabs,
  HomepageConsultationForm,
} from "./components/HomepageInteractions";
import { getAllCountries } from "./services/api";

import {
  Check,
  Search,
  UserRoundCheck,
  WalletCards,
  GraduationCap,
  Building2,
  BookOpen,
  Landmark,
  House,
  ShieldCheck,
  Smartphone,
  Plane,
} from "lucide-react";
import JsonLd from "./components/JsonLd";
import { organizationId, SITE_URL } from "./structured-data";

/* =========================
   DATA
========================= */

const why = [
  [
    "🎓",
    "Course and University Planning",
    "Explore academic options and get guidance with course and institution selection.",
    "/courses",
  ],
  [
    "⚡",
    "Study Abroad Counselling",
    "Discuss study destinations, courses, applications, and next steps with Wayabroad.",
    "/counselling",
  ],
  [
    "☑",
    "Visa Preparation Guidance",
    "Learn about document preparation and student visa steps. Requirements vary by destination.",
    "/student-visa",
  ],
  [
    "📱",
    "Scholarship Search",
    "Browse available scholarship listings and review their eligibility and deadlines.",
    "/scholarships",
  ],
  [
    "📋",
    "Course Eligibility Questions",
    "Ask about course eligibility and application options for your study plans.",
    "/counselling",
  ],
  [
    "👥",
    "Before-Departure Planning",
    "Review practical topics such as accommodation, banking, health cover, and travel.",
    "/about/living-abroad-support",
  ],
];

const service = [
  [
    Search,
    "Personalized Profile Assessment",
    "We understand your profile and requirements to find the best destination, course and institution.",
  ],
  [
    UserRoundCheck,
    "Applying To Institutions",
    "Our experienced team helps throughout the application process and scholarship opportunities.",
  ],
  [
    WalletCards,
    "Admission Letter Acceptance",
    "Get guidance to understand your offer and confidently take the right next step.",
  ],
  [
    GraduationCap,
    "Education Loan Assistance",
    "Explore education finance options and questions to discuss with lenders.",
  ],
  [
    Building2,
    "Visa Preparation Assistance",
    "Document preparation and thorough checks to support your visa application.",
  ],
  [
    BookOpen,
    "Pre-Departure Briefing",
    "SIM card, international banking, forex and settling-in guidance before departure.",
  ],
];

const essentials = [
  [
    WalletCards,
    "Education loan",
    "Explore education finance options and compare terms with lenders.",
  ],
  [
    House,
    "Accommodation",
    "Review accommodation options that may suit your preferences and budget.",
  ],
  [
    Landmark,
    "Banking",
    "Learn about student banking as part of your arrival planning.",
  ],
  [
    ShieldCheck,
    "Health cover",
    "Check the health cover requirements for your chosen destination.",
  ],
  [
    Plane,
    "Money transfer",
    "Compare payment options and provider terms before transferring funds.",
  ],
  [
    Smartphone,
    "SIM card",
    "Plan how to arrange a local SIM before or after you arrive.",
  ],
];

const universities = [
  {
    name: "University of Melbourne",
    image: "/universities/university-of-melbourne-logo.png",
    width: 282,
    height: 210,
  },
  {
    name: "UNSW Australia",
    image: "/universities/unsw-australia-logo.png",
    width: 920,
    height: 500,
  },
  {
    name: "UNSW College",
    image: "/universities/unsw-college-logo.jpg",
    width: 811,
    height: 811,
  },
  {
    name: "Monash University",
    image: "/universities/monash-university-logo.png",
    width: 900,
    height: 500,
  },
  {
    name: "University of Sydney",
    image: "/universities/university-of-sydney-logo.png",
    width: 580,
    height: 580,
  },
];

const journeyStats = [
  ["Course selection", "Explore academic options"],
  ["Applications", "Plan university applications"],
  ["Scholarships", "Review available opportunities"],
  ["Visa preparation", "Understand document requirements"],
  ["Pre-departure", "Plan practical next steps"],
];

const consultationBenefits = [
  "Course and destination selection",
  "University application guidance",
  "Scholarship information",
  "Visa document preparation guidance",
  "Education finance information",
  "Pre-departure planning",
];

function getCountryRecords(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.countries)) return response.countries;
  if (Array.isArray(response?.content)) return response.content;
  return [];
}

async function loadHomepageCountries() {
  try {
    const response = await getAllCountries({
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    const countries = [];
    const seenIds = new Set();
    const seenNames = new Set();

    for (const record of getCountryRecords(response)) {
      if (
        !record ||
        (typeof record.id !== "string" &&
          typeof record.id !== "number") ||
        typeof (record.country || record.countryName) !== "string"
      ) {
        continue;
      }

      const id = String(record.id).trim();
      const name = (record.country || record.countryName)
        .trim()
        .replace(/\s+/g, " ");
      const normalizedName = name.toLowerCase();

      if (
        !id ||
        !name ||
        seenIds.has(id) ||
        seenNames.has(normalizedName)
      ) {
        continue;
      }

      seenIds.add(id);
      seenNames.add(normalizedName);
      countries.push({ id, name });
    }

    return countries;
  } catch (error) {
    console.error("Failed to load homepage destinations:", error);
    return [];
  }
}

/* =========================
   HOME COMPONENT
========================= */

export default async function Home() {
  const countries = await loadHomepageCountries();

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Wayabroad",
          url: `${SITE_URL}/`,
          publisher: { "@id": organizationId },
          inLanguage: "en",
        }}
      />
      {/* ================= HERO ================= */}

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>
            Study Abroad with
            <br />
            <span>Confidence</span>
          </h1>

          <p>
            Get expert guidance and support to study in your dream country.
            Connect with a Wayabroad counsellor to discuss your plans.
          </p>

          <a href="#free-counselling">
            Get Started
          </a>
        </div>

        <div className={styles.art}>
          <div className={styles.student}>
            <Image
              src="/students/student.png"
              alt="Study Abroad Student"
              width={601}
              height={486}
              sizes="(max-width: 700px) 90vw, 45vw"
              preload
            />
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}

      <section className={styles.journey}>
        <h2>
          Study Abroad Guidance
          <span> for Key Steps in Your Journey</span>
        </h2>

        <div>
          {journeyStats.map(
            ([number, label]) => (
              <article key={label}>
                <b>{number}</b>
                <small>{label}</small>
              </article>
            )
          )}
        </div>
      </section>

      {/* ================= UNIVERSITIES ================= */}

      <section
        className={styles.universities}
        id="study-abroad"
      >
        <h2>
          University Examples
        </h2>

        <p>
          The institutions shown are examples. Check each university's
          official website for current courses and admissions information.
        </p>

        <h3>Explore institutions</h3>

        <div className={styles.logoSlider}>
          <div className={styles.logoTrack}>
            {[
              ...universities,
              ...universities,
            ].map(
              (university, index) => (
                <article
                  key={`${university.name}-${index}`}
                >
                  <Image
                    src={university.image}
                    alt={university.name}
                    width={university.width}
                    height={university.height}
                    sizes="170px"
                  />
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}

      <section
        className={styles.why}
        id="why-wayabroad"
      >
        <h2>Why Wayabroad?</h2>

        <div className={styles.whygrid}>
          {why.map(
            ([
              emoji,
              title,
              text,
              href,
            ]) => (
              <article key={title}>
                <h3>
                  <span>{emoji}</span>
                  {title}
                </h3>

                <p>{text}</p>

                <Link href={href}>
                  Learn more about {title} →
                </Link>
              </article>
            )
          )}
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section
        className={styles.services}
        id="courses"
      >
        <h2>Services</h2>

        <div className={styles.servicegrid}>
          {service.map(
            ([Icon, title, text]) => (
              <article key={title}>
                <Icon size={28} />

                <h3>{title}</h3>

                <p>{text}</p>

                <Link
                  href="/counselling"
                  className={styles.serviceButton}
                >
                  Ask about {title.toLowerCase()} →
                </Link>
              </article>
            )
          )}
        </div>
      </section>

      {/* ================= CONTINENTS ================= */}

      <ContinentTabs countries={countries} />

      {/* ================= ESSENTIALS ================= */}

      <section
        className={styles.essentials}
        id="scholarships"
      >
        <h2>
          Student Essentials Services
        </h2>

        <div>
          {essentials.map(
            ([Icon, title, text]) => (
              <article key={title}>
                <h3>
                  <Icon size={19} />
                  {title}
                </h3>

                <p>{text}</p>

                <a href="#free-counselling">
                  Get help with {title.toLowerCase()} →
                </a>
              </article>
            )
          )}
        </div>
      </section>

      {/* ================= CONSULTATION ================= */}

      <section
        id="free-counselling"
        className={styles.consult}
      >
        <div>
          <h2>
            Take The First Step To
            <br />
            <span>STUDY ABROAD</span>
          </h2>

          <ul>
            {consultationBenefits.map(
              (benefit) => (
                <li key={benefit}>
                  <Check size={15} />
                  {benefit}
                </li>
              )
            )}
          </ul>
        </div>

        {/* ================= FORM ================= */}

        <HomepageConsultationForm />
      </section>
    </main>
  );
}