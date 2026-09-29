"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  submitFormSubmission,
  getAllContinents,
  getAllCourseNames,
} from "./services/api";

import styles from "./home.module.css";

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

const countries = [
  "Australia",
  "Canada",
  "UK",
  "USA",
];

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

/* =========================
   HOME COMPONENT
========================= */

export default function Home() {
  const [tab, setTab] = useState("Australia");

  // DYNAMIC DROPDOWN DATA
  const [continents, setContinents] = useState([]);
  const [courses, setCourses] = useState([]);

  // FORM STATES
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    continentId: "",
    courseId: "",
    agree: false,
  });

  /* =========================
     FETCH CONTINENTS & COURSES
  ========================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const [continentsData, coursesData] = await Promise.all([
          getAllContinents(),
          getAllCourseNames(),
        ]);

        setContinents(continentsData || []);
        setCourses(coursesData || []);
      } catch (error) {
        console.error(
          "Failed to load dropdown data:",
          error
        );
      }
    };

    loadData();
  }, []);

  /* =========================
     HANDLE INPUT CHANGES
  ========================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================
     HANDLE FORM SUBMISSION
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      setError(
        "Please agree to the terms & privacy policy."
      );
      return;
    }

    if (!form.continentId) {
      setError("Please select a continent.");
      return;
    }

    if (!form.courseId) {
      setError("Please select a course.");
      return;
    }

    setLoading(true);
    setSent(false);
    setError("");

    try {
      await submitFormSubmission({
        formType: "COUNSELLING",

        name: form.name,
        email: form.email,
        phoneNumber: form.phone,

        continentId: Number(form.continentId),
        courseId: Number(form.courseId),

        password: null,
        createdByEmail: null,
        role: null,
        branchCode: null,
        status: "NEW",
      });

      setSent(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        continentId: "",
        courseId: "",
        agree: false,
      });
    } catch (err) {
      console.error(
        "Consultation Error:",
        err
      );

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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

      <section
        className={styles.continents}
        id="exams"
      >
        <h2>Explore By Continent</h2>

        <div className={styles.tabs}>
          {countries.map(
            (country) => (
              <button
                key={country}
                className={
                  tab === country
                    ? styles.selected
                    : ""
                }
                onClick={() =>
                  setTab(country)
                }
              >
                {country}
              </button>
            )
          )}
        </div>
      </section>

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

        <form onSubmit={handleSubmit}>
          <h3>
            Start Your Study Abroad Journey
          </h3>

          <input
            name="name"
            placeholder="Enter Full Name*"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Enter Email*"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number*"
            value={form.phone}
            onChange={handleChange}
            required
          />

          {/* DYNAMIC CONTINENT DROPDOWN */}

          <select
            name="continentId"
            value={form.continentId}
            onChange={handleChange}
            required
          >
            <option
              value=""
              disabled
            >
              Select Continents*
            </option>

            {continents.map(
              (continent) => (
                <option
                  key={continent.id}
                  value={continent.id}
                >
                  {continent.continentname}
                </option>
              )
            )}
          </select>

          {/* DYNAMIC COURSE DROPDOWN */}

          <select
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            required
          >
            <option
              value=""
              disabled
            >
              Select Course*
            </option>

            {courses.map(
              (course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.courseName}
                </option>
              )
            )}
          </select>

          <label>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
            />

            I have read and agreed to terms & privacy policy
          </label>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Book your Free Consultation"}
          </button>

          {sent && (
            <p className={styles.success}>
              Request submitted successfully!
            </p>
          )}

          {error && (
            <p className={styles.success}>
              {error}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}