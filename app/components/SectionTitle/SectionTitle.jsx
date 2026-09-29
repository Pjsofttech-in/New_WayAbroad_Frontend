import styles from "./SectionTitle.module.css";

export default function SectionTitle({ title, description }) {
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>

      <div className={styles.underline}></div>

      {description && (
        <p>{description}</p>
      )}
    </div>
  );
}