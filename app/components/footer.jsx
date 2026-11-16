"use client";

import Link from "next/link";

import {
  Instagram,
  Facebook,
  MapPin,
  MessageCircle,
} from "lucide-react";

import styles from "./Footer.module.css";

const footerData = [
  {
    title: "About Wayabroad",
    links: [
      {
        name: "What we do",
        href: "/about/what-we-do",
      },
      {
        name: "Living abroad support",
        href: "/about/living-abroad-support",
      },
      {
        name: "Why choose Wayabroad",
        href: "/about/why-choose-us",
      },
      {
        name: "Study abroad counselling",
        href: "/about/study-abroad-counselling",
      },
    ],
  },

  {
    title: "Useful Links",
    links: [
      {
        name: "Cost of Living",
        href: "/useful-links/cost-of-living",
      },
      {
        name: "Ask Wayabroad",
        href: "/useful-links/ask-wayabroad",
      },
      {
        name: "Student Essentials",
        href: "/useful-links/student-essentials",
      },
      {
        name: "Statement of Purpose",
        href: "/useful-links/statement-of-purpose",
      },
      {
        name: "How to Find a Course",
        href: "/useful-links/how-to-find-course",
      },
      {
        name: "Study Abroad Courses",
        href: "/useful-links/study-abroad-courses",
      },
      {
        name: "How to find scholarships",
        href: "/useful-links/how-to-find-scholarships",
      },
      {
        name: "Letter of Recommendation",
        href: "/useful-links/letter-of-recommendation",
      },
      {
        name: "Sitemap",
        href: "/sitemap.xml",
      },
    ],
  },

  {
    title: "Exams",
    links: [
      {
        name: "ACT",
        href: "/exams/act",
      },
      {
        name: "SAT",
        href: "/exams/sat",
      },
      {
        name: "GRE",
        href: "/exams/gre",
      },
      {
        name: "GMAT",
        href: "/exams/gmat",
      },
      {
        name: "IELTS",
        href: "/exams/ielts",
      },
      {
        name: "TOEFL",
        href: "/exams/toefl",
      },
      {
        name: "LSAT",
        href: "/exams/lsat",
      },
      {
        name: "MCAT",
        href: "/exams/mcat",
      },
      {
        name: "PTE",
        href: "/exams/pte",
      },
      {
        name: "Duolingo",
        href: "/exams/duolingo",
      },
    ],
  },

  {
    title: "Contact Wayabroad",
    links: [
      {
        name: "Contact",
        href: "/contact",
      },
      {
        name: "Counselling",
        href: "/counselling",
      },
      {
        name: "Partner inquiries",
        href: "/become-partner",
      },
      {
        name: "Student visa information",
        href: "/student-visa",
      },
    ],
  },

  {
    title: "Links",
    links: [
      {
        name: "Organization",
        href: "/organization",
      },
      {
        name: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        name: "Refund Policy",
        href: "/refund-policy",
      },
      {
        name: "Copyright Policy",
        href: "/copyright-policy",
      },
      {
        name: "Terms and Conditions",
        href: "/terms-and-conditions",
      },
      {
        name: "Data Protection Addendum",
        href: "/data-protection-addendum",
      },
    ],
  },
];

export default function Footer() {
  const handleSignup = () => {
    window.dispatchEvent(
      new CustomEvent("open-auth-modal", {
        detail: {
          mode: "signup",
        },
      })
    );
  };

  return (
    <footer className={styles["wayabroad-footer"]}>
      {/* FOOTER LINKS */}
      <div className={styles["footer-container"]}>
        {footerData.map((section) => (
          <div
            className={styles["footer-column"]}
            key={section.title}
          >
            <h3>{section.title}</h3>

            <div className={styles["footer-links"]}>
              {section.links.map((link) => (
                <Link
                  href={link.href}
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTIONS */}
      <div className={styles.footerActions}>
        <Link
          href="/contact"
          className={styles.officeButton}
        >
          <MapPin size={18} />
          Contact Wayabroad for office details
        </Link>

        <button
          className={styles.signupButton}
          type="button"
          onClick={handleSignup}
        >
          Sign up
        </button>
      </div>

      {/* FOOTER BOTTOM */}
      <div className={styles.footerBottom}>
        <div className={styles.footerLine}></div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Wayabroad. All rights reserved.
        </p>

        <div className={styles.socialIcons}>
          <a
            href="https://www.instagram.com/wayabroadpune/"
            className={styles.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={22} />
          </a>

          <a
              href="https://www.facebook.com/Wayabrodpune/"
              className={styles.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>

          <Link
            href="/contact"
            className={styles.contact}
            aria-label="Contact Wayabroad"
          >
            <MessageCircle size={22} />
          </Link>
        </div>
      </div>
    </footer>
  );
}