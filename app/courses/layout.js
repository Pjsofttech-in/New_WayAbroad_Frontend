import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/courses"),
  title: "Study Abroad Courses by Stream",
  description:
    "Explore study abroad courses by academic stream, compare fields such as business, engineering and medicine, and find a path that fits your goals.",
};

export default function Layout({ children }) {
  return children;
}
