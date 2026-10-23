"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../jobfinder/jobfinder.module.css";
import { getAllJobs } from "../services/api";

const JOBS_PER_PAGE = 9;

const EMPTY_FILTERS = {
  education: "",
  sector: "",
  jobType: "",
  salary: "",
  sort: "latest",
};

function unwrapJobs(response) {
  const data =
    response?.data?.jobs ??
    response?.data ??
    response?.jobs ??
    response;

  return Array.isArray(data) ? data : null;
}

function getLocationName(job) {
  const location = job?.location;

  if (typeof location === "string") {
    return job?.locationName || location;
  }

  return (
    job?.locationName ||
    location?.locationName ||
    location?.name ||
    job?.city ||
    ""
  );
}

function getCountryName(job) {
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

function getCompanyName(job) {
  return (
    job?.companyName ||
    job?.company?.name ||
    job?.employerName ||
    job?.sectorName ||
    "Career opportunity"
  );
}

function getCompanyInitial(job) {
  return getCompanyName(job).charAt(0).toUpperCase();
}

function getSkills(job) {
  const skills = job?.skill || job?.skills || "";

  if (Array.isArray(skills)) {
    return skills
      .map((skill) =>
        typeof skill === "string"
          ? skill
          : skill?.name || ""
      )
      .filter(Boolean)
      .slice(0, 4);
  }

  return String(skills)
    .split(/[,;]/)
    .map((skill) => skill.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function getPostedLabel(job) {
  const date =
    job?.createdAt ||
    job?.postedDate ||
    job?.datePosted;

  if (date) {
    const parsedDate = new Date(date);

    if (!Number.isNaN(parsedDate.getTime())) {
      const days = Math.max(
        0,
        Math.floor(
          (Date.now() - parsedDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );

      if (days === 0) return "Posted today";
      if (days === 1) return "Posted 1 day ago";
      if (days < 7) return `Posted ${days} days ago`;
      if (days < 14) return "Posted 1 week ago";

      return `Posted ${Math.floor(days / 7)} weeks ago`;
    }
  }

  return "Latest opportunity";
}

function formatSalary(job) {
  if (job?.salary == null || job.salary === "") {
    return "Salary not specified";
  }

  const amount = Number(job.salary);

  if (!Number.isFinite(amount)) {
    return String(job.salary);
  }

  return `${
    job?.currencyName ? `${job.currencyName} ` : ""
  }${amount.toLocaleString("en-IN")}`;
}

function getUniqueOptions(values) {
  return [
    ...new Set(
      values
        .map((value) => String(value ?? "").trim())
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));
}

function matchesSelectedCountry(job, selectedCountry) {
  if (!selectedCountry || selectedCountry === "All Countries") {
    return true;
  }

  const countryName = getCountryName(job).trim().toLowerCase();

  // Use the explicit country field first.
  if (countryName) {
    const aliases = {
      "united states": ["united states", "usa", "us"],
      "united kingdom": ["united kingdom", "uk", "great britain"],
      uae: ["uae", "united arab emirates"],
    };

    const normalizedSelected = selectedCountry.trim().toLowerCase();
    const acceptedNames =
      aliases[normalizedSelected] || [normalizedSelected];

    if (
      acceptedNames.some(
        (name) =>
          countryName === name ||
          countryName.includes(name)
      )
    ) {
      return true;
    }

    return false;
  }

  // Fallback for APIs that only provide a location string.
  const locationText = String(
    job?.locationName ||
      (typeof job?.location === "string" ? job.location : "") ||
      ""
  ).toLowerCase();

  const normalizedSelected = selectedCountry.trim().toLowerCase();

  const aliases = {
    "united states": ["united states", "usa", "us"],
    "united kingdom": ["united kingdom", "uk", "great britain"],
    uae: ["uae", "united arab emirates"],
  };

  const acceptedNames =
    aliases[normalizedSelected] || [normalizedSelected];

  return acceptedNames.some((name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|[^a-z])${escaped}($|[^a-z])`, "i");

    return pattern.test(locationText);
  });
}

export default function JobSearchHeader() {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCountry, setSelectedCountry] =
    useState("All Countries");

  const [filters, setFilters] = useState({
    ...EMPTY_FILTERS,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState("");
  const [savedJobIds, setSavedJobIds] = useState([]);

  // Load public jobs. No admin role/email query parameters are needed here.
  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      try {
        setLoadingJobs(true);
        setError("");

        const response = await getAllJobs();
        const data = unwrapJobs(response);

        if (!data) {
          throw new Error(
            "Invalid jobs response. Please check your jobs API."
          );
        }

        if (!cancelled) {
          setJobs(
            data.filter(
              (job) => job && job.active !== false
            )
          );
        }
      } catch (err) {
        console.error("Job listing API failed:", err);

        if (!cancelled) {
          setJobs([]);
          setError(
            err?.message || "Unable to load jobs."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingJobs(false);
        }
      }
    }

    loadJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  // Build filter options dynamically from the returned jobs.
  const countries = useMemo(
    () =>
      getUniqueOptions(
        jobs.map((job) => getCountryName(job))
      ),
    [jobs]
  );

  const locations = useMemo(
    () =>
      getUniqueOptions(
        jobs.map((job) => getLocationName(job))
      ),
    [jobs]
  );

  const updateFilter = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));

    setCurrentPage(1);
  };

  const clearSearch = () => {
    setKeyword("");
    setLocation("");
    setSelectedCountry("All Countries");
    setFilters({ ...EMPTY_FILTERS });
    setCurrentPage(1);
  };

  const uniqueValues = (field) =>
    getUniqueOptions(
      jobs.map((job) => job?.[field])
    );

  // Filter jobs.
  const filteredJobs = useMemo(() => {
    const searchText = keyword.trim().toLowerCase();
    const searchLocation = location.trim().toLowerCase();

    return jobs.filter((job) => {
      const jobLocation = getLocationName(job).toLowerCase();

      const searchableText = [
        job?.jobTitle,
        job?.skill,
        job?.skills,
        job?.description,
        job?.educationName,
        job?.sectorName,
        job?.jobRoleName,
        getLocationName(job),
        getCountryName(job),
        job?.jobTypeName,
        job?.companyName,
        job?.employerName,
      ]
        .map((value) =>
          Array.isArray(value)
            ? value
                .map((item) =>
                  typeof item === "string"
                    ? item
                    : item?.name || ""
                )
                .join(" ")
            : value
        )
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesKeyword =
        !searchText || searchableText.includes(searchText);

      const matchesLocation =
        !searchLocation ||
        jobLocation.includes(searchLocation);

      const matchesCountry = matchesSelectedCountry(
        job,
        selectedCountry
      );

      const matchesEducation =
        !filters.education ||
        job?.educationName === filters.education;

      const matchesSector =
        !filters.sector ||
        job?.sectorName === filters.sector;

      const matchesJobType =
        !filters.jobType ||
        job?.jobTypeName === filters.jobType;

      const salary =
        job?.salary == null || job.salary === ""
          ? null
          : Number(job.salary);

      const matchesSalary =
        !filters.salary ||
        (salary !== null &&
          Number.isFinite(salary) &&
          (filters.salary === "under50000"
            ? salary < 50000
            : filters.salary === "50000"
              ? salary >= 50000
              : filters.salary === "100000"
                ? salary >= 100000
                : filters.salary === "150000"
                  ? salary >= 150000
                  : true));

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesCountry &&
        matchesEducation &&
        matchesSector &&
        matchesJobType &&
        matchesSalary
      );
    });
  }, [
    jobs,
    keyword,
    location,
    selectedCountry,
    filters,
  ]);

  // Sort the filtered results.
  const sortedJobs = useMemo(() => {
    const result = [...filteredJobs];

    if (filters.sort === "title") {
      result.sort((a, b) =>
        String(a?.jobTitle || "").localeCompare(
          String(b?.jobTitle || "")
        )
      );
    } else if (filters.sort === "salaryHigh") {
      result.sort(
        (a, b) =>
          (Number(b?.salary) || 0) -
          (Number(a?.salary) || 0)
      );
    } else {
      result.sort((a, b) => {
        const dateA = new Date(
          a?.createdAt ||
            a?.postedDate ||
            a?.datePosted ||
            0
        ).getTime();

        const dateB = new Date(
          b?.createdAt ||
            b?.postedDate ||
            b?.datePosted ||
            0
        ).getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [filteredJobs, filters.sort]);

  // Pagination.
  const totalPages = Math.max(
    1,
    Math.ceil(sortedJobs.length / JOBS_PER_PAGE)
  );

  const visibleJobs = sortedJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const toggleSavedJob = (jobId) => {
    setSavedJobIds((previous) =>
      previous.includes(jobId)
        ? previous.filter((id) => id !== jobId)
        : [...previous, jobId]
    );
  };

  const handleViewJob = (job) => {
    if (job?.id == null || job.id === "") {
      console.error("Job ID is missing:", job);
      return;
    }

    router.push(
      `/jobfinder/${encodeURIComponent(String(job.id))}`
    );
  };

  return (
    <main className={styles.page}>
      {/* DYNAMIC COUNTRY SELECTOR */}
      <section
        className={styles.countryBar}
        aria-label="Select job country"
      >
        {["All Countries", ...countries].map((country) => (
          <button
            key={country}
            type="button"
            className={`${styles.countryButton} ${
              selectedCountry === country
                ? styles.countryActive
                : ""
            }`}
            aria-pressed={selectedCountry === country}
            onClick={() => {
              setSelectedCountry(country);
              setCurrentPage(1);
            }}
          >
            {country}
          </button>
        ))}
      </section>

      {/* SEARCH AND FILTERS */}
      <section className={styles.searchSection}>
        <form
          className={styles.filterForm}
          onSubmit={(event) => event.preventDefault()}
        >
          {/* KEYWORD SEARCH */}
          <label className={styles.searchInput}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 5 5" />
            </svg>

            <input
              type="search"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="Search jobs by keyword"
            />
          </label>

          {/* DYNAMIC LOCATION DROPDOWN */}
          <label className={styles.selectWrapper}>
            <span className={styles.visuallyHidden}>
              Location
            </span>

            <select
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter jobs by location"
            >
              <option value="">All Locations</option>

              {locations.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {/* EDUCATION */}
          <label className={styles.selectWrapper}>
            <span className={styles.visuallyHidden}>
              Education
            </span>

            <select
              value={filters.education}
              onChange={(event) =>
                updateFilter("education", event.target.value)
              }
            >
              <option value="">All Education</option>

              {uniqueValues("educationName").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          {/* SECTOR */}
          <label className={styles.selectWrapper}>
            <span className={styles.visuallyHidden}>
              Sector
            </span>

            <select
              value={filters.sector}
              onChange={(event) =>
                updateFilter("sector", event.target.value)
              }
            >
              <option value="">All Sectors</option>

              {uniqueValues("sectorName").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          {/* JOB TYPE */}
          <label className={styles.selectWrapper}>
            <span className={styles.visuallyHidden}>
              Job type
            </span>

            <select
              value={filters.jobType}
              onChange={(event) =>
                updateFilter("jobType", event.target.value)
              }
            >
              <option value="">All Job Types</option>

              {uniqueValues("jobTypeName").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          {/* SALARY */}
          <label className={styles.salarySelect}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <ellipse cx="12" cy="5" rx="8" ry="3" />
              <path d="M4 5v5c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
              <path d="M4 10v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" />
              <path d="M4 15v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4" />
            </svg>

            <span className={styles.visuallyHidden}>
              Salary range
            </span>

            <select
              value={filters.salary}
              onChange={(event) =>
                updateFilter("salary", event.target.value)
              }
            >
              <option value="">Salary</option>
              <option value="under50000">Below 50,000</option>
              <option value="50000">50,000+</option>
              <option value="100000">1,00,000+</option>
              <option value="150000">1,50,000+</option>
            </select>
          </label>

          {/* CLEAR FILTERS */}
          <button
            type="button"
            className={styles.clearButton}
            onClick={clearSearch}
          >
            Clear
          </button>
        </form>
      </section>

      {/* AVAILABLE JOBS */}
      <section className={styles.jobsSection}>
        <div className={styles.jobsHeading}>
          <div className={styles.headingTitle}>
            <h2>Available Jobs</h2>

            <span className={styles.jobsCount}>
              {sortedJobs.length}{" "}
              {sortedJobs.length === 1 ? "job" : "jobs"}
            </span>
          </div>

          <label className={styles.sortControl}>
            <span>Sort by:</span>

            <select
              value={filters.sort}
              onChange={(event) =>
                updateFilter("sort", event.target.value)
              }
            >
              <option value="latest">Latest</option>
              <option value="salaryHigh">Highest Salary</option>
              <option value="title">Job Title</option>
            </select>
          </label>
        </div>

        {loadingJobs && (
          <div
            className={styles.infoMessage}
            role="status"
          >
            Loading available jobs...
          </div>
        )}

        {!loadingJobs && error && (
          <div
            className={styles.errorMessage}
            role="alert"
          >
            {error}
          </div>
        )}

        {!loadingJobs && !error && sortedJobs.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>⌕</div>
            <h3>No jobs found</h3>
            <p>
              Try another country, keyword, location, or filter.
            </p>

            <button type="button" onClick={clearSearch}>
              Clear all filters
            </button>
          </div>
        )}

        {!loadingJobs && !error && sortedJobs.length > 0 && (
          <>
            <div className={styles.jobsGrid}>
              {visibleJobs.map((job) => {
                const saved = savedJobIds.includes(job.id);
                const skills = getSkills(job);

                return (
                  <article
                    className={styles.jobCard}
                    key={job.id}
                  >
                    <div className={styles.jobCardTop}>
                      <div className={styles.companyLogo}>
                        {getCompanyInitial(job)}
                      </div>

                      <div className={styles.jobTitleBlock}>
                        <h3>
                          {job.jobTitle || "Untitled Job"}
                        </h3>

                        <p className={styles.companyName}>
                          {getCompanyName(job)}
                        </p>
                      </div>

                      <button
                        type="button"
                        className={`${styles.saveButton} ${
                          saved ? styles.savedButton : ""
                        }`}
                        onClick={() => toggleSavedJob(job.id)}
                        aria-pressed={saved}
                      >
                        <span aria-hidden="true">
                          {saved ? "♥" : "♡"}
                        </span>{" "}
                        {saved ? "Saved" : "Save"}
                      </button>
                    </div>

                    <div className={styles.jobFacts}>
                      <span className={styles.factItem}>
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>

                        {getLocationName(job) ||
                          "Location not specified"}
                      </span>

                      <span className={styles.factItem}>
                        <span
                          className={styles.rupeeIcon}
                          aria-hidden="true"
                        >
                          ₹
                        </span>

                        {formatSalary(job)}
                      </span>

                      <span className={styles.factItem}>
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <rect
                            x="3"
                            y="7"
                            width="18"
                            height="14"
                            rx="2"
                          />
                          <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
                        </svg>

                        {job.jobTypeName ||
                          "Job type not specified"}
                      </span>

                      {job.openings != null && (
                        <span className={styles.factItem}>
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle cx="9" cy="8" r="3" />
                            <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" />
                          </svg>

                          {job.openings}{" "}
                          {Number(job.openings) === 1
                            ? "opening"
                            : "openings"}
                        </span>
                      )}
                    </div>

                    {skills.length > 0 && (
                      <div className={styles.jobTags}>
                        {skills.map((skill, index) => (
                          <span
                            key={`${job.id}-${skill}-${index}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className={styles.jobDescription}>
                      {job.description ||
                        "Explore this opportunity and discover how your skills can make an impact."}
                    </p>

                    <div className={styles.jobCardFooter}>
                      <span className={styles.postedDate}>
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>

                        {getPostedLabel(job)}
                      </span>

                      <button
                        type="button"
                        className={styles.viewJobButton}
                        onClick={() => handleViewJob(job)}
                      >
                        View Job{" "}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {sortedJobs.length > JOBS_PER_PAGE && (
              <nav
                className={styles.pagination}
                aria-label="Job pages"
              >
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(1, page - 1)
                    )
                  }
                >
                  ← Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                >
                  Next →
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}