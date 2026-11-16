import { canonicalMetadata } from "../seo-utils";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  ...canonicalMetadata("/exam-registration"),
  title: "Register for Exam Preparation",
  description:
    "Register for exam preparation support with Wayabroad by sharing your chosen test and contact details, so the team can follow up on your next steps.",
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          {
            name: "Exam Registration",
            path: "/exam-registration",
          },
        ]}
      />
      {children}
    </>
  );
}
