import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/instant-offer"),
  title: "FastLane Course Eligibility",
  description:
    "Explore FastLane course options, answer eligibility questions and learn how Wayabroad counsellors can help with your university application.",
};

export default function Layout({ children }) {
  return children;
}
