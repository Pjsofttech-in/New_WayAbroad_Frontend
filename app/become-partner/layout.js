import { canonicalMetadata } from "../seo-utils";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/become-partner"),
  title: "Official Channel Partner Opportunities",
  description:
    "Explore becoming an official Wayabroad channel partner, with integrated platform solutions, partner support and a form to discuss partnership opportunities.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          {
            name: "Become a Partner",
            path: "/become-partner",
          },
        ]}
      />
      {children}
    </>
  );
}
