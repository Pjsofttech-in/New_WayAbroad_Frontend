import {
  Search,
  GraduationCap,
  CheckCircle,
  TrendingUp,
  Users,
  BookOpen,
  Briefcase,
  HeartPulse,
  Lightbulb,
  FlaskConical,
} from "lucide-react";

import styles from "../[slug]/page.module.css";

const iconMap = {
  search: Search,
  graduation: GraduationCap,
  check: CheckCircle,
  trend: TrendingUp,
  users: Users,
  book: BookOpen,
  briefcase: Briefcase,
  health: HeartPulse,
  idea: Lightbulb,
  flask: FlaskConical,
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;

  return (
    <IconComponent
      size={size}
      strokeWidth={2}
    />
  );
}

const page = {
  title: "Study Abroad Courses",

  icon: "graduation",

  description:
    "Discover a world of academic opportunities with our comprehensive guide to study abroad courses across top universities worldwide.",

  sections: [
    {
      title: "Popular Fields of Study",
      icon: "book",

      // IMPORTANT:
      // Removed columns: true
      // This makes the items appear vertically like the reference website.

      items: [
        {
          icon: "briefcase",
          title: "Business & Management",
          text: "MBA, Finance, Marketing",
        },

        {
          icon: "book",
          title: "Engineering",
          text: "Computer Science, Mechanical, Civil",
        },

        {
          icon: "health",
          title: "Health Sciences",
          text: "Medicine, Nursing, Public Health",
        },

        {
          icon: "idea",
          title: "Arts & Humanities",
          text: "Literature, History, Philosophy",
        },

        {
          icon: "flask",
          title: "Science & Technology",
          text: "Data Science, AI, Biotechnology",
        },

        {
          icon: "users",
          title: "Social Sciences",
          text: "Psychology, Economics, Political Science",
        },
      ],
    },

    {
      title: "Choosing the Right Course",

      icon: "search",

      items: [
        {
          icon: "graduation",
          text: "Consider your academic background",
        },

        {
          icon: "trend",
          text: "Look at career prospects",
        },

        {
          icon: "check",
          text: "Check accreditation and recognition",
        },

        {
          icon: "search",
          text: "Research university rankings and reputation",
        },

        {
          icon: "book",
          text: "Consider practical components (internships, research opportunities)",
        },
      ],
    },
  ],
};

export const metadata = {
  title: "Study Abroad Courses | Wayabroad",

  description:
    "Discover a world of academic opportunities with our comprehensive guide to study abroad courses across top universities worldwide.",
};

export default function StudyAbroadCoursesPage() {
  const HeroIcon =
    iconMap[page.icon] || GraduationCap;

  return (
    <main className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>

          <h1>
            <HeroIcon
              size={42}
              strokeWidth={2}
            />

            <span>{page.title}</span>
          </h1>

          <div className={styles.heroLine}></div>

          <p>{page.description}</p>

        </div>
      </section>

      {/* CONTENT */}
      <section className={styles.content}>

        <div className={styles.divider}></div>

        <div
          className={`${styles.sections} ${
            page.sections.length === 2
              ? styles.twoSections
              : ""
          }`}
        >

          {page.sections.map(
            (section, index) => (
              <section
                className={styles.sectionCard}
                key={index}
              >

                {/* BLUE HEADER */}
                <div
                  className={styles.sectionHeader}
                >

                  {section.number && (
                    <span
                      className={styles.number}
                    >
                      {section.number}
                    </span>
                  )}

                  <Icon
                    name={section.icon}
                    size={27}
                  />

                  <h2>
                    {section.title}
                  </h2>

                </div>

                {/* ITEMS */}
                <div className={styles.items}>

                  {section.items.map(
                    (item, itemIndex) => (
                      <div
                        className={styles.item}
                        key={itemIndex}
                      >

                        <div
                          className={
                            styles.itemIcon
                          }
                        >
                          <Icon
                            name={item.icon}
                            size={18}
                          />
                        </div>

                        <div
                          className={
                            styles.itemText
                          }
                        >

                          {item.title && (
                            <strong>
                              {item.title}
                            </strong>
                          )}

                          {item.title &&
                            item.text && (
                              <span>
                                {" - "}
                                {item.text}
                              </span>
                            )}

                          {!item.title &&
                            item.text && (
                              <span>
                                {item.text}
                              </span>
                            )}

                        </div>

                      </div>
                    )
                  )}

                </div>

              </section>
            )
          )}

        </div>

      </section>

    </main>
  );
}