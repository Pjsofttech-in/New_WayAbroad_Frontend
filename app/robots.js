
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.wayabroad.in";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
