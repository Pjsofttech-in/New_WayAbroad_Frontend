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

    setForm((previousForm) => ({
      ...previousForm,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // SUBMIT CONTACT FORM
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
      <section className={styles.left}>
        <h1>
          Take The First Step To
          <span>STUDY ABROAD</span>
        </h1>

        <div className={styles.info}>
          <div className={styles.item}>
            <span className={styles.icon}>
              🏢 Address : 
            </span>

            <p>
              1482, 2nd Floor, White House Building,
              In front Of Tilak Smarak, Near SP Collage,
              Tilak Road, Sadashiv Peth Pune -411030
            </p>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>
              ✉️ info : 
            </span>

            <p>
              info@wayabroad.in
            </p>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>
              1. Abroad Education : 
            </span>

            <p>
              (+91) 9545456101
            </p>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>
              2. Abroad Jobs
            </span>

            <p>
              (+91) 7350729801
            </p>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>
              3. Language Admission : 
            </span>

            <p>
              (+91) 9371610111
            </p>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>
              4. MBBS Admission : 
            </span>

            <p>
              (+91) 9011758101
            </p>
          </div>

          <div className={styles.item}>
            <span className={styles.icon}>
              5. Abroad Partner : 
            </span>

            <p>
              (+91) 9923570901
            </p>
          </div>
        </div>
      </section>

      <section className={styles.right}>
        <h2>
          Start Your Study Abroad Journey
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Enter Full Name*"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Enter Email*"
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
            className={styles.checkbox}
          >
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />

            I have read and agreed to terms & privacy policy
          </label>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Book your Free Consultation"}
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