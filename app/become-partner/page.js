"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./become-partner.module.css";
import { submitPartnerForm } from "../services/api";

export default function BecomePartner() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    contactNumber: "",
    city: "",
  });

  const features = [
    "Personalized solutions",
    "All-in-one channel integrations",
    "Boosted partner revenues",
    "Premium quality software solutions",
    "Support across various branches",
    "Robust security features",
    "Top-tier retail solutions",
    "Multi-module integrated platform",
  ];

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
    setError("");
    setMessage("");

    try {
      await submitPartnerForm({
        businessName: form.businessName,
        partnerName: form.name,
        partnerContact: form.contactNumber,
        partnerEmail: form.email,
        partnerPassword: null,
        partnerAddress: null,
        partnerCountry: null,
        partnerCity: form.city,
        partnerDistrict: null,
        state: null,
        status: "NEW",
        conductedBy: null,
        contractType: null,
        instituteType: null,
        university: null,
        commissionPercent: null,
        remark: null,
        designation: null,
        mobileNo: form.contactNumber,
        businessContact: form.contactNumber,
        authorityDesignation: null,
        authorityName: form.name,
        authorityEmail: form.email,
        authorityContact: form.contactNumber,
        businessEmail: form.email,
        createdByEmail: null,
        role: null,
      });

      setMessage(
        "Thank you! Your partner request has been submitted successfully."
      );

      setForm({
        name: "",
        businessName: "",
        email: "",
        contactNumber: "",
        city: "",
      });

      setShowForm(false);
    } catch (err) {
      console.error("Partner Error:", err);

      setError(
        err.message || "Failed to submit partner request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.partnerPage}>

      {/* ================= HERO SECTION ================= */}

      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <h1>Become a Part of</h1>

          <h2>Official Channel Partner</h2>

          <p>
            Achieve Boundless Growth, Endless Profits, and Partnership
            Opportunities with Wayabroad.
          </p>

          <button
            type="button"
            className={styles.heroButton}
            onClick={() => setShowForm(true)}
          >
            BECOME A PARTNER
          </button>
        </div>
      </section>

      {/* ================= PARTNER PNG IMAGE ================= */}

      <section className={styles.partnerImageSection}>
        <div className={styles.partnerImageCard}>
          <Image
            src="/images/partner-illustration.png"
            alt="WayAbroad Authorized Partner Illustration"
            width={800}
            height={650}
            className={styles.partnerImage}
            priority
          />
        </div>
      </section>

      {/* ================= PARTNER OPPORTUNITIES ================= */}

      <section
        className={styles.opportunities}
        id="opportunities"
      >
        <div className={styles.container}>
          <h2>Partner Program Opportunities</h2>

          <p className={styles.intro}>
            By joining us as a Channel Partner, you unlock access to advanced
            software solutions and a dependable partner focused on your growth.
          </p>

          <div className={styles.opportunityList}>

            <div className={styles.opportunity}>
              <h3>Implementation Associate</h3>

              <p>
                Responsible for onboarding and implementing Wayabroad
                solutions.
              </p>
            </div>

            <div className={styles.opportunity}>
              <h3>Certified Partner</h3>

              <p>
                Facilitate sales closures and manage implementation
                lifecycle.
              </p>
            </div>

            <div className={styles.opportunity}>
              <h3>Referral Partner</h3>

              <p>
                Refer clients and expand Wayabroad reach.
              </p>
            </div>

          </div>

          {/* START EARNING NOW */}

          <button
            type="button"
            className={styles.earningButton}
            onClick={() => setShowForm(true)}
          >
            START EARNING NOW
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2>Essential Features of Our Partner Program</h2>

          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div
                key={feature}
                className={styles.featureCard}
              >
                <span className={styles.check}>✓</span>

                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* THIRD BECOME PARTNER BUTTON */}

          <button
            type="button"
            className={styles.partnerButton}
            onClick={() => setShowForm(true)}
          >
            BECOME A PARTNER
          </button>
        </div>
      </section>

      {/* ================= SUCCESS HIGHLIGHTS ================= */}

      <section
        className={styles.successSection}
        id="success"
      >
        <div className={styles.container}>
          <h2>Partner Success Highlights</h2>

          <div className={styles.successGrid}>

            <div className={styles.successCard}>
              <h3>
                Our partners can onboard clients across multiple companies
                seamlessly.
              </h3>

              <p>
                I can always rely on the Wayabroad team for smooth
                implementation.
              </p>

              <em>
                - R Ashish Pawar, Channel Partner Since 2020
              </em>
            </div>

            <div className={styles.successCard}>
              <h3>
                Clients have successfully integrated their operations.
              </h3>

              <p>
                Incredible support and benefits!
              </p>

              <em>
                - Pragti Bisen, Partner Since 2021
              </em>
            </div>

          </div>
        </div>
      </section>

            {/* ================= JOIN US SECTION ================= */}

      <section className={styles.joinSection}>
        <div className={styles.joinOverlay}></div>

        <div className={styles.joinContent}>
          <h2>Looking Into Our Partner Programs?</h2>

          <button
            type="button"
            className={styles.joinButton}
            onClick={() => setShowForm(true)}
          >
            JOIN US NOW
          </button>
        </div>
      </section>

      {/* =====================================================
          BECOME PARTNER FORM MODAL
      ===================================================== */}

      {showForm && (
        <div
          className={styles.modalOverlay}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-form-title"
          >

            {/* MODAL HEADER */}

            <div className={styles.modalHeader}>
              <h2 id="partner-form-title">
                Become a Wayabroad Partner
              </h2>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form
              className={styles.partnerForm}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={form.businessName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={form.contactNumber}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
              />

              {/* BUTTONS */}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}