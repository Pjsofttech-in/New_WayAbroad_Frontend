import {
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  List,
  FileText,
  Headphones,
} from "lucide-react";

import PageHero from "../../components/PageHero/PageHero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import CTASection from "../../components/CTASection/CTASection";

import styles from "./page.module.css";

export default function StudyAbroadCounsellingPage() {
  return (
    <>

      <PageHero
        title="Study Abroad Counselling"
        description="Get personalized guidance from our expert counsellors to navigate your study abroad journey with confidence"
      />

      <main>

        {/* COUNSELLING SERVICES */}

        <section className={styles.services}>
          <SectionTitle title="Our Counselling Services" />

          <div className={styles.grid}>

            <ServiceCard
              icon={<UserRound />}
              title="Personalized Counselling"
              description="Personalized counseling sessions with our expert advisors to understand your goals and aspirations."
              color="blue"
            />

            <ServiceCard
              icon={<BriefcaseBusiness />}
              title="Career Guidance"
              description="Expert advice on choosing the right career path based on your skills and interests."
              color="green"
            />

            <ServiceCard
              icon={<GraduationCap />}
              title="Course Selection"
              description="Guidance in selecting the best courses that align with your career objectives."
              color="purple"
            />

            <ServiceCard
              icon={<List />}
              title="University Selection"
              description="Help in creating a targeted list of universities that match your profile and preferences."
              color="orange"
            />

            <ServiceCard
              icon={<FileText />}
              title="Application Assistance"
              description="Comprehensive support with all aspects of the application process."
              color="red"
            />

            <ServiceCard
              icon={<Headphones />}
              title="Interview Preparation"
              description="Mock interviews and preparation to help you ace your university interviews."
              color="blue"
            />

          </div>
        </section>

        {/* CTA */}

        <CTASection
          title="Ready to Start Your Study Abroad Journey?"
          description="Our expert counsellors are here to guide you through every step of your study abroad journey. Book your free counselling session today and take the first step towards your dream education."
          buttonText="Book Free Counselling Session"
        />

      </main>

    </>
  );
}