
export function createJobSlug(title) {
  return String(title || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCountryName(job) {
  const country = job?.country;
  const location = job?.location;

  // Country is directly a string
  if (typeof country === "string") {
    return (
      job?.countryName ||
      country.trim()
    );
  }

  // Country is an object
  return (
    job?.countryName ||
    country?.countryName ||
    country?.name ||
    country?.title ||
    country?.label ||
    location?.countryName ||
    location?.country?.countryName ||
    location?.country?.name ||
    location?.country?.title ||
    location?.country?.label ||
    (typeof location?.country === "string"
      ? location.country.trim()
      : "") ||
    ""
  ).trim();
}
