"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  submitFormSubmission,
  getAllContinents,
  getAllCourseNames,
} from "../services/api";

import styles from "./counselling.module.css";

export default function CounsellingPage() {
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

  // FETCH CONTINENTS AND COURSES
  useEffect(() => {
    const loadData = async () => {
      try {
        const [continentsData, coursesData] = await Promise.all([
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

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // SUBMIT COUNSELLING FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert(
        "Please agree to terms & privacy policy."
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
        formType: "COUNSELLING",

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
        "Your free consultation request has been submitted successfully!"
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
        "Counselling Error:",
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
    <main className={styles.counsellingPage}>
      <section className={styles.leftSection}>
        <div className={styles.leftContent}>
          <h1>
            Take The First Step To
            <span>
              STUDY ABROAD
            </span>
          </h1>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span
                className={styles.check}
              >
                ✓
              </span>

              <span>
                Visa preparation guidance
              </span>
            </div>

            <div className={styles.feature}>
              <span
                className={styles.check}
              >
                ✓
              </span>

              <span>
                Counselling on study options
              </span>
            </div>

            <div className={styles.feature}>
              <span
                className={styles.check}
              >
                ✓
              </span>

              <span>
                University application support
              </span>
            </div>

            <div className={styles.feature}>
              <span
                className={styles.check}
              >
                ✓
              </span>

              <span>
                Education finance information
              </span>
            </div>

            <div className={styles.feature}>
              <span
                className={styles.check}
              >
                ✓
              </span>

              <span>
                Scholarship search guidance
              </span>
            </div>

            <div className={styles.feature}>
              <span
                className={styles.check}
              >
                ✓
              </span>

              <span>
                Course and destination selection
              </span>
            </div>

            <div className={styles.feature}>
              <span
                className={styles.check}
              >
                ✓
              </span>

              <span>
                Pre-departure planning
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formHeader}>
          Start Your Study Abroad Journey
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name*"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email*"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number*"
            value={form.phone}
            onChange={handleChange}
            required
          />

          {/* DYNAMIC CONTINENTS */}
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

          {/* DYNAMIC COURSES */}
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

          <label
            className={styles.terms}
          >
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />

            <span>
              I have read and agreed to{" "}
              <Link href="/terms-and-conditions">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy">
                Privacy Policy
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Request a Counselling Session"}
          </button>

          {message && (
            <p>{message}</p>
          )}

          {error && (
            <p>{error}</p>
          )}
        </form>
      </section>
    </main>
  );
}