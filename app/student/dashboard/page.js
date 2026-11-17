"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessagesSquare,
  Plane,
  Settings,
  UserRound,
  X,
} from "lucide-react";

import { useAuth } from "../../components/AuthProvider";
import styles from "./dashboard.module.css";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#overview" },
  { id: "profile", label: "My Profile", icon: UserRound, href: "#student-information" },
  { id: "education", label: "My Education", icon: BookOpenCheck, href: "/courses" },
  { id: "scholarships", label: "Scholarships", icon: Award, href: "/scholarships" },
  { id: "admissions", label: "Admission Forms", icon: GraduationCap, href: "#admission-forms" },
  { id: "documents", label: "Documents", icon: FileText, href: "#recent-activity" },
  { id: "counselling", label: "Counselling", icon: MessagesSquare, href: "/counselling" },
  { id: "jobs", label: "Job Applications", icon: BriefcaseBusiness, href: "/job-finder" },
  { id: "settings", label: "Settings", icon: Settings, href: "#account-settings" },
];

function displayProfileValue(value) {
  if (value === undefined || value === null || value === "") {
    return "Not provided";
  }

  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : JSON.stringify(value);
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const { status, isAuthenticated, user, logout } = useAuth();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      window.dispatchEvent(
        new CustomEvent("open-auth-modal", {
          detail: { mode: "login" },
        })
      );
      router.replace("/");
    }
  }, [router, status]);

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigation = (item) => {
    setActiveItem(item.id);
    closeMenu();
  };

  if (status !== "authenticated" || !isAuthenticated) {
    return (
      <main className={styles.authState}>
        <span className={styles.spinner} aria-hidden="true" />
        <p>Checking your account...</p>
      </main>
    );
  }

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "Student account";
  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  const firstName = user?.firstName || "there";

  return (
    <main className={styles.dashboard}>
      <div className={styles.dashboardLayout}>
        {isMenuOpen && (
          <button
            type="button"
            className={styles.sidebarBackdrop}
            aria-label="Close dashboard navigation backdrop"
            onClick={closeMenu}
          />
        )}

        <aside
          className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}
          aria-label="Student dashboard navigation"
        >
          <Link href="/" className={styles.brand} onClick={closeMenu}>
            <span>WAYABROAD</span>
            <Plane size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className={styles.sidebarClose}
            aria-label="Close dashboard navigation"
            onClick={closeMenu}
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div className={styles.sidebarStudent}>
            <div className={styles.sidebarAvatar} aria-hidden="true">
              {initials || <UserRound size={18} />}
            </div>
            <div className={styles.sidebarIdentity}>
              <strong>{displayName}</strong>
              <span>Student Account</span>
            </div>
          </div>

          <p className={styles.navCaption}>STUDENT PORTAL</p>
          <nav className={styles.sideNavigation}>
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${styles.navLink} ${activeItem === item.id ? styles.navLinkActive : ""}`}
                  aria-current={activeItem === item.id ? "page" : undefined}
                  onClick={() => handleNavigation(item)}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                  {activeItem === item.id && (
                    <ChevronRight size={15} aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className={styles.sidebarLogout}
            onClick={handleLogout}
          >
            <LogOut size={18} aria-hidden="true" />
            <span>Log out</span>
          </button>
        </aside>

        <div className={styles.mainContent}>
          <header className={styles.pageHeader} id="overview">
            <div className={styles.headerTitle}>
              <button
                type="button"
                className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ""}`}
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={isMenuOpen ? "Close dashboard navigation" : "Open dashboard navigation"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
              <div>
                <p className={styles.eyebrow}>STUDENT DASHBOARD</p>
                <h1>Welcome, {firstName}!</h1>
                <p className={styles.headerText}>
                  Your study abroad account overview.
                </p>
              </div>
            </div>
            <div className={styles.headerProfile}>
              <div className={styles.headerIdentity}>
                <strong>{displayName}</strong>
                <span>Student Account</span>
              </div>
              <span className={styles.headerAvatar} aria-hidden="true">
                {initials || <UserRound size={18} />}
              </span>
            </div>
          </header>

          <div className={styles.contentBody}>
            <section className={styles.statsGrid} aria-label="Account summary">
              <article
                className={`${styles.statCard} ${styles.scholarshipStat}`}
                id="scholarship-enquiries"
              >
                <span className={styles.statIcon} aria-hidden="true">
                  <Award size={23} />
                </span>
                <div>
                  <p>Scholarship Enquiries</p>
                  <strong>—</strong>
                </div>
                <span className={styles.statNote}>No enquiry data available</span>
              </article>
              <article
                className={`${styles.statCard} ${styles.admissionStat}`}
                id="admission-forms"
              >
                <span className={styles.statIcon} aria-hidden="true">
                  <FileText size={23} />
                </span>
                <div>
                  <p>Admission Forms</p>
                  <strong>—</strong>
                </div>
                <span className={styles.statNote}>No form data available</span>
              </article>
            </section>

            <section
              className={styles.informationSection}
              id="student-information"
            >
              <div className={styles.sectionHeading}>
                <div>
                  <p className={styles.eyebrow}>YOUR ACCOUNT</p>
                  <h2>Student Information</h2>
                </div>
              </div>
              <div className={styles.informationCard}>
                <div className={styles.informationItem}>
                  <span>EMAIL</span>
                  {user?.email ? (
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  ) : (
                    <strong>Not provided</strong>
                  )}
                </div>
                <div className={styles.informationItem}>
                  <span>CONTINENT</span>
                  <strong>{displayProfileValue(user?.continent)}</strong>
                </div>
                <div className={styles.informationItem}>
                  <span>COURSE</span>
                  <strong>{displayProfileValue(user?.course)}</strong>
                </div>
              </div>
            </section>

            <section className={styles.activitySection} id="recent-activity">
              <div className={styles.sectionHeading}>
                <div>
                  <p className={styles.eyebrow}>YOUR JOURNEY</p>
                  <h2>Recent Activity</h2>
                </div>
              </div>
              <div className={styles.activityEmpty}>
                <FileText size={20} aria-hidden="true" />
                <p>No recent activity is available for this account.</p>
              </div>
            </section>

            <section className={styles.accountSection} id="account-settings">
              <div className={styles.accountIcon} aria-hidden="true">
                <Settings size={19} />
              </div>
              <div>
                <h2>Account Settings</h2>
                <p>Signed in as {user?.email || "Email not provided"}</p>
              </div>
              <button
                type="button"
                className={styles.accountLogout}
                onClick={handleLogout}
              >
                <LogOut size={17} aria-hidden="true" />
                <span>Log out</span>
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}