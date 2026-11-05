import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/about"),
  title: "About",
  description:
    "Learn about Wayabroad's student-focused approach to international education, including guidance on study destinations, courses, university admissions and student support.",
};

export default function Layout({ children }) {
  return children;
}
