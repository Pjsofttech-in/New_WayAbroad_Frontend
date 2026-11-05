import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/blog"),
  title: "Study Abroad Blog",
  description:
    "Read Wayabroad articles and guides on study abroad, university admissions, courses, scholarships, student visas and international student life.",
};

export default function Layout({ children }) {
  return children;
}
