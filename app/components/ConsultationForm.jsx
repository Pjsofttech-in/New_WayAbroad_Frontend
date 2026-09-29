"use client";

import { useState, useEffect } from "react";

import {
  submitFormSubmission,
  getAllContinents,
  getAllCourseNames,
} from "../services/api";

export default function ConsultationForm() {
  const [continents, setContinents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    continentId: "",
    courseId: "",
  });

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =====================================================
     FETCH CONTINENTS AND COURSES
  ===================================================== */

  useEffect(() => {
    const loadData = async () => {
      try {
        setDataLoading(true);
        setError("");

        /*
         * Your backend requires role and email for GET requests.
         *
         * For the public website, we need a role/email that has
         * GET permission in your backend PermissionService.
         *
         * These values should match a user/role configured in
         * your backend.
         */
        const role = process.env.NEXT_PUBLIC_CONTINENT_ROLE;
        const email = process.env.NEXT_PUBLIC_CONTINENT_EMAIL;

        if (!role || !email) {
          throw new Error(
            "Continent API credentials are not configured. Set NEXT_PUBLIC_CONTINENT_ROLE and NEXT_PUBLIC_CONTINENT_EMAIL."
          );
        }

        const [continentsData, coursesData] = await Promise.all([
          getAllContinents(role, email),
          getAllCourseNames(),
        ]);

        console.log("Continents API response:", continentsData);
        console.log("Courses API response:", coursesData);

        setContinents(
          Array.isArray(continentsData) ? continentsData : []
        );

        setCourses(
          Array.isArray(coursesData) ? coursesData : []
        );
      } catch (err) {
        console.error("Failed to load dropdown data:", err);

        setError(
          err.message ||
            "Unable to load courses and continents."
        );

        setContinents([]);
        setCourses([]);
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, []);

  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  /* =====================================================
     SUBMIT FORM
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
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

      setMessage(
        "Thank you! Your consultation request has been submitted successfully."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        continentId: "",
        courseId: "",
      });
    } catch (err) {
      console.error("Consultation Error:", err);

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <form onSubmit={handleSubmit}>
      {/* NAME */}

      <div>
        <label>Full Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* EMAIL */}

      <div>
        <label>Email Address</label>

        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* PHONE */}

      <div>
        <label>Phone Number</label>

        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      {/* CONTINENT */}

      <div>
        <label>Preferred Continent</label>

        <select
          name="continentId"
          value={form.continentId}
          onChange={handleChange}
          required
          disabled={dataLoading}
        >
          <option value="" disabled>
            {dataLoading
              ? "Loading Continents..."
              : "Select Continent"}
          </option>

          {continents.map((continent) => (
            <option
              key={continent.id}
              value={continent.id}
            >
              {continent.continentname}
            </option>
          ))}
        </select>
      </div>

      {/* COURSE */}

      <div>
        <label>Preferred Course</label>

        <select
          name="courseId"
          value={form.courseId}
          onChange={handleChange}
          required
          disabled={dataLoading}
        >
          <option value="" disabled>
            {dataLoading
              ? "Loading Courses..."
              : "Select Course"}
          </option>

          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.courseName}
            </option>
          ))}
        </select>
      </div>

      {/* ERROR */}

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {/* SUCCESS */}

      {message && (
        <p className="text-green-600">
          {message}
        </p>
      )}

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading || dataLoading}
      >
        {loading
          ? "Submitting..."
          : "Book Free Consultation"}
      </button>
    </form>
  );
}