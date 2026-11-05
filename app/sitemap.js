import { getAllCountries } from "./services/api";
import { normalizeCountryRecords } from "./services/study-abroad";

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

// Use your actual production domain
const siteUrl = "https://www.wayabroad.in";

export default async function sitemap() {
  const routes = [
    ...publicRoutes,
    ...examRoutes.map((slug) => `/exams/${slug}`),
  ];
  let countries = [];

  try {
    const response = await getAllCountries({
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    countries = normalizeCountryRecords(response);
  } catch (error) {
    console.error("Failed to load country routes for sitemap:", error);
  }

  const now = new Date();

  const entries = [
    ...routes.map((route) => ({ route, priority: undefined })),
    ...countries.map(({ id }) => ({
      route: `/study-abroad/${encodeURIComponent(id)}`,
      priority: 0.8,
    })),
  ];
  const uniqueEntries = [
    ...new Map(entries.map((entry) => [entry.route, entry])).values(),
  ];

  return uniqueEntries.map(({ route, priority }) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency:
      route === "/" ||
      route === "/blog" ||
      route === "/scholarships"
        ? "daily"
        : "weekly",
    priority:
      priority ??
      (route === "/"
        ? 1
        : route === "/courses" ||
            route === "/exams" ||
            route === "/scholarships" ||
            route === "/mbbs"
          ? 0.9
          : 0.7),
  }));
}