"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  UserRound,
  ChevronDown,
  Globe2,
  FileText,
  Home,
  BadgeCheck,
  CalendarDays,
} from "lucide-react";

import styles from "./Navbar.module.css";
import { useAuth } from "./AuthProvider";

const LoginModal = dynamic(() => import("./LoginModal"), {
  ssr: false,
});

const nav = [
  "Home",
  "MBBS",
  "Courses",
  "Exams",
  "Scholarships",
  "Blogs",
  "Course Finder",
  "Job Finder",
];

export default function NavbarClient({
  countries,
  countryLoadError,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { status, isAuthenticated, user, logout, refreshAuth } = useAuth();

  const [menu, setMenu] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [studyAbroadOpen, setStudyAbroadOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountAreaRef = useRef(null);

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "Student Account";

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

  useEffect(() => {
    if (!accountMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!accountAreaRef.current?.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountMenuOpen]);

  useEffect(() => {
    setAccountMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setAccountMenuOpen(false);

    if (isAuthenticated) {
      setLoginOpen(false);
      setAuthMode("login");
    }
  }, [isAuthenticated]);

  const closeMenus = () => {
    setMenu(false);
    setCompanyOpen(false);
    setStudyAbroadOpen(false);
    setAccountMenuOpen(false);
  };

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
      case "Job Finder":
        return "/job-finder";
      default:
        return "/";
    }
  };

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
      case "Job Finder":
        return pathname.startsWith("/job-finder");
      default:
        return false;
    }
  };

  const isStudyAbroadActive = pathname.startsWith("/study-abroad");
  const isCompanyActive =
    pathname.startsWith("/become-partner") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact");

  const handleCounsellingClick = (event) => {
    closeMenus();

    if (pathname === "/") {
      const section = document.getElementById("free-counselling");

      if (section) {
        event.preventDefault();
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleProfileClick = () => {
    closeMenus();

    if (status === "loading") {
      refreshAuth();
      return;
    }

    if (isAuthenticated) {
      setAccountMenuOpen((previous) => !previous);
      return;
    }

    setAuthMode("login");
    setLoginOpen(true);
  };

  const handleLogout = () => {
    logout();
    setAccountMenuOpen(false);
    router.replace("/");
  };

  const handleCloseModal = () => {
    setLoginOpen(false);
    setAuthMode("login");
  };

  return (
    <>
      <header className={styles.topbar}>
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

        <nav
          className={`${styles.nav} ${menu ? styles.open : ""}`}
          aria-label="Main navigation"
        >
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

          <div className={styles.dropdown}>
            <button
              type="button"
              className={`${styles.dropdownButton} ${
                isStudyAbroadActive ? styles.active : ""
              }`}
              onClick={() => {
                setStudyAbroadOpen((previous) => !previous);
                setCompanyOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={studyAbroadOpen}
              aria-controls="study-abroad-menu"
            >
              <span>Study Abroad</span>

              <ChevronDown
                size={14}
                strokeWidth={2.2}
                className={
                  studyAbroadOpen
                    ? styles.rotateIcon
                    : styles.dropdownIcon
                }
              />
            </button>

            <div
              id="study-abroad-menu"
              className={styles.dropdownMenu}
              role="menu"
              hidden={!studyAbroadOpen}
            >
              <div className={styles.menuHeading}>
                <span>Study Abroad</span>
                <small>Explore destinations</small>
              </div>

              {countryLoadError ? (
                <div className={styles.dropdownItem} role="status">
                  Unable to load destinations. Please try again later.
                </div>
              ) : countries.length === 0 ? (
                <div className={styles.dropdownItem}>
                  No destinations available
                </div>
              ) : (
                countries.map((country) => (
                  <Link
                    key={country.id}
                    href={`/study-abroad/${encodeURIComponent(country.id)}`}
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={closeMenus}
                  >
                    <span className={styles.dropdownItemIcon}>
                      <Globe2 size={16} />
                    </span>

                    <span>{country.country || country.countryName}</span>
                  </Link>
                ))
              )}
            </div>
          </div>

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

          <Link
            href={getHref("Course Finder")}
            className={`${styles.courseFinder} ${
              isActive("Course Finder") ? styles.finderActive : ""
            }`}
            onClick={closeMenus}
          >
            <span>Course Finder</span>
          </Link>

          <Link
            href={getHref("Job Finder")}
            className={`${styles.jobFinder} ${
              isActive("Job Finder") ? styles.finderActive : ""
            }`}
            onClick={closeMenus}
          >
            <span>Job Finder</span>
          </Link>

          <div className={styles.dropdown}>
            <button
              type="button"
              className={`${styles.dropdownButton} ${
                isCompanyActive ? styles.active : ""
              }`}
              onClick={() => {
                setCompanyOpen((previous) => !previous);
                setStudyAbroadOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={companyOpen}
              aria-controls="company-menu"
            >
              <span>Company</span>

              <ChevronDown
                size={14}
                strokeWidth={2.2}
                className={
                  companyOpen
                    ? styles.rotateIcon
                    : styles.dropdownIcon
                }
              />
            </button>

            <div
              id="company-menu"
              className={`${styles.dropdownMenu} ${styles.companyMenu}`}
              role="menu"
              hidden={!companyOpen}
            >
              <Link
                href="/become-partner"
                onClick={closeMenus}
                className={styles.companyItem}
                role="menuitem"
              >
                <BadgeCheck size={16} />
                <span>Become Partner</span>
              </Link>

              <Link
                href="/about"
                onClick={closeMenus}
                className={styles.companyItem}
                role="menuitem"
              >
                <FileText size={16} />
                <span>About</span>
              </Link>

              <Link
                href="/contact"
                onClick={closeMenus}
                className={styles.companyItem}
                role="menuitem"
              >
                <Home size={16} />
                <span>Contact</span>
              </Link>
            </div>
          </div>

          <Link
            href="/#free-counselling"
            className={styles.counselling}
            onClick={handleCounsellingClick}
          >
            <span>Book Counselling</span>
          </Link>
        </nav>

        <div className={styles.accountArea} ref={accountAreaRef}>
          <button
            type="button"
            className={styles.user}
            onClick={handleProfileClick}
            aria-label={
              isAuthenticated ? "Open student account menu" : "Open Login"
            }
            aria-haspopup={isAuthenticated ? "menu" : undefined}
            aria-expanded={isAuthenticated ? accountMenuOpen : undefined}
            aria-controls={
              isAuthenticated && accountMenuOpen ? "student-account-menu" : undefined
            }
          >
            <UserRound size={19} strokeWidth={2} />
          </button>

          {isAuthenticated && accountMenuOpen && (
            <div
              id="student-account-menu"
              className={styles.accountMenu}
              role="menu"
              aria-label="Student account"
            >
              <div className={styles.accountIdentity}>
                <strong>{displayName}</strong>
                {user?.email && <span>{user.email}</span>}
              </div>
              <Link
                href="/student/dashboard"
                className={styles.accountMenuLink}
                role="menuitem"
                onClick={() => setAccountMenuOpen(false)}
              >
                Student dashboard
              </Link>
              <button
                type="button"
                className={styles.accountMenuLogout}
                role="menuitem"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => {
            setMenu((previous) => !previous);
            setCompanyOpen(false);
            setStudyAbroadOpen(false);
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={menu}
        >
          {menu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {loginOpen && (
        <LoginModal
          onClose={handleCloseModal}
          initialMode={authMode}
        />
      )}
    </>
  );
}
