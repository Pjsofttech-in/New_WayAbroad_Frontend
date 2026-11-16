import { canonicalMetadata } from "../seo-utils";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/contact"),
  title: "Contact Study Abroad Counsellors",
  description:
    "Contact Wayabroad for study abroad counselling, university and course guidance, admissions support, and help planning your international education.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      {children}
    </>
  );
}
