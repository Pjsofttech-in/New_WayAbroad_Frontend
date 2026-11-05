import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/mbbs"),
  title: "Study MBBS Abroad",
  description:
    "Explore MBBS abroad destinations and get Wayabroad guidance on medical university selection, admissions, visa processing and support for studying medicine overseas.",
};

export default function Layout({ children }) {
  return children;
}
