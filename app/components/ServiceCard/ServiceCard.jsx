import styles from "./ServiceCard.module.css";

export default function ServiceCard({
  icon,
  title,
  description,
  color = "blue",
}) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}