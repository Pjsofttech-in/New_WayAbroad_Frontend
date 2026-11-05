import NavbarClient from "./NavbarClient";
import { getAllCountries } from "../services/api";

function extractCountries(response) {
  const countries = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.countries)
        ? response.countries
        : Array.isArray(response?.content)
          ? response.content
          : [];

  return countries.filter(
    (country) =>
      country &&
      country.id !== undefined &&
      country.id !== null &&
      String(country.id).length > 0 &&
      (country.country || country.countryName)
  );
}

export default async function Navbar() {
  let countries = [];
  let countryLoadError = false;

  try {
    countries = extractCountries(
      await getAllCountries({
        cache: "force-cache",
        next: { revalidate: 3600 },
      })
    );
    if (countries.length === 0) {
      console.warn("getAllCountries returned no country records.");
    }
  } catch (error) {
    console.error("Failed to load countries:", error);
    countryLoadError = true;
  }

  return (
    <NavbarClient
      countries={countries}
      countryLoadError={countryLoadError}
    />
  );
}
