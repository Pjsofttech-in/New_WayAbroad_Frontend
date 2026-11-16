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
    "Share your organization details",
    "Provide a contact name and email",
    "Tell us your city",
    "Submit a partnership inquiry",
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
          <h1>Discuss a Partnership with</h1>

          <h2>Wayabroad</h2>

          <p>
            Share your organization details and partnership interest through
            the inquiry form. Review any proposed scope and terms before
            making a commitment.
          </p>

          <button
            type="button"
            className={styles.heroButton}
            onClick={() => setShowForm(true)}
          >
            SEND A PARTNER INQUIRY
          </button>
        </div>
      </section>

      {/* ================= PARTNER PNG IMAGE ================= */}

      <section className={styles.partnerImageSection}>
        <div className={styles.partnerImageCard}>
          <Image
            src="/images/partner-illustration.png"
            alt="Illustration for the Wayabroad partner inquiry page"
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
            The options below describe the partner inquiry types currently
            listed on this page. Contact Wayabroad to confirm availability,
            scope, and terms.
          </p>

          <div className={styles.opportunityList}>

            <div className={styles.opportunity}>
              <h3>Implementation Associate</h3>

              <p>
                Ask about opportunities related to onboarding and
                implementation.
              </p>
            </div>

            <div className={styles.opportunity}>
              <h3>Sales and Implementation Partner</h3>

              <p>
                Ask about the scope and requirements for this partner type.
              </p>
            </div>

            <div className={styles.opportunity}>
              <h3>Referral Partner</h3>

              <p>
                Ask about referral arrangements and applicable terms.
              </p>
            </div>

          </div>

          {/* PARTNER INQUIRY */}

          <button
            type="button"
            className={styles.earningButton}
            onClick={() => setShowForm(true)}
          >
            SEND A PARTNER INQUIRY
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2>Information for a Partner Inquiry</h2>

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
            SEND A PARTNER INQUIRY
          </button>
        </div>
      </section>

      {/* ================= PARTNER INQUIRY INFORMATION ================= */}

      <section
        className={styles.successSection}
        id="partner-inquiry-details"
      >
        <div className={styles.container}>
          <h2>Before submitting a partner inquiry</h2>
          <p>
            Use the form to provide your name, organization, email, contact
            number, and city. Confirm the opportunity, commercial terms, and
            any claims about expected outcomes directly with Wayabroad.
          </p>
        </div>
      </section>

            {/* ================= JOIN US SECTION ================= */}

      <section className={styles.joinSection}>
        <div className={styles.joinOverlay}></div>

        <div className={styles.joinContent}>
          <h2>          Have Questions About Partnership Options?</h2>

          <button
            type="button"
            className={styles.joinButton}
            onClick={() => setShowForm(true)}
          >
            SEND AN INQUIRY
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