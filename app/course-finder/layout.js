import { canonicalMetadata } from "../seo-utils";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/course-finder"),
  title: "Study Abroad Course Finder",
  description:
    "Search study abroad courses, universities and colleges by destination and academic stream, and explore options for your university admissions journey.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          {
            name: "Course Finder",
            path: "/course-finder",
          },
        ]}
      />
      {children}
    </>
  );
}
