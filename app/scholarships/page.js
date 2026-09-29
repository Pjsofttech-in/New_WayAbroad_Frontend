"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSlidersH } from "react-icons/fa";

import { getAllScholarships } from "../services/api";

import styles from "./Scholarships.module.css";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const scholarshipsPerPage = 6;

  const [showFilters, setShowFilters] = useState(false);

  const [filterFor, setFilterFor] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  /* ==========================================
     CREATE SLUG
  ========================================== */

  const createSlug = (name) => {
    return (name || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  /* ==========================================
     FETCH SCHOLARSHIPS
  ========================================== */

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);

        const data = await getAllScholarships();

        if (Array.isArray(data)) {
          setScholarships(data);
          setFilteredScholarships(data);
        } else {
          setScholarships([]);
          setFilteredScholarships([]);
        }
      } catch (error) {
        console.error(
          "Fetch Scholarship Error:",
          error
        );

        setScholarships([]);
        setFilteredScholarships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  /* ==========================================
     UNIQUE FILTER VALUES
  ========================================== */

  const getUnique = (field) => {
    const values = scholarships
      .map((item) => item?.[field])
      .filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ""
      );

    return [...new Set(values)];
  };

  /* ==========================================
     SEARCH
  ========================================== */

  const handleSearch = () => {
    const filtered = scholarships.filter((item) => {
      const itemFor = String(
        item?.scholarshipFor || ""
      ).trim();

      const itemCategory = String(
        item?.scholarshipcategory || ""
      ).trim();

      const itemLocation = String(
        item?.studyLocation || ""
      ).trim();

      return (
        (!filterFor || itemFor === filterFor) &&
        (!filterCategory ||
          itemCategory === filterCategory) &&
        (!filterLocation ||
          itemLocation === filterLocation)
      );
    });

    setFilteredScholarships(filtered);
    setCurrentPage(1);
  };

  /* ==========================================
     RESET
  ========================================== */

  const handleReset = () => {
    setFilterFor("");
    setFilterCategory("");
    setFilterLocation("");

    setFilteredScholarships([...scholarships]);
    setCurrentPage(1);
  };

  /* ==========================================
     PAGINATION
  ========================================== */

  const indexOfLast =
    currentPage * scholarshipsPerPage;

  const indexOfFirst =
    indexOfLast - scholarshipsPerPage;

  const currentScholarships =
    filteredScholarships.slice(
      indexOfFirst,
      indexOfLast
    );

  const totalPages = Math.ceil(
    filteredScholarships.length /
      scholarshipsPerPage
  );

  /* ==========================================
     PAGE CHANGE
  ========================================== */

  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <div className={styles.scholarshipsContainer}>

      {/* =====================================
          BANNER
      ===================================== */}

      <div className={styles.titleBanner}>

        <h1 className={styles.scholarshipsTitle}>
          Way Abroad
        </h1>

        <h2>
          Scholarships
        </h2>

        <p className={styles.bannerPara}>
          Maximize Savings! Explore and apply
          for scholarships tailored to your
          needs
        </p>

      </div>

      {/* =====================================
          MAIN
      ===================================== */}

      <div className={styles.mainHero}>

        {/* ===================================
            FILTERS
        =================================== */}

        <div className={styles.filtersWrapper}>

          {/* MOBILE FILTER BUTTON */}

          <button
            type="button"
            className={styles.filterToggle}
            onClick={() =>
              setShowFilters((prev) => !prev)
            }
          >

            <span>
              Filters
            </span>

            <span
              className={`${styles.arrow} ${
                showFilters
                  ? styles.rotate
                  : ""
              }`}
            >
              ▼
            </span>

          </button>

          {/* FILTER CONTENT */}

          <div
            className={`${styles.filtersBar} ${
              showFilters
                ? styles.show
                : ""
            }`}
          >

            <div
              className={styles.filterHeader}
            >

              <button
                type="button"
                className={styles.filterBtn}
              >
                <FaSlidersH />

                <span>
                  Filter
                </span>
              </button>

              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleReset}
              >
                🗙 Clear All
              </button>

            </div>

            {/* FOR */}

            <select
              value={filterFor}
              onChange={(e) =>
                setFilterFor(e.target.value)
              }
            >

              <option value="">
                Filter by For
              </option>

              {getUnique(
                "scholarshipFor"
              ).map((value) => (

                <option
                  key={String(value)}
                  value={String(value)}
                >
                  {String(value)}
                </option>

              ))}

            </select>

            {/* CATEGORY */}

            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(
                  e.target.value
                )
              }
            >

              <option value="">
                Filter by Category
              </option>

              {getUnique(
                "scholarshipcategory"
              ).map((value) => (

                <option
                  key={String(value)}
                  value={String(value)}
                >
                  {String(value)}
                </option>

              ))}

            </select>

            {/* LOCATION */}

            <select
              value={filterLocation}
              onChange={(e) =>
                setFilterLocation(
                  e.target.value
                )
              }
            >

              <option value="">
                Filter by Location
              </option>

              {getUnique(
                "studyLocation"
              ).map((value) => (

                <option
                  key={String(value)}
                  value={String(value)}
                >
                  {String(value)}
                </option>

              ))}

            </select>

            {/* SEARCH */}

            <button
              type="button"
              className={styles.searchBtn}
              onClick={handleSearch}
            >
              Search
            </button>

          </div>
        </div>

        {/* ===================================
            LOADING
        =================================== */}

        {loading && (
          <p className={styles.loadingText}>
            Loading...
          </p>
        )}

        {/* ===================================
            NO DATA
        =================================== */}

        {!loading &&
          filteredScholarships.length === 0 && (
            <p className={styles.noDataText}>
              No scholarships available.
            </p>
          )}

        {/* ===================================
            GRID
        =================================== */}

        {!loading &&
          currentScholarships.length > 0 && (

            <div
              className={styles.scholarshipsGrid}
            >

              {currentScholarships.map(
                (item, index) => (

                  <div
                    className={`${styles.scholarshipCard} ${styles.fadeIn || ""}`}
                    key={
                      item?.id ??
                      `${item?.sname}-${index}`
                    }
                    style={{
                      animationDelay: `${
                        index * 0.1
                      }s`,
                    }}
                  >

                    <div
                      className={styles.cardBody}
                    >

                      {/* TITLE */}

                      <h2
                        className={
                          styles.cardTitle
                        }
                      >
                        {item?.sname ||
                          "Unnamed Scholarship"}
                      </h2>

                      {/* INFO */}

                      <div
                        className={
                          styles.cardInfo
                        }
                      >

                        <p>
                          <b>
                            For:
                          </b>{" "}
                          {item?.scholarshipFor ||
                            "-"}
                        </p>

                        <p>
                          <b>
                            Type:
                          </b>{" "}
                          {item?.scholarshipType ||
                            "-"}
                        </p>

                        <p>
                          <b>
                            Category:
                          </b>{" "}
                          {item?.scholarshipcategory ||
                            "-"}
                        </p>

                        <p>
                          <b>
                            Location:
                          </b>{" "}
                          {item?.studyLocation ||
                            "-"}
                        </p>

                        <p>
                          <b>
                            Qualification:
                          </b>{" "}
                          {item?.qualification ||
                            "-"}
                        </p>

                        <p>
                          <b>
                            Amount:
                          </b>{" "}
                          ₹
                          {item?.amount ??
                            "0"}
                        </p>

                        <p>
                          <b>
                            Deadline:
                          </b>{" "}
                          {item?.deadline ||
                            "-"}
                        </p>

                      </div>

                      {/* BUTTON */}

                      <div
                        className={
                          styles.cardButtons
                        }
                      >

                        <Link
                          href={`/scholarship/${item.id}/${createSlug(
                            item.sname
                          )}`}
                          className={
                            styles.applyBtn
                          }
                        >
                          View & Apply
                        </Link>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

      </div>

      {/* =====================================
          PAGINATION
      ===================================== */}

      {totalPages > 1 && (

        <div
          className={styles.pagination}
        >

          {/* PREVIOUS */}

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              changePage(currentPage - 1)
            }
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (

            <button
              type="button"
              key={page}
              className={
                currentPage === page
                  ? styles.activePage
                  : ""
              }
              onClick={() =>
                changePage(page)
              }
            >
              {page}
            </button>

          ))}

          {/* NEXT */}

          <button
            type="button"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              changePage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
}