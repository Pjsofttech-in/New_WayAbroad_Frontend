import Image from "next/image";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999?text=Hello%20Wayabroad%2C%20I%20want%20to%20talk%20about%20studying%20abroad."
      className={styles.whatsappButton}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/images/whatsapp-icon.png"
        alt="WhatsApp"
        width={28}
        height={28}
        className={styles.whatsappIcon}
      />
    </a>
  );
}