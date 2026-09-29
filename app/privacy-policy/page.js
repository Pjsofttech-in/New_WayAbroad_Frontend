import LegalPage from "../components/LegalPage/LegalPage";

export const metadata = {
  title: "Privacy Policy | Wayabroad",
  description: "Privacy Policy for Wayabroad.",
};

const sections = [
  {
    title: "1. Information We Collect",
    paragraphs: [
      "We may collect and process the following types of information:",
      "Personal Information: Name, email address, phone number, company name, job title, and other contact details.",
      "Technical Information: IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and platform.",
      "Usage Information: Information about how you use our website, products, and services.",
      "Communication Information: Records of your correspondence with us, including support requests and feedback.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "To provide, operate, and maintain our services.",
      "To improve, personalize, and expand our services.",
      "To understand and analyze how you use our services.",
      "To develop new products, services, features, and functionality.",
      "To communicate with you, including customer service, updates, and marketing.",
      "To process your transactions and manage your orders.",
      "To comply with legal obligations and resolve disputes.",
    ],
  },
  {
    title: "3. Sharing Your Information",
    paragraphs: [
      "We may share your information with third parties in the following situations:",
    ],
    items: [
      "With service providers and partners who assist us in delivering our services.",
      "With legal authorities if required by law or to protect our rights.",
      "In connection with a business transfer, such as a merger, acquisition, or asset sale.",
    ],
  },
  {
    title: "4. Security of Your Information",
    paragraphs: [
      "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure.",
    ],
  },
  {
    title: "5. Your Rights and Choices",
    items: [
      "Access and Update: You can access and update your personal information by contacting us.",
      "Delete: You can request the deletion of your personal information, subject to certain legal obligations.",
      "Object and Restrict: You can object to or restrict the processing of your personal information in certain circumstances.",
      "Withdraw Consent: If we are processing your information based on your consent, you can withdraw your consent at any time.",
    ],
  },
  {
    title: "6. Cookies and Tracking Technologies",
    paragraphs: [
      "We use cookies and similar tracking technologies to track the activity on our website and store certain information. You can manage your cookie preferences through your browser settings.",
    ],
  },
  {
    title: "7. Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.",
    ],
  },
  {
    title: "8. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of our services after the changes take effect constitutes your acceptance of the revised Privacy Policy.",
    ],
  },
  {
    title: "9. Contact Us",
    paragraphs: [
      "PJSoftTech Pvt. Ltd.",
      "PjSoftTech Pvt Ltd, 203, 2nd Floor, Mangalmurti Complex, behind ABIL Tower, Hirabagh Chowk, Tilak Road, Shukrawar Peth, Pune-411002, Maharashtra, India.",
      "Email: info@pjsofttech.com",
      "Phone: +91 9923570901",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={sections}
    />
  );
}