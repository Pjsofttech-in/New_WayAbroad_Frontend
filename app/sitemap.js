import { getAllBlogs, getAllCountries } from "./services/api";
import {
  getStudyAbroadByCountry,
  normalizeCountryRecords,
} from "./services/study-abroad";
import { courseStreams } from "./data/courses";
import exams from "./data/exams";

const siteUrl = "https://www.wayabroad.in";

export const dynamic = "force-dynamic";

const publicRoutes = [
  "/",
  "/mbbs",
  "/courses",
  "/course-finder",
  "/exams",
  "/scholarships",
  "/blog",
  "/about",
  "/about/living-abroad-support",
  "/about/study-abroad-counselling",
  "/about/what-we-do",
  "/about/why-choose-us",
  "/contact",
  "/counselling",
  "/counselling-office",
  "/become-partner",
  "/exam-registration",
  "/instant-offer",
  "/organization",
  "/student-visa",
  "/trusted-students",
  "/job-finder",
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

function unwrapBlogs(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.content)) return response.content;
  if (Array.isArray(response?.blogs)) return response.blogs;
  return [];
}

function getBlogSlug(blog) {
  const slug = blog?.slug || blog?.blogSlug;
  if (typeof slug === "string" && slug.trim()) {
    return slug.trim();
  }

  return String(blog?.title || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidBlogSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug);
}

async function getValidCountryRoutes() {
  let countries;

  try {
    const response = await getAllCountries({
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    countries = normalizeCountryRecords(response);
  } catch (error) {
    console.error("Failed to load country routes for sitemap:", error);
    return [];
  }

  const results = await Promise.all(
    countries.map(async ({ id }) => {
      if (/[/?#\\]/.test(id) || id === "." || id === "..") {
        return null;
      }

      try {
        await getStudyAbroadByCountry(id);
        return `/study-abroad/${encodeURIComponent(id)}`;
      } catch (error) {
        console.error(
          `Skipping unavailable country guide in sitemap (${id}):`,
          error
        );
        return null;
      }
    })
  );

  return results.filter(Boolean);
}

async function getBlogRoutes() {
  try {
    const blogs = unwrapBlogs(await getAllBlogs());

    return blogs
      .map(getBlogSlug)
      .filter(isValidBlogSlug)
      .map((slug) => `/blog/${encodeURIComponent(slug)}`);
  } catch (error) {
    console.error("Failed to load blog routes for sitemap:", error);
    return [];
  }
}

export default async function sitemap() {
  const [countryRoutes, blogRoutes] = await Promise.all([
    getValidCountryRoutes(),
    getBlogRoutes(),
  ]);
  const routes = [
    ...publicRoutes,
    ...Object.keys(exams).map((slug) => `/exams/${slug}`),
    ...courseStreams.map((stream) => `/stream/${stream.slug}`),
    ...blogRoutes,
    ...countryRoutes,
  ];
  const uniqueRoutes = [...new Set(routes)];
  const now = new Date();

  return uniqueRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency:
      route === "/" ||
      route === "/blog" ||
      route.startsWith("/blog/") ||
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
          : route.startsWith("/study-abroad/")
            ? 0.8
            : 0.7,
  }));
}
