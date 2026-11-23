import { getAllJobs, getJobById } from "../../services/api";
import { createJobSlug } from "../job-utils";
import {
  brandedMetadataTitle,
  canonicalMetadata,
  cleanMetadataText,
  safeMetadataTitle,
} from "../../seo-utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const jobSlug = Array.isArray(slug) ? slug[0] : slug;
  const fallbackTitle = "Job Opportunity";
  const fallbackDescription =
    "View this career opportunity, review role details and check application information in Wayabroad's Job Finder before deciding whether to apply.";

  try {
    const isLegacyId = /^\d+$/.test(String(jobSlug));
    const response = isLegacyId
      ? await getJobById(jobSlug)
      : await getAllJobs().then((jobs) => {
          const matchingJob = jobs.find(
            (item) =>
              createJobSlug(
                item?.jobTitle || item?.title || item?.position
              ) === jobSlug
          );

          return matchingJob?.id
            ? getJobById(matchingJob.id)
            : null;
        });
    const job = response?.data?.job ?? response?.data ?? response?.job ?? response;
    const jobTitle =
      job?.jobTitle || job?.title || job?.position;
    const title = safeMetadataTitle(jobTitle, fallbackTitle);
    const description = cleanMetadataText(
      job?.metaDescription || job?.description || job?.jobDescription
    );

    return {
      ...canonicalMetadata(
        `/jobfinder/${createJobSlug(jobTitle) || encodeURIComponent(jobSlug || "")}`
      ),
      title: brandedMetadataTitle(title),
      description: description || fallbackDescription,
    };
  } catch (error) {
    console.error("Failed to generate job metadata:", error);
    return {
      ...canonicalMetadata(`/jobfinder/${encodeURIComponent(jobSlug || "")}`),
      title: brandedMetadataTitle(fallbackTitle),
      description: fallbackDescription,
    };
  }
}

export default function Layout({ children }) {
  return children;
}
