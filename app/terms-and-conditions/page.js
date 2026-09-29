import LegalPage from "../components/LegalPage/LegalPage";

export const metadata = {
  title: "Terms and Conditions | Wayabroad",
  description: "Terms and Conditions for Wayabroad.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing and using our services, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using our services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use our services.",
    ],
  },
  {
    title: "2. Services Provided",
    paragraphs: [
      "PJSoftTech Pvt. Ltd. offers IT services and IT consulting, including but not limited to software development, system integration, and technical support.",
    ],
  },
  {
    title: "3. User Responsibilities",
    paragraphs: [
      "As a user of our services, you agree to provide accurate and complete information when requested. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account.",
    ],
  },
  {
    title: "4. Prohibited Activities",
    paragraphs: [
      "You agree not to engage in any of the following activities:",
    ],
    items: [
      "Violating any applicable laws or regulations.",
      "Infringing on the intellectual property rights of others.",
      "Engaging in any fraudulent or deceptive practices.",
      "Introducing any viruses or other malicious code.",
      "Interfering with the operation of our services.",
    ],
  },
  {
    title: "5. Limitation of Liability",
    paragraphs: [
      "PJSoftTech Pvt. Ltd. shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to damages for loss of profits, use, data, or other intangibles.",
    ],
  },
  {
    title: "6. Termination",
    paragraphs: [
      "We reserve the right to terminate your access to our services without notice for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason.",
    ],
  },
  {
    title: "7. Changes to Terms",
    paragraphs: [
      "We reserve the right to modify these Terms and Conditions at any time. You should check this page regularly. Your continued use of our services after any changes constitutes your acceptance of the new Terms and Conditions.",
    ],
  },
  {
    title: "8. Governing Law",
    paragraphs: [
      "These Terms and Conditions are governed by and construed in accordance with the laws of India. You agree to submit to the exclusive jurisdiction of the courts located in Pune, Maharashtra, for the resolution of any disputes.",
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

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      sections={sections}
    />
  );
}