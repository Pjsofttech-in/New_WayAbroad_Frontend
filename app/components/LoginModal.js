"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

import styles from "./LoginModal.module.css";

import {
  loginUser,
  submitFormSubmission,
  getAllContinents,
  getAllCourseNames,
} from "../services/api";

export default function LoginModal({
  onClose,
  initialMode = "login",
}) {
  const [mode, setMode] = useState(initialMode);

  /* ================= LOGIN FORM STATE ================= */

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  /* ================= SIGNUP FORM STATE ================= */

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+91",
    phone: "",
    email: "",
    password: "",
    continentId: "",
    courseId: "",
    agreeTerms: false,
    contactPermission: false,
    marketingPermission: false,
  });

  /* ================= DYNAMIC DATA ================= */

  const [continents, setContinents] = useState([]);
  const [courses, setCourses] = useState([]);

  /* ================= STATUS STATES ================= */

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  /* ================= UPDATE MODE ================= */

  useEffect(() => {
    setMode(initialMode);
    setMessage("");
    setError("");
  }, [initialMode]);

  /* ================= FETCH CONTINENTS & COURSES ================= */

  useEffect(() => {
    const loadData = async () => {
      try {
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

        setContinents(Array.isArray(continentsData) ? continentsData : []);
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      } catch (err) {
        console.error(
          "Failed to load signup dropdown data:",
          err
        );
      }
    };

    loadData();
  }, []);

  /* ================= SWITCH TO SIGNUP ================= */

  const showSignup = () => {
    setMode("signup");
    setMessage("");
    setError("");
  };

  /* ================= SWITCH TO LOGIN ================= */

  const showLogin = () => {
    setMode("login");
    setMessage("");
    setError("");
  };

  /* ================= LOGIN INPUT CHANGE ================= */

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SIGNUP INPUT CHANGE ================= */

  const handleSignupChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setSignupForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* ================= LOGIN SUBMIT ================= */

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await loginUser({
        email: loginForm.email,
        password: loginForm.password,
      });

      console.log("Login Response:", response);

      setMessage("Login successful!");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Login Error:", err);

      setError(
        err.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= SIGNUP SUBMIT ================= */

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    /* Check Terms */

    if (!signupForm.agreeTerms) {
      setError(
        "Please agree to Wayabroad Terms and Privacy Policy."
      );

      return;
    }

    setLoading(true);

    try {
      /* Combine First Name + Last Name */

      const fullName =
        `${signupForm.firstName} ${signupForm.lastName}`.trim();

      await submitFormSubmission({
        formType: "SIGNUP",

        name: fullName,

        email: signupForm.email,

        phoneNumber:
          `${signupForm.countryCode}${signupForm.phone}`,

        continentId: Number(
          signupForm.continentId
        ),

        courseId: Number(
          signupForm.courseId
        ),

        password: signupForm.password,

        createdByEmail: null,

        role: null,

        branchCode: null,

        status: "NEW",
      });

      setMessage(
        "Your signup request has been submitted successfully!"
      );

      /* Clear Signup Form */

      setSignupForm({
        firstName: "",
        lastName: "",
        countryCode: "+91",
        phone: "",
        email: "",
        password: "",
        continentId: "",
        courseId: "",
        agreeTerms: false,
        contactPermission: false,
        marketingPermission: false,
      });
    } catch (err) {
      console.error("Signup Error:", err);

      setError(
        err.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGIN ================= */

  if (mode === "login") {
    return (
      <div
        className={styles.overlay}
        onClick={onClose}
      >
        <div
          className={styles.loginModal}
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={30} />
          </button>

          <h2 className={styles.loginTitle}>
            Login
          </h2>

          <form onSubmit={handleLoginSubmit}>
            {/* EMAIL */}

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />

            {/* PASSWORD */}

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />

            {/* REMEMBER / FORGOT */}

            <div
              className={styles.loginOptions}
            >
              <label
                className={styles.remember}
              >
                <input type="checkbox" />

                <span>
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className={styles.forgot}
              >
                Forgot password?
              </button>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

            {/* SUCCESS MESSAGE */}

            {message && (
              <p>{message}</p>
            )}

            {/* ERROR MESSAGE */}

            {error && (
              <p>{error}</p>
            )}

            {/* SWITCH TO SIGNUP */}

            <p
              className={
                styles.switchText
              }
            >
              Don't have an account?{" "}

              <button
                type="button"
                onClick={showSignup}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  /* ================= SIGNUP ================= */

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.signupModal}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* CLOSE BUTTON */}

        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={30} />
        </button>

        <div className={styles.container}>
          {/* ================= LEFT SIDE ================= */}

          <div className={styles.leftSide}>
            <img
              src="/images/signup-image.jpg"
              alt="Study Abroad"
              className={
                styles.accountImage
              }
            />

            <h2>
              Create your Wayabroad account
            </h2>

            <p
              className={styles.subtitle}
            >
              One account for all your study abroad needs.
              <br />
              Sign up today.
            </p>

            <ul
              className={styles.benefits}
            >
              <li>
                ✓ Access your personalised dashboard.
              </li>

              <li>
                ✓ Shortlist and save your favourite courses.
              </li>

              <li>
                ✓ Same account can be used on the Wayabroad Live app.
              </li>
            </ul>

            <p
              className={styles.note}
            >
              Note: Creating an account won't result in a call;
              you'll only be contacted after submitting a successful
              enquiry form.
            </p>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className={styles.rightSide}>
            <h2
              className={
                styles.signupTitle
              }
            >
              Create an account
            </h2>

            <form
              onSubmit={
                handleSignupSubmit
              }
            >
              {/* ================= NAME ================= */}

              <div
                className={styles.nameRow}
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={
                    signupForm.firstName
                  }
                  onChange={
                    handleSignupChange
                  }
                  required
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={
                    signupForm.lastName
                  }
                  onChange={
                    handleSignupChange
                  }
                  required
                />
              </div>

              {/* ================= PHONE ================= */}

              <div
                className={styles.phoneRow}
              >
                <select
                  name="countryCode"
                  value={
                    signupForm.countryCode
                  }
                  onChange={
                    handleSignupChange
                  }
                >
                  <option value="+91">
                    +91
                  </option>

                  <option value="+1">
                    +1
                  </option>

                  <option value="+44">
                    +44
                  </option>

                  <option value="+61">
                    +61
                  </option>
                </select>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={
                    signupForm.phone
                  }
                  onChange={
                    handleSignupChange
                  }
                  required
                />
              </div>

              {/* ================= EMAIL ================= */}

              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={
                  signupForm.email
                }
                onChange={
                  handleSignupChange
                }
                required
              />

              {/* ================= PASSWORD ================= */}

              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={
                  signupForm.password
                }
                onChange={
                  handleSignupChange
                }
                required
              />

              {/* ================= CONTINENT ================= */}

              <select
                name="continentId"
                value={
                  signupForm.continentId
                }
                onChange={
                  handleSignupChange
                }
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
                      {
                        continent.continentname
                      }
                    </option>
                  )
                )}
              </select>

              {/* ================= COURSE ================= */}

              <select
                name="courseId"
                value={
                  signupForm.courseId
                }
                onChange={
                  handleSignupChange
                }
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

              {/* ================= CHECKBOXES ================= */}

              <div
                className={
                  styles.checkboxes
                }
              >
                {/* TERMS */}

                <label>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={
                      signupForm.agreeTerms
                    }
                    onChange={
                      handleSignupChange
                    }
                  />

                  <span>
                    I agree to Wayabroad Terms and privacy policy
                  </span>
                </label>

                {/* CONTACT PERMISSION */}

                <label>
                  <input
                    type="checkbox"
                    name="contactPermission"
                    checked={
                      signupForm.contactPermission
                    }
                    onChange={
                      handleSignupChange
                    }
                  />

                  <span>
                    Please contact me by phone, email or SMS to assist
                    with my enquiry
                  </span>
                </label>

                {/* MARKETING */}

                <label>
                  <input
                    type="checkbox"
                    name="marketingPermission"
                    checked={
                      signupForm.marketingPermission
                    }
                    onChange={
                      handleSignupChange
                    }
                  />

                  <span>
                    I agree to receive occasional communications from
                    Wayabroad
                  </span>
                </label>
              </div>

              {/* ================= CREATE ACCOUNT ================= */}

              <button
                type="submit"
                className={
                  styles.signupButton
                }
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create an account"}
              </button>

              {/* SUCCESS MESSAGE */}

              {message && (
                <p>{message}</p>
              )}

              {/* ERROR MESSAGE */}

              {error && (
                <p>{error}</p>
              )}

              {/* ================= SWITCH TO LOGIN ================= */}

              <p
                className={
                  styles.signupSwitch
                }
              >
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={showLogin}
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}