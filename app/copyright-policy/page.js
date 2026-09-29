import LegalPage from "../components/LegalPage/LegalPage";

export const metadata = {
  title: "Copyright Policy | PJSoftTech",
  description: "Copyright Policy for PJSoftTech Pvt. Ltd.",
};

const sections = [
  {
    title: "Copyright Policy",
    paragraphs: [
      'PJSofttech Pvt. Ltd. ("PJSofttech") is a leading software company established in 2020, dedicated to delivering cutting-edge software solutions that empower businesses and individuals to thrive in the digital era.',
    ],
  },

  {
    title: "Ownership of Content",
    paragraphs: [
      "All content on the PJSofttech website and applications, including text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of PJSofttech, its affiliates, or its content suppliers. This content is protected by relevant copyright, authors' rights, and database right laws.",
    ],
  },

  {
    title: "Use of Content",
    items: [
      "Personal, Non-Commercial Use: Users may access and use the content on the PJSofttech website and applications for personal, non-commercial purposes only.",

      "Prohibited Uses: Users may not systematically extract or re-utilize parts of the contents of the PJSofttech website and applications without PJSofttech's express written consent, except for personal, non-commercial use, and only if the source of the material is acknowledged.",

      "Software and Databases: All software used on the PJSofttech website and applications is the property of PJSofttech, its affiliates, or its software suppliers and is protected by relevant copyright and authors' rights laws. Users may not modify, adapt, translate, reverse engineer, decompile, or disassemble any software or database associated with PJSofttech without PJSofttech's express written consent.",
    ],
  },

  {
    title: "Copyright Infringement",
    paragraphs: [
      "PJSofttech respects the intellectual property rights of others. If you believe that any content on the PJSofttech website or applications infringes your copyright, please follow our Notification of Copyright Infringement process as outlined below:",
    ],

    items: [
      "Provide a statement specifying the content on the PJSofttech website or application that you believe infringes your copyright.",

      "Include the title and description of the content, along with the full URL where it is available.",

      "Describe the copyrighted work that you believe has been infringed and provide a link if available.",

      "Specify the country in which your copyright applies.",

      "Explain how the content on the PJSofttech website or application infringes your copyright.",

      "Provide your contact information, including email and postal address, along with a phone number.",

      "Include a statement that you have a good-faith belief that the disputed use of the copyrighted work is not authorized by the copyright owner or permitted by law.",

      "Affix your electronic or physical signature.",
    ],
  },

  {
    title: "Contact for Copyright Infringement",
    paragraphs: [
      "Please send your copyright infringement notice to:",

      "By mail: info@pjsofttech.com",

      "Address: PjSoftTech Pvt Ltd, 203, 2nd floor, Mangalmurti Complex, behind ABIL Tower, Hirabagh Chowk, Tilak Road, Shukrawar Peth, Pune-411002, India.",
    ],
  },

  {
    title: "Policy Updates",
    paragraphs: [
      "PJSofttech reserves the right to update this Copyright Policy at any time. Changes will be effective immediately upon posting on the PJSofttech website or applications. Users are encouraged to review this policy periodically to stay informed about how PJSofttech protects its intellectual property rights.",
    ],
  },
];

export default function CopyrightPolicyPage() {
  return (
    <LegalPage
      title="Copyright Policy"
      sections={sections}
    />
  );
}