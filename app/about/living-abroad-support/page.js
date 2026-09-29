import {
  Home,
  Globe,
  AlertTriangle,
  Users,
} from "lucide-react";

import PageHero from "../../components/PageHero/PageHero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import CTASection from "../../components/CTASection/CTASection";

import styles from "./page.module.css";

export default function LivingAbroadSupportPage() {
  return (
    <>

      <PageHero
        title="Living Abroad Support"
        description="Comprehensive support services to help you thrive in your new home away from home"
      />

      <main>

        {/* SUPPORT SERVICES */}

        <section className={styles.services}>
          <SectionTitle title="Our Support Services" />

          <div className={styles.grid}>

            <ServiceCard
              icon={<Home />}
              title="Accommodation Support"
              description="Assistance in finding safe and comfortable housing options that fit your budget and preferences."
              color="blue"
            />

            <ServiceCard
              icon={<Globe />}
              title="Cultural Orientation"
              description="Guidance on cultural norms, local customs, and practical tips to help you adapt to your new environment."
              color="green"
            />

            <ServiceCard
              icon={<AlertTriangle />}
              title="24/7 Emergency Support"
              description="Round-the-clock assistance for any emergencies or urgent situations you may encounter."
              color="red"
            />

            <ServiceCard
              icon={<Users />}
              title="Community Building"
              description="Opportunities to connect with fellow international students and local communities."
              color="purple"
            />

          </div>
        </section>

        {/* CTA */}

        <CTASection
          title="Need More Assistance?"
          description="Our dedicated support team is here to help you with any questions or concerns you may have about living abroad. We're committed to making your international experience as smooth and enjoyable as possible."
          buttonText="Contact Our Support Team"
        />

      </main>

    </>
  );
}