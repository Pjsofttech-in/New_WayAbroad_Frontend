import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/job-finder"),
  title: "Job Finder",
  description:
    "Browse job opportunities and filter current listings by location, role, sector, education and work type to find roles that fit your search.",
};

export default function Layout({ children }) {
  return children;
}
