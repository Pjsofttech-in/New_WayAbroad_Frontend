"use client";

import React, { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
  Alert,
  Checkbox,
  ListItemText,
  TextField,
  InputAdornment
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import {
  getHierarchy,
  searchUniversities,
  searchStates,
  searchCities,
  searchColleges,
  searchCountries,
  searchStreams
} from "../services/api";

import styles from "./CourseFinder.module.css";

export default function CourseFinder() {
  const [searchTexts, setSearchTexts] = useState({
    continent: "",
    country: "",
    state: "",
    city: "",
    university: "",
    college: "",
    stream: "",
    course: ""
  });

  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCity] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [streams, setStreams] = useState([]);

  const [globalSearch, setGlobalSearch] = useState("");

  const [filters, setFilters] = useState({
    continentId: [],
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
    intake: []
  });

  const [hierarchyData, setHierarchyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState({});
  const [showDescription, setShowDescription] = useState({});
  const [error, setError] = useState(null);

  /* =========================================================
     SEARCH TEXT
  ========================================================= */

  const handleFilterTextChange = (type, value) => {
    setSearchTexts((prev) => ({
      ...prev,
      [type]: value
    }));
  };

  const searchFieldStyles = {
    "& .MuiInputBase-input": {
      color: "text.primary !important",
      "&::placeholder": {
        color: "text.secondary !important",
        opacity: 1
      }
    },
    "& .MuiInputBase-root": {
      color: "text.primary !important"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23) !important"
    }
  };

  /* =========================================================
     FILTER OPTIONS SEARCH
  ========================================================= */

  const getFilteredOptions = (type, items = []) => {
    if (!Array.isArray(items)) return [];

    const searchText = (searchTexts[type] || "")
      .toLowerCase()
      .trim();

    if (!searchText) return items;

    return items.filter((item) => {
      if (!item) return false;

      const name = (
        item.name ||
        item[`${type}Name`] ||
        item[type] ||
        item.title ||
        item.label ||
        ""
      )
        .toString()
        .toLowerCase();

      return name.includes(searchText);
    });
  };

  /* =========================================================
     FETCH FILTERED DATA
  ========================================================= */

  const fetchFilteredData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};

      if (filters.continentId?.length) {
        params.continentId = filters.continentId;
      }

      if (filters.countryId?.length) {
        const selectedCountries = countries
          .filter((country) =>
            filters.countryId.includes(country.id)
          )
          .map(
            (country) =>
              country.countryName || country.country
          )
          .filter(Boolean);

        if (selectedCountries.length) {
          params.countryName = selectedCountries;
        }
      }

      if (filters.stateId?.length) {
        const selectedStates = states
          .filter((state) =>
            filters.stateId.includes(state.id)
          )
          .map(
            (state) =>
              state.stateName || state.state
          )
          .filter(Boolean);

        if (selectedStates.length) {
          params.stateName = selectedStates;
        }
      }

      if (filters.cityId?.length) {
        const selectedCities = cities
          .filter((city) =>
            filters.cityId.includes(city.id)
          )
          .map(
            (city) =>
              city.cityName || city.city
          )
          .filter(Boolean);

        if (selectedCities.length) {
          params.cityName = selectedCities;
        }
      }

      if (filters.universityId?.length) {
        const selectedUniversities = universities
          .filter((university) =>
            filters.universityId.includes(university.id)
          )
          .map(
            (university) =>
              university.name ||
              university.universityName
          )
          .filter(Boolean);

        if (selectedUniversities.length) {
          params.universityName = selectedUniversities;
        }
      }

      if (filters.collegeId?.length) {
        const selectedColleges = colleges
          .filter((college) =>
            filters.collegeId.includes(college.id)
          )
          .map(
            (college) =>
              college.name ||
              college.collegeName
          )
          .filter(Boolean);

        if (selectedColleges.length) {
          params.collegeName = selectedColleges;
        }
      }

      if (filters.courseId?.length) {
        const selectedCourses = courses
          .filter((course) =>
            filters.courseId.includes(course.id)
          )
          .map(
            (course) =>
              course.name ||
              course.courseName
          )
          .filter(Boolean);

        if (selectedCourses.length) {
          params.courseName = selectedCourses;
        }
      }

      if (filters.streamName?.length) {
        params.streamName = filters.streamName;
      }

      if (filters.scholarship) {
        params.scholarship = filters.scholarship;
      }

      if (filters.feesRange) {
        params.feesRange = filters.feesRange;
      }

      if (filters.examType?.length) {
        params.examType = filters.examType;
      }

      if (filters.englishExamRequirements) {
        params.englishExamRequirements =
          filters.englishExamRequirements;
      }

      if (filters.academicRequirements?.length) {
        params.academicRequirements =
          filters.academicRequirements;
      }

      if (filters.intake?.length) {
        params.intake = filters.intake;
      }

      const response = await getHierarchy(params);

      setHierarchyData(
        Array.isArray(response) ? response : []
      );
    } catch (err) {
      console.error(
        "Error fetching filtered data:",
        err
      );

      setError(
        err.message ||
          "Failed to load filtered data."
      );

      setHierarchyData([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     GLOBAL SEARCH
  ========================================================= */

  useEffect(() => {
    const run = async () => {
      const q = (globalSearch || "").trim();

      if (!q) return;

      try {
        const [
          uniNames,
          stateNames,
          cityNames,
          collegeNames,
          countryNames,
          streamNames
        ] = await Promise.all([
          searchUniversities(q),
          searchStates(q),
          searchCities(q),
          searchColleges(q),
          searchCountries(q),
          searchStreams(q)
        ]);

        const toSet = (arr) =>
          new Set(
            (Array.isArray(arr) ? arr : []).map((s) =>
              String(s).toLowerCase()
            )
          );

        const uniSet = toSet(uniNames);
        const stateSet = toSet(stateNames);
        const citySet = toSet(cityNames);
        const collegeSet = toSet(collegeNames);
        const countrySet = toSet(countryNames);
        const streamSet = toSet(streamNames);

        const matchedCountryIds = countries
          .filter((c) =>
            countrySet.has(
              String(
                c.countryName ||
                  c.country ||
                  c.name
              ).toLowerCase()
            )
          )
          .map((c) => c.id);

        const matchedStateIds = states
          .filter((s) =>
            stateSet.has(
              String(
                s.stateName ||
                  s.state ||
                  s.name
              ).toLowerCase()
            )
          )
          .map((s) => s.id);

        const matchedCityIds = cities
          .filter((c) =>
            citySet.has(
              String(
                c.cityName ||
                  c.city ||
                  c.name
              ).toLowerCase()
            )
          )
          .map((c) => c.id);

        const matchedUniversityIds = universities
          .filter((u) =>
            uniSet.has(
              String(
                u.universityName ||
                  u.name ||
                  u.university
              ).toLowerCase()
            )
          )
          .map((u) => u.id);

        const matchedCollegeIds = colleges
          .filter((c) =>
            collegeSet.has(
              String(
                c.collegeName ||
                  c.name
              ).toLowerCase()
            )
          )
          .map((c) => c.id);

        const matchedStreamNames = streams
          .map(
            (s) =>
              s.name ||
              s.streamName
          )
          .filter(
            (n) =>
              n &&
              streamSet.has(
                String(n).toLowerCase()
              )
          );

        setFilters((prev) => ({
          ...prev,
          countryId: matchedCountryIds,
          stateId: matchedStateIds,
          cityId: matchedCityIds,
          universityId: matchedUniversityIds,
          collegeId: matchedCollegeIds,
          streamName: matchedStreamNames
        }));
      } catch (err) {
        console.error(
          "Global search failed:",
          err
        );
      }
    };

    const timer = setTimeout(run, 400);

    return () => clearTimeout(timer);
  }, [
    globalSearch,
    countries,
    states,
    cities,
    universities,
    colleges,
    streams
  ]);

  /* =========================================================
     INITIAL DATA
  ========================================================= */

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const hierarchy = await getHierarchy();

        const data = Array.isArray(hierarchy)
          ? hierarchy
          : [];

        setHierarchyData(data);

        const continentMap = new Map();
        const countryMap = new Map();
        const stateMap = new Map();
        const cityMap = new Map();
        const universityMap = new Map();
        const collegeMap = new Map();
        const courseMap = new Map();
        const streamMap = new Map();

        data.forEach((continent) => {
          if (continent?.id) {
            continentMap.set(
              continent.id,
              {
                id: continent.id,
                continentName:
                  continent.continentname ||
                  continent.continentName ||
                  continent.name ||
                  continent.continent
              }
            );
          }

          (
            continent?.abroadCountries || []
          ).forEach((country) => {
            if (country?.id) {
              countryMap.set(
                country.id,
                {
                  id: country.id,
                  countryName:
                    country.countryName ||
                    country.country ||
                    country.name,
                  country:
                    country.countryName ||
                    country.country ||
                    country.name
                }
              );
            }

            (
              country?.abroadStates || []
            ).forEach((state) => {
              if (state?.id) {
                stateMap.set(
                  state.id,
                  {
                    id: state.id,
                    stateName:
                      state.stateName ||
                      state.state ||
                      state.name,
                    state:
                      state.stateName ||
                      state.state ||
                      state.name
                  }
                );
              }

              (
                state?.abroadCities || []
              ).forEach((city) => {
                if (city?.id) {
                  cityMap.set(
                    city.id,
                    {
                      id: city.id,
                      cityName:
                        city.cityName ||
                        city.city ||
                        city.name,
                      city:
                        city.cityName ||
                        city.city ||
                        city.name
                    }
                  );
                }

                (
                  city?.abroadUniversities || []
                ).forEach((university) => {
                  if (university?.id) {
                    universityMap.set(
                      university.id,
                      {
                        id: university.id,
                        name:
                          university.universityName ||
                          university.name ||
                          university.university,
                        universityName:
                          university.universityName ||
                          university.name ||
                          university.university
                      }
                    );
                  }

                  (
                    university?.abroadColleges || []
                  ).forEach((college) => {
                    if (college?.id) {
                      collegeMap.set(
                        college.id,
                        {
                          id: college.id,
                          name:
                            college.collegeName ||
                            college.name,
                          collegeName:
                            college.collegeName ||
                            college.name
                        }
                      );
                    }

                    (
                      college?.abroadCourses || []
                    ).forEach((course) => {
                      if (course?.id) {
                        courseMap.set(
                          course.id,
                          course
                        );
                      }

                      const streamName =
                        course?.streamName ||
                        course?.stream ||
                        course?.stream?.name;

                      if (streamName) {
                        streamMap.set(
                          String(streamName),
                          {
                            id: String(
                              streamName
                            ),
                            name: streamName,
                            streamName:
                              streamName
                          }
                        );
                      }
                    });
                  });
                });
              });
            });
          });
        });

        setContinents(
          Array.from(
            continentMap.values()
          )
        );

        setCountries(
          Array.from(
            countryMap.values()
          )
        );

        setStates(
          Array.from(
            stateMap.values()
          )
        );

        setCity(
          Array.from(
            cityMap.values()
          )
        );

        setUniversities(
          Array.from(
            universityMap.values()
          )
        );

        setColleges(
          Array.from(
            collegeMap.values()
          )
        );

        const courseList =
          Array.from(
            courseMap.values()
          );

        setCourses(courseList);
        setAllCourses(courseList);

        setStreams(
          Array.from(
            streamMap.values()
          )
        );
      } catch (err) {
        console.error(
          "Course Finder loading error:",
          err
        );

        setError(
          err.message ||
            "Failed to load Course Finder data."
        );

        setHierarchyData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  /* =========================================================
     FILTER CHANGE
  ========================================================= */

  const multipleSelectFilters = [
    "continentId",
    "countryId",
    "stateId",
    "cityId",
    "universityId",
    "collegeId",
    "courseId",
    "streamName",
    "examType",
    "academicRequirements",
    "intake"
  ];

  const handleFilterChange = (
    filterName,
    value
  ) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters
      };

      if (
        multipleSelectFilters.includes(
          filterName
        )
      ) {
        updatedFilters[filterName] =
          Array.isArray(value)
            ? value
            : [value];
      } else {
        updatedFilters[filterName] =
          value || "";
      }

      return updatedFilters;
    });
  };

  /* =========================================================
     APPLY FILTERS
  ========================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredData();
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearAllFilters = () => {
    setFilters({
      continentId: [],
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
      intake: []
    });

    setSearchTexts({
      continent: "",
      country: "",
      state: "",
      city: "",
      university: "",
      college: "",
      stream: "",
      course: ""
    });
  };

  /* =========================================================
     COURSE TOGGLES
  ========================================================= */

  const toggleCourseExpansion = (
    courseKey
  ) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseKey]: !prev[courseKey]
    }));
  };

  const toggleDescription = (
    courseKey
  ) => {
    setShowDescription((prev) => ({
      ...prev,
      [courseKey]: !prev[courseKey]
    }));
  };

  /* =========================================================
     COURSE DETAILS
  ========================================================= */

  const renderCourseDetails = (
    course,
    courseKey
  ) => {
    const isExpanded =
      expandedCourses[courseKey];

    const showDesc =
      showDescription[courseKey];

    return (
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            borderColor: "primary.main",
            backgroundColor: "action.hover"
          },
          transition:
            "all 0.2s ease-in-out"
        }}
      >
        <CardContent
          sx={{ flexGrow: 1 }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
          >
            {course.courseName ||
              "Course Name N/A"}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Stream Name:
              </Typography>

              <Typography
                variant="body2"
                fontWeight="medium"
              >
                {course.streamName ||
                  "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5,
                alignItems: "center"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems:
                    "center"
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
                    showDesc
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
                      ml: 0.5
                    }}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {showDesc && (
              <Box
                sx={{
                  mb: 1,
                  p: 1,
                  backgroundColor:
                    "grey.50",
                  borderRadius: 1
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

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Duration:
              </Typography>

              <Typography
                variant="body2"
                fontWeight="medium"
              >
                {course.duration ||
                  "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Institute Rank:
              </Typography>

              <Typography
                variant="body2"
                fontWeight="medium"
              >
                {course.institute_rank ||
                  course.instituteRank ||
                  "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Intake:
              </Typography>

              <Typography
                variant="body2"
                fontWeight="medium"
              >
                {course.intake ||
                  "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Tuition Fees:
              </Typography>

              <Typography
                variant="body2"
                fontWeight="medium"
              >
                {course.tutionFees
                  ? `₹${Number(
                      course.tutionFees
                    ).toLocaleString()}`
                  : "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Application Fees:
              </Typography>

              <Typography
                variant="body2"
                fontWeight="medium"
              >
                {course.applicationFees
                  ? `₹${Number(
                      course.applicationFees
                    ).toLocaleString()}`
                  : "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 0.5
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
                isExpanded ? (
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
                  "primary.main"
              }}
            >
              {isExpanded
                ? "Show Less"
                : "View More Details"}
            </Button>

            {isExpanded && (
              <Box
                sx={{
                  mt: 1,
                  pt: 1,
                  borderTop:
                    "1px solid #eee"
                }}
              >
                {[
                  [
                    "Academic Requirements",
                    course.academicRequirements
                  ],
                  [
                    "English Exam Requirements",
                    course.englishExamRequirements
                  ],
                  [
                    "Exam Score",
                    course.examScore
                  ],
                  [
                    "Additional Requirements",
                    course.additionalRequirements
                  ],
                  [
                    "Scholarship",
                    course.scholarship
                  ],
                  [
                    "Hostel Available",
                    course.hostel
                  ],
                  [
                    "Hostel Fees",
                    course.hostelFees
                      ? `₹${Number(
                          course.hostelFees
                        ).toLocaleString()}`
                      : null
                  ],
                  [
                    "Exam Type",
                    course.examType
                  ]
                ].map(
                  ([label, value]) => (
                    <Box
                      key={label}
                      sx={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        mb: 0.5
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {label}:
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight="medium"
                      >
                        {value || "N/A"}
                      </Typography>
                    </Box>
                  )
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    mb: 0.5
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Application Link:
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight="medium"
                  >
                    {course.applicationLink ? (
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
                    )}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    mb: 0.5
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Tuition Fees (INR):
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight="medium"
                  >
                    {course.tutionFeesINR
                      ? `₹${Number(
                          course.tutionFeesINR
                        ).toLocaleString()}`
                      : "N/A"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    mb: 0.5
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total Fees (INR):
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight="medium"
                  >
                    {course.feesINR
                      ? `₹${Number(
                          course.feesINR
                        ).toLocaleString()}`
                      : "N/A"}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  /* =========================================================
     FILTER COMPONENTS
  ========================================================= */

  const renderSearchField = (
    type,
    placeholder,
    disabled = false
  ) => (
    <Box sx={{ p: 1 }}>
      <TextField
        size="small"
        fullWidth
        placeholder={placeholder}
        value={searchTexts[type]}
        onChange={(e) =>
          handleFilterTextChange(
            type,
            e.target.value
          )
        }
        onClick={(e) =>
          e.stopPropagation()
        }
        disabled={disabled}
        sx={searchFieldStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment:
            searchTexts[type] && (
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
            )
        }}
      />
    </Box>
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 4
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            whiteSpace: "nowrap"
          }}
        >
          University Course Finder
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexGrow: 1,
            maxWidth: "600px"
          }}
        >
          <TextField
            fullWidth
            placeholder="Search..."
            value={globalSearch}
            onChange={(e) =>
              setGlobalSearch(
                e.target.value
              )
            }
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "40px"
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment:
                globalSearch && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() =>
                        setGlobalSearch(
                          ""
                        )
                      }
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
            }}
          />

          <Button
            variant="outlined"
            onClick={() => {
              setGlobalSearch("");
              clearAllFilters();
            }}
            sx={{
              whiteSpace: "nowrap",
              height: "40px"
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>

      {/* ERROR */}
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

      {/* =====================================================
          IMPORTANT:
          FILTERS LEFT
          RESULTS RIGHT
      ===================================================== */}

      <div className={styles.layout}>

        {/* ===================================================
            LEFT SIDEBAR
        =================================================== */}

        <aside className={styles.sidebar}>

          <div className={styles.filterHeader}>
            <h3 className={styles.filterTitle}>
              Filters
            </h3>

            <button
              className={styles.filterReset}
              onClick={clearAllFilters}
              disabled={loading}
            >
              Reset
            </button>
          </div>

          {/* CONTINENT */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              Continent
            </InputLabel>

            <Select
              multiple
              value={filters.continentId}
              onChange={(e) =>
                handleFilterChange(
                  "continentId",
                  e.target.value
                )
              }
              label="Continent"
              disabled={loading}
              renderValue={(selected) =>
                selected.length
                  ? continents
                      .filter((c) =>
                        selected.includes(
                          c.id
                        )
                      )
                      .map(
                        (c) =>
                          c.continentName ||
                          c.continentname
                      )
                      .join(", ")
                  : "All Continents"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {renderSearchField(
                "continent",
                "Search continents..."
              )}

              {getFilteredOptions(
                "continent",
                continents
              ).map((cont) => (
                <MenuItem
                  key={cont.id}
                  value={cont.id}
                >
                  <Checkbox
                    checked={
                      filters.continentId.indexOf(
                        cont.id
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={
                      cont.continentName ||
                      cont.continentname
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* COUNTRY */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              Country
            </InputLabel>

            <Select
              multiple
              value={filters.countryId}
              onChange={(e) =>
                handleFilterChange(
                  "countryId",
                  e.target.value
                )
              }
              label="Country"
              disabled={
                !filters.continentId
                  .length || loading
              }
              renderValue={(selected) =>
                selected.length
                  ? countries
                      .filter((c) =>
                        selected.includes(
                          c.id
                        )
                      )
                      .map(
                        (c) =>
                          c.countryName ||
                          c.country
                      )
                      .join(", ")
                  : "All Countries"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {renderSearchField(
                "country",
                "Search countries...",
                !filters.continentId
                  .length
              )}

              {getFilteredOptions(
                "country",
                countries
              ).map((country) => (
                <MenuItem
                  key={country.id}
                  value={country.id}
                >
                  <Checkbox
                    checked={
                      filters.countryId.indexOf(
                        country.id
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={
                      country.countryName ||
                      country.country
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* STATE */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              State
            </InputLabel>

            <Select
              multiple
              value={filters.stateId}
              onChange={(e) =>
                handleFilterChange(
                  "stateId",
                  e.target.value
                )
              }
              label="State"
              disabled={
                !filters.countryId
                  .length || loading
              }
              renderValue={(selected) =>
                selected.length
                  ? states
                      .filter((s) =>
                        selected.includes(
                          s.id
                        )
                      )
                      .map(
                        (s) =>
                          s.stateName ||
                          s.state
                      )
                      .join(", ")
                  : "All States"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {renderSearchField(
                "state",
                "Search states...",
                !filters.countryId
                  .length
              )}

              {getFilteredOptions(
                "state",
                states
              ).map((state) => (
                <MenuItem
                  key={state.id}
                  value={state.id}
                >
                  <Checkbox
                    checked={
                      filters.stateId.indexOf(
                        state.id
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={
                      state.stateName ||
                      state.state
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* CITY */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              City
            </InputLabel>

            <Select
              multiple
              value={filters.cityId}
              onChange={(e) =>
                handleFilterChange(
                  "cityId",
                  e.target.value
                )
              }
              label="City"
              disabled={
                !filters.stateId
                  .length || loading
              }
              renderValue={(selected) =>
                selected.length
                  ? cities
                      .filter((c) =>
                        selected.includes(
                          c.id
                        )
                      )
                      .map(
                        (c) =>
                          c.cityName ||
                          c.city
                      )
                      .join(", ")
                  : "All Cities"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {renderSearchField(
                "city",
                "Search cities...",
                !filters.stateId
                  .length
              )}

              {getFilteredOptions(
                "city",
                cities
              ).map((city) => (
                <MenuItem
                  key={city.id}
                  value={city.id}
                >
                  <Checkbox
                    checked={
                      filters.cityId.indexOf(
                        city.id
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={
                      city.cityName ||
                      city.city
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* UNIVERSITY */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              University
            </InputLabel>

            <Select
              multiple
              value={filters.universityId}
              onChange={(e) =>
                handleFilterChange(
                  "universityId",
                  e.target.value
                )
              }
              label="University"
              disabled={
                !filters.cityId
                  .length || loading
              }
              renderValue={(selected) =>
                selected.length
                  ? universities
                      .filter((u) =>
                        selected.includes(
                          u.id
                        )
                      )
                      .map(
                        (u) =>
                          u.universityName ||
                          u.name ||
                          u.university
                      )
                      .join(", ")
                  : "All Universities"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {renderSearchField(
                "university",
                "Search universities...",
                !filters.cityId
                  .length
              )}

              {getFilteredOptions(
                "university",
                universities
              ).map((university) => (
                <MenuItem
                  key={university.id}
                  value={university.id}
                >
                  <Checkbox
                    checked={
                      filters.universityId.indexOf(
                        university.id
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={
                      university.universityName ||
                      university.name ||
                      university.university
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* COLLEGE */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              College
            </InputLabel>

            <Select
              multiple
              value={filters.collegeId}
              onChange={(e) =>
                handleFilterChange(
                  "collegeId",
                  e.target.value
                )
              }
              label="College"
              disabled={
                !filters.universityId
                  .length || loading
              }
              renderValue={(selected) =>
                selected.length
                  ? colleges
                      .filter((c) =>
                        selected.includes(
                          c.id
                        )
                      )
                      .map(
                        (c) =>
                          c.name ||
                          c.collegeName
                      )
                      .join(", ")
                  : "All Colleges"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {renderSearchField(
                "college",
                "Search colleges...",
                !filters.universityId
                  .length
              )}

              {getFilteredOptions(
                "college",
                colleges
              ).map((college) => (
                <MenuItem
                  key={college.id}
                  value={college.id}
                >
                  <Checkbox
                    checked={
                      filters.collegeId.indexOf(
                        college.id
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={
                      college.name ||
                      college.collegeName
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* STREAM */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              Stream
            </InputLabel>

            <Select
              multiple
              value={filters.streamName}
              onChange={(e) =>
                handleFilterChange(
                  "streamName",
                  e.target.value
                )
              }
              label="Stream"
              disabled={loading}
              renderValue={(selected) =>
                selected.length
                  ? selected.join(", ")
                  : "All Streams"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {renderSearchField(
                "stream",
                "Search streams..."
              )}

              {getFilteredOptions(
                "stream",
                streams
              ).map((stream) => (
                <MenuItem
                  key={stream.id}
                  value={stream.name}
                >
                  <Checkbox
                    checked={
                      filters.streamName.indexOf(
                        stream.name
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={
                      stream.name
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* COURSE */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              Course
            </InputLabel>

            <Select
              multiple
              value={filters.courseId}
              onChange={(e) =>
                handleFilterChange(
                  "courseId",
                  e.target.value
                )
              }
              label="Course"
              disabled={loading}
              renderValue={(selected) =>
                selected.length
                  ? allCourses
                      .filter((c) =>
                        selected.includes(
                          c.id
                        )
                      )
                      .map(
                        (c) =>
                          c.name ||
                          c.courseName
                      )
                      .join(", ")
                  : "All Courses"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {renderSearchField(
                "course",
                "Search courses..."
              )}

              {getFilteredOptions(
                "course",
                allCourses
              ).map((course) => (
                <MenuItem
                  key={course.id}
                  value={course.id}
                >
                  <Checkbox
                    checked={
                      filters.courseId.indexOf(
                        course.id
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={
                      course.name ||
                      course.courseName
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* SCHOLARSHIP */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
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
                Any
              </MenuItem>
              <MenuItem value="Yes">
                Yes
              </MenuItem>
              <MenuItem value="No">
                No
              </MenuItem>
            </Select>
          </FormControl>

          {/* FEES */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
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
                Any
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

          {/* EXAM */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              Exam Type
            </InputLabel>

            <Select
              multiple
              value={filters.examType}
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
                  ? selected.join(", ")
                  : "All Exam Types"
              }
            >
              {[
                "IELTS",
                "TOEFL",
                "PTE",
                "GRE",
                "GMAT"
              ].map((exam) => (
                <MenuItem
                  key={exam}
                  value={exam}
                >
                  <Checkbox
                    checked={
                      filters.examType.indexOf(
                        exam
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={exam}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* ENGLISH */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
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
                Any
              </MenuItem>
              <MenuItem value="Yes">
                Yes
              </MenuItem>
              <MenuItem value="No">
                No
              </MenuItem>
            </Select>
          </FormControl>

          {/* ACADEMIC */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
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
                  ? selected.join(", ")
                  : "Any"
              }
            >
              {Array.from(
                { length: 10 },
                (_, i) => {
                  const min =
                    i * 10;
                  const max =
                    (i + 1) * 10;

                  const value = `${min}-${max}%`;

                  return (
                    <MenuItem
                      key={value}
                      value={value}
                    >
                      <Checkbox
                        checked={
                          filters.academicRequirements.indexOf(
                            value
                          ) > -1
                        }
                      />

                      <ListItemText
                        primary={`${min}-${max}%`}
                      />
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>

          {/* INTAKE */}
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel>
              Intake
            </InputLabel>

            <Select
              multiple
              value={filters.intake}
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
                  ? selected.join(", ")
                  : "Any"
              }
            >
              {[
                "Summer",
                "Winter",
                "Spring"
              ].map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  <Checkbox
                    checked={
                      filters.intake.indexOf(
                        item
                      ) > -1
                    }
                  />

                  <ListItemText
                    primary={item}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            fullWidth
            onClick={
              clearAllFilters
            }
            disabled={loading}
            sx={{ mt: 1 }}
          >
            Clear All Filters
          </Button>
        </aside>

        {/* ===================================================
            RIGHT RESULTS
        =================================================== */}

        <main className={styles.results}>

          <div
            className={
              styles.resultsHeader
            }
          >
            <h2
              className={
                styles.resultsTitle
              }
            >
              Universities & Courses
            </h2>

            <span
              className={
                styles.resultsCount
              }
            >
              {hierarchyData?.length || 0}{" "}
              results
            </span>
          </div>

          {loading ? (
            <div
              className={
                styles.loading
              }
            >
              <CircularProgress />
            </div>
          ) : hierarchyData?.length >
            0 ? (
            hierarchyData.map(
              (continent) =>
                (
                  continent.abroadCountries ||
                  []
                ).map((country) =>
                  (
                    country.abroadStates ||
                    []
                  ).map((state) =>
                    (
                      state.abroadCities ||
                      []
                    ).map((city) =>
                      (
                        city.abroadUniversities ||
                        []
                      ).map(
                        (
                          university,
                          uniIndex
                        ) => (
                          <div
                            className={
                              styles.universityCard
                            }
                            key={`${continent.id}-${country.id}-${state.id}-${city.id}-${university.id}-${uniIndex}`}
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
                                    university.universityName
                                  }
                                </h3>

                                <p
                                  className={
                                    styles.universityLocation
                                  }
                                >
                                  {city.city},{" "}
                                  {state.state},{" "}
                                  {
                                    country.country
                                  }{" "}
                                  (
                                  {
                                    continent.continentname
                                  }
                                  )
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
                                  {university.abroadColleges?.reduce(
                                    (
                                      total,
                                      college
                                    ) =>
                                      total +
                                      (college.abroadCourses
                                        ?.length ||
                                        0),
                                    0
                                  ) || 0}
                                </p>
                              </div>
                            </div>

                            {/* COLLEGES */}
                            <div>
                              {university.abroadColleges?.map(
                                (
                                  college,
                                  colIndex
                                ) => (
                                  <div
                                    className={
                                      styles.collegeSection
                                    }
                                    key={`${university.id}-college-${colIndex}`}
                                  >
                                    <h4
                                      className={
                                        styles.collegeName
                                      }
                                    >
                                      {
                                        college.collegeName
                                      }
                                    </h4>

                                    {/* =================================================
                                        THIS IS THE IMPORTANT CHANGE
                                        ONE COURSE PER ROW
                                    ================================================= */}

                                    <div
                                      className={
                                        styles.courseGrid
                                      }
                                    >
                                      {college.abroadCourses?.map(
                                        (
                                          course,
                                          courseIndex
                                        ) => {
                                          const courseKey = `${university.id}-${colIndex}-${courseIndex}`;

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

                                    {(!college.abroadCourses ||
                                      college.abroadCourses
                                        .length ===
                                        0) && (
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                          fontStyle:
                                            "italic"
                                        }}
                                      >
                                        No courses available for this college
                                      </Typography>
                                    )}
                                  </div>
                                )
                              )}

                              {(!university.abroadColleges ||
                                university.abroadColleges
                                  .length ===
                                  0) && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    fontStyle:
                                      "italic"
                                  }}
                                >
                                  No colleges available for this university
                                </Typography>
                              )}
                            </div>
                          </div>
                        )
                      )
                    )
                  )
                )
            )
          ) : (
            <div
              className={
                styles.noData
              }
            >
              {filters.examType &&
              filters.examType.length >
                0 ? (
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
                  Please check if there
                  are any continents and
                  countries added.
                </Typography>
              )}
            </div>
          )}
        </main>
      </div>
    </Container>
  );
}