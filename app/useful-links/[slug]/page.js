import {
  Search,
  GraduationCap,
  Award,
  CheckCircle,
  FileText,
  Clock,
  Users,
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Plane,
  MessageSquare,
  Phone,
  Mail,
  Home,
  Utensils,
  Bus,
  ShieldCheck,
  BookOpen,
  Globe,
  Wallet,
  Target,
  TrendingUp,
  ClipboardCheck,
  PenTool,
  Landmark,
  CreditCard,
  Smartphone,
  Car,
  CalendarDays,
  HeartPulse,
  Luggage,
  BadgeCheck,
  Lightbulb,
  ListChecks,
} from "lucide-react";

import styles from "./page.module.css";

const iconMap = {
  search: Search,
  graduation: GraduationCap,
  award: Award,
  check: CheckCircle,
  file: FileText,
  clock: Clock,
  users: Users,
  building: Building2,
  location: MapPin,
  briefcase: Briefcase,
  dollar: DollarSign,
  plane: Plane,
  message: MessageSquare,
  phone: Phone,
  mail: Mail,
  home: Home,
  food: Utensils,
  bus: Bus,
  shield: ShieldCheck,
  book: BookOpen,
  globe: Globe,
  wallet: Wallet,
  target: Target,
  trend: TrendingUp,
  clipboard: ClipboardCheck,
  pen: PenTool,
  landmark: Landmark,
  card: CreditCard,
  mobile: Smartphone,
  car: Car,
  calendar: CalendarDays,
  health: HeartPulse,
  luggage: Luggage,
  badge: BadgeCheck,
  idea: Lightbulb,
  list: ListChecks,
};

