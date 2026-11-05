import { canonicalMetadata } from "../seo-utils";

export const metadata = {
  ...canonicalMetadata("/exams"),
  title: "Study Abroad Exams and Test Preparation",
  description:
    "Explore tests used for study abroad admissions, including IELTS, TOEFL, GRE, GMAT, SAT, ACT and more, and find exam preparation guidance.",
};

export default function Layout({ children }) {
  return children;
}
