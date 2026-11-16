import { canonicalMetadata } from "../seo-utils";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/counselling"),
  title: "Study Abroad Counselling",
  description:
    "Request study abroad counselling from Wayabroad for guidance on destinations, courses, university admissions and the steps in your international education journey.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Study Abroad Counselling", path: "/counselling" },
        ]}
      />
      {children}
    </>
  );
}
