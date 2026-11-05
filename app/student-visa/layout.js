import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/student-visa"),
  title: "Student Visa Application Assistance",
  description:
    "Understand student visa application steps, enrolment and financial documents, and how Wayabroad can guide you through visa assistance for study abroad.",
};

export default function Layout({ children }) {
  return children;
}
