"use client";

import {
  GraduationCap,
  Trophy,
  Building2,
  Headphones,
  Search,
  CheckCircle,
} from "lucide-react";

import PageHero from "../../components/PageHero/PageHero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import CTASection from "../../components/CTASection/CTASection";

import styles from "./page.module.css";

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        title="Why Choose Wayabroad?"
        description="Join thousands of students who have successfully achieved their international education dreams with our expert guidance"
      />

      <main>

        {/* KEY DIFFERENTIATORS */}

        <section className={styles.differentiators}>
          <SectionTitle title="Our Key Differentiators" />

          <div className={styles.grid}>

            <ServiceCard
              icon={<GraduationCap />}
              title="20+ Years of Excellence"
              description="Decades of experience in guiding students to their dream international education destinations."
              color="blue"
            />

            <ServiceCard
              icon={<Trophy />}
              title="98% Success Rate"
              description="Outstanding track record in student placements at top universities worldwide."
              color="green"
            />

            <ServiceCard
              icon={<Building2 />}
              title="500+ Partner Institutions"
              description="Extensive network of prestigious universities and colleges across the globe."
              color="purple"
            />

            <ServiceCard
              icon={<Headphones />}
              title="Dedicated Support"
              description="Personalized assistance at every step of your study abroad journey."
              color="red"
            />

            <ServiceCard
              icon={<Search />}
              title="End-to-End Guidance"
              description="Comprehensive support from university selection to visa processing and beyond."
              color="orange"
            />

          </div>
        </section>

        {/* COMPREHENSIVE SUPPORT */}

        <section className={styles.support}>
          <div className={styles.supportBox}>

            <h2>Comprehensive Support Services</h2>

            <div className={styles.supportGrid}>

              <div className={styles.supportItem}>
                <CheckCircle />
                <div>
                  <h3>University Selection</h3>
                  <p>
                    Expert guidance in choosing the right university based on
                    your academic profile and career goals.
                  </p>
                </div>
              </div>

              <div className={styles.supportItem}>
                <CheckCircle />
                <div>
                  <h3>Application Assistance</h3>
                  <p>
                    Complete support with application forms, essays, and
                    documentation.
                  </p>
                </div>
              </div>

              <div className={styles.supportItem}>
                <CheckCircle />
                <div>
                  <h3>Visa Processing</h3>
                  <p>
                    Expert guidance through the entire visa application
                    process.
                  </p>
                </div>
              </div>

              <div className={styles.supportItem}>
                <CheckCircle />
                <div>
                  <h3>Pre-Departure Briefing</h3>
                  <p>
                    Essential information and tips for a smooth transition to
                    your new academic journey.
                  </p>
                </div>
              </div>

            </div>

            <button
              className={styles.startButton}
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-auth-modal", {
                    detail: {
                      mode: "signup",
                    },
                  })
                );
              }}
            >
              Start Your Journey Today
            </button>

          </div>
        </section>

      </main>

    </>
  );
}