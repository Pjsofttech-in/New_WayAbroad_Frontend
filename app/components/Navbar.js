"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  UserRound,
  ChevronDown,
  Search,
  CalendarDays,
  Globe2,
  MapPin,
  Building2,
  FileText,
  Home,
  BadgeCheck,
  WalletCards,
} from "lucide-react";

import styles from "./Navbar.module.css";
import LoginModal from "./LoginModal";

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const nav = [
  "Home",
  "MBBS",
  "Courses",
  "Exams",
  "Scholarships",
  "Blogs",
  "Course Finder",
];

/* =========================================================
   STUDY ABROAD
========================================================= */

const studyAbroadCountries = [
  { name: "USA", icon: Globe2 },
  { name: "Canada", icon: MapPin },
  { name: "UK", icon: Building2 },
  { name: "Australia", icon: Globe2 },
  { name: "Germany", icon: Building2 },
  { name: "Ireland", icon: MapPin },
  { name: "New Zealand", icon: Globe2 },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menu, setMenu] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [studyAbroadOpen, setStudyAbroadOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  /* =======================================================
     OPEN AUTH MODAL FROM OTHER COMPONENTS
  ======================================================= */

  useEffect(() => {
    const openAuthModal = (event) => {
      const mode = event.detail?.mode || "login";

      setAuthMode(mode);
      setLoginOpen(true);
    };

    window.addEventListener("open-auth-modal", openAuthModal);

    return () => {
      window.removeEventListener("open-auth-modal", openAuthModal);
    };
  }, []);

  /* =======================================================
     CLOSE ALL MENUS
  ======================================================= */

  const closeMenus = () => {
    setMenu(false);
    setCompanyOpen(false);
    setStudyAbroadOpen(false);
  };

  /* =======================================================
     NAVIGATION LINKS
  ======================================================= */

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
      case "Course Finder":
        return "/course-finder";
      default:
        return "/";
    }
  };

  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const isActive = (item) => {
    switch (item) {
      case "Home":
        return pathname === "/";
      case "MBBS":
        return pathname.startsWith("/mbbs");
      case "Courses":
        return pathname.startsWith("/courses");
      case "Exams":
        return pathname.startsWith("/exams");
      case "Scholarships":
        return pathname.startsWith("/scholarships");
      case "Blogs":
        return pathname.startsWith("/blog");
      case "Course Finder":
        return pathname.startsWith("/course-finder");
      default:
        return false;
    }
  };

  const isStudyAbroadActive = pathname.startsWith("/study-abroad");

  const isCompanyActive =
    pathname.startsWith("/become-partner") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact");

  /* =======================================================
     BOOK FREE COUNSELLING
  ======================================================= */

  const handleCounsellingClick = () => {
    closeMenus();

    if (pathname === "/") {
      const section = document.getElementById("free-counselling");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    router.push("/#free-counselling");
  };

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleLoginClick = () => {
    closeMenus();
    setAuthMode("login");
    setLoginOpen(true);
  };

  const handleCloseModal = () => {
    setLoginOpen(false);
    setAuthMode("login");
  };

  return (
    <>
      <header className={styles.topbar}>
        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          className={styles.brand}
          onClick={closeMenus}
          aria-label="WayAbroad Home"
        >
          <span className={styles.brandName}>
            WAYABROAD
            <span className={styles.brandMark}>✈</span>
          </span>

          <span className={styles.brandTagline}>
            Your Global Education Partner
          </span>
        </Link>

        {/* =================================================
            DESKTOP / MOBILE NAVIGATION
        ================================================= */}

        <nav
          className={`${styles.nav} ${menu ? styles.open : ""}`}
          aria-label="Main navigation"
        >
          {/* HOME + MBBS */}

          {nav.slice(0, 2).map((item) => (
            <Link
              key={item}
              href={getHref(item)}
              className={`${styles.navLink} ${
                isActive(item) ? styles.active : ""
              }`}
              onClick={closeMenus}
            >
              {item}
            </Link>
          ))}

          {/* =================================================
              STUDY ABROAD
          ================================================= */}

          <div className={styles.dropdown}>
            <button
              type="button"
              className={`${styles.dropdownButton} ${
                isStudyAbroadActive ? styles.active : ""
              }`}
              onClick={() => {
                setStudyAbroadOpen((prev) => !prev);
                setCompanyOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={studyAbroadOpen}
            >
              <span>Study Abroad</span>

              <ChevronDown
                size={14}
                strokeWidth={2.2}
                className={
                  studyAbroadOpen ? styles.rotateIcon : styles.dropdownIcon
                }
              />
            </button>

            {studyAbroadOpen && (
              <div className={styles.dropdownMenu} role="menu">
                <div className={styles.menuHeading}>
                  <span>Study Abroad</span>
                  <small>Explore destinations</small>
                </div>

                {studyAbroadCountries.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className={styles.dropdownItem}
                    role="menuitem"
                  >
                    <span className={styles.dropdownItemIcon}>
                      <Icon size={16} />
                    </span>
                    <span>{name}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* COURSES, EXAMS, SCHOLARSHIPS, BLOGS */}

          {nav.slice(2, 6).map((item) => (
            <Link
              key={item}
              href={getHref(item)}
              className={`${styles.navLink} ${
                isActive(item) ? styles.active : ""
              }`}
              onClick={closeMenus}
            >
              {item}
            </Link>
          ))}

          {/* =================================================
              COURSE FINDER
          ================================================= */}

          <Link
            href={getHref("Course Finder")}
            className={`${styles.courseFinder} ${
              isActive("Course Finder") ? styles.finderActive : ""
            }`}
            onClick={closeMenus}
          >
            <Search size={17} strokeWidth={2.2} />
            <span>Course Finder</span>
          </Link>

          {/* =================================================
              COMPANY
          ================================================= */}

          <div className={styles.dropdown}>
            <button
              type="button"
              className={`${styles.dropdownButton} ${
                isCompanyActive ? styles.active : ""
              }`}
              onClick={() => {
                setCompanyOpen((prev) => !prev);
                setStudyAbroadOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={companyOpen}
            >
              <span>Company</span>

              <ChevronDown
                size={14}
                strokeWidth={2.2}
                className={
                  companyOpen ? styles.rotateIcon : styles.dropdownIcon
                }
              />
            </button>

            {companyOpen && (
              <div
                className={`${styles.dropdownMenu} ${styles.companyMenu}`}
                role="menu"
              >
                <Link
                  href="/become-partner"
                  onClick={closeMenus}
                  className={styles.companyItem}
                >
                  <BadgeCheck size={16} />
                  <span>Become Partner</span>
                </Link>

                <Link
                  href="/about"
                  onClick={closeMenus}
                  className={styles.companyItem}
                >
                  <FileText size={16} />
                  <span>About</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMenus}
                  className={styles.companyItem}
                >
                  <Home size={16} />
                  <span>Contact</span>
                </Link>
              </div>
            )}
          </div>

          {/* =================================================
              BOOK FREE COUNSELLING
          ================================================= */}

          <button
            type="button"
            className={styles.counselling}
            onClick={handleCounsellingClick}
          >
            <CalendarDays size={16} strokeWidth={2.2} />
            <span>Book Free Counselling</span>
          </button>
        </nav>

        {/* =================================================
            USER LOGIN
        ================================================= */}

        <button
          type="button"
          className={styles.user}
          onClick={handleLoginClick}
          aria-label="Open Login"
        >
          <UserRound size={19} strokeWidth={2} />
        </button>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => {
            setMenu((prev) => !prev);
            setCompanyOpen(false);
            setStudyAbroadOpen(false);
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={menu}
        >
          {menu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* LOGIN MODAL */}

      {loginOpen && (
        <LoginModal
          onClose={handleCloseModal}
          initialMode={authMode}
        />
      )}
    </>
  );
}
