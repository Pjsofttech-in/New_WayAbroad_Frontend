import { getJobById } from "../../services/api";
import {
  brandedMetadataTitle,
  canonicalMetadata,
  cleanMetadataText,
  safeMetadataTitle,
} from "../../seo-utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const jobId = Array.isArray(slug) ? slug[0] : slug;
  const fallbackTitle = "Job Opportunity";
  const fallbackDescription =
    "View this career opportunity, review role details and check application information in Wayabroad's Job Finder before deciding whether to apply.";

  try {
    const response = await getJobById(jobId);
    const job = response?.data?.job ?? response?.data ?? response?.job ?? response;
    const title = safeMetadataTitle(
      job?.jobTitle || job?.title || job?.position,
      fallbackTitle
    );
    const description = cleanMetadataText(
      job?.metaDescription || job?.description || job?.jobDescription
    );

    return {
      ...canonicalMetadata(`/jobfinder/${encodeURIComponent(jobId || "")}`),
      title: brandedMetadataTitle(title),
      description: description || fallbackDescription,
    };
  } catch (error) {
    console.error("Failed to generate job metadata:", error);
    return {
      ...canonicalMetadata(`/jobfinder/${encodeURIComponent(jobId || "")}`),
      title: brandedMetadataTitle(fallbackTitle),
      description: fallbackDescription,
    };
  }
}

export default function Layout({ children }) {
  return children;
}
