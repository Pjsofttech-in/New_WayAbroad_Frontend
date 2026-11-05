import {
  Plane,
  CheckCircle,
  ClipboardCheck,
  HeartPulse,
  Home,
  CreditCard,
  Luggage,
  Landmark,
  Wallet,
  Smartphone,
  Bus,
} from "lucide-react";

import {
  brandedMetadataTitle,
  canonicalMetadata,
} from "../../seo-utils";

import styles from "../[slug]/page.module.css";

const iconMap = {
  plane: Plane,
  check: CheckCircle,
  clipboard: ClipboardCheck,
  health: HeartPulse,
  home: Home,
  card: CreditCard,
  luggage: Luggage,
  landmark: Landmark,
  wallet: Wallet,
  mobile: Smartphone,
  bus: Bus,
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;
  return <IconComponent size={size} strokeWidth={2} />;
}

const page = {
  title: "Student Essentials",
  icon: "plane",
  description:
    "Everything you need to know about preparing for your study abroad journey, from pre-departure checklists to settling in after arrival.",
  sections: [
    {
      title: "Before You Go",
      icon: "clipboard",
      items: [
        {
          icon: "clipboard",
          text: "Check the visa instructions for your destination and organize the documents required for your application.",
        },
        {
          icon: "health",
          text: "Review destination-specific health cover, medical and vaccination requirements before you travel.",
        },
        {
          icon: "home",
          text: "Compare accommodation options, location, costs and contract terms before making arrangements.",
        },
        {
          icon: "card",
          text: "Plan for tuition and living costs, and confirm how you will access and transfer funds.",
        },
        {
          icon: "luggage",
          text: "Pack for the destination climate and check airline baggage rules and important document requirements.",
        },
      ],
    },
    {
      title: "After Arrival",
      icon: "landmark",
      items: [
        {
          icon: "landmark",
          text: "Complete your institution's enrolment steps and find out where to get help on campus.",
        },
        {
          icon: "wallet",
          text: "Check local bank account requirements and compare access, transfer and account fees.",
        },
        {
          icon: "mobile",
          text: "Compare local mobile plans and the identification needed to activate a service.",
        },
        {
          icon: "bus",
          text: "Learn the routes between your accommodation and campus, and check local fare and ticket options.",
        },
        {
          icon: "card",
          text: "Confirm whether your destination requires address registration or other arrival formalities.",
        },
      ],
    },
  ],
};

export const metadata = {
  ...canonicalMetadata("/useful-links/student-essentials"),
  title: brandedMetadataTitle("Study Abroad Student Essentials"),
  description:
    "Prepare for study abroad with practical pre-departure and arrival guidance, from important documents and packing to settling into your new destination.",
};

export default function StudentEssentialsPage() {
  const HeroIcon = iconMap[page.icon] || Plane;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>
            <HeroIcon size={42} strokeWidth={2} />
            <span>{page.title}</span>
          </h1>
          <div className={styles.heroLine}></div>
          <p>{page.description}</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.divider}></div>

        <div className={`${styles.sections} ${styles.twoSections}`}>
          {page.sections.map((section, index) => (
            <section className={styles.sectionCard} key={index}>
              <div className={styles.sectionHeader}>
                <Icon name={section.icon} size={27} />
                <h2>{section.title}</h2>
              </div>
              <div className={styles.items}>
                {section.items.map((item, itemIndex) => (
                  <div className={styles.item} key={itemIndex}>
                    <div className={styles.itemIcon}>
                      <Icon name={item.icon} size={18} />
                    </div>
                    <div className={styles.itemText}>
                      {item.title && <strong>{item.title} </strong>}
                      {item.text && <span>{item.text}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
