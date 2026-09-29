"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  getScholarshipById,
  getAllScholarships,
  getScholarshipLocations,
  submitScholarshipLead,
} from "../../../services/api";

import styles from "../../../scholarships/scholarships.module.css";

export default function ScholarshipDetails() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [scholarship, setScholarship] = useState(null);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [leadForm, setLeadForm] = useState({
    name: "",
    phoneno: "",
    email: "",
    scholarship: "",
    location: "",
  });

  /* ========================================
     SLUG
  ======================================== */

  const createSlug = (name) => {
    return name
      ?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  /* ========================================
     FAQ TOGGLE
  ======================================== */

  const toggleFAQ = (index) => {
    setActiveIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  /* ========================================
     FETCH SCHOLARSHIP
  ======================================== */

  useEffect(() => {
    if (!id) return;

    const fetchScholarship = async () => {
      try {
        setLoading(true);

        const result = await getScholarshipById(id);

        setScholarship(result);

        setLeadForm((prev) => ({
          ...prev,
          scholarship: result?.sname || "",
        }));

        const appliedStatus = localStorage.getItem(
          `applied_${id}`
        );

        setIsApplied(appliedStatus === "true");
      } catch (error) {
        console.error(
          "Fetch Scholarship Error:",
          error
        );

        alert("Scholarship not found!");

        router.push("/scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id, router]);

  /* ========================================
     FETCH OTHER SCHOLARSHIPS
  ======================================== */

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const result = await getAllScholarships();

        if (Array.isArray(result)) {
          setData(result);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(
          "Error fetching scholarships:",
          error
        );

        setData([]);
      }
    };

    fetchAll();
  }, []);

  /* ========================================
     FETCH LOCATIONS
  ======================================== */

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const result = await getScholarshipLocations();

        if (Array.isArray(result)) {
          setLocations(result);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error(
          "Location Fetch Error:",
          error
        );

        setLocations([]);
      }
    };

    fetchLocations();
  }, []);

  /* ========================================
     LOADING
  ======================================== */

  if (loading) {
    return (
      <p className={styles.loadingText}>
        Loading...
      </p>
    );
  }

  /* ========================================
     NO DATA
  ======================================== */

  if (!scholarship) {
    return (
      <p className={styles.noDataText}>
        No data found.
      </p>
    );
  }

  /* ========================================
     LOGO
  ======================================== */

  let logoUrl = "/defaultScholarship.png";

  if (
    typeof scholarship.logo === "string" &&
    scholarship.logo.length > 0
  ) {
    logoUrl = scholarship.logo.startsWith(
      "data:image"
    )
      ? scholarship.logo
      : `data:image/png;base64,${scholarship.logo}`;
  }

  /* ========================================
     FORM CHANGE
  ======================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeadForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ========================================
     SUBMIT LEAD
  ======================================== */

  const handleSubmitLead = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await submitScholarshipLead(leadForm);

      alert("Applied Successfully ✅");

      setShowModal(false);
      setIsApplied(true);

      localStorage.setItem(
        `applied_${id}`,
        "true"
      );

      setLeadForm({
        name: "",
        phoneno: "",
        email: "",
        scholarship: scholarship?.sname || "",
        location: "",
      });
    } catch (error) {
      console.error(
        "Lead Submit Error:",
        error
      );

      alert("Failed to Apply ❌");
    } finally {
      setSubmitting(false);
    }
  };

  /* ========================================
     DOWNLOAD BROCHURE
  ======================================== */

  const handleDownloadPdf = () => {
    if (!isApplied) {
      alert(
        "Please Apply first to download brochure ❗"
      );

      return;
    }

    if (!scholarship.pdf) {
      alert("PDF not available!");

      return;
    }

    const pdfUrl =
      scholarship.pdf.startsWith(
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

  /* ========================================
     FAQ
  ======================================== */

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
      console.error(
        "FAQ parsing error:",
        error
      );

      parsedFaq = [];
    }
  }

  /* ========================================
     RENDER
  ======================================== */

  return (
    <div className={styles.detailsPage}>

      {/* ==================================
          BANNER
      ================================== */}

      <div className={styles.bannerSection}>
        <img
          src={logoUrl}
          alt="Scholarship Banner"
          className={styles.bannerImg}
        />

        <div className={styles.bannerOverlay}>

          <button
            type="button"
            className={styles.bannerBackBtn}
            onClick={() =>
              router.push("/scholarships")
            }
          >
            ← Back
          </button>

          <h1 className={styles.bannerTitle}>
            {scholarship.sname ||
              "Unnamed Scholarship"}
          </h1>

          <div className={styles.bannerButtons}>

            <button
              type="button"
              className={styles.applyBtn}
              onClick={() =>
                setShowModal(true)
              }
            >
              Apply Now
            </button>

            <button
              type="button"
              className={`${styles.brochureBtn} ${
                !isApplied
                  ? styles.disabledBtn
                  : ""
              }`}
              onClick={handleDownloadPdf}
            >
              Download Brochure
            </button>

          </div>

          {isApplied && (
            <p className={styles.appliedText}>
              ✅ Applied Successfully.
              Brochure unlocked.
            </p>
          )}

        </div>
      </div>

      {/* ==================================
          DETAILS
      ================================== */}

      <div className={styles.detailSplit}>

        <div className={styles.detailsContent}>

          <h2 className={styles.detailsHeading}>
            Scholarship Details
          </h2>

          <div className={styles.detailsGrid}>

            <p>
              <b>Scholarship For:</b>{" "}
              {scholarship.scholarshipFor || "-"}
            </p>

            <p>
              <b>Scholarship Type:</b>{" "}
              {scholarship.scholarshipType || "-"}
            </p>

            <p>
              <b>Category:</b>{" "}
              {scholarship.scholarshipcategory ||
                "-"}
            </p>

            <p>
              <b>Study Location:</b>{" "}
              {scholarship.studyLocation || "-"}
            </p>

            <p>
              <b>Required Qualification:</b>{" "}
              {scholarship.qualification || "-"}
            </p>

            <p>
              <b>Amount:</b>{" "}
              ₹{scholarship.amount || "0"}
            </p>

            <p>
              <b>Test Date:</b>{" "}
              {scholarship.testDate || "-"}
            </p>

            <p>
              <b>Deadline:</b>{" "}
              {scholarship.deadline || "-"}
            </p>

            <p>
              <b>Apply Month:</b>{" "}
              {scholarship.applyMonth || "-"}
            </p>

            <p>
              <b>Test Result:</b>{" "}
              {scholarship.testResult || "-"}
            </p>

            {scholarship.link && (
              <p>
                <b>Official Link:</b>{" "}

                <a
                  href={scholarship.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Website
                </a>
              </p>
            )}

          </div>

          <br />

          <p className={styles.details}>
            <b>
              Eligibility:
              <br />
            </b>

            {scholarship.eligibility || "-"}
          </p>

          <br />

          <p className={styles.details}>
            <b>
              Special Requirement:
              <br />
            </b>

            {scholarship.specialRequirement ||
              "-"}
          </p>

          <br />

          <p className={styles.details}>
            <b>
              Benefits:
              <br />
            </b>

            {scholarship.benefits || "-"}
          </p>

          <br />

          <p className={styles.details}>
            <b>
              Exam Details:
              <br />
            </b>

            {scholarship.examDetails || "-"}
          </p>

          <br />

          <p className={styles.details}>
            <b>
              Details:
              <br />
            </b>

            {scholarship.description ||
              "No description available"}
          </p>

          <button
            type="button"
            className={styles.applyBtnBottom}
            onClick={() =>
              setShowModal(true)
            }
          >
            Apply Now
          </button>

          {/* ==================================
              FAQ
          ================================== */}

          <div className={styles.faqSection}>

            <h2 className={styles.detailsFAQ}>
              Frequently Asked Questions:
            </h2>

            {parsedFaq.length > 0 ? (
              parsedFaq.map((item, index) => (
                <div
                  key={index}
                  className={styles.faqItem}
                >

                  <div
                    className={styles.faqQuestion}
                    onClick={() =>
                      toggleFAQ(index)
                    }
                  >

                    <span>
                      Q. {item.question}
                    </span>

                    <span
                      className={`${styles.faqIcon} ${
                        activeIndex === index
                          ? styles.open
                          : ""
                      }`}
                    >
                      +
                    </span>

                  </div>

                  <div
                    className={`${styles.faqAnswer} ${
                      activeIndex === index
                        ? styles.show
                        : ""
                    }`}
                  >
                    A. {item.answer}
                  </div>

                </div>
              ))
            ) : (
              <p>No FAQs available.</p>
            )}

          </div>

        </div>

        {/* ==================================
            POPULAR SCHOLARSHIPS
        ================================== */}

        <div className={styles.scholarshipLinks}>

          <h2 className={styles.linksH2}>
            Popular Scholarships
          </h2>

          {data
            .filter(
              (item) =>
                String(item.id) !== String(id)
            )
            .map((item, index) => (

              <div
                className={styles.linksDiv}
                key={item.id}
              >

                <Link
                  href={`/scholarship/${item.id}/${createSlug(
                    item.sname
                  )}`}
                >
                  {index + 1}:{" "}
                  {item.sname}
                </Link>

              </div>

            ))}

        </div>

      </div>

      {/* ==================================
          APPLICATION MODAL
      ================================== */}

      {showModal && (

        <div className={styles.modalOverlay}>

          <div className={styles.modalBox}>

            <h2 className={styles.modalTitle}>
              Apply for Scholarship
            </h2>

            <form
              onSubmit={handleSubmitLead}
              className={styles.modalForm}
            >

              {/* NAME */}

              <div className={styles.formGroup}>

                <label htmlFor="name">
                  Name
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

              {/* PHONE */}

              <div className={styles.formGroup}>

                <label htmlFor="phoneno">
                  Phone No
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

              {/* EMAIL */}

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

              {/* SCHOLARSHIP */}

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

              {/* LOCATION */}

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

              {/* BUTTONS */}

              <div className={styles.modalButtons}>

                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}