import LegalPage from "../components/LegalPage/LegalPage";

export const metadata = {
  title: "Refund Policy | Wayabroad",
  description: "Refund Policy for Wayabroad.",
};

const sections = [
  {
    title: "1. Introduction",
    paragraphs: [
      "At PJSoftTech, we strive to deliver high-quality software solutions that meet your business needs. If you are not satisfied with our services or products, we offer refunds under specific circumstances outlined in this policy. Please review the details carefully to understand your rights and obligations.",
    ],
  },
  {
    title: "2. Eligibility for Refunds",
    items: [
      "The request is made within 7 days of the purchase or initial service agreement.",
      "The software solution provided does not perform as described or fails to meet agreed-upon specifications.",
      "The client has made all reasonable efforts to resolve issues through our support team.",
    ],
  },
  {
    title: "3. Non-Refundable Services",
    items: [
      "Custom software development after the development phase has started and milestones delivered.",
      "Consulting or advisory services that have been rendered.",
      "SaaS subscription fees after the trial period.",
      "Maintenance and support services already performed.",
    ],
  },
  {
    title: "4. Refund Process",
    paragraphs: [
      "If eligible, follow these steps:",
    ],
    items: [
      "Contact our support at sale@pjsofttech.com or call +91 9923570901.",
      "Provide proof of purchase, service agreement, and issue details.",
      "We will review your case in 3-5 business days. If approved, refunds are processed within 7 business days via the original payment method.",
    ],
  },
  {
    title: "5. Partial Refunds",
    paragraphs: [
      "If some services or milestones are completed, a partial refund may be issued for the unfulfilled portion, as per contract terms.",
    ],
  },
  {
    title: "Subscription-Based Services",
    items: [
      "If cancellation occurs after a billing cycle starts, the service remains active but is non-refundable.",
      "Cancellations during the trial period incur no charges.",
    ],
  },
  {
    title: "Disputed Charges",
    paragraphs: [
      "If you believe a billing error occurred, contact our billing team within 10 days of the charge. We will investigate and resolve the issue.",
    ],
  },
  {
    title: "Limitations",
    paragraphs: [
      "Refunds will not be provided for issues caused by:",
    ],
    items: [
      "Client's failure to provide necessary inputs, access, or data.",
      "Third-party systems or integrations.",
      "Misuse or unauthorized modification of the software.",
    ],
  },
  {
    title: "6. Contact Us",
    paragraphs: [
      "PJSoftTech Pvt. Ltd.",
      "203, 2nd Floor, Mangalmurti Complex, behind ABIL Tower, Hirabagh Chowk, Tilak Road, Shukrawar Peth, Pune-411002, Maharashtra, India.",
      "Email: sale@pjsofttech.com",
      "Phone: +91 9923570901",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      sections={sections}
    />
  );
}