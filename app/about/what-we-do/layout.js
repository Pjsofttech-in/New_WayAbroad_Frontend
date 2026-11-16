import {
  brandedMetadataTitle,
  canonicalMetadata,
} from "../../seo-utils";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/about/what-we-do"),
  title: brandedMetadataTitle("Study Abroad Services"),
  description:
    "Learn about Wayabroad's study abroad services, including university selection, applications, visa guidance, pre-departure support and scholarships.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "What We Do", path: "/about/what-we-do" },
        ]}
      />
      {children}
    </>
  );
}
