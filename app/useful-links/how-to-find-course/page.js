import {
  Search,
  GraduationCap,
  CheckCircle,
  TrendingUp,
  Users,
  Globe,
  Landmark,
  DollarSign,
  Briefcase,
  ClipboardCheck,
  MapPin,
  CreditCard,
} from "lucide-react";

import styles from "../[slug]/page.module.css";

const iconMap = {
  search: Search,
  graduation: GraduationCap,
  check: CheckCircle,
  trend: TrendingUp,
  users: Users,
  globe: Globe,
  landmark: Landmark,
  dollar: DollarSign,
  briefcase: Briefcase,
  clipboard: ClipboardCheck,
  location: MapPin,
  card: CreditCard,
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;
  return <IconComponent size={size} strokeWidth={2} />;
}

const page = {
  title: "How to Find a Course",
  icon: "graduation",
  description:
    "Finding the right course is the first step towards your dream of studying abroad. Follow this comprehensive guide to make an informed decision about your academic future.",
  sections: [
    {
      number: "1",
      title: "Identify Your Interests",
      icon: "search",
      items: [
        { icon: "trend", text: "Assess your academic strengths" },
        { icon: "users", text: "Consider your career aspirations" },
        { icon: "globe", text: "Research job market trends" },
      ],
    },
    {
      number: "2",
      title: "Research Universities",
      icon: "landmark",
      items: [
        { icon: "trend", text: "Check university rankings" },
        { icon: "clipboard", text: "Review course curriculum and faculty" },
        { icon: "location", text: "Consider location and campus facilities" },
        { icon: "users", text: "Review entry requirements" },
      ],
    },
    {
      number: "3",
      title: "Consider Practical Aspects",
      icon: "briefcase",
      items: [
        { icon: "card", text: "Tuition fees and living costs" },
        { icon: "dollar", text: "Scholarship opportunities" },
        { icon: "briefcase", text: "Work opportunities during and after studies" },
        { icon: "users", text: "Post-study work visa options" },
      ],
    },
  ],
};

export const metadata = {
  title: "How to Find a Course | Wayabroad",
  description:
    "Finding the right course is the first step towards your dream of studying abroad. Follow this comprehensive guide to make an informed decision.",
};

export default function HowToFindCoursePage() {
  const HeroIcon = iconMap[page.icon] || GraduationCap;

  return (
    <main className={styles.page}>
      {/* HERO */}
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

      {/* CONTENT */}
      <section className={styles.content}>
        <div className={styles.divider}></div>

        <div className={styles.sections}>
          {page.sections.map((section, index) => (
            <section className={styles.sectionCard} key={index}>
              <div className={styles.sectionHeader}>
                {section.number && (
                  <span className={styles.number}>{section.number}</span>
                )}
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
