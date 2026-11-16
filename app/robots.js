
const siteUrl = "https://www.wayabroad.in";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/super-admin"],
      },
    ],

    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
