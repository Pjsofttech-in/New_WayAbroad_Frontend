import Link from "next/link";
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

/* =========================
   DATA
========================= */

const why = [
  [
    "🎓",
    "Trusted By 113K Students",
    "Last year alone, Wayabroad fulfilled dreams of over 113K students. Your success is our mission!",
    "/trusted-students",
  ],
  [
    "⚡",
    "Counselling Right By Your Side",
    "With 200+ expert counsellors across 77 offices in 83 cities, expert help is always nearby.",
    "/counselling-office",
  ],
  [
    "☑",
    "Highest Student Visa Success Rate",
    "With over 55 years of experience, Wayabroad boasts the highest student success rate.",
    "/student-visa",
  ],
  [
    "📱",
    "Courses With Instant Offer",
    "Get your offer letter from select universities with streamlined support.",
    "/instant-offer",
  ],
  [
    "👥",
    "Your Global Partner In Success",
    "As a global leader with offices worldwide, we prioritize you and your goals.",
    "/about",
  ],
  [
    "♥",
    "Loved By Students",
    "Rated highly by students who recommend our expert international education services.",
    "/student-testimonials",
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
    "We help you explore financial support, competitive rates and hassle-free education loans.",
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
    "Easy access to finance so you don't delay your dreams.",
  ],
  [
    House,
    "Accommodation",
    "Student apartment or homestay, the choice is yours.",
  ],
  [
    Landmark,
    "Banking",
    "Open a bank account before you arrive.",
  ],
  [
    ShieldCheck,
    "Health cover",
    "Your choice, your health cover, your peace of mind abroad.",
  ],
  [
    Plane,
    "Money transfer",
    "Safe, secure and fast payments to your institution and beyond.",
  ],
  [
    Smartphone,
    "SIM card",
    "No SIM? No problem — we've got it covered.",
  ],
];

const universities = [
  {
    name: "University of Melbourne",
    image: "/universities/university-of-melbourne-logo.png",
  },
  {
    name: "UNSW Australia",
    image: "/universities/unsw-australia-logo.png",
  },
  {
    name: "UNSW College",
    image: "/universities/unsw-college-logo.jpg",
  },
  {
    name: "Monash University",
    image: "/universities/monash-university-logo.png",
  },
  {
    name: "University of Sydney",
    image: "/universities/university-of-sydney-logo.png",
  },
];

const journeyStats = [
  ["4+", "Years Of Experience"],
  ["25+", "Available In Countries"],
  ["250+", "Universities"],
  ["400+", "Courses"],
  ["3000+", "Enrolled Students"],
];

const consultationBenefits = [
  "Visa Support",
  "Free Consulting",
  "End to End Support",
  "Loan & Finance Assistant",
  "Scholarship Worth ₹10,00,000+",
  "Courses Starting From ₹8 Lakhs*",
  "Offer Letter In Less Than 48 Hours*",
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
            Connect with Wayabroad-certified counsellors today!
          </p>

          <a href="#free-counselling">
            Get Started
          </a>
        </div>

        <div className={styles.art}>
          <div className={styles.student}>
            <img
              src="/students/student.png"
              alt="Study Abroad Student"
            />
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}

      <section className={styles.journey}>
        <h3>
          Every Step Of Your Study Abroad Dream
          <span> We've Got It Covered</span>
        </h3>

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
          University Excellence Showcase
        </h2>

        <p>
          Discover leading educational institutions and their
          <br />
          prestigious partnerships.
        </p>

        <h3>Partner Universities</h3>

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
                  <img
                    src={university.image}
                    alt={university.name}
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
                  Learn More →
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

                <button>
                  Learn More →
                </button>
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
                  Learn More →
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