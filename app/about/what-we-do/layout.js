import {
  brandedMetadataTitle,
  canonicalMetadata,
} from "../../seo-utils";

export const metadata = {
  ...canonicalMetadata("/about/what-we-do"),
  title: brandedMetadataTitle("Study Abroad Services"),
  description:
    "Learn about Wayabroad's study abroad services, including university selection, applications, visa guidance, pre-departure support and scholarships.",
};

export default function Layout({ children }) {
  return children;
}
