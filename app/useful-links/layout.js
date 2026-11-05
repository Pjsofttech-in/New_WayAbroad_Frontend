import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/useful-links"),
  title: "Study Abroad Resources",
  description:
    "Browse Wayabroad study abroad resources on courses, scholarships, statements of purpose, student essentials, living costs and international applications.",
};

export default function Layout({ children }) {
  return children;
}
