import {
  brandedMetadataTitle,
  canonicalMetadata,
} from "../../seo-utils";

export const metadata = {
  ...canonicalMetadata("/about/living-abroad-support"),
  title: brandedMetadataTitle("Living Abroad Student Support"),
  description:
    "Explore support for students living abroad, including accommodation guidance, cultural orientation, emergency assistance and community connections.",
};

export default function Layout({ children }) {
  return children;
}
