import {
  brandedMetadataTitle,
  canonicalMetadata,
} from "../../seo-utils";

export const metadata = {
  ...canonicalMetadata("/about/why-choose-us"),
  title: brandedMetadataTitle("Why Choose Our Study Abroad Support"),
  description:
    "Discover Wayabroad's study abroad support, with guidance for university selection, applications, visa processing and assistance throughout your journey.",
};

export default function Layout({ children }) {
  return children;
}
