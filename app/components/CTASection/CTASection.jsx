"use client";

import styles from "./CTASection.module.css";

export default function CTASection({
  title,
  description,
  buttonText = "Get in Touch",
}) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("open-auth-modal", {
        detail: {
          mode: "signup",
        },
      })
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}

        <button
          type="button"
          className={styles.button}
          onClick={handleClick}
        >
          {buttonText}
          <span>→</span>
        </button>
      </div>
    </section>
  );
}