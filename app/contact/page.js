"use client";

import { useEffect, useState } from "react";

import {
  submitFormSubmission,
  getAllContinents,
  getAllCourseNames,
} from "../services/api";

import styles from "./contact.module.css";

export default function ContactPage() {
  const [continents, setContinents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    continentId: "",
    courseId: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     FETCH CONTINENTS AND COURSES
  ========================================================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const [continentsData, coursesData] =
          await Promise.all([
            getAllContinents(),
            getAllCourseNames(),
          ]);

        setContinents(continentsData || []);
        setCourses(coursesData || []);
      } catch (err) {
        console.error(
          "Failed to load dropdown data:",
          err
        );

        setError(
          err.message ||
            "Failed to load continents and courses."
        );
      }
    };

    loadData();
  }, []);

  /* =========================================================
     HANDLE INPUT CHANGES
  ========================================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================================================
     SUBMIT CONTACT FORM
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert(
        "Please agree to the terms & privacy policy."
      );
      return;
    }

    if (!form.continentId) {
      alert("Please select a continent.");
      return;
    }

    if (!form.courseId) {
      alert("Please select a course.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await submitFormSubmission({
        formType: "CONTACT_US",

        name: form.name,

        email: form.email,

        phoneNumber: form.phone,

        continentId: Number(
          form.continentId
        ),

        courseId: Number(
          form.courseId
        ),

        password: null,

        createdByEmail: null,

        role: null,

        branchCode: null,

        status: "NEW",
      });

      setMessage(
        "Your consultation request has been submitted successfully!"
      );

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
        "Contact Form Error:",
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
    <main className={styles.contactPage}>

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <section className={styles.left}>

        {/* Decorative background */}
        <div className={styles.leftDecoration}></div>

        <div className={styles.leftContent}>

          {/* Small heading */}
          <div className={styles.eyebrow}>
            WAYABROAD EDUCATION
          </div>

          {/* Main heading */}
          <h1>
            Take The First Step To
            <span>STUDY ABROAD</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Get expert guidance for universities,
            courses, admissions, scholarships and
            your complete study-abroad journey.
          </p>


          {/* =================================================
              OFFICE ADDRESS
          ================================================= */}

          <div className={styles.addressCard}>

            <div className={styles.addressIcon}>
              📍
            </div>

            <div className={styles.addressContent}>

              <div className={styles.cardLabel}>
                OUR OFFICE
              </div>

              <p>
                1482, 2nd Floor, White House
                Building, In front of Tilak
                Smarak, Near SP College,
                Tilak Road, Sadashiv Peth,
                Pune - 411030
              </p>

            </div>

          </div>


          {/* =================================================
              CONTACT DETAILS
          ================================================= */}

          <div className={styles.contactDetails}>

            <h3>
              CONTACT OUR EXPERTS
            </h3>


            {/* EMAIL */}

            <a
              href="mailto:info@wayabroad.in"
              className={styles.emailCard}
            >

              <div className={styles.contactIcon}>
                ✉
              </div>

              <div>
                <span className={styles.smallLabel}>
                  EMAIL
                </span>

                <strong>
                  info@wayabroad.in
                </strong>
              </div>

            </a>


            {/* PHONE NUMBERS */}

            <div className={styles.phoneList}>

              <a
                href="tel:+919545456101"
                className={styles.phoneItem}
              >
                <span className={styles.phoneIcon}>
                  ☎
                </span>

                <span className={styles.phoneName}>
                  Abroad Education
                </span>

                <span className={styles.phoneNumber}>
                  +91 9545456101
                </span>
              </a>


              <a
                href="tel:+917350729801"
                className={styles.phoneItem}
              >
                <span className={styles.phoneIcon}>
                  ☎
                </span>

                <span className={styles.phoneName}>
                  Abroad Jobs
                </span>

                <span className={styles.phoneNumber}>
                  +91 7350729801
                </span>
              </a>


              <a
                href="tel:+919371610111"
                className={styles.phoneItem}
              >
                <span className={styles.phoneIcon}>
                  ☎
                </span>

                <span className={styles.phoneName}>
                  Language Admission
                </span>

                <span className={styles.phoneNumber}>
                  +91 9371610111
                </span>
              </a>


              <a
                href="tel:+919011758101"
                className={styles.phoneItem}
              >
                <span className={styles.phoneIcon}>
                  ☎
                </span>

                <span className={styles.phoneName}>
                  MBBS Admission
                </span>

                <span className={styles.phoneNumber}>
                  +91 9011758101
                </span>
              </a>


              <a
                href="tel:+919923570901"
                className={styles.phoneItem}
              >
                <span className={styles.phoneIcon}>
                  ☎
                </span>

                <span className={styles.phoneName}>
                  Abroad Partner
                </span>

                <span className={styles.phoneNumber}>
                  +91 9923570901
                </span>
              </a>

            </div>

          </div>


          {/* Bottom message */}

          <div className={styles.trustMessage}>
            <span>✦</span>

            <span>
              Your trusted partner for studying abroad
            </span>
          </div>

        </div>
      </section>


      {/* =====================================================
          RIGHT SIDE - FORM
      ===================================================== */}

      <section className={styles.right}>

        <div className={styles.formHeader}>

          <span className={styles.formEyebrow}>
            FREE CONSULTATION
          </span>

          <h2>
            Start Your Study Abroad Journey
          </h2>

          <p>
            Tell us a little about yourself and
            our counsellors will help you take
            the next step.
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <input
            name="name"
            placeholder="Enter Full Name*"
            value={form.name}
            onChange={handleChange}
            required
          />


          {/* EMAIL */}

          <input
            name="email"
            type="email"
            placeholder="Enter Email*"
            value={form.email}
            onChange={handleChange}
            required
          />


          {/* PHONE */}

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number*"
            value={form.phone}
            onChange={handleChange}
            required
          />


          {/* CONTINENT */}

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
              Select Continent*
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


          {/* COURSE */}

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


          {/* TERMS */}

          <label
            className={styles.checkbox}
          >
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />

            <span>
              I have read and agreed to
              terms & privacy policy
            </span>
          </label>


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Book your Free Consultation"}
          </button>


          {/* SUCCESS MESSAGE */}

          {message && (
            <p className={styles.successMessage}>
              {message}
            </p>
          )}


          {/* ERROR MESSAGE */}

          {error && (
            <p className={styles.errorMessage}>
              {error}
            </p>
          )}

        </form>

      </section>

    </main>
  );
}