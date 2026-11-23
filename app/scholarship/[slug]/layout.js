
import {
  createScholarshipSlug,
  getScholarshipById,
  getScholarshipBySlug,
} from "../../services/api";
import {
  brandedMetadataTitle,
  canonicalMetadata,
  cleanMetadataText,
  safeMetadataTitle,
} from "../../seo-utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const routeSlug = Array.isArray(slug) ? slug[0] : slug;

  const fallbackTitle = "Study Abroad Scholarship";
  const fallbackDescription =
    "Review this study abroad scholarship's details, eligibility, study location and available funding information before enquiring through Wayabroad.";

  try {
    const response = /^\d+$/.test(String(routeSlug))
      ? await getScholarshipById(routeSlug)
      : await getScholarshipBySlug(routeSlug);

    const scholarship =
      response?.data?.scholarship ??
      response?.data ??
      response?.scholarship ??
      response;

    const title = safeMetadataTitle(
      scholarship?.sname ||
        scholarship?.name ||
        scholarship?.title,
      fallbackTitle
    );

    const description = cleanMetadataText(
      scholarship?.metaDescription ||
        scholarship?.description ||
        scholarship?.eligibility
    );

    return {
      ...canonicalMetadata(
        `/scholarship/${
          createScholarshipSlug(
            scholarship?.sname || scholarship?.name || routeSlug
          )
        }`
      ),
      title: brandedMetadataTitle(title),
      description: description || fallbackDescription,
    };
  } catch (error) {
    console.error(
      "Failed to generate scholarship metadata:",
      error
    );

    return {
      ...canonicalMetadata(
        `/scholarship/${encodeURIComponent(routeSlug || "")}`
      ),
      title: brandedMetadataTitle(fallbackTitle),
      description: fallbackDescription,
    };
  }
}

export default function Layout({ children }) {
  return children;
}
