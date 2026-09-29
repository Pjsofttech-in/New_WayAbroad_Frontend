import {
  GraduationCap,
  FileText,
  Globe,
  Plane,
  Award,
  Users,
} from "lucide-react";

import PageHero from "../../components/PageHero/PageHero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import CTASection from "../../components/CTASection/CTASection";

import styles from "./page.module.css";

export default function WhatWeDoPage() {
  return (
    <>

      <PageHero
        title="What We Do"
        description="Empowering your global education journey with comprehensive support at every step"
      />

      <main>

        {/* INTRODUCTION */}
        <section className={styles.intro}>
          <SectionTitle
            title="Our Comprehensive Services"
            description="At Wayabroad, we understand that studying abroad is a significant decision. Our expert team is dedicated to providing end-to-end support to make your international education journey smooth and successful."
          />
        </section>

        {/* SERVICES */}
        <section className={styles.services}>
          <div className={styles.grid}>

            <ServiceCard
              icon={<GraduationCap />}
              title="University & Course Selection"
              description="Personalized guidance to help you choose the right university and program that matches your academic goals and career aspirations."
            />

            <ServiceCard
              icon={<FileText />}
              title="Application Assistance"
              description="Comprehensive support with application preparation, document verification, and submission to maximize your chances of acceptance."
              color="blue"
            />

            <ServiceCard
              icon={<Globe />}
              title="Visa Support"
              description="Expert guidance through the visa application process, including document preparation and interview preparation."
              color="blue"
            />

            <ServiceCard
              icon={<Plane />}
              title="Pre-Departure Briefing"
              description="Essential information and tips to prepare you for life as an international student in your chosen destination."
              color="green"
            />

            <ServiceCard
              icon={<Award />}
              title="Scholarship Guidance"
              description="Assistance in identifying and applying for scholarships and financial aid opportunities."
              color="purple"
            />

            <ServiceCard
              icon={<Globe />}
              title="International Exposure"
              description="Opportunities for cultural exchange and global networking to enhance your international experience."
              color="blue"
            />

          </div>
        </section>

        {/* CTA */}
        <CTASection
          title="Ready to Start Your Journey?"
          description="Our expert counsellors are here to guide you through every step of your study abroad journey."
          buttonText="Get in Touch"
        />

      </main>

    </>
  );
}