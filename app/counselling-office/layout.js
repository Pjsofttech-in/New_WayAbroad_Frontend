import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/counselling-office"),
  title: "Study Abroad Counselling Offices",
  description:
    "Find a Wayabroad office for study abroad counselling and guidance on destinations, university admissions and planning your international education.",
};

export default function Layout({ children }) {
  return children;
}
