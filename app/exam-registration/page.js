"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./exam-registration.module.css";
import { createExamPreparation } from "../services/api";

export default function ExamRegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    exam: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        name: form.name,
        contactNumber: form.mobile,
        examName: form.exam,

        // These fields are expected by the backend.
        // Keep them null if this is a public student form.
        createdByEmail: null,
        role: null,
      };

      console.log("Exam Registration Payload:", payload);

      await createExamPreparation(payload);

      setMessage("Exam registration submitted successfully!");

      setForm({
        name: "",
        mobile: "",
        email: "",
        exam: "",
      });
    } catch (err) {
      console.error("Exam Registration Error:", err);

      setError(
        err?.message ||
          "Failed to submit exam registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>

        {/* LEFT SIDE - FORM */}

        <section className={styles.formSection}>
          <h1>Register for Exam Preparation</h1>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className={styles.formGroup}>
              <label htmlFor="name">
                Name <span>*</span>
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* MOBILE */}

            <div className={styles.formGroup}>
              <label htmlFor="mobile">
                Mobile Number <span>*</span>
              </label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                placeholder="Enter your 10-digit mobile number"
                value={form.mobile}
                onChange={handleChange}
                maxLength={10}
                required
              />
            </div>

            {/* EMAIL */}

            <div className={styles.formGroup}>
              <label htmlFor="email">
                Email ID <span>*</span>
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* EXAM */}

            <div className={styles.formGroup}>
              <label htmlFor="exam">
                Exam Name <span>*</span>
              </label>

              <select
                id="exam"
                name="exam"
                value={form.exam}
                onChange={handleChange}
                required
              >
                <option value="">Select Exam</option>
                <option value="ACT">ACT</option>
                <option value="SAT">SAT</option>
                <option value="GRE">GRE</option>
                <option value="GMAT">GMAT</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="LSAT">LSAT</option>
                <option value="MCAT">MCAT</option>
                <option value="PTE">PTE</option>
                <option value="Duolingo English Test">
                  Duolingo English Test
                </option>
                <option value="Others">Others</option>
              </select>
            </div>

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

            {/* SUBMIT */}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

          </form>
        </section>

        {/* RIGHT SIDE - ILLUSTRATION */}

        <section className={styles.imageSection}>
          <Image
            src="/images/exam-registration.png"
            alt="Exam preparation"
            width={600}
            height={500}
            className={styles.examImage}
            priority
          />
        </section>

      </div>
    </main>
  );
}