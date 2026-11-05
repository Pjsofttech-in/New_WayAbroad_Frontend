import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/exam-registration"),
  title: "Register for Exam Preparation",
  description:
    "Register for exam preparation support with Wayabroad by sharing your chosen test and contact details, so the team can follow up on your next steps.",
};

export default function Layout({ children }) {
  return children;
}