const pages = {
  "how-to-find-course": {
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
          {
            icon: "trend",
            text: "Assess your academic strengths",
          },
          {
            icon: "users",
            text: "Consider your career aspirations",
          },
          {
            icon: "globe",
            text: "Research job market trends",
          },
        ],
      },

      {
        number: "2",
        title: "Research Universities",
        icon: "landmark",
        items: [
          {
            icon: "trend",
            text: "Check university rankings",
          },
          {
            icon: "clipboard",
            text: "Review course curriculum and faculty",
          },
          {
            icon: "location",
            text: "Consider location and campus facilities",
          },
          {
            icon: "users",
            text: "Review entry requirements",
          },
        ],
      },

      {
        number: "3",
        title: "Consider Practical Aspects",
        icon: "dollar",
        items: [
          {
            icon: "card",
            text: "Tuition fees and living costs",
          },
          {
            icon: "dollar",
            text: "Scholarship opportunities",
          },
          {
            icon: "briefcase",
            text: "Work opportunities during and after studies",
          },
          {
            icon: "users",
            text: "Post-study work visa options",
          },
        ],
      },
    ],
  },

  "study-abroad-courses": {
    title: "Study Abroad Courses",
    icon: "graduation",
    description:
      "Discover a world of academic opportunities with our comprehensive guide to study abroad courses across top universities worldwide.",

    sections: [
      {
        title: "Popular Fields of Study",
        icon: "book",
        columns: true,
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
        columns: true,
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
  },

  "how-to-find-scholarships": {
    title: "How to Find Scholarships",
    icon: "award",
    description:
      "Discover how to find and apply for scholarships to fund your international education. Explore various funding opportunities and maximize your chances of success.",

    sections: [
      {
        title: "Types of Scholarships",
        icon: "award",
        items: [
          {
            icon: "badge",
            title: "Merit-based",
            text: "For academic, athletic, or artistic achievements",
          },
          {
            icon: "dollar",
            title: "Need-based",
            text: "For students with financial need",
          },
          {
            icon: "globe",
            title: "Country-specific",
            text: "For students from specific countries",
          },
          {
            icon: "book",
            title: "Subject-specific",
            text: "For specific fields of study",
          },
          {
            icon: "landmark",
            title: "University-specific",
            text: "Offered by individual universities",
          },
        ],
      },

      {
        title: "Where to Look",
        icon: "search",
        items: [
          {
            icon: "landmark",
            text: "University websites",
          },
          {
            icon: "landmark",
            text: "Government scholarship programs",
          },
          {
            icon: "building",
            text: "Private organizations and foundations",
          },
          {
            icon: "building",
            text: "Corporate scholarships",
          },
          {
            icon: "globe",
            text: "International organizations",
          },
        ],
      },

      {
        title: "Application Tips",
        icon: "check",
        items: [
          {
            icon: "clock",
            text: "Start your search early",
          },
          {
            icon: "check",
            text: "Check eligibility criteria carefully",
          },
          {
            icon: "file",
            text: "Prepare required documents in advance",
          },
          {
            icon: "file",
            text: "Write a compelling personal statement",
          },
          {
            icon: "calendar",
            text: "Meet all deadlines",
          },
        ],
      },
    ],
  },

  "letter-of-recommendation": {
    title: "Letter of Recommendation",
    icon: "file",
    description:
      "Strong letters of recommendation can significantly enhance your university application. Follow this comprehensive guide to secure effective and compelling recommendations.",

    sections: [
      {
        title: "Choosing Your Recommenders",
        icon: "users",
        items: [
          {
            icon: "graduation",
            text: "Select professors or supervisors who know you well",
          },
          {
            icon: "graduation",
            text: "Choose individuals who can speak to your academic abilities",
          },
          {
            icon: "users",
            text: "Consider professionals who can vouch for your work experience",
          },
          {
            icon: "users",
            text: "Diversity in recommenders (academic, professional) can be beneficial",
          },
        ],
      },

      {
        title: "Requesting a Letter",
        icon: "clock",
        items: [
          {
            icon: "clock",
            text: "Ask well in advance (at least 4-6 weeks before deadline)",
          },
          {
            icon: "file",
            text: "Provide your CV/resume and personal statement",
          },
          {
            icon: "list",
            text: "Share specific points you'd like them to highlight",
          },
          {
            icon: "landmark",
            text: "Provide information about the program and institution",
          },
          {
            icon: "pen",
            text: "Give clear submission instructions and deadlines",
          },
        ],
      },

      {
        title: "What Makes a Strong Letter",
        icon: "badge",
        items: [
          {
            icon: "badge",
            text: "Specific examples of your work and achievements",
          },
          {
            icon: "users",
            text: "Comparison with other students (if appropriate)",
          },
          {
            icon: "graduation",
            text: "Comments on your character and potential",
          },
          {
            icon: "landmark",
            text: "Relevance to the program you're applying to",
          },
          {
            icon: "file",
            text: "Written on official letterhead (if required)",
          },
        ],
      },
    ],
  },

  "statement-of-purpose": {
    title: "Statement of Purpose",
    icon: "file",
    description:
      "Your Statement of Purpose (SOP) is a crucial part of your university application. Craft a compelling narrative that showcases your unique story and aspirations.",

    sections: [
      {
        title: "Key Elements of a Strong SOP",
        icon: "file",
        items: [
          {
            icon: "file",
            text: "Clear introduction about yourself and your aspirations",
          },
          {
            icon: "graduation",
            text: "Academic background and achievements",
          },
          {
            icon: "briefcase",
            text: "Work experience and extracurricular activities",
          },
          {
            icon: "search",
            text: "Reasons for choosing the specific course and university",
          },
          {
            icon: "target",
            text: "Career goals and how the program will help achieve them",
          },
        ],
      },

      {
        title: "Writing Tips",
        icon: "pen",
        items: [
          {
            icon: "pen",
            text: "Be authentic and original",
          },
          {
            icon: "clock",
            text: "Follow the specified word limit",
          },
          {
            icon: "badge",
            text: "Proofread multiple times",
          },
          {
            icon: "users",
            text: "Get feedback from mentors or advisors",
          },
          {
            icon: "landmark",
            text: "Tailor your SOP for each university",
          },
        ],
      },
    ],
  },

  "student-essentials": {
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
            text: "Visa requirements and application",
          },
          {
            icon: "health",
            text: "Health insurance and vaccinations",
          },
          {
            icon: "home",
            text: "Accommodation arrangements",
          },
          {
            icon: "card",
            text: "Banking and finances",
          },
          {
            icon: "luggage",
            text: "Packing essentials",
          },
        ],
      },

      {
        title: "After Arrival",
        icon: "landmark",
        items: [
          {
            icon: "landmark",
            text: "University registration",
          },
          {
            icon: "wallet",
            text: "Opening a bank account",
          },
          {
            icon: "mobile",
            text: "Getting a local SIM card",
          },
          {
            icon: "bus",
            text: "Understanding public transport",
          },
          {
            icon: "card",
            text: "Registering with local authorities (if required)",
          },
        ],
      },
    ],
  },

  "ask-wayabroad": {
    title: "Ask Wayabroad",
    icon: "message",
    description:
      "Have questions about studying abroad? Our team of experts is here to guide you through every step of your international education journey.",

    sections: [
      {
        title: "How We Can Help",
        icon: "graduation",
        items: [
          {
            icon: "graduation",
            text: "University and course selection",
          },
          {
            icon: "file",
            text: "Application process guidance",
          },
          {
            icon: "badge",
            text: "Visa and immigration queries",
          },
          {
            icon: "award",
            text: "Scholarship information",
          },
          {
            icon: "plane",
            text: "Pre-departure assistance",
          },
        ],
      },

      {
        title: "Ways to Reach Us",
        icon: "message",
        items: [
          {
            icon: "message",
            text: "Live chat on our website",
          },
          {
            icon: "mail",
            text: "support@wayabroad.com",
          },
          {
            icon: "phone",
            text: "+1 (555) 123-4567",
          },
          {
            icon: "location",
            text: "123 Education St, Suite 100, New York, NY 10001",
          },
        ],
      },
    ],
  },

  "cost-of-living": {
    title: "Cost of Living",
    icon: "wallet",
    description:
      "Understand the typical costs of studying and living abroad and learn practical ways to plan and manage your student budget.",

    sections: [
      {
        title: "Typical Expenses",
        icon: "dollar",
        items: [
          {
            icon: "home",
            text: "Accommodation (on-campus or off-campus)",
          },
          {
            icon: "food",
            text: "Food and groceries",
          },
          {
            icon: "bus",
            text: "Transportation (public transport, bicycle, car)",
          },
          {
            icon: "health",
            text: "Health insurance",
          },
          {
            icon: "book",
            text: "Study materials and books",
          },
          {
            icon: "wallet",
            text: "Personal expenses and entertainment",
          },
        ],
      },

      {
        title: "Budgeting Tips",
        icon: "search",
        items: [
          {
            icon: "search",
            text: "Research average costs in your chosen city",
          },
          {
            icon: "idea",
            text: "Look for student discounts",
          },
          {
            icon: "dollar",
            text: "Consider part-time work options",
          },
          {
            icon: "landmark",
            text: "Use student housing options when possible",
          },
        ],
      },
    ],
  },
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;

  return <IconComponent size={size} strokeWidth={2} />;
}

export default async function UsefulLinksPage({ params }) {
  const page = pages[params.slug];

  if (!page) {
    return (
      <main className={styles.notFound}>
        <h1>Page Not Found</h1>
        <p>The requested Useful Links page does not exist.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {/* PAGE HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>
            <Icon name={page.icon} size={42} />
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
            page.sections.length === 2 ? styles.twoSections : ""
          }`}
        >
          {page.sections.map((section, index) => (
            <section
              className={styles.sectionCard}
              key={`${section.title}-${index}`}
            >
              <div className={styles.sectionHeader}>
                {section.number && (
                  <span className={styles.number}>{section.number}</span>
                )}

                <Icon name={section.icon} size={27} />

                <h2>{section.title}</h2>
              </div>

              <div
                className={`${styles.items} ${
                  section.columns ? styles.itemGrid : ""
                }`}
              >
                {section.items.map((item, itemIndex) => (
                  <div
                    className={styles.item}
                    key={`${item.text}-${itemIndex}`}
                  >
                    <div className={styles.itemIcon}>
                      <Icon name={item.icon} size={18} />
                    </div>

                    <div className={styles.itemText}>
                      {item.title && (
                        <strong>{item.title} </strong>
                      )}

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