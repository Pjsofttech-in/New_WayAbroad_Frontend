"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../jobfinder/jobfinder.module.css";

import {
  getAllJobs,
  getAllJobCountries,
  getAllJobLocations,
  getAllJobEducations,
  getAllJobSectors,
  getAllJobTypes,
  getAllJobRoles,
  getAllJobWorkTypes,
} from "../services/api";
import { getCountryName } from "../jobfinder/job-utils";

const JOBS_PER_PAGE = 9;

const EMPTY_FILTERS = {
  education: "",
  sector: "",
  jobType: "",
  role: "",
  workType: "",
  salary: "",
  sort: "latest",
};

/* =========================================
   RESPONSE HELPERS
========================================= */

function unwrapArray(response) {
  const candidates = [
    response,
    response?.data,
    response?.content,
    response?.data?.content,
    response?.data?.data,
    response?.data?.items,
    response?.items,
    response?.results,
  ];

  return candidates.find(Array.isArray) || [];
}

function optionName(item, keys) {
  if (typeof item === "string" || typeof item === "number") {
    return String(item);
  }

  for (const key of keys) {
    if (
      item?.[key] !== undefined &&
      item?.[key] !== null &&
      item[key] !== ""
    ) {
      return String(item[key]);
    }
  }

  return "";
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

function toOptions(response, keys) {
  return getUniqueOptions(
    unwrapArray(response).map((item) => optionName(item, keys))
  );
}

/* =========================================
   JOB DATA HELPERS
========================================= */

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

function getCompanyName(job) {
  return (
    job?.companyName ||
    job?.company?.name ||
    job?.employerName ||
    ""
  );
}

function getSkills(job) {
  const skills = job?.skill || job?.skills || "";

  if (Array.isArray(skills)) {
    return skills
      .map((skill) =>
        typeof skill === "string" ? skill : skill?.name || ""
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
  const date = job?.createdAt || job?.postedDate || job?.datePosted;

  if (!date) return "Latest opportunity";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Latest opportunity";
  }

  const days = Math.max(
    0,
    Math.floor((Date.now() - parsedDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  if (days === 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  if (days < 7) return `Posted ${days} days ago`;
  if (days < 14) return "Posted 1 week ago";

  return `Posted ${Math.floor(days / 7)} weeks ago`;
}

function formatSalary(job) {
  if (job?.salary == null || job.salary === "") {
    return "Salary not specified";
  }

  const amount = Number(job.salary);

  if (!Number.isFinite(amount)) {
    return String(job.salary);
  }

  const currency = job?.currencyName || job?.currency?.name || "";

  return `${currency ? `${currency} ` : ""}${amount.toLocaleString("en-IN")}`;
}

/* =========================================
   COUNTRY HELPERS
========================================= */

function normalizeCountryName(country) {
  if (!country) return "";

  if (typeof country === "string") {
    return country.trim().toLowerCase();
  }

  return String(
    country?.countryName ||
      country?.name ||
      country?.country ||
      country?.title ||
      ""
  )
    .trim()
    .toLowerCase();
}

function getCountryAliases(countryName) {
  const selected = normalizeCountryName(countryName);

  const aliases = {
    "united states": ["united states", "usa", "us"],
    "united kingdom": ["united kingdom", "uk", "great britain"],
    uae: ["uae", "united arab emirates"],
    "united arab emirates": ["uae", "united arab emirates"],
  };

  return aliases[selected] || [selected];
}

function matchesSelectedCountry(job, selectedCountry) {
  if (!selectedCountry || selectedCountry === "All Countries") {
    return true;
  }

  const jobCountry = normalizeCountryName(getCountryName(job));
  const acceptedNames = getCountryAliases(selectedCountry);

  if (jobCountry) {
    return acceptedNames.some(
      (name) => jobCountry === name || jobCountry.includes(name)
    );
  }

  return false;
}

/* =========================================
   LOCATION HELPERS
========================================= */

function getLocationCountryName(location) {
  if (!location || typeof location !== "object") {
    return "";
  }

  const country = location?.country;

  if (typeof country === "string") {
    return location?.countryName || country;
  }

  return (
    location?.countryName ||
    country?.countryName ||
    country?.name ||
    location?.country?.title ||
    ""
  );
}

function getLocationOptionName(location) {
  if (typeof location === "string" || typeof location === "number") {
    return String(location);
  }

  return (
    location?.location ||
    location?.locationName ||
    location?.name ||
    location?.city ||
    location?.title ||
    ""
  );
}

function getLocationsForCountry(locations, selectedCountry) {
  if (!selectedCountry || selectedCountry === "All Countries") {
    return locations;
  }

  const acceptedNames = getCountryAliases(selectedCountry);

  return locations.filter((location) => {
    const locationCountry = normalizeCountryName(
      getLocationCountryName(location)
    );

    if (!locationCountry) {
      return false;
    }

    return acceptedNames.some(
      (name) =>
        locationCountry === name ||
        locationCountry.includes(name)
    );
  });
}

/* =========================================
   FILTER MATCHING
========================================= */

function matchesText(value, selected) {
  if (!selected) return true;
  if (value == null) return false;

  const actual =
    typeof value === "object"
      ? value.name || value.label || value.title || ""
      : String(value);

  return actual.trim().toLowerCase() === selected.trim().toLowerCase();
}

function SearchableFilter({ label, value, options = [], onChange }) {
  const id = useId();
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filterOptions = [
    { label, value: "" },
    ...options.map((option) => {
      if (typeof option === "string" || typeof option === "number") {
        const value = String(option);
        return { label: value, value };
      }

      return {
        label: String(option.label),
        value: String(option.value),
      };
    }),
  ];
  const visibleOptions = filterOptions.filter((option) =>
    option.label.toLowerCase().includes(query.trim().toLowerCase())
  );
  const selectedOption = filterOptions.find(
    (option) => option.value === value
  );
  const selectedIndex = Math.max(
    filterOptions.findIndex((option) => option.value === value),
    0
  );

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
        setQuery("");
        setActiveIndex(0);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  const selectOption = (option) => {
    onChange(option.value);
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setQuery("");
        setActiveIndex(0);
      } else if (visibleOptions.length > 0) {
        setActiveIndex((index) =>
          Math.min(index + 1, visibleOptions.length - 1)
        );
      }
    } else if (event.key === "ArrowUp" && open) {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (
      event.key === "Enter" &&
      open &&
      visibleOptions[activeIndex]
    ) {
      event.preventDefault();
      selectOption(visibleOptions[activeIndex]);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setQuery("");
      setActiveIndex(0);
    } else if (event.key === "Tab") {
      setOpen(false);
      setQuery("");
      setActiveIndex(0);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.selectWrapper}
      onFocus={() => {
        setOpen(true);
        setQuery("");
        setActiveIndex(selectedIndex);
      }}
    >
      <input
        type="text"
        className={styles.searchableFilterInput}
        role="combobox"
        aria-label={label}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-options`}
        aria-activedescendant={
          open && visibleOptions[activeIndex]
            ? `${id}-option-${activeIndex}`
            : undefined
        }
        autoComplete="off"
        value={open ? query : selectedOption?.label || ""}
        placeholder={open ? `Search ${label.toLowerCase()}` : label}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
      <span className={styles.filterChevron} aria-hidden="true" />

      {open && (
        <ul
          id={`${id}-options`}
          className={styles.filterDropdown}
          role="listbox"
          aria-label={`${label} options`}
        >
          {visibleOptions.length > 0 ? (
            visibleOptions.map((option, index) => (
              <li
                id={`${id}-option-${index}`}
                key={`${option.value}-${option.label}`}
                className={`${styles.filterOption} ${
                  index === activeIndex ? styles.filterOptionActive : ""
                }`}
                role="option"
                aria-selected={option.value === value}
                onClick={() => selectOption(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className={styles.filterEmpty}>No matching options</li>
          )}
        </ul>
      )}
    </div>
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function JobSearchHeader() {
  const router = useRouter();

  /* -----------------------------------------
     DATA STATES
  ----------------------------------------- */

  const [jobs, setJobs] = useState([]);
  const [countries, setCountries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [educations, setEducations] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);

  /* -----------------------------------------
     SEARCH AND FILTER STATES
  ----------------------------------------- */

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  const [filters, setFilters] = useState({ ...EMPTY_FILTERS });

  /* -----------------------------------------
     PAGINATION AND UI STATES
  ----------------------------------------- */

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState("");
  const [savedJobIds, setSavedJobIds] = useState([]);

  /* =========================================
     LOAD JOBS
  ========================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      try {
        setLoadingJobs(true);
        setError("");

        const response = await getAllJobs();
        const data = unwrapArray(response);

        if (!cancelled) {
          setJobs(data.filter((job) => job && job.active !== false));
        }
      } catch (err) {
        console.error("Job listing API failed:", err);

        if (!cancelled) {
          setJobs([]);
          setError(err?.message || "Unable to load jobs.");
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

  /* =========================================
     LOAD FILTER OPTIONS
  ========================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadFilters() {
      const requests = [
        [
          "countries",
          getAllJobCountries,
          ["countryName", "name", "country", "title"],
        ],
        [
          "locations",
          getAllJobLocations,
          ["locationName", "name", "location", "title", "city"],
        ],
        [
          "educations",
          getAllJobEducations,
          ["educationName", "name", "education", "title"],
        ],
        [
          "sectors",
          getAllJobSectors,
          ["sectorName", "name", "sector", "title"],
        ],
        [
          "jobTypes",
          getAllJobTypes,
          ["jobTypeName", "typeName", "name", "jobType", "title"],
        ],
        [
          "roles",
          getAllJobRoles,
          ["jobRoleName", "roleName", "name", "role", "title"],
        ],
        [
          "workTypes",
          getAllJobWorkTypes,
          ["workTypeName", "name", "workType", "title"],
        ],
      ];

      const setters = {
        countries: setCountries,
        locations: setLocations,
        educations: setEducations,
        sectors: setSectors,
        jobTypes: setJobTypes,
        roles: setRoles,
        workTypes: setWorkTypes,
      };

      await Promise.all(
        requests.map(async ([key, api, fields]) => {
          try {
            const response = await api();

            if (!cancelled) {
              if (key === "locations") {
                /*
                  Keep complete location objects.
                  We need their country relationship to filter locations.
                */
                setLocations(unwrapArray(response));
              } else {
                setters[key](toOptions(response, fields));
              }
            }
          } catch (err) {
            console.error(`Failed to load ${key} filter options:`, err);

            if (!cancelled) {
              setters[key]([]);
            }
          }
        })
      );
    }

    loadFilters();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================
     UPDATE FILTER
  ========================================= */

  const updateFilter = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));

    setCurrentPage(1);
  };

  /* =========================================
     CLEAR SEARCH
  ========================================= */

  const clearSearch = () => {
    setKeyword("");
    setLocation("");
    setSelectedCountry("All Countries");
    setFilters({ ...EMPTY_FILTERS });
    setCurrentPage(1);
  };

  /* =========================================
     LOCATIONS FILTERED BY SELECTED COUNTRY
  ========================================= */

  const filteredLocations = useMemo(() => {
    return getLocationsForCountry(locations, selectedCountry);
  }, [locations, selectedCountry]);

  /* =========================================
     FILTER JOBS
  ========================================= */

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
        job?.roleName,
        job?.workTypeName,
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
                  typeof item === "string" ? item : item?.name || ""
                )
                .join(" ")
            : value
        )
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

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
        (!searchText || searchableText.includes(searchText)) &&
        (!searchLocation || jobLocation.includes(searchLocation)) &&
        matchesSelectedCountry(job, selectedCountry) &&
        matchesText(
          job?.educationName || job?.education?.name,
          filters.education
        ) &&
        matchesText(
          job?.sectorName || job?.sector?.name,
          filters.sector
        ) &&
        matchesText(
          job?.jobTypeName || job?.jobType?.name,
          filters.jobType
        ) &&
        matchesText(
          job?.jobRoleName || job?.roleName || job?.role?.name,
          filters.role
        ) &&
        matchesText(
          job?.workTypeName || job?.workType?.name,
          filters.workType
        ) &&
        matchesSalary
      );
    });
  }, [jobs, keyword, location, selectedCountry, filters]);

  /* =========================================
     SORT JOBS
  ========================================= */

  const sortedJobs = useMemo(() => {
    const result = [...filteredJobs];

    if (filters.sort === "title") {
      result.sort((a, b) =>
        String(a?.jobTitle || "").localeCompare(String(b?.jobTitle || ""))
      );
    } else if (filters.sort === "salaryHigh") {
      result.sort(
        (a, b) => (Number(b?.salary) || 0) - (Number(a?.salary) || 0)
      );
    } else {
      result.sort((a, b) => {
        const dateA = new Date(
          a?.createdAt || a?.postedDate || a?.datePosted || 0
        ).getTime();

        const dateB = new Date(
          b?.createdAt || b?.postedDate || b?.datePosted || 0
        ).getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [filteredJobs, filters.sort]);

  /* =========================================
     PAGINATION
  ========================================= */

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

  /* =========================================
     SAVE JOB
  ========================================= */

  const toggleSavedJob = (jobId) => {
    setSavedJobIds((previous) =>
      previous.includes(jobId)
        ? previous.filter((id) => id !== jobId)
        : [...previous, jobId]
    );
  };

  /* =========================================
     VIEW JOB
  ========================================= */

  const handleViewJob = (job) => {
    if (job?.id == null || job.id === "") {
      console.error("Job ID is missing:", job);
      return;
    }

    router.push(`/jobfinder/${encodeURIComponent(String(job.id))}`);
  };

  /* =========================================
     RENDER COMPONENT
  ========================================= */

  return (
    <main className={styles.page}>
      {/* =====================================
          COUNTRY SELECTOR
      ===================================== */}

      <section
        className={styles.countryBar}
        aria-label="Select job country"
      >
        {["All Countries", ...countries].map((country) => (
          <button
            key={country}
            type="button"
            className={`${styles.countryButton} ${
              selectedCountry === country ? styles.countryActive : ""
            }`}
            aria-pressed={selectedCountry === country}
            onClick={() => {
              setSelectedCountry(country);

              /*
                Clear the previously selected location
                because it may not belong to the new country.
              */
              setLocation("");
              setCurrentPage(1);
            }}
          >
            {country}
          </button>
        ))}
      </section>

      {/* =====================================
          SEARCH AND FILTERS
      ===================================== */}

      <section className={styles.searchSection}>
        <form
          className={styles.filterForm}
          onSubmit={(event) => event.preventDefault()}
        >
          {/* Keyword search */}

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

          {/* Location filter — country dependent */}

          <SearchableFilter
            label="Locations"
            value={location}
            options={filteredLocations
              .map(getLocationOptionName)
              .filter(Boolean)}
            onChange={(value) => {
              setLocation(value);
              setCurrentPage(1);
            }}
          />

          {/* Education */}

          <SearchableFilter
            label="Education"
            value={filters.education}
            options={educations}
            onChange={(value) => updateFilter("education", value)}
          />

          {/* Sector */}

          <SearchableFilter
            label="Sectors"
            value={filters.sector}
            options={sectors}
            onChange={(value) => updateFilter("sector", value)}
          />

          {/* Job Type */}

          <SearchableFilter
            label="Job Types"
            value={filters.jobType}
            options={jobTypes}
            onChange={(value) => updateFilter("jobType", value)}
          />

          {/* Job Role */}

          <SearchableFilter
            label="Job Roles"
            value={filters.role}
            options={roles}
            onChange={(value) => updateFilter("role", value)}
          />

          {/* Work Type */}

          <SearchableFilter
            label="Work Types"
            value={filters.workType}
            options={workTypes}
            onChange={(value) => updateFilter("workType", value)}
          />

          {/* Salary */}

          <SearchableFilter
            label="Salary"
            value={filters.salary}
            options={[
              { value: "under50000", label: "Below 50,000" },
              { value: "50000", label: "50,000+" },
              { value: "100000", label: "1,00,000+" },
              { value: "150000", label: "1,50,000+" },
            ]}
            onChange={(value) => updateFilter("salary", value)}
          />

          {/* Clear filters */}

          <button
            type="button"
            className={styles.clearButton}
            onClick={clearSearch}
          >
            Clear
          </button>
        </form>
      </section>

      {/* =====================================
          JOBS SECTION
      ===================================== */}

      <section className={styles.jobsSection}>
        <div className={styles.jobsHeading}>
          <div className={styles.headingTitle}>
            <h1>Available Jobs</h1>

            <span className={styles.jobsCount}>
              {sortedJobs.length}{" "}
              {sortedJobs.length === 1 ? "job" : "jobs"}
            </span>
          </div>

          {/* Sort */}

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

        {/* Loading */}

        {loadingJobs && (
          <div className={styles.infoMessage} role="status">
            Loading available jobs...
          </div>
        )}

        {/* Error */}

        {!loadingJobs && error && (
          <div className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}

        {/* Empty state */}

        {!loadingJobs && !error && sortedJobs.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>⌕</div>

            <h3>No jobs found</h3>

            <p>
              Try another country, keyword, location, or filter.
            </p>

            <button type="button" onClick={clearSearch}>
              Clear filters
            </button>
          </div>
        )}

        {/* Job cards */}

        {!loadingJobs && !error && sortedJobs.length > 0 && (
          <>
            <div className={styles.jobsGrid}>
              {visibleJobs.map((job) => {
                const saved = savedJobIds.includes(job.id);
                const skills = getSkills(job);
                const companyName = getCompanyName(job);
                const cardSubtitle =
                  companyName || getCountryName(job) || "Career opportunity";

                return (
                  <article className={styles.jobCard} key={job.id}>
                    {/* Job card header */}

                    <div className={styles.jobCardTop}>
                      <div className={styles.companyLogo}>
                        {cardSubtitle.charAt(0).toUpperCase()}
                      </div>

                      <div className={styles.jobTitleBlock}>
                        <h3>{job.jobTitle || "Untitled Job"}</h3>

                        <p className={styles.companyName}>
                          {cardSubtitle}
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

                    {/* Job facts */}

                    <div className={styles.jobFacts}>
                      {/* City */}

                      <span className={styles.factItem}>
                        <svg
                          className={styles.locationIcon}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>

                        <strong>City:</strong>
                        {getLocationName(job) || "Not specified"}
                      </span>

                      {/* Salary */}

                      <span className={styles.factItem}>
                        <span
                          className={styles.rupeeIcon}
                          aria-hidden="true"
                        >
                          ₹
                        </span>

                        <strong>Salary:</strong>
                        {formatSalary(job) || "Not specified"}
                      </span>

                      {/* Job Type */}

                      <span className={styles.factItem}>
                        <svg
                          className={styles.jobTypeIcon}
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

                        <strong>Job Type:</strong>
                        {job.jobTypeName || "Not specified"}
                      </span>

                      {/* Education */}

                      <span className={styles.factItem}>
                        <svg
                          className={styles.educationIcon}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M3 9l9-5 9 5-9 5-9-5Z" />
                          <path d="M7 11v5c3 2 7 2 10 0v-5M21 9v6" />
                        </svg>

                        <strong>Education:</strong>
                        {job.educationName || "Not specified"}
                      </span>

                      {/* Openings */}

                      {job.openings != null && (
                        <span className={styles.factItem}>
                          <svg
                            className={styles.openingsIcon}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle cx="9" cy="8" r="3" />
                            <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" />
                          </svg>

                          <strong>Openings:</strong>
                          {job.openings}
                        </span>
                      )}

                      {/* Work Type */}

                      <span className={styles.factItem}>
                        <svg
                          className={styles.workTypeIcon}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1M14 10h1M9 14h1M14 14h1" />
                        </svg>

                        <strong>Work Type:</strong>
                        {job.workTypeName || "Not specified"}
                      </span>

                      {/* Experience */}

                      <span className={styles.factItem}>
                        <svg
                          className={styles.experienceIcon}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>

                        <strong>Experience:</strong>
                        {job.experienceName || "Not specified"}
                      </span>

                      {/* Sector */}

                      <span className={styles.factItem}>
                        <svg
                          className={styles.sectorIcon}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />
                        </svg>

                        <strong>Sector:</strong>
                        {job.sectorName || "Not specified"}
                      </span>
                    </div>

                    {/* Skills */}

                    {skills.length > 0 && (
                      <div className={styles.jobTags}>
                        {skills.map((skill, index) => (
                          <span key={`${job.id}-${skill}-${index}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}

                    <p className={styles.jobDescription}>
                      {job.description ||
                        "Explore this opportunity and discover how your skills can make an impact."}
                    </p>

                    {/* Footer */}

                    <div className={styles.jobCardFooter}>
                      <span className={styles.postedDate}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
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
                        View Job <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}

            {sortedJobs.length > JOBS_PER_PAGE && (
              <nav
                className={styles.pagination}
                aria-label="Job pages"
              >
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
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