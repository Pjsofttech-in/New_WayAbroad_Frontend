"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  Container, Typography, Select, MenuItem, FormControl, InputLabel, Box,
  CircularProgress, Card, CardContent, Button, IconButton, Tooltip, Alert,
  Checkbox, ListItemText, TextField, InputAdornment, Pagination,
} from "./CourseFinderUI.js";

import {
  InfoOutlinedIcon, ExpandMoreIcon, ExpandLessIcon, SearchIcon, ClearIcon,
} from "./CourseFinderUI.js";

import {
  getHierarchy,
  getAllCourseNames,
  searchUniversities,
  searchStates,
  searchCities,
  searchColleges,
  searchCountries,
  searchStreams,
} from "../services/api";

import styles from "./coursefinder.module.css";

/* =========================================================
   HELPERS
========================================================= */

const getName = (item, type) => {
  if (!item) return "";

  const names = {
    country: [
      item.countryName,
      item.country,
      item.name,
    ],

    state: [
      item.stateName,
      item.state,
      item.name,
    ],

    city: [
      item.cityName,
      item.city,
      item.name,
    ],

    university: [
      item.universityName,
      item.name,
      item.university,
    ],

    college: [
      item.collegeName,
      item.name,
    ],

    course: [
      item.name,
      item.courseName,
    ],

    stream: [
      item.streamName,
      item.stream,
      item.name,
    ],
  };

  return (
    names[type]?.find(
      (value) =>
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    ) || ""
  );
};


const uniqueById = (items = []) => {
  const map = new Map();

  items.forEach((item) => {
    if (!item?.id) return;

    map.set(String(item.id), item);
  });

  return Array.from(map.values());
};


const normalizeCountries = (data) => {
  if (!Array.isArray(data)) return [];

  const countries = [];

  data.forEach((item) => {
    if (!item) return;

    if (Array.isArray(item.abroadCountries)) {
      item.abroadCountries.forEach((country) => {
        if (country?.id) {
          countries.push(country);
        }
      });

      return;
    }

    /*
      Otherwise it is already a country.
    */
    if (
      item?.abroadStates &&
      item?.id
    ) {
      countries.push(item);
    }
  });

  return uniqueById(countries);
};


/* =========================================================
   COMPONENT
========================================================= */

