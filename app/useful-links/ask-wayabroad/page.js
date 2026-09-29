import {
  MessageSquare,
  CheckCircle,
  GraduationCap,
  FileText,
  BadgeCheck,
  Award,
  Plane,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import styles from "../[slug]/page.module.css";

const iconMap = {
  message: MessageSquare,
  check: CheckCircle,
  graduation: GraduationCap,
  file: FileText,
  badge: BadgeCheck,
  award: Award,
  plane: Plane,
  mail: Mail,
  phone: Phone,
  location: MapPin,
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;
  return <IconComponent size={size} strokeWidth={2} />;
}

const page = {
  title: "Ask Wayabroad",
  icon: "message",
  description:
    "Have questions about studying abroad? Our team of experts is here to guide you through every step of your international education journey.",
  sections: [
    {
      title: "How We Can Help",
      icon: "graduation",
      items: [
        { icon: "graduation", text: "University and course selection" },
        { icon: "file", text: "Application process guidance" },
        { icon: "badge", text: "Visa and immigration queries" },
        { icon: "award", text: "Scholarship information" },
        { icon: "plane", text: "Pre-departure assistance" },
      ],
    },
    {
      title: "Ways to Reach Us",
      icon: "message",
      items: [
        { icon: "message", text: "Live chat on our website" },
        { icon: "mail", text: "support@wayabroad.com" },
        { icon: "phone", text: "+1 (555) 123-4567" },
        { icon: "location", text: "123 Education St, Suite 100, New York, NY 10001" },
      ],
    },
  ],
};

export const metadata = {
  title: "Ask Wayabroad | Wayabroad",
  description:
    "Have questions about studying abroad? Our team of experts is here to guide you through every step of your international education journey.",
};

export default function AskWayabroadPage() {
  const HeroIcon = iconMap[page.icon] || MessageSquare;

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
