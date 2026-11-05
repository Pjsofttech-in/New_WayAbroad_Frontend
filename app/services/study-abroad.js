import { cache } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8097";

export function normalizeCountryRecords(response) {
  const records = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.countries)
        ? response.countries
        : Array.isArray(response?.content)
          ? response.content
          : [];
  const countries = [];
  const seenIds = new Set();
  const seenNames = new Set();

  for (const record of records) {
    if (
      !record ||
      (typeof record.id !== "string" &&
        typeof record.id !== "number") ||
      typeof (record.country || record.countryName) !== "string"
    ) {
      continue;
    }

    const id = String(record.id).trim();
    const name = (record.country || record.countryName)
      .trim()
      .replace(/\s+/g, " ");
    const normalizedName = name.toLowerCase();

    if (
      !id ||
      !name ||
      seenIds.has(id) ||
      seenNames.has(normalizedName)
    ) {
      continue;
    }

    seenIds.add(id);
    seenNames.add(normalizedName);
    countries.push({ id, name });
  }

  return countries;
}

export const getStudyAbroadByCountry = cache(async (countryId) => {
  if (
    (typeof countryId !== "string" && typeof countryId !== "number") ||
    !String(countryId).trim()
  ) {
    throw new Error("A valid country identifier is required.");
  }

  const response = await fetch(
    `${API_BASE}/getStudyAbroadByCountry/${encodeURIComponent(countryId)}`,
    {
      headers: { Accept: "application/json" },
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    const error = new Error(
      response.status === 404
        ? "Study Abroad information was not found for this country."
        : `Unable to load the page (HTTP ${response.status}).`
    );
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("The country guide response was invalid.");
  }

  return data;
});
