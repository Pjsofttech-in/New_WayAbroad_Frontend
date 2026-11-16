"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  getAllContinents,
  getAllCourseNames,
  submitFormSubmission,
} from "../services/api";
import styles from "../home.module.css";

export function ContinentTabs({ countries = [] }) {
  const [tab, setTab] = useState("Australia");
  const featuredCountries = ["Australia", "Canada", "UK", "USA"];

  return (
    <section className={styles.continents} id="exams">
      <h2>Explore Study Destinations</h2>

      <div className={styles.tabs}>
        {featuredCountries.map((country) => (
          <button
            key={country}
            className={tab === country ? styles.selected : ""}
            onClick={() => setTab(country)}
            aria-pressed={tab === country}
          >
            {country}
          </button>
        ))}
      </div>

      <h3 className={styles.destinationHeading}>
        Study Abroad Guides
      </h3>

      {countries.length > 0 ? (
        <ul className={styles.destinationLinks}>
          {countries.map(({ id, name }) => (
            <li key={id}>
              <Link
                href={`/study-abroad/${encodeURIComponent(id)}`}
                className={styles.destinationLink}
              >
                Study abroad in {name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.destinationUnavailable} role="status">
          Destination guides are temporarily unavailable. Please try again
          later.
        </p>
      )}
    </section>
  );
}

export function HomepageConsultationForm() {
  const formRef = useRef(null);
  const [continents, setContinents] = useState([]);
  const [courses, setCourses] = useState([]);
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
        console.error("Failed to load dropdown data:", error);
      }
    };

    const formElement = formRef.current;
    if (!formElement) return;

    if (!("IntersectionObserver" in window)) {
      loadData();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          loadData();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(formElement);

    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.agree) {
      setError("Please agree to the terms & privacy policy.");
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
      console.error("Consultation Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h3>Start Your Study Abroad Journey</h3>

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

      <select
        name="continentId"
        value={form.continentId}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Continents*
        </option>

        {continents.map((continent) => (
          <option key={continent.id} value={continent.id}>
            {continent.continentname}
          </option>
        ))}
      </select>

      <select
        name="courseId"
        value={form.courseId}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Course*
        </option>

        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.courseName}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
          required
        />
        I have read and agreed to{" "}
        <Link href="/terms-and-conditions">
          Terms and Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy">
          Privacy Policy
        </Link>
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Request a Counselling Session"}
      </button>

      {sent && (
        <p className={styles.success}>Request submitted successfully!</p>
      )}

      {error && <p className={styles.success}>{error}</p>}
    </form>
  );
}
