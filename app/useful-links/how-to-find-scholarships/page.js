import {
  Award,
  CheckCircle,
  Search,
  Clock,
  FileText,
  Globe,
  BookOpen,
  Landmark,
  Building2,
  BadgeCheck,
  DollarSign,
  CalendarDays,
} from "lucide-react";

import styles from "../[slug]/page.module.css";

const iconMap = {
  award: Award,
  check: CheckCircle,
  search: Search,
  clock: Clock,
  file: FileText,
  globe: Globe,
  book: BookOpen,
  landmark: Landmark,
  building: Building2,
  badge: BadgeCheck,
  dollar: DollarSign,
  calendar: CalendarDays,
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;
  return <IconComponent size={size} strokeWidth={2} />;
}

const page = {
  title: "How to Find Scholarships",
  icon: "award",
  description:
    "Discover how to find and apply for scholarships to fund your international education. Explore various funding opportunities and maximize your chances of success.",
  sections: [
    {
      title: "Types of Scholarships",
      icon: "award",
      items: [
        { icon: "badge", title: "Merit-based", text: "For academic, athletic, or artistic achievements" },
        { icon: "dollar", title: "Need-based", text: "For students with financial need" },
        { icon: "globe", title: "Country-specific", text: "For students from specific countries" },
        { icon: "book", title: "Subject-specific", text: "For specific fields of study" },
        { icon: "landmark", title: "University-specific", text: "Offered by individual universities" },
      ],
    },
    {
      title: "Where to Look",
      icon: "search",
      items: [
        { icon: "landmark", text: "University websites" },
        { icon: "landmark", text: "Government scholarship programs" },
        { icon: "building", text: "Private organizations and foundations" },
        { icon: "building", text: "Corporate scholarships" },
        { icon: "globe", text: "International organizations" },
      ],
    },
    {
      title: "Application Tips",
      icon: "check",
      items: [
        { icon: "clock", text: "Start your search early" },
        { icon: "check", text: "Check eligibility criteria carefully" },
        { icon: "file", text: "Prepare required documents in advance" },
        { icon: "file", text: "Write a compelling personal statement" },
        { icon: "calendar", text: "Meet all deadlines" },
      ],
    },
  ],
};

export const metadata = {
  title: "How to Find Scholarships | Wayabroad",
  description:
    "Discover how to find and apply for scholarships to fund your international education. Explore various funding opportunities and maximize your chances.",
};

export default function HowToFindScholarshipsPage() {
  const HeroIcon = iconMap[page.icon] || Award;

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
