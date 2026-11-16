import {
  brandedMetadataTitle,
  canonicalMetadata,
} from "../../seo-utils";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/about/living-abroad-support"),
  title: brandedMetadataTitle("Living Abroad Student Support"),
  description:
    "Explore support for students living abroad, including accommodation guidance, cultural orientation, emergency assistance and community connections.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          {
            name: "Living Abroad Support",
            path: "/about/living-abroad-support",
          },
        ]}
      />
      {children}
    </>
  );
}
