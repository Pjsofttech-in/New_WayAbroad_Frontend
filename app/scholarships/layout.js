import { canonicalMetadata } from "../seo-utils";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/scholarships"),
  title: "Study Abroad Scholarships",
  description:
    "Explore scholarships and funding opportunities for students planning to study abroad, and review options that may support international education costs.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Scholarships", path: "/scholarships" },
        ]}
      />
      {children}
    </>
  );
}

