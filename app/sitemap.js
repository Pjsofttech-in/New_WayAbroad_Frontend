const publicRoutes = [
  "/",
  "/mbbs",
  "/courses",
  "/exams",
  "/scholarships",
  "/blog",
  "/about",
  "/contact",
  "/counselling",
  "/counselling-office",
  "/become-partner",
  "/exam-registration",
  "/instant-offer",
  "/organization",
  "/student-visa",
  "/student-testimonial",
  "/trusted-students",
  "/useful-links/ask-wayabroad",
  "/useful-links/cost-of-living",
  "/useful-links/how-to-find-course",
  "/useful-links/how-to-find-scholarships",
  "/useful-links/letter-of-recommendation",
  "/useful-links/statement-of-purpose",
  "/useful-links/student-essentials",
  "/useful-links/study-abroad-courses",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
  "/copyright-policy",
  "/data-protection-addendum",
];

const examRoutes = [
  "act",
  "sat",
  "gre",
  "gmat",
  "ielts",
  "toefl",
  "lsat",
  "mcat",
  "pte",
  "duolingo",
];

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const routes = [
    ...publicRoutes,
    ...examRoutes.map((slug) => `/exams/${slug}`),
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl.replace(/\/$/, "")}${route}`,
    lastModified: now,

    changeFrequency:
      route === "/" ||
      route === "/blog" ||
      route === "/scholarships"
        ? "daily"
        : "weekly",

    priority:
      route === "/"
        ? 1
        : route === "/courses" ||
          route === "/exams" ||
          route === "/scholarships" ||
          route === "/mbbs"
        ? 0.9
        : 0.7,
  }));
}