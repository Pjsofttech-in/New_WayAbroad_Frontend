import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/scholarships"),
  title: "Study Abroad Scholarships",
  description:
    "Explore scholarships and funding opportunities for students planning to study abroad, and review options that may support international education costs.",
};

export default function Layout({ children }) {
  return children;
}

