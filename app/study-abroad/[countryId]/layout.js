import {
  brandedMetadataTitle,
  canonicalMetadata,
  cleanMetadataText,
  isInternalIdentifier,
  humanizeSlug,
  safeMetadataTitle,
} from "../../seo-utils";
import { getStudyAbroadByCountry } from "../../services/study-abroad";

export async function generateMetadata({ params }) {
  const { countryId } = await params;
  const countryKey = Array.isArray(countryId) ? countryId[0] : countryId;
  const countryName = humanizeSlug(countryKey);
  const fallbackTitle = isInternalIdentifier(countryKey)
    ? "Study Abroad Country Guide"
    : `Study Abroad in ${countryName}`;
  const fallbackDescription =
    isInternalIdentifier(countryKey)
      ? "Explore study abroad destination information, student resources and university admissions guidance for international students planning to study overseas."
      : `Explore study abroad information for ${countryName}, including destination guidance, student resources and university admissions planning for international students.`;

  try {
    const data = await getStudyAbroadByCountry(countryKey);
    const title = safeMetadataTitle(
      data?.title ||
        (data?.country || data?.countryName
          ? `Study Abroad in ${data.country || data.countryName}`
          : ""),
      fallbackTitle
    );
    const description = cleanMetadataText(
      data?.metaDescription || data?.description || data?.subTitle
    );

    return {
      ...canonicalMetadata(
        `/study-abroad/${encodeURIComponent(countryKey || "")}`
      ),
      title: brandedMetadataTitle(title),
      description: description || fallbackDescription,
    };
  } catch (error) {
    console.error("Failed to generate country metadata:", error);
    return {
      ...canonicalMetadata(
        `/study-abroad/${encodeURIComponent(countryKey || "")}`
      ),
      title: brandedMetadataTitle(fallbackTitle),
      description: fallbackDescription,
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default function Layout({ children }) {
  return children;
}
