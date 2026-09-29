import styles from "./PageHero.module.css";

export default function PageHero({ title, description, buttonText, onButtonClick }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}

        {buttonText && (
          <button
            type="button"
            className={styles.heroButton}
            onClick={onButtonClick}
          >
            {buttonText}
            <span>→</span>
          </button>
        )}
      </div>
    </section>
  );
}