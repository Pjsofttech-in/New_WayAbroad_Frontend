import {
  FileText,
  CheckCircle,
  Clock,
  Users,
  GraduationCap,
  Landmark,
  PenTool,
  BadgeCheck,
  ListChecks,
} from "lucide-react";

import styles from "../[slug]/page.module.css";

const iconMap = {
  file: FileText,
  check: CheckCircle,
  clock: Clock,
  users: Users,
  graduation: GraduationCap,
  landmark: Landmark,
  pen: PenTool,
  badge: BadgeCheck,
  list: ListChecks,
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;
  return <IconComponent size={size} strokeWidth={2} />;
}

const page = {
  title: "Letter of Recommendation",
  icon: "file",
  description:
    "Strong letters of recommendation can significantly enhance your university application. Follow this comprehensive guide to secure effective and compelling recommendations.",
  sections: [
    {
      title: "Choosing Your Recommenders",
      icon: "users",
      items: [
        { icon: "graduation", text: "Select professors or supervisors who know you well" },
        { icon: "graduation", text: "Choose individuals who can speak to your academic abilities" },
        { icon: "users", text: "Consider professionals who can vouch for your work experience" },
        { icon: "users", text: "Diversity in recommenders (academic, professional) can be beneficial" },
      ],
    },
    {
      title: "Requesting a Letter",
      icon: "clock",
      items: [
        { icon: "clock", text: "Ask well in advance (at least 4–6 weeks before deadline)" },
        { icon: "file", text: "Provide your CV/resume and personal statement" },
        { icon: "list", text: "Share specific points you'd like them to highlight" },
        { icon: "landmark", text: "Provide information about the program and institution" },
        { icon: "pen", text: "Give clear submission instructions and deadlines" },
      ],
    },
    {
      title: "What Makes a Strong Letter",
      icon: "badge",
      items: [
        { icon: "badge", text: "Specific examples of your work and achievements" },
        { icon: "users", text: "Comparison with other students (if appropriate)" },
        { icon: "graduation", text: "Comments on your character and potential" },
        { icon: "landmark", text: "Relevance to the program you're applying to" },
        { icon: "file", text: "Written on official letterhead (if required)" },
      ],
    },
  ],
};

export const metadata = {
  title: "Letter of Recommendation | Wayabroad",
  description:
    "Strong letters of recommendation can significantly enhance your university application. Follow this guide to secure compelling recommendations.",
};

export default function LetterOfRecommendationPage() {
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

        <div className={styles.sections}>
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
