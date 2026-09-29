import {
  Wallet,
  CheckCircle,
  DollarSign,
  Home,
  Utensils,
  Bus,
  HeartPulse,
  BookOpen,
  Search,
  Lightbulb,
  Landmark,
} from "lucide-react";

import styles from "../[slug]/page.module.css";

const iconMap = {
  wallet: Wallet,
  check: CheckCircle,
  dollar: DollarSign,
  home: Home,
  food: Utensils,
  bus: Bus,
  health: HeartPulse,
  book: BookOpen,
  search: Search,
  idea: Lightbulb,
  landmark: Landmark,
};

function Icon({ name, size = 22 }) {
  const IconComponent = iconMap[name] || CheckCircle;
  return <IconComponent size={size} strokeWidth={2} />;
}

const page = {
  title: "Cost of Living",
  icon: "wallet",
  description:
    "Understand the typical costs of studying and living abroad and learn practical ways to plan and manage your student budget.",
  sections: [
    {
      title: "Typical Expenses",
      icon: "dollar",
      items: [
        { icon: "home", text: "Accommodation (on-campus or off-campus)" },
        { icon: "food", text: "Food and groceries" },
        { icon: "bus", text: "Transportation (public transport, bicycle, car)" },
        { icon: "health", text: "Health insurance" },
        { icon: "book", text: "Study materials and books" },
        { icon: "wallet", text: "Personal expenses and entertainment" },
      ],
    },
    {
      title: "Budgeting Tips",
      icon: "search",
      items: [
        { icon: "search", text: "Research average costs in your chosen city" },
        { icon: "idea", text: "Look for student discounts" },
        { icon: "dollar", text: "Consider part-time work options" },
        { icon: "landmark", text: "Use student housing options when possible" },
      ],
    },
  ],
};

export const metadata = {
  title: "Cost of Living | Wayabroad",
  description:
    "Understand the typical costs of studying and living abroad and learn practical ways to plan and manage your student budget.",
};

export default function CostOfLivingPage() {
  const HeroIcon = iconMap[page.icon] || Wallet;

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
