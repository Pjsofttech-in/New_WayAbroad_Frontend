
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  getScholarshipById,
  getAllScholarships,
  getScholarshipLocations,
  submitScholarshipLead,
} from "../../services/api";

import styles from "../scholarship-details.module.css";

export default function ScholarshipDetails() {
  const params = useParams();
  const router = useRouter();

  const id = params?.slug;

  const [scholarship, setScholarship] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [submitting, setSubmitting] = useState(false);

  const [leadForm, setLeadForm] = useState({
    name: "",
    phoneno: "",
    email: "",
    scholarship: "",
    location: "",
  });

  /* =========================================
     SIDEBAR SECTIONS
  ========================================= */

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Scholarship Details" },
    { id: "eligibility", label: "Eligibility" },
    { id: "benefits", label: "Benefits" },
    { id: "requirements", label: "Requirements" },
    { id: "exam", label: "Exam Details" },
    { id: "faq", label: "FAQs" },
    { id: "documents", label: "Documents" },
    { id: "popular", label: "Popular Scholarships" },
  ];

  /* =========================================
     FETCH SCHOLARSHIP
  ========================================= */

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchScholarship = async () => {
      try {
        setLoading(true);

        const response = await getScholarshipById(id);

        const result =
          response?.data?.scholarship ??
          response?.data ??
          response?.scholarship ??
          response;

        if (!isMounted) return;

        setScholarship(result);

        setLeadForm((prev) => ({
          ...prev,
          scholarship: result?.sname || "",
        }));

        const appliedStatus =
          localStorage.getItem(`applied_${id}`);

        setIsApplied(appliedStatus === "true");
      } catch (error) {
        console.error("Fetch Scholarship Error:", error);

        if (isMounted) {
          setScholarship(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchScholarship();

    return () => {
      isMounted = false;
    };
  }, [id]);

  /* =========================================
     FETCH OTHER SCHOLARSHIPS
  ========================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchScholarships = async () => {
      try {
        const response = await getAllScholarships();

        const result =
          response?.data?.scholarships ??
          response?.data ??
          response;

        if (isMounted) {
          setScholarships(
            Array.isArray(result) ? result : []
          );
        }
      } catch (error) {
        console.error(
          "Error fetching scholarships:",
          error
        );
      }
    };

    fetchScholarships();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================================
     FETCH LOCATIONS
  ========================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchLocations = async () => {
      try {
        const response = await getScholarshipLocations();

        const result =
          response?.data?.locations ??
          response?.data ??
          response;

        if (isMounted) {
          setLocations(
            Array.isArray(result) ? result : []
          );
        }
      } catch (error) {
        console.error("Location Fetch Error:", error);
      }
    };

    fetchLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================================
     SIDEBAR NAVIGATION
  ========================================= */

  const navigateSection = (sectionId) => {
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);
    const content = document.querySelector(`.${styles.profileContent}`);

    if (section && content) {
      const scrollPosition =
        section.offsetTop - content.offsetTop;

      content.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  /* =========================================
     FAQ TOGGLE
  ========================================= */

  const toggleFAQ = (index) => {
    setActiveIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeadForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================
     SUBMIT APPLICATION
  ========================================= */

  const handleSubmitLead = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await submitScholarshipLead(leadForm);

      alert("Applied Successfully!");

      setShowModal(false);
      setIsApplied(true);

      localStorage.setItem(`applied_${id}`, "true");

      setLeadForm({
        name: "",
        phoneno: "",
        email: "",
        scholarship: scholarship?.sname || "",
        location: "",
      });
    } catch (error) {
      console.error("Lead Submit Error:", error);

      alert("Failed to Apply.");
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================
     DOWNLOAD BROCHURE
  ========================================= */

  const handleDownloadPdf = () => {
    if (!isApplied) {
      alert("Please apply first to download the brochure.");
      return;
    }

    if (!scholarship?.pdf) {
      alert("PDF not available.");
      return;
    }

    const pdfUrl = scholarship.pdf.startsWith(
      "data:application/pdf"
    )
      ? scholarship.pdf
      : `data:application/pdf;base64,${scholarship.pdf}`;

    const link = document.createElement("a");

    link.href = pdfUrl;
    link.download = `${
      scholarship.sname || "Scholarship"
    }_Brochure.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* =========================================
     FAQ DATA
  ========================================= */

  let parsedFaq = [];

  if (scholarship?.faq) {
    try {
      parsedFaq =
        typeof scholarship.faq === "string"
          ? JSON.parse(scholarship.faq)
          : scholarship.faq;

      if (!Array.isArray(parsedFaq)) {
        parsedFaq = [];
      }
    } catch (error) {
      console.error("FAQ parsing error:", error);
      parsedFaq = [];
    }
  }

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className={styles.loadingState}>
        Loading scholarship details...
      </div>
    );
  }

  /* =========================================
     EMPTY STATE
  ========================================= */

  if (!scholarship) {
    return (
      <div className={styles.emptyState}>
        <h1>Scholarship not found</h1>

        <button
          type="button"
          onClick={() => router.push("/scholarships")}
        >
          Back to Scholarships
        </button>
      </div>
    );
  }

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className={styles.detailsPage}>

      <div className={styles.scholarshipProfile}>

        {/* =====================================
            LEFT SIDEBAR
        ===================================== */}

        <aside className={styles.profileSidebar}>

          <div className={styles.sidebarHeader}>

            <button
              type="button"
              className={styles.sidebarBack}
              onClick={() => router.push("/scholarships")}
            >
              <span>←</span>
              Back
            </button>

            <div className={styles.sidebarIdentity}>

              <div className={styles.sidebarName}>
                {scholarship.sname || "Scholarship"}
              </div>

              <p>Scholarship Profile</p>

              <span className={styles.sidebarBadge}>
                {isApplied ? "APPLIED" : "AVAILABLE"}
              </span>

            </div>
          </div>

          {/* SIDEBAR MENU */}

          <nav className={styles.sidebarNavigation}>

            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                className={`${styles.sidebarItem} ${
                  activeSection === section.id
                    ? styles.activeSidebarItem
                    : ""
                }`}
                onClick={() =>
                  navigateSection(section.id)
                }
              >

                <span className={styles.sidebarNumber}>
                  {index + 1}
                </span>

                <span className={styles.sidebarLabel}>
                  {section.label}
                </span>

              </button>
            ))}

          </nav>

          {/* SIDEBAR APPLY BUTTON */}

          <button
            type="button"
            className={styles.sidebarApplyBtn}
            onClick={() => setShowModal(true)}
          >
            Apply Now
          </button>

        </aside>

        {/* =====================================
            RIGHT CONTENT
        ===================================== */}

        <main className={styles.profileContent}>

          {/* PROFILE HEADER */}

          <header className={styles.profileTopbar}>

            <div>
              <span className={styles.profileLabel}>
                SCHOLARSHIP PROFILE
              </span>

              <h1>
                {scholarship.sname || "Scholarship Details"}
              </h1>
            </div>

            <button
              type="button"
              className={styles.closeButton}
              onClick={() => router.push("/scholarships")}
              aria-label="Close scholarship profile"
            >
              ×
            </button>

          </header>

          {/* =====================================
              OVERVIEW
          ===================================== */}

          <section
            id="overview"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Scholarship Overview
            </h2>

            <div className={styles.informationGrid}>

              <div className={styles.informationCard}>
                <span>Scholarship For</span>
                <strong>
                  {scholarship.scholarshipFor || "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Scholarship Type</span>
                <strong>
                  {scholarship.scholarshipType || "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Scholarship Amount</span>
                <strong>
                  {scholarship.amount
                    ? `₹${scholarship.amount}`
                    : "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Study Location</span>
                <strong>
                  {scholarship.studyLocation || "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Application Deadline</span>
                <strong>
                  {scholarship.deadline || "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Application Month</span>
                <strong>
                  {scholarship.applyMonth || "-"}
                </strong>
              </div>

            </div>

          </section>

          {/* =====================================
              SCHOLARSHIP DETAILS
          ===================================== */}

          <section
            id="details"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Scholarship Details
            </h2>

            <div className={styles.informationGrid}>

              <div className={styles.informationCard}>
                <span>Category</span>
                <strong>
                  {scholarship.scholarshipcategory || "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Qualification</span>
                <strong>
                  {scholarship.qualification || "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Test Date</span>
                <strong>
                  {scholarship.testDate || "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Test Result</span>
                <strong>
                  {scholarship.testResult || "-"}
                </strong>
              </div>

            </div>

            {scholarship.link && (
              <a
                href={scholarship.link}
                target="_blank"
                rel="noreferrer"
                className={styles.officialLink}
              >
                Visit Official Website →
              </a>
            )}

          </section>

          {/* =====================================
              ELIGIBILITY
          ===================================== */}

          <section
            id="eligibility"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Eligibility
            </h2>

            <div className={styles.descriptionCard}>
              <p>
                {scholarship.eligibility || "No eligibility information available."}
              </p>
            </div>

          </section>

          {/* =====================================
              BENEFITS
          ===================================== */}

          <section
            id="benefits"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Scholarship Benefits
            </h2>

            <div className={styles.descriptionCard}>
              <p>
                {scholarship.benefits || "No benefits information available."}
              </p>
            </div>

          </section>

          {/* =====================================
              REQUIREMENTS
          ===================================== */}

          <section
            id="requirements"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Special Requirements
            </h2>

            <div className={styles.descriptionCard}>
              <p>
                {scholarship.specialRequirement ||
                  "No special requirements available."}
              </p>
            </div>

          </section>

          {/* =====================================
              EXAM DETAILS
          ===================================== */}

          <section
            id="exam"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Exam Details
            </h2>

            <div className={styles.informationGrid}>

              <div className={styles.informationCard}>
                <span>Test Date</span>
                <strong>
                  {scholarship.testDate || "-"}
                </strong>
              </div>

              <div className={styles.informationCard}>
                <span>Test Result</span>
                <strong>
                  {scholarship.testResult || "-"}
                </strong>
              </div>

            </div>

          </section>

          {/* =====================================
              DOCUMENTS
          ===================================== */}

          <section
            id="documents"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Scholarship Documents
            </h2>

            <div className={styles.documentCard}>

              <div>
                <h3>
                  {scholarship.sname || "Scholarship"} Brochure
                </h3>

                <p>
                  {isApplied
                    ? "Your scholarship brochure is available."
                    : "Apply for this scholarship to unlock the brochure."}
                </p>
              </div>

              <button
                type="button"
                className={styles.documentButton}
                onClick={handleDownloadPdf}
              >
                Download PDF
              </button>

            </div>

          </section>

          {/* =====================================
              ABOUT SCHOLARSHIP
          ===================================== */}

          <section className={styles.profileSection}>

            <h2 className={styles.sectionHeading}>
              About This Scholarship
            </h2>

            <div className={styles.descriptionCard}>
              <p>
                {scholarship.description ||
                  "No description available."}
              </p>
            </div>

          </section>

          {/* =====================================
              FAQ
          ===================================== */}

          <section
            id="faq"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Frequently Asked Questions
            </h2>

            {parsedFaq.length > 0 ? (
              parsedFaq.map((item, index) => (
                <div
                  key={index}
                  className={styles.faqItem}
                >

                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(index)}
                  >

                    <span>
                      {item.question}
                    </span>

                    <span
                      className={`${styles.faqIcon} ${
                        activeIndex === index
                          ? styles.faqIconOpen
                          : ""
                      }`}
                    >
                      +
                    </span>

                  </button>

                  {activeIndex === index && (
                    <div className={styles.faqAnswer}>
                      {item.answer}
                    </div>
                  )}

                </div>
              ))
            ) : (
              <p className={styles.emptyText}>
                No FAQs available.
              </p>
            )}

          </section>

          {/* =====================================
              POPULAR SCHOLARSHIPS
          ===================================== */}

          <section
            id="popular"
            className={styles.profileSection}
          >

            <h2 className={styles.sectionHeading}>
              Popular Scholarships
            </h2>

            <div className={styles.popularGrid}>

              {scholarships
                .filter(
                  (item) =>
                    String(item.id) !== String(id)
                )
                .slice(0, 6)
                .map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/scholarship/${item.id}`}
                    className={styles.popularCard}
                  >

                    <span className={styles.popularNumber}>
                      {index + 1}
                    </span>

                    <strong>
                      {item.sname || item.name}
                    </strong>

                    <span className={styles.popularLink}>
                      View Details →
                    </span>

                  </Link>
                ))}

            </div>

          </section>

        </main>

      </div>

      {/* =====================================
          APPLICATION MODAL
      ===================================== */}

      {showModal && (
        <div className={styles.modalOverlay}>

          <div className={styles.modalBox}>

            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setShowModal(false)}
              aria-label="Close application form"
            >
              ×
            </button>

            <h2 className={styles.modalTitle}>
              Apply for Scholarship
            </h2>

            <form
              onSubmit={handleSubmitLead}
              className={styles.modalForm}
            >

              <div className={styles.formGroup}>
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={leadForm.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phoneno">
                  Phone Number
                </label>

                <input
                  id="phoneno"
                  type="tel"
                  name="phoneno"
                  value={leadForm.phoneno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={leadForm.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="scholarship">
                  Scholarship
                </label>

                <input
                  id="scholarship"
                  type="text"
                  name="scholarship"
                  value={leadForm.scholarship}
                  readOnly
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="location">
                  Location
                </label>

                <select
                  id="location"
                  name="location"
                  value={leadForm.location}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Location
                  </option>

                  {locations.map((loc, index) => (
                    <option
                      key={loc.id ?? index}
                      value={
                        loc.name ??
                        loc.location ??
                        loc
                      }
                    >
                      {loc.name ??
                        loc.location ??
                        loc}
                    </option>
                  ))}

                </select>
              </div>

              <div className={styles.modalButtons}>

                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}
