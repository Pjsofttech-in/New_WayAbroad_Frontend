import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/counselling"),
  title: "Study Abroad Counselling",
  description:
    "Request study abroad counselling from Wayabroad for guidance on destinations, courses, university admissions and the steps in your international education journey.",
};

export default function Layout({ children }) {
  return children;
}
