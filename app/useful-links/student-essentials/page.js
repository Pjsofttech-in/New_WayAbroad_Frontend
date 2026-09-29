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
        { icon: "clipboard", text: "Visa requirements and application" },
        { icon: "health", text: "Health insurance and vaccinations" },
        { icon: "home", text: "Accommodation arrangements" },
        { icon: "card", text: "Banking and finances" },
        { icon: "luggage", text: "Packing essentials" },
      ],
    },
    {
      title: "After Arrival",
      icon: "landmark",
      items: [
        { icon: "landmark", text: "University registration" },
        { icon: "wallet", text: "Opening a bank account" },
        { icon: "mobile", text: "Getting a local SIM card" },
        { icon: "bus", text: "Understanding public transport" },
        { icon: "card", text: "Registering with local authorities (if required)" },
      ],
    },
  ],
};

export const metadata = {
  title: "Student Essentials | Wayabroad",
  description:
    "Everything you need to know about preparing for your study abroad journey, from pre-departure checklists to settling in after arrival.",
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
