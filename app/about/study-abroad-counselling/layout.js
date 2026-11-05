import {
  brandedMetadataTitle,
  canonicalMetadata,
} from "../../seo-utils";

export const metadata = {
  ...canonicalMetadata("/about/study-abroad-counselling"),
  title: brandedMetadataTitle("Study Abroad Counselling Services"),
  description:
    "Get personalised study abroad counselling for career and course selection, university admissions, application preparation and interview guidance.",
};

export default function Layout({ children }) {
  return children;
}
