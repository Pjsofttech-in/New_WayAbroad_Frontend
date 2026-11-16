export function getCountryName(job) {
  const country = job?.country;

  if (typeof country === "string") {
    return job?.countryName || country;
  }

  return (
    job?.countryName ||
    country?.countryName ||
    country?.name ||
    job?.location?.countryName ||
    job?.location?.country?.countryName ||
    job?.location?.country?.name ||
    (typeof job?.location?.country === "string"
      ? job.location.country
      : "") ||
    ""
  );
}
