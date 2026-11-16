import Link from "next/link";
import { MessageCircle } from "lucide-react";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  return (
    <Link
      href="/contact"
      className={styles.contactButton}
      aria-label="Contact Wayabroad"
    >
      <MessageCircle aria-hidden="true" />
    </Link>
  );
}