export default function CourseFinder() {
  /* =======================================================
     SEARCH TEXT
  ======================================================= */

  const [searchTexts, setSearchTexts] = useState({
    country: "",
    state: "",
    city: "",
    university: "",
    college: "",
    stream: "",
    course: "",
  });

  const [globalSearch, setGlobalSearch] =
    useState("");


  /* =======================================================
     DROPDOWN DATA
  ======================================================= */

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [universities, setUniversities] =
    useState([]);
  const [colleges, setColleges] = useState([]);

  /*
    Courses are now loaded from
    getAllCourseNames() API.
  */
  const [courses, setCourses] = useState([]);

  const [streams, setStreams] = useState([]);


  const emptyFilters = {
    countryId: [],
    stateId: [],
    cityId: [],
    universityId: [],
    collegeId: [],
    courseId: [],
    streamName: [],

    scholarship: "",
    feesRange: "",
    examType: [],
    englishExamRequirements: "",
    academicRequirements: [],
    intake: [],
  };

  const [filters, setFilters] =
    useState(emptyFilters);


  /* =======================================================
     HIERARCHY
  ======================================================= */

  const [masterHierarchyData, setMasterHierarchyData] =
    useState([]);

  const [hierarchyData, setHierarchyData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);


  /* =======================================================
     COURSE UI STATES
  ======================================================= */

  const [expandedCourses, setExpandedCourses] =
    useState({});

  const [showDescription, setShowDescription] =
    useState({});


  /* =======================================================
     PAGINATION AND RESULTS CONTROLS
  ======================================================= */

  const [currentPage, setCurrentPage] = useState(1);
  const [universitiesPerPage, setUniversitiesPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("default");
  const [showMoreFilters, setShowMoreFilters] = useState(false);


  /* =======================================================
     SEARCH TEXT CHANGE
  ======================================================= */

  const handleFilterTextChange = (
    type,
    value
  ) => {
    setSearchTexts((prev) => ({
      ...prev,
      [type]: value,
    }));
  };


  /* =======================================================
     SEARCH FIELD STYLE
  ======================================================= */

  const searchFieldStyles = {
    "& .MuiInputBase-input": {
      color: "text.primary !important",

      "&::placeholder": {
        color: "text.secondary !important",
        opacity: 1,
      },
    },

    "& .MuiInputBase-root": {
      color: "text.primary !important",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor:
        "rgba(0, 0, 0, 0.23) !important",
    },
  };


  /* =======================================================
     FILTERED OPTIONS
  ======================================================= */

  const getFilteredOptions = (
    type,
    items = []
  ) => {
    if (!Array.isArray(items)) return [];

    const search =
      (searchTexts[type] || "")
        .toLowerCase()
        .trim();

    if (!search) return items;

    return items.filter((item) =>
      getName(item, type)
        .toString()
        .toLowerCase()
        .includes(search)
    );
  };


  /* =======================================================
     LOAD INITIAL DATA
     
     COUNTRY / STATE / CITY / UNIVERSITY / COLLEGE
     COME FROM getHierarchy()

     COURSE NAMES COME FROM getAllCourseNames()
  ======================================================= */

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const hierarchyResponse = await getHierarchy();

        /* =================================================
           HIERARCHY DATA
        ================================================= */

        const rawData =
          Array.isArray(hierarchyResponse)
            ? hierarchyResponse
            : [];

        const countryData =
          normalizeCountries(rawData);

        setMasterHierarchyData(countryData);
        setHierarchyData(countryData);

        /*
          Countries are available immediately.
        */
        setCountries(countryData);

        /*
          Child dropdowns start empty.
        */
        setStates([]);
        setCities([]);
        setUniversities([]);
        setColleges([]);


        /* =================================================
           STREAMS
           
           Streams are still collected from hierarchy.
        ================================================= */

        const streamMap = new Map();

        countryData.forEach((country) => {
          (country?.abroadStates || []).forEach(
            (state) => {
              (state?.abroadCities || []).forEach(
                (city) => {
                  (
                    city?.abroadUniversities || []
                  ).forEach((university) => {
                    (
                      university?.abroadColleges ||
                      []
                    ).forEach((college) => {
                      (
                        college?.abroadCourses ||
                        []
                      ).forEach((course) => {
                        const streamName =
                          course?.streamName ||
                          course?.stream?.name ||
                          course?.stream;

                        if (streamName) {
                          streamMap.set(
                            String(streamName),
                            {
                              id: String(streamName),
                              name: String(streamName),
                              streamName:
                                String(streamName),
                            }
                          );
                        }
                      });
                    });
                  });
                }
              );
            }
          );
        });

        setStreams(
          Array.from(streamMap.values())
        );

      } catch (err) {
        console.error(
          "Course Finder loading error:",
          err
        );

        setError(
          err?.message ||
            "Failed to load Course Finder data."
        );

        setMasterHierarchyData([]);
        setHierarchyData([]);
        setCountries([]);
        setStates([]);
        setCities([]);
        setUniversities([]);
        setColleges([]);
        setStreams([]);

      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);


  useEffect(() => {
  const loadCourseNames = async () => {
    try {
      const response = await getAllCourseNames();

      // Handle common API response formats.
      const courseNames = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.courseNames)
        ? response.courseNames
        : [];

      const courseList = courseNames
        .map((item) => {
          // API might return strings or objects.
          const name =
            typeof item === "string"
              ? item
              : item?.courseName ??
                item?.name ??
                item?.course ??
                item?.course_name;

          if (name == null || typeof name !== "string") {
            return null;
          }

          const cleanName = name.trim();

          if (!cleanName) return null;

          return {
            id: cleanName,
            name: cleanName,
            courseName: cleanName,
          };
        })
        .filter(Boolean);

      setCourses(courseList);
    } catch (err) {
      console.error("Failed to load course names:", err);
      setCourses([]);
    }
  };

  loadCourseNames();
}, []);


  /* =======================================================
     COUNTRY → STATE
  ======================================================= */

  useEffect(() => {
    if (!filters.countryId.length) {
      setStates([]);
      setCities([]);
      setUniversities([]);
      setColleges([]);

      return;
    }

    const result = [];

    masterHierarchyData.forEach(
      (country) => {
        if (
          !filters.countryId.includes(
            country?.id
          )
        ) {
          return;
        }

        (
          country?.abroadStates || []
        ).forEach((state) => {
          if (!state?.id) return;

          result.push({
            ...state,

            stateName:
              getName(state, "state"),

            state:
              getName(state, "state"),

            abroadCities:
              state.abroadCities || [],
          });
        });
      }
    );

    setStates(uniqueById(result));

    setCities([]);
    setUniversities([]);
    setColleges([]);
  }, [
    filters.countryId,
    masterHierarchyData,
  ]);


  /* =======================================================
     STATE → CITY
  ======================================================= */

  useEffect(() => {
    if (!filters.stateId.length) {
      setCities([]);
      setUniversities([]);
      setColleges([]);

      return;
    }

    const result = [];

    masterHierarchyData.forEach(
      (country) => {
        (
          country?.abroadStates || []
        ).forEach((state) => {
          if (
            !filters.stateId.includes(
              state?.id
            )
          ) {
            return;
          }

          (
            state?.abroadCities || []
          ).forEach((city) => {
            if (!city?.id) return;

            result.push({
              ...city,

              cityName:
                getName(city, "city"),

              city:
                getName(city, "city"),

              abroadUniversities:
                city.abroadUniversities || [],
            });
          });
        });
      }
    );

    setCities(uniqueById(result));

    setUniversities([]);
    setColleges([]);
  }, [
    filters.stateId,
    masterHierarchyData,
  ]);


  /* =======================================================
     CITY → UNIVERSITY
  ======================================================= */

  useEffect(() => {
    if (!filters.cityId.length) {
      setUniversities([]);
      setColleges([]);

      return;
    }

    const result = [];

    masterHierarchyData.forEach(
      (country) => {
        (
          country?.abroadStates || []
        ).forEach((state) => {
          (
            state?.abroadCities || []
          ).forEach((city) => {
            if (
              !filters.cityId.includes(
                city?.id
              )
            ) {
              return;
            }

            (
              city?.abroadUniversities || []
            ).forEach((university) => {
              if (!university?.id) return;

              result.push({
                ...university,

                name:
                  getName(
                    university,
                    "university"
                  ),

                universityName:
                  getName(
                    university,
                    "university"
                  ),

                university:
                  getName(
                    university,
                    "university"
                  ),

                abroadColleges:
                  university.abroadColleges ||
                  [],
              });
            });
          });
        });
      }
    );

    setUniversities(
      uniqueById(result)
    );

    setColleges([]);
  }, [
    filters.cityId,
    masterHierarchyData,
  ]);


  /* =======================================================
     UNIVERSITY → COLLEGE
  ======================================================= */

  useEffect(() => {
    if (!filters.universityId.length) {
      setColleges([]);

      return;
    }

    const result = [];

    masterHierarchyData.forEach(
      (country) => {
        (
          country?.abroadStates || []
        ).forEach((state) => {
          (
            state?.abroadCities || []
          ).forEach((city) => {
            (
              city?.abroadUniversities || []
            ).forEach((university) => {
              if (
                !filters.universityId.includes(
                  university?.id
                )
              ) {
                return;
              }

              (
                university?.abroadColleges ||
                []
              ).forEach((college) => {
                if (!college?.id) return;

                result.push({
                  ...college,

                  name:
                    getName(
                      college,
                      "college"
                    ),

                  collegeName:
                    getName(
                      college,
                      "college"
                    ),
                });
              });
            });
          });
        });
      }
    );

    setColleges(
      uniqueById(result)
    );
  }, [
    filters.universityId,
    masterHierarchyData,
  ]);


  /* =======================================================
     FILTER TYPES
  ======================================================= */

  const multipleSelectFilters = useMemo(
    () => [
      "countryId",
      "stateId",
      "cityId",
      "universityId",
      "collegeId",
      "courseId",
      "streamName",
      "examType",
      "academicRequirements",
      "intake",
    ],
    []
  );


  /* =======================================================
     FILTER CHANGE
  ======================================================= */

  const handleFilterChange = (
    filterName,
    value
  ) => {
    setFilters((prev) => {
      const next = {
        ...prev,
      };

      if (
        multipleSelectFilters.includes(
          filterName
        )
      ) {
        next[filterName] =
          Array.isArray(value)
            ? value
            : [value];
      } else {
        next[filterName] =
          value ?? "";
      }


      /*
        Country changed:
        State → City → University → College
        must be cleared.
      */
      if (
        filterName === "countryId"
      ) {
        next.stateId = [];
        next.cityId = [];
        next.universityId = [];
        next.collegeId = [];
      }


      /*
        State changed:
        City → University → College
      */
      if (
        filterName === "stateId"
      ) {
        next.cityId = [];
        next.universityId = [];
        next.collegeId = [];
      }


      /*
        City changed:
        University → College
      */
      if (
        filterName === "cityId"
      ) {
        next.universityId = [];
        next.collegeId = [];
      }


      /*
        University changed:
        College
      */
      if (
        filterName === "universityId"
      ) {
        next.collegeId = [];
      }

      return next;
    });
  };


  /* =======================================================
     BUILD FILTER PARAMS
  ======================================================= */

  const buildFilterParams = (
    filters,
    countries,
    states,
    cities,
    universities,
    colleges,
    courses
  ) => {
    const params = {};


    if (filters.countryId.length) {
      const names = countries
        .filter((item) =>
          filters.countryId.includes(
            item.id
          )
        )
        .map((item) =>
          getName(item, "country")
        )
        .filter(Boolean);

      if (names.length) {
        params.countryName = names;
      }
    }


    if (filters.stateId.length) {
      const names = states
        .filter((item) =>
          filters.stateId.includes(
            item.id
          )
        )
        .map((item) =>
          getName(item, "state")
        )
        .filter(Boolean);

      if (names.length) {
        params.stateName = names;
      }
    }


    if (filters.cityId.length) {
      const names = cities
        .filter((item) =>
          filters.cityId.includes(
            item.id
          )
        )
        .map((item) =>
          getName(item, "city")
        )
        .filter(Boolean);

      if (names.length) {
        params.cityName = names;
      }
    }


    if (filters.universityId.length) {
      const names = universities
        .filter((item) =>
          filters.universityId.includes(
            item.id
          )
        )
        .map((item) =>
          getName(
            item,
            "university"
          )
        )
        .filter(Boolean);

      if (names.length) {
        params.universityName = names;
      }
    }


    if (filters.collegeId.length) {
      const names = colleges
        .filter((item) =>
          filters.collegeId.includes(
            item.id
          )
        )
        .map((item) =>
          getName(
            item,
            "college"
          )
        )
        .filter(Boolean);

      if (names.length) {
        params.collegeName = names;
      }
    }


    /*
      IMPORTANT:
      Course names now come directly
      from getAllCourseNames().
    */
    if (filters.courseId.length) {
      const names = courses
        .filter((item) =>
          filters.courseId.includes(
            item.id
          )
        )
        .map((item) =>
          getName(item, "course")
        )
        .filter(Boolean);

      if (names.length) {
        params.courseName = names;
      }
    }


    if (filters.streamName.length) {
      params.streamName =
        filters.streamName;
    }


    if (filters.scholarship) {
      params.scholarship =
        filters.scholarship;
    }


    if (filters.feesRange) {
      params.feesRange =
        filters.feesRange;
    }


    if (filters.examType.length) {
      params.examType =
        filters.examType;
    }


    if (filters.englishExamRequirements) {
      params.englishExamRequirements =
        filters.englishExamRequirements;
    }


    if (
      filters.academicRequirements.length
    ) {
      params.academicRequirements =
        filters.academicRequirements;
    }


    if (filters.intake.length) {
      params.intake =
        filters.intake;
    }

    return params;
  };


  /* =======================================================
     FETCH FILTERED DATA
  ======================================================= */

  const fetchFilteredData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params =
        buildFilterParams(
          filters,
          countries,
          states,
          cities,
          universities,
          colleges,
          courses
        );

      const response =
        await getHierarchy(params);

      const rawData =
        Array.isArray(response)
          ? response
          : [];

      const normalized =
        normalizeCountries(rawData);

      setHierarchyData(normalized);

    } catch (err) {
      console.error(
        "Error fetching filtered data:",
        err
      );

      setError(
        err?.message ||
          "Failed to load filtered data."
      );

      setHierarchyData([]);

    } finally {
      setLoading(false);
    }
  };


  /* =======================================================
     APPLY FILTERS
  ======================================================= */

  useEffect(() => {
    if (!masterHierarchyData.length) {
      return;
    }

    const timer = setTimeout(() => {
      fetchFilteredData();
    }, 400);

    return () =>
      clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);


  /* =======================================================
     GLOBAL SEARCH
  ======================================================= */


useEffect(() => {
  let cancelled = false;

  const runSearch = async () => {
    const query = globalSearch.trim();

    // Do not search for empty input.
    if (!query) return;

    try {
      const [
        universityNames,
        stateNames,
        cityNames,
        collegeNames,
        countryNames,
        streamNames,
      ] = await Promise.all([
        searchUniversities(query),
        searchStates(query),
        searchCities(query),
        searchColleges(query),
        searchCountries(query),
        searchStreams(query),
      ]);

      // Ignore results from an outdated search.
      if (cancelled) return;

      
const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const makeSet = (items) =>
  new Set(
    (Array.isArray(items) ? items : [])
      .map((item) => normalizeText(item))
      .filter(Boolean)
  );


      const universitySet = makeSet(universityNames);
      const stateSet = makeSet(stateNames);
      const citySet = makeSet(cityNames);
      const collegeSet = makeSet(collegeNames);
      const countrySet = makeSet(countryNames);
      const streamSet = makeSet(streamNames);

      const matchedCountryIds = countries
        .filter((item) =>
          countrySet.has(
            getName(item, "country").trim().toLowerCase()
          )
        )
        .map((item) => item.id);

      const matchedStateIds = states
        .filter((item) =>
          stateSet.has(
            getName(item, "state").trim().toLowerCase()
          )
        )
        .map((item) => item.id);

      const matchedCityIds = cities
        .filter((item) =>
          citySet.has(
            getName(item, "city").trim().toLowerCase()
          )
        )
        .map((item) => item.id);

      const matchedUniversityIds = universities
        .filter((item) =>
          universitySet.has(
            getName(item, "university").trim().toLowerCase()
          )
        )
        .map((item) => item.id);

      const matchedCollegeIds = colleges
        .filter((item) =>
          collegeSet.has(
            getName(item, "college").trim().toLowerCase()
          )
        )
        .map((item) => item.id);

      const matchedStreams = streams
        .map((item) => item.name || item.streamName)
        .filter(
          (name) =>
            name &&
            streamSet.has(String(name).trim().toLowerCase())
        );

      if (cancelled) return;

      setFilters((prev) => {
        const sameValues = (a, b) =>
          a.length === b.length &&
          a.every((value, index) => value === b[index]);

        // Avoid unnecessary state updates and effect loops.
        if (
          sameValues(prev.countryId, matchedCountryIds) &&
          sameValues(prev.stateId, matchedStateIds) &&
          sameValues(prev.cityId, matchedCityIds) &&
          sameValues(prev.universityId, matchedUniversityIds) &&
          sameValues(prev.collegeId, matchedCollegeIds) &&
          sameValues(prev.streamName, matchedStreams)
        ) {
          return prev;
        }

        return {
          ...prev,
          countryId: matchedCountryIds,
          stateId: matchedStateIds,
          cityId: matchedCityIds,
          universityId: matchedUniversityIds,
          collegeId: matchedCollegeIds,
          streamName: matchedStreams,
        };
      });
    } catch (err) {
      if (!cancelled) {
        console.error("Global search failed:", err);
      }
    }
  };

  const timer = setTimeout(runSearch, 400);

  return () => {
    cancelled = true;
    clearTimeout(timer);
  };
}, [globalSearch]);



  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearAllFilters = () => {
    setFilters({
      countryId: [],
      stateId: [],
      cityId: [],
      universityId: [],
      collegeId: [],
      courseId: [],
      streamName: [],

      scholarship: "",
      feesRange: "",
      examType: [],
      englishExamRequirements: "",
      academicRequirements: [],
      intake: [],
    });

    setSearchTexts({
      country: "",
      state: "",
      city: "",
      university: "",
      college: "",
      stream: "",
      course: "",
    });

    setGlobalSearch("");

    setStates([]);
    setCities([]);
    setUniversities([]);
    setColleges([]);
  };


  /* =======================================================
     COURSE TOGGLES
  ======================================================= */

  const toggleCourseExpansion = (
    courseKey
  ) => {
    setExpandedCourses((prev) => ({
      ...prev,

      [courseKey]:
        !prev[courseKey],
    }));
  };


  const toggleDescription = (
    courseKey
  ) => {
    setShowDescription((prev) => ({
      ...prev,

      [courseKey]:
        !prev[courseKey],
    }));
  };


  /* =======================================================
     SEARCH FIELD
  ======================================================= */

  const renderSearchField = (
    type,
    placeholder,
    disabled = false
  ) => (
    <Box
      className={styles.dropdownSearchBox}
      sx={{ p: 1 }}
      onClick={(e) => e.stopPropagation()}
    >
      <TextField
        size="small"
        fullWidth
        placeholder={placeholder}
        value={
          searchTexts[type] || ""
        }
        onChange={(e) =>
          handleFilterTextChange(
            type,
            e.target.value
          )
        }
        disabled={disabled}
        sx={searchFieldStyles}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),

            endAdornment:
              searchTexts[type] ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();

                      handleFilterTextChange(
                        type,
                        ""
                      );
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
          },
        }}
      />
    </Box>
  );


  /* =======================================================
     REUSABLE MULTI SELECT
  ======================================================= */

  const renderMultiSelect = ({
    name,
    label,
    searchType,
    items,
    getValue,
    getLabel,
    disabled = false,
    emptyLabel,
  }) => {
    const selected =
      filters[name] || [];

    const filteredItems =
      getFilteredOptions(
        searchType,
        items
      );

    return (
      <FormControl
        className={styles.horizontalFilter}
        sx={{ mb: 0 }}
      >
        <InputLabel>
          {label}
        </InputLabel>

        <Select
          multiple
          value={selected}
          onChange={(e) =>
            handleFilterChange(
              name,
              e.target.value
            )
          }
          label={label}
          disabled={
            disabled || loading
          }
          renderValue={(values) =>
            values.length
              ? items
                  .filter((item) =>
                    values.includes(
                      getValue(item)
                    )
                  )
                  .map((item) =>
                    getLabel(item)
                  )
                  .join(", ")
              : emptyLabel
          }
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {renderSearchField(
            searchType,
            `Search ${label.toLowerCase()}...`,
            disabled || loading
          )}

          {filteredItems.map(
            (item) => {
              const value =
                getValue(item);

              return (
                <MenuItem
                  key={value}
                  value={value}
                >
                  <Checkbox
                    checked={selected.includes(
                      value
                    )}
                  />

                  <ListItemText
                    primary={getLabel(item)}
                  />
                </MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>
    );
  };


  /* =======================================================
     COURSE DETAILS
  ======================================================= */

  const renderCourseDetails = (
    course,
    courseKey
  ) => {
    const expanded =
      expandedCourses[courseKey];

    const descriptionVisible =
      showDescription[courseKey];

    const extraDetails = [
      [
        "Academic Requirements",
        course.academicRequirements,
      ],

      [
        "English Exam Requirements",
        course.englishExamRequirements,
      ],

      [
        "Exam Score",
        course.examScore,
      ],

      [
        "Additional Requirements",
        course.additionalRequirements,
      ],

      [
        "Scholarship",
        course.scholarship,
      ],

      [
        "Hostel Available",
        course.hostel,
      ],

      [
        "Hostel Fees",
        course.hostelFees
          ? `₹${Number(
              course.hostelFees
            ).toLocaleString()}`
          : null,
      ],

      [
        "Exam Type",
        course.examType,
      ],
    ];

    return (
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",

          "&:hover": {
            borderColor:
              "primary.main",
            backgroundColor:
              "action.hover",
          },

          transition:
            "all 0.2s ease-in-out",
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
          >
            {course.name ||
              course.courseName ||
              "Course Name N/A"}
          </Typography>


          <Box sx={{ mt: 1 }}>
            <DetailRow
              label="Stream Name"
              value={
                course.streamName ||
                "N/A"
              }
            />


            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5,
                alignItems:
                  "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems:
                    "center",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Description:
                </Typography>

                <Tooltip
                  title={
                    descriptionVisible
                      ? "Hide description"
                      : "Show description"
                  }
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      toggleDescription(
                        courseKey
                      )
                    }
                    sx={{
                      p: 0,
                      ml: 0.5,
                    }}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>


            {descriptionVisible && (
              <Box
                sx={{
                  mb: 1,
                  p: 1,
                  backgroundColor:
                    "grey.50",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight="medium"
                >
                  {course.description ||
                    "No description available"}
                </Typography>
              </Box>
            )}


            <DetailRow
              label="Duration"
              value={
                course.duration ||
                "N/A"
              }
            />


            <DetailRow
              label="Institute Rank"
              value={
                course.institute_rank ||
                course.instituteRank ||
                "N/A"
              }
            />


            <DetailRow
              label="Intake"
              value={
                course.intake ||
                "N/A"
              }
            />


            <DetailRow
              label="Tuition Fees"
              value={
                course.tutionFees
                  ? `₹${Number(
                      course.tutionFees
                    ).toLocaleString()}`
                  : "N/A"
              }
            />


            <DetailRow
              label="Application Fees"
              value={
                course.applicationFees
                  ? `₹${Number(
                      course.applicationFees
                    ).toLocaleString()}`
                  : "N/A"
              }
            />


            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Website:
              </Typography>

              <Typography
                variant="body2"
                fontWeight="medium"
              >
                {course.websiteLink ? (
                  <a
                    href={
                      course.websiteLink
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                ) : (
                  "N/A"
                )}
              </Typography>
            </Box>


            <Button
              size="small"
              onClick={() =>
                toggleCourseExpansion(
                  courseKey
                )
              }
              endIcon={
                expanded ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )
              }
              sx={{
                mt: 1,
                mb: 1,
                textTransform:
                  "none",
                fontSize:
                  "0.75rem",
                color:
                  "primary.main",
              }}
            >
              {expanded
                ? "Show Less"
                : "View More Details"}
            </Button>


            {expanded && (
              <Box
                sx={{
                  mt: 1,
                  pt: 1,
                  borderTop:
                    "1px solid #eee",
                }}
              >
                {extraDetails.map(
                  ([label, value]) => (
                    <DetailRow
                      key={label}
                      label={label}
                      value={
                        value || "N/A"
                      }
                    />
                  )
                )}


                <DetailRow
                  label="Application Link"
                  value={
                    course.applicationLink ? (
                      <a
                        href={
                          course.applicationLink
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                      </a>
                    ) : (
                      "N/A"
                    )
                  }
                />


                <DetailRow
                  label="Tuition Fees (INR)"
                  value={
                    course.tutionFeesINR
                      ? `₹${Number(
                          course.tutionFeesINR
                        ).toLocaleString()}`
                      : "N/A"
                  }
                />


                <DetailRow
                  label="Total Fees (INR)"
                  value={
                    course.feesINR
                      ? `₹${Number(
                          course.feesINR
                        ).toLocaleString()}`
                      : "N/A"
                  }
                />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };


  /* =======================================================
     FLATTEN UNIVERSITIES FOR PAGINATION
  ======================================================= */

  const allUniversities = useMemo(() => {
    const result = [];

    (hierarchyData || []).forEach(
      (country) => {
        (country?.abroadStates || []).forEach(
          (state) => {
            (state?.abroadCities || []).forEach(
              (city) => {
                (
                  city?.abroadUniversities ||
                  []
                ).forEach(
                  (university) => {
                    result.push({
                      country,
                      state,
                      city,
                      university,
                    });
                  }
                );
              }
            );
          }
        );
      }
    );

    return result;
  }, [hierarchyData]);


  const totalCourses = allUniversities.reduce(
    (total, item) =>
      total +
      (item.university.abroadColleges || []).reduce(
        (collegeTotal, college) =>
          collegeTotal + (college.abroadCourses || []).length,
        0
      ),
    0
  );

  const sortedUniversities = [...allUniversities].sort((a, b) => {
    const nameA =
      a.university.universityName || a.university.name || "";
    const nameB =
      b.university.universityName || b.university.name || "";

    if (sortOrder === "name-asc") {
      return nameA.localeCompare(nameB);
    }

    if (sortOrder === "name-desc") {
      return nameB.localeCompare(nameA);
    }

    return 0;
  });

  const totalPages = Math.ceil(
    sortedUniversities.length / universitiesPerPage
  );

  const paginatedUniversities = sortedUniversities.slice(
    (currentPage - 1) * universitiesPerPage,
    currentPage * universitiesPerPage
  );


  /* =======================================================
     RESET PAGINATION WHEN FILTERED DATA CHANGES
  ======================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >

      {/* ===================================================
          HEADER
      =================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >

      </Box>


      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() =>
            setError(null)
          }
        >
          {error}
        </Alert>
      )}


      {/* ===================================================
          MAIN LAYOUT
      =================================================== */}

      <div
        className={
          styles.courseFinderContent
        }
      >

        {/* =================================================
            HORIZONTAL FILTER BAR
        ================================================= */}

        <div
          className={
            styles.horizontalFilters
          }
        >

          
          <div className={styles.filterSearch}>
            <TextField
              fullWidth
              placeholder="Search..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: globalSearch ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setGlobalSearch("")}
                        aria-label="Clear search"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
            />
          </div>


          {renderMultiSelect({
            name: "countryId",
            label: "Country",
            searchType: "country",
            items: countries,
            getValue: (item) =>
              item.id,
            getLabel: (item) =>
              getName(
                item,
                "country"
              ),
            emptyLabel: "Country",
          })}


          {renderMultiSelect({
            name: "stateId",
            label: "State",
            searchType: "state",
            items: states,
            getValue: (item) =>
              item.id,
            getLabel: (item) =>
              getName(
                item,
                "state"
              ),
            disabled:
              !filters.countryId
                .length,
            emptyLabel: "State",
          })}


          {renderMultiSelect({
            name: "cityId",
            label: "City",
            searchType: "city",
            items: cities,
            getValue: (item) =>
              item.id,
            getLabel: (item) =>
              getName(
                item,
                "city"
              ),
            disabled:
              !filters.stateId
                .length,
            emptyLabel: "City",
          })}


          {renderMultiSelect({
            name: "universityId",
            label: "University",
            searchType: "university",
            items: universities,
            getValue: (item) =>
              item.id,
            getLabel: (item) =>
              getName(
                item,
                "university"
              ),
            disabled:
              !filters.cityId
                .length,
            emptyLabel: "University",
          })}


          {renderMultiSelect({
            name: "collegeId",
            label: "College",
            searchType: "college",
            items: colleges,
            getValue: (item) =>
              item.id,
            getLabel: (item) =>
              getName(
                item,
                "college"
              ),
            disabled:
              !filters.universityId
                .length,
            emptyLabel: "College",
          })}


          {renderMultiSelect({
            name: "streamName",
            label: "Stream",
            searchType: "stream",
            items: streams,
            getValue: (item) =>
              item.name,
            getLabel: (item) =>
              item.name,
            emptyLabel: "Stream",
          })}


          {/* =================================================
              COURSE DROPDOWN
              
              NOW USES getAllCourseNames()
          ================================================= */}

          {renderMultiSelect({
            name: "courseId",
            label: "Course",
            searchType: "course",

            /*
              courses now contains:

              [
                {
                  id: "Computer Science",
                  name: "Computer Science",
                  courseName: "Computer Science"
                },
                {
                  id: "Business Administration",
                  name: "Business Administration",
                  courseName: "Business Administration"
                }
              ]
            */
            items: courses,

            getValue: (item) =>
              item.id,

            getLabel: (item) =>
              getName(
                item,
                "course"
              ),

            emptyLabel: "Course",
          })}


          {/* =================================================
              SCHOLARSHIP
          ================================================= */}

          <FormControl
            className={
              styles.horizontalFilter
            }
          >
            <InputLabel>
              Scholarship
            </InputLabel>

            <Select
              value={
                filters.scholarship
              }
              onChange={(e) =>
                handleFilterChange(
                  "scholarship",
                  e.target.value
                )
              }
              label="Scholarship"
              disabled={loading}
            >
              <MenuItem value="">
                Scholarship
              </MenuItem>

              <MenuItem value="Yes">
                Yes
              </MenuItem>

              <MenuItem value="No">
                No
              </MenuItem>
            </Select>
          </FormControl>


          {/* =================================================
              FEES RANGE
          ================================================= */}

          <FormControl
            className={
              styles.horizontalFilter
            }
          >
            <InputLabel>
              Fees Range
            </InputLabel>

            <Select
              value={
                filters.feesRange
              }
              onChange={(e) =>
                handleFilterChange(
                  "feesRange",
                  e.target.value
                )
              }
              label="Fees Range"
              disabled={loading}
            >
              <MenuItem value="">
                Fees Range
              </MenuItem>

              <MenuItem value="0-100000">
                0-100000
              </MenuItem>

              <MenuItem value="100000-1000000">
                100000-1000000
              </MenuItem>

              <MenuItem value="1000000-2000000">
                1000000-2000000
              </MenuItem>

              <MenuItem value="2000000+">
                2000000+
              </MenuItem>
            </Select>
          </FormControl>


          {/* =================================================
              EXAM TYPE
          ================================================= */}

          <FormControl
            className={
              styles.horizontalFilter
            }
          >
            <InputLabel>
              Exam Type
            </InputLabel>

            <Select
              multiple
              value={
                filters.examType
              }
              onChange={(e) =>
                handleFilterChange(
                  "examType",
                  e.target.value
                )
              }
              label="Exam Type"
              disabled={loading}
              renderValue={(selected) =>
                selected.length
                  ? selected.join(
                      ", "
                    )
                  : "Exam Type"
              }
            >
              {[
                "IELTS",
                "TOEFL",
                "PTE",
                "GRE",
                "GMAT",
              ].map((exam) => (
                <MenuItem
                  key={exam}
                  value={exam}
                >
                  <Checkbox
                    checked={filters.examType.includes(
                      exam
                    )}
                  />

                  <ListItemText
                    primary={exam}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          {/* =================================================
              ENGLISH REQUIRED
          ================================================= */}

          <FormControl
            className={
              styles.horizontalFilter
            }
          >
            <InputLabel>
              English Required
            </InputLabel>

            <Select
              value={
                filters.englishExamRequirements
              }
              onChange={(e) =>
                handleFilterChange(
                  "englishExamRequirements",
                  e.target.value
                )
              }
              label="English Required"
              disabled={loading}
            >
              <MenuItem value="">
                English Required
              </MenuItem>

              <MenuItem value="Yes">
                Yes
              </MenuItem>

              <MenuItem value="No">
                No
              </MenuItem>
            </Select>
          </FormControl>


          {/* =================================================
              ACADEMIC REQUIREMENTS
          ================================================= */}

          <FormControl
            className={
              styles.horizontalFilter
            }
          >
            <InputLabel>
              Academic Requirements
            </InputLabel>

            <Select
              multiple
              value={
                filters.academicRequirements
              }
              onChange={(e) =>
                handleFilterChange(
                  "academicRequirements",
                  e.target.value
                )
              }
              label="Academic Requirements"
              disabled={loading}
              renderValue={(selected) =>
                selected.length
                  ? selected.join(
                      ", "
                    )
                  : "Academic"
              }
            >
              {Array.from(
                { length: 10 },
                (_, index) => {
                  const min =
                    index * 10;

                  const max =
                    (index + 1) *
                    10;

                  const value =
                    `${min}-${max}%`;

                  return (
                    <MenuItem
                      key={value}
                      value={value}
                    >
                      <Checkbox
                        checked={filters.academicRequirements.includes(
                          value
                        )}
                      />

                      <ListItemText
                        primary={value}
                      />
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>


          {/* =================================================
              INTAKE
          ================================================= */}

          <FormControl
            className={
              styles.horizontalFilter
            }
          >
            <InputLabel>
              Intake
            </InputLabel>

            <Select
              multiple
              value={
                filters.intake
              }
              onChange={(e) =>
                handleFilterChange(
                  "intake",
                  e.target.value
                )
              }
              label="Intake"
              disabled={loading}
              renderValue={(selected) =>
                selected.length
                  ? selected.join(
                      ", "
                    )
                  : "Intake"
              }
            >
              {[
                "Summer",
                "Winter",
                "Spring",
              ].map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  <Checkbox
                    checked={filters.intake.includes(
                      item
                    )}
                  />

                  <ListItemText
                    primary={item}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>


        {/* =================================================
            SELECTED FILTER CHIPS
        ================================================= */}

        {Object.values(filters).some((value) =>
          Array.isArray(value) ? value.length > 0 : Boolean(value)
        ) && (
          <div className={styles.selectedFilters}>
            {filters.countryId.map((id) => {
              const item = countries.find((country) => country.id === id);

              return item ? (
                <span
                  key={`country-${id}`}
                  className={styles.selectedFilterChip}
                >
                  {getName(item, "country")}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterChange(
                        "countryId",
                        filters.countryId.filter((value) => value !== id)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}

            {filters.stateId.map((id) => {
              const item = states.find((state) => state.id === id);

              return item ? (
                <span
                  key={`state-${id}`}
                  className={styles.selectedFilterChip}
                >
                  {getName(item, "state")}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterChange(
                        "stateId",
                        filters.stateId.filter((value) => value !== id)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}

            {filters.cityId.map((id) => {
              const item = cities.find((city) => city.id === id);

              return item ? (
                <span
                  key={`city-${id}`}
                  className={styles.selectedFilterChip}
                >
                  {getName(item, "city")}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterChange(
                        "cityId",
                        filters.cityId.filter((value) => value !== id)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}

            {filters.universityId.map((id) => {
              const item = universities.find(
                (university) => university.id === id
              );

              return item ? (
                <span
                  key={`university-${id}`}
                  className={styles.selectedFilterChip}
                >
                  {getName(item, "university")}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterChange(
                        "universityId",
                        filters.universityId.filter((value) => value !== id)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}

            {filters.collegeId.map((id) => {
              const item = colleges.find((college) => college.id === id);

              return item ? (
                <span
                  key={`college-${id}`}
                  className={styles.selectedFilterChip}
                >
                  {getName(item, "college")}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterChange(
                        "collegeId",
                        filters.collegeId.filter((value) => value !== id)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}

            {filters.streamName.map((stream) => (
              <span
                key={`stream-${stream}`}
                className={styles.selectedFilterChip}
              >
                {stream}
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange(
                      "streamName",
                      filters.streamName.filter((value) => value !== stream)
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}

            {/* Course chips */}
            {filters.courseId.map((id) => {
              const item = courses.find((course) => course.id === id);

              return item ? (
                <span
                  key={`course-${id}`}
                  className={styles.selectedFilterChip}
                >
                  {getName(item, "course")}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterChange(
                        "courseId",
                        filters.courseId.filter((value) => value !== id)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}

            {filters.scholarship && (
              <span className={styles.selectedFilterChip}>
                Scholarship: {filters.scholarship}
                <button
                  type="button"
                  onClick={() => handleFilterChange("scholarship", "")}
                >
                  ×
                </button>
              </span>
            )}

            {filters.feesRange && (
              <span className={styles.selectedFilterChip}>
                Fees: {filters.feesRange}
                <button
                  type="button"
                  onClick={() => handleFilterChange("feesRange", "")}
                >
                  ×
                </button>
              </span>
            )}

            {filters.examType.map((exam) => (
              <span
                key={`exam-${exam}`}
                className={styles.selectedFilterChip}
              >
                {exam}
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange(
                      "examType",
                      filters.examType.filter((value) => value !== exam)
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}

            {filters.englishExamRequirements && (
              <span className={styles.selectedFilterChip}>
                English: {filters.englishExamRequirements}
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange("englishExamRequirements", "")
                  }
                >
                  ×
                </button>
              </span>
            )}

            {filters.academicRequirements.map((requirement) => (
              <span
                key={`academic-${requirement}`}
                className={styles.selectedFilterChip}
              >
                {requirement}
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange(
                      "academicRequirements",
                      filters.academicRequirements.filter(
                        (value) => value !== requirement
                      )
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}

            {filters.intake.map((item) => (
              <span
                key={`intake-${item}`}
                className={styles.selectedFilterChip}
              >
                {item}
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange(
                      "intake",
                      filters.intake.filter((value) => value !== item)
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}

            <button
              type="button"
              className={styles.clearSelectedFilters}
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          </div>
        )}


        {/* =================================================
            RESULTS
        ================================================= */}

        <main
          className={
            styles.results
          }
        >

          <div className={styles.resultsToolbar}>
            <div className={styles.resultsSummary}>
              <strong>{totalCourses} courses</strong>
              <span> across </span>
              <strong>{allUniversities.length} universities</strong>

              <small>
                Showing universities{" "}
                {allUniversities.length === 0
                  ? 0
                  : (currentPage - 1) * universitiesPerPage + 1}
                {" - "}
                {Math.min(
                  currentPage * universitiesPerPage,
                  allUniversities.length
                )}
                {" of "}
                {allUniversities.length}
              </small>
            </div>

            <div className={styles.resultsControls}>
              <label>
                <span>Sort universities</span>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="default">Default order</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                </select>
              </label>

              <label>
                <span>Per page</span>
                <select
                  value={universitiesPerPage}
                  onChange={(e) => {
                    setUniversitiesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={6}>6 universities</option>
                  <option value={12}>12 universities</option>
                  <option value={24}>24 universities</option>
                </select>
              </label>

            </div>
          </div>

          {showMoreFilters && (
            <div className={styles.moreFiltersPanel}>
              <p>
                Use the filters above to narrow universities and courses.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {loading ? (
            <div
              className={
                styles.loading
              }
            >
              <CircularProgress />
            </div>
          ) : allUniversities.length ? (
            paginatedUniversities.map(
              (
                {
                  country,
                  state,
                  city,
                  university,
                },
                universityIndex
              ) => (
                <div
                  className={
                    styles.universityCard
                  }
                  key={`${country.id}-${state.id}-${city.id}-${university.id}-${universityIndex}`}
                >

                  {/* UNIVERSITY HEADER */}

                  <div
                    className={
                      styles.universityHeader
                    }
                  >
                    <div>

                      <h3
                        className={
                          styles.universityName
                        }
                      >
                        {
                          university.universityName ||
                          university.name ||
                          "University"
                        }
                      </h3>


                      <p
                        className={
                          styles.universityLocation
                        }
                      >
                        {
                          city.city ||
                          city.cityName
                        }
                        ,{" "}
                        {
                          state.state ||
                          state.stateName
                        }
                        ,{" "}
                        {
                          country.country ||
                          country.countryName
                        }
                      </p>


                      <p
                        className={
                          styles.universityId
                        }
                      >
                        ID:{" "}
                        {
                          university.id
                        }{" "}
                        | Courses:{" "}
                        {(
                          university.abroadColleges ||
                          []
                        ).reduce(
                          (
                            total,
                            college
                          ) =>
                            total +
                            (
                              college.abroadCourses ||
                              []
                            ).length,
                          0
                        )}
                      </p>

                    </div>
                  </div>


                  {/* COLLEGES */}

                  <div>
                    {(
                      university.abroadColleges ||
                      []
                    ).map(
                      (
                        college,
                        collegeIndex
                      ) => (
                        <div
                          className={
                            styles.collegeSection
                          }
                          key={`${university.id}-college-${collegeIndex}`}
                        >

                          <h4
                            className={
                              styles.collegeName
                            }
                          >
                            {
                              college.collegeName ||
                              college.name ||
                              "College"
                            }
                          </h4>


                          {/* COURSES */}

                          <div
                            className={
                              styles.courseGrid
                            }
                          >
                            {(
                              college.abroadCourses ||
                              []
                            ).map(
                              (
                                course,
                                courseIndex
                              ) => {
                                const courseKey =
                                  `${university.id}-${collegeIndex}-${courseIndex}`;

                                return (
                                  <div
                                    className={
                                      styles.courseItem
                                    }
                                    key={
                                      courseKey
                                    }
                                  >
                                    {renderCourseDetails(
                                      course,
                                      courseKey
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>


                          {!(
                            college.abroadCourses ||
                            []
                          ).length && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontStyle:
                                  "italic",
                              }}
                            >
                              No courses available
                              for this college
                            </Typography>
                          )}

                        </div>
                      )
                    )}


                    {!(
                      university.abroadColleges ||
                      []
                    ).length && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontStyle:
                            "italic",
                        }}
                      >
                        No colleges available
                        for this university
                      </Typography>
                    )}

                  </div>

                </div>
              )
            )

          ) : (
            <div
              className={
                styles.noData
              }
            >

              {filters.examType.length ? (
                <Typography>
                  No course found with
                  this exam.
                </Typography>
              ) : filters.feesRange ? (
                <Typography>
                  No course is available
                  in this fees range.
                </Typography>
              ) : (
                <Typography>
                  No data available.
                  Please check if
                  countries, states,
                  cities, universities
                  and colleges are added.
                </Typography>
              )}

            </div>
          )}


          {!loading &&
            allUniversities.length >
              0 &&
            totalPages > 1 && (
              <div
                className={
                  styles.paginationWrapper
                }
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) =>
                    setCurrentPage(
                      page
                    )
                  }
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  siblingCount={1}
                  boundaryCount={1}
                />
              </div>
            )}

        </main>

      </div>

    </Container>
  );
}


/* =========================================================
   SMALL DETAIL COMPONENT

   Keeps course detail JSX short.
========================================================= */

function DetailRow({ label, value }) {
  return (
    <Box className="cf-detail-row">
      <Typography
        variant="body2"
        color="text.secondary"
        className="cf-detail-label"
      >
        {label}:
      </Typography>

      <Typography
        variant="body2"
        fontWeight="medium"
        className="cf-detail-value"
      >
        {value || "N/A"}
      </Typography>
    </Box>
  );
}
