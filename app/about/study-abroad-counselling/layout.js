import {
  brandedMetadataTitle,
  canonicalMetadata,
} from "../../seo-utils";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/about/study-abroad-counselling"),
  title: brandedMetadataTitle("Study Abroad Counselling Services"),
  description:
    "Get personalised study abroad counselling for career and course selection, university admissions, application preparation and interview guidance.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          {
            name: "Study Abroad Counselling",
            path: "/about/study-abroad-counselling",
          },
        ]}
      />
      {children}
    </>
  );
}
