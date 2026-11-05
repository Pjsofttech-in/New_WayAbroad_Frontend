import { notFound } from "next/navigation";

export const metadata = {
  title: "Super Admin Access",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuperAdminPage() {
  notFound();
}