import {
  FileText,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Search,
  Target,
  PenTool,
  Clock,
  BadgeCheck,
  Users,
  Landmark,
} from "lucide-react";

import styles from "../[slug]/page.module.css";

const iconMap = {
  file: FileText,
  check: CheckCircle,
  graduation: GraduationCap,
  briefcase: Briefcase,
  search: Search,
  target: Target,
  pen: PenTool,
  clock: Clock,
  badge: BadgeCheck,
  users: Users,
  landmark: Landmark,
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;
  return <IconComponent size={size} strokeWidth={2} />;
}

const page = {
  title: "Statement of Purpose",
  icon: "file",
  description:
    "Your Statement of Purpose (SOP) is a crucial part of your university application. Craft a compelling narrative that showcases your unique story and aspirations.",
  sections: [
    {
      title: "Key Elements of a Strong SOP",
      icon: "file",
      items: [
        { icon: "file", text: "Clear introduction about yourself and your aspirations" },
        { icon: "graduation", text: "Academic background and achievements" },
        { icon: "briefcase", text: "Work experience and extracurricular activities" },
        { icon: "search", text: "Reasons for choosing the specific course and university" },
        { icon: "target", text: "Career goals and how the program will help achieve them" },
      ],
    },
    {
      title: "Writing Tips",
      icon: "pen",
      items: [
        { icon: "pen", text: "Be authentic and original" },
        { icon: "clock", text: "Follow the specified word limit" },
        { icon: "badge", text: "Proofread multiple times" },
        { icon: "users", text: "Get feedback from mentors or advisors" },
        { icon: "landmark", text: "Tailor your SOP for each university" },
      ],
    },
  ],
};

export const metadata = {
  title: "Statement of Purpose | Wayabroad",
  description:
    "Your Statement of Purpose is a crucial part of your university application. Craft a compelling narrative that showcases your unique story and aspirations.",
};

export default function StatementOfPurposePage() {
  const HeroIcon = iconMap[page.icon] || FileText;

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

        <div
          className={`${styles.sections} ${styles.twoSections}`}
        >
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
