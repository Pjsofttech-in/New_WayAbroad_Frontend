export const SITE_URL = "https://www.wayabroad.in";

export const organizationId = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: "Wayabroad",
  url: `${SITE_URL}/`,
  description:
    "Wayabroad helps students study abroad in Australia, Canada, UK and USA with university applications, visa assistance and free counselling.",
};

export function createBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(path, SITE_URL).toString(),
    })),
  };
}
