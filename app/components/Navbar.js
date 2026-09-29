"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  UserRound,
  ChevronDown,
} from "lucide-react";

import styles from "./Navbar.module.css";
import LoginModal from "./LoginModal";

const nav = [
  "Home",
  "MBBS",
  "Courses",
  "Exams",
  "Scholarships",
  "Blogs",
];

const studyAbroadCountries = [
  "USA",
  "Canada",
  "UK",
  "Australia",
  "Germany",
  "Ireland",
  "New Zealand",
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menu, setMenu] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [studyAbroadOpen, setStudyAbroadOpen] = useState(false);

  /* ========================================
     LOGIN / SIGNUP MODAL
  ======================================== */

  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  /* ========================================
     OPEN LOGIN / SIGNUP FROM ANY COMPONENT
  ======================================== */

  useEffect(() => {
    const openAuthModal = (event) => {
      const mode = event.detail?.mode || "login";

      setAuthMode(mode);
      setLoginOpen(true);
    };

    window.addEventListener(
      "open-auth-modal",
      openAuthModal
    );

    return () => {
      window.removeEventListener(
        "open-auth-modal",
        openAuthModal
      );
    };
  }, []);

  /* ========================================
     NAVIGATION LINKS
  ======================================== */

  const getHref = (item) => {
    switch (item) {
      case "Home":
        return "/";

      case "MBBS":
        return "/mbbs";

      case "Courses":
        return "/courses";

      case "Exams":
        return "/exams";

      case "Scholarships":
        return "/scholarships";

      case "Blogs":
        return "/blog";

      default:
        return "/";
    }
  };

  /* ========================================
     ACTIVE NAVIGATION
  ======================================== */

  const isActive = (item) => {
    switch (item) {
      case "Home":
        return pathname === "/";

      case "MBBS":
        return pathname === "/mbbs";

      case "Courses":
        return pathname === "/courses";

      case "Exams":
        return pathname === "/exams";

      case "Scholarships":
        return pathname === "/scholarships";

      case "Blogs":
        return pathname.startsWith("/blog");

      default:
        return false;
    }
  };

  /* ========================================
     STUDY ABROAD ACTIVE
  ======================================== */

  const isStudyAbroadActive =
    pathname.startsWith("/study-abroad");

  /* ========================================
     BOOK FREE COUNSELLING
  ======================================== */

  const handleCounsellingClick = () => {
    setMenu(false);
    setCompanyOpen(false);
    setStudyAbroadOpen(false);

    /* If already on homepage */

    if (pathname === "/") {
      const section = document.getElementById(
        "free-counselling"
      );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    /* Go to homepage */

    router.push("/#free-counselling");
  };

  /* ========================================
     OPEN LOGIN
  ======================================== */

  const handleLoginClick = () => {
    setAuthMode("login");
    setLoginOpen(true);
  };

  /* ========================================
     CLOSE MODAL
  ======================================== */

  const handleCloseModal = () => {
    setLoginOpen(false);
    setAuthMode("login");
  };

  return (
    <>
      <header className={styles.topbar}>

        {/* =================================
            LOGO
        ================================= */}

        <Link
          href="/"
          className={styles.brand}
          onClick={() => {
            setMenu(false);
            setCompanyOpen(false);
            setStudyAbroadOpen(false);
          }}
        >
          WAYABROAD
        </Link>

        {/* =================================
            NAVIGATION
        ================================= */}

        <nav
          className={`${styles.nav} ${
            menu ? styles.open : ""
          }`}
        >

          {/* =================================
              NORMAL NAVIGATION
          ================================= */}

          {nav.slice(0, 2).map((item) => (
            <Link
              key={item}
              href={getHref(item)}
              className={
                isActive(item)
                  ? styles.active
                  : ""
              }
              onClick={() => {
                setMenu(false);
                setCompanyOpen(false);
                setStudyAbroadOpen(false);
              }}
            >
              {item}
            </Link>
          ))}

          {/* =================================
              STUDY ABROAD DROPDOWN
          ================================= */}

          <div
            className={styles.studyAbroadDropdown}
          >
            <button
              type="button"
              className={
                isStudyAbroadActive
                  ? styles.active
                  : ""
              }
              aria-haspopup="menu"
              aria-expanded={studyAbroadOpen}
              aria-controls="study-abroad-menu"
              onClick={() => {
                setStudyAbroadOpen(
                  (prev) => !prev
                );

                setCompanyOpen(false);
              }}
            >
              Study Abroad

              <ChevronDown size={12} />
            </button>

            {studyAbroadOpen && (
              <div
                id="study-abroad-menu"
                className={
                  styles.studyAbroadMenu
                }
                role="menu"
              >
                {studyAbroadCountries.map(
                  (country) => (
                    <span
                      key={country}
                      className={styles.studyAbroadItem}
                      role="menuitem"
                      aria-disabled="true"
                    >
                      {country}
                    </span>
                  )
                )}
              </div>
            )}
          </div>

          {/* =================================
              REMAINING NAVIGATION
          ================================= */}

          {nav.slice(2).map((item) => (
            <Link
              key={item}
              href={getHref(item)}
              className={
                isActive(item)
                  ? styles.active
                  : ""
              }
              onClick={() => {
                setMenu(false);
                setCompanyOpen(false);
                setStudyAbroadOpen(false);
              }}
            >
              {item}
            </Link>
          ))}

          {/* =================================
              COMPANY DROPDOWN
          ================================= */}

          <div
            className={styles.companyDropdown}
          >
            <button
              type="button"
              className={
                pathname.startsWith(
                  "/become-partner"
                ) ||
                pathname.startsWith("/about") ||
                pathname.startsWith("/contact")
                  ? styles.active
                  : ""
              }
              aria-haspopup="menu"
              aria-expanded={companyOpen}
              aria-controls="company-menu"
              onClick={() => {
                setCompanyOpen(
                  (prev) => !prev
                );

                setStudyAbroadOpen(false);
              }}
            >
              Company

              <ChevronDown size={12} />
            </button>

            {companyOpen && (
              <div
                className={styles.companyMenu}
              >
                <Link
                  href="/become-partner"
                  onClick={() => {
                    setCompanyOpen(false);
                    setMenu(false);
                  }}
                >
                  Become Partner
                </Link>

                <Link
                  href="/about"
                  onClick={() => {
                    setCompanyOpen(false);
                    setMenu(false);
                  }}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  onClick={() => {
                    setCompanyOpen(false);
                    setMenu(false);
                  }}
                >
                  Contact
                </Link>
              </div>
            )}
          </div>

          {/* =================================
              BOOK FREE COUNSELLING
          ================================= */}

          <button
            type="button"
            className={styles.counselling}
            onClick={handleCounsellingClick}
          >
            Book Free Counselling
          </button>

        </nav>

        {/* =================================
            USER / LOGIN
        ================================= */}

        <button
          type="button"
          className={styles.user}
          onClick={handleLoginClick}
          aria-label="Open Login"
        >
          <UserRound size={18} />
        </button>

        {/* =================================
            MOBILE MENU
        ================================= */}

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => {
            setMenu((prev) => !prev);
            setCompanyOpen(false);
            setStudyAbroadOpen(false);
          }}
          aria-label="Toggle menu"
        >
          {menu ? <X /> : <Menu />}
        </button>

      </header>

      {/* =================================
          LOGIN / SIGNUP MODAL
      ================================= */}

      {loginOpen && (
        <LoginModal
          onClose={handleCloseModal}
          initialMode={authMode}
        />
      )}
    </>
  );
}