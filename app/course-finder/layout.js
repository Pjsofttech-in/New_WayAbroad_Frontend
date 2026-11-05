import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/course-finder"),
  title: "Study Abroad Course Finder",
  description:
    "Search study abroad courses, universities and colleges by destination and academic stream, and explore options for your university admissions journey.",
};

export default function Layout({ children }) {
  return children;
}
