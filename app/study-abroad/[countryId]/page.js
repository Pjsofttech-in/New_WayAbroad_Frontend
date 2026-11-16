import { notFound } from "next/navigation";
import styles from "./StudyAbroad.module.css";
import StudyAbroadClient from "./StudyAbroadClient";
import { getStudyAbroadByCountry } from "../../services/study-abroad";
import {
  humanizeSlug,
  isInternalIdentifier,
  safeMetadataTitle,
} from "../../seo-utils";
import JsonLd from "../../components/JsonLd";
import { createBreadcrumbSchema } from "../../structured-data";

export default async function StudyAbroadPage({ params }) {
  const { countryId } = await params;

  try {
    const studyAbroad = await getStudyAbroadByCountry(countryId);
    const countryName =
      typeof studyAbroad.country === "string" &&
      studyAbroad.country.trim()
        ? studyAbroad.country.trim()
        : typeof studyAbroad.countryName === "string" &&
            studyAbroad.countryName.trim()
          ? studyAbroad.countryName.trim()
          : isInternalIdentifier(countryId)
            ? ""
            : humanizeSlug(countryId);
    const title = safeMetadataTitle(
      studyAbroad.title,
      countryName
        ? `Study Abroad in ${countryName}`
        : "Study Abroad Guide"
    );

    return (
      <>
        <JsonLd
          data={createBreadcrumbSchema([
            { name: "Home", path: "/" },
            {
              name: title,
              path: `/study-abroad/${encodeURIComponent(countryId)}`,
            },
          ])}
        />
        <StudyAbroadClient
          studyAbroad={{ ...studyAbroad, title, country: countryName }}
        />
      </>
    );
  } catch (error) {
    console.error("Failed to load study abroad country page:", error);

    if (error.status === 404) {
      notFound();
    }

    return (
      <main className={styles.statusPage}>
        <h1>Study Abroad information unavailable</h1>
        <p>
          {error.status === 404
            ? "Study Abroad information was not found for this country."
            : "We could not load this country guide right now. Please try again later."}
        </p>
      </main>
    );
  }
}
