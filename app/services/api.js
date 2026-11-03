const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8097";

/* =====================================================
   COMMON HELPERS
===================================================== */

// Get logged-in user details from browser storage.
function getStoredUserDetails() {
  if (typeof window === "undefined") {
    return { role: null, email: null, token: null };
  }

  return {
    role:
      sessionStorage.getItem("role") ||
      localStorage.getItem("role"),

    email:
      sessionStorage.getItem("email") ||
      localStorage.getItem("email"),

    token:
      sessionStorage.getItem("authToken") ||
      localStorage.getItem("authToken"),
  };
}

// Create request headers.
function getRequestHeaders(extraHeaders = {}) {
  const { token } = getStoredUserDetails();

  const headers = {
    Accept: "application/json",
    ...extraHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// Read and validate API responses.
async function handleResponse(response) {
  const contentType =
    response.headers.get("content-type") || "";

  let data = null;

  if (response.status !== 204) {
    if (contentType.includes("application/json")) {
      data = await response.json().catch(() => null);
    } else {
      data = await response.text().catch(() => "");
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.message ||
          data?.error ||
          data?.detail ||
          `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

// Build a URL with optional query parameters.
function buildUrl(endpoint, params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== "") {
          query.append(key, String(item));
        }
      });
    } else {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();

  return `${API_URL}${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;
}

// Common GET helper.
async function get(endpoint, params = {}, options = {}) {
  const response = await fetch(buildUrl(endpoint, params), {
    method: "GET",
    headers: getRequestHeaders(),
    cache: "no-store",
    ...options,
  });

  return handleResponse(response);
}

// Common JSON POST helper.
async function post(endpoint, data, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: getRequestHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
    ...options,
  });

  return handleResponse(response);
}

/* =====================================================
   FORM SUBMISSION
===================================================== */

export async function submitFormSubmission(data) {
  return post("/form-submission", data);
}

/* =====================================================
   CONTINENTS
===================================================== */

export async function getAllContinents() {
  return get("/getAllContinents");
}

/* =====================================================
   COURSE NAMES
===================================================== */

export async function getAllCourseNames() {
  return get("/getAllCourseName");
}

/* =====================================================
   BECOME PARTNER
===================================================== */

export async function submitPartnerForm(data) {
  return post("/createPartner", data);
}

/* =====================================================
   LOGIN
===================================================== */

export async function loginUser(data) {
  const response = await fetch(`${API_URL}/userLogin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  return handleResponse(response);
}

/* =====================================================
   BLOGS
===================================================== */

export async function getAllBlogs() {
  return get("/getAllBlogs");
}

export async function getBlogById(id) {
  return get(`/getBlogById/${encodeURIComponent(id)}`);
}

/* =====================================================
   SCHOLARSHIPS
===================================================== */

export async function getAllScholarships() {
  return get("/getAll");
}

export async function getScholarshipById(id) {
  return get(`/getById/${encodeURIComponent(id)}`);
}

export async function getScholarshipLocations() {
  return get("/getAllScholarshipStudyLocation");
}

export async function submitScholarshipLead(data) {
  return post("/leads/create", data);
}

/* =====================================================
   UNIVERSITIES
===================================================== */

// Currently unused by the application.
// export async function getAllUniversities({ cityId } = {}) {
//   return get(
//     "/getAllUniversities",
//     {
//       ...getUserParams(),
//       cityId,
//     }
//   );
// }

/* =====================================================
   EXAM REGISTRATION
===================================================== */

export async function createExamPreparation(data) {
  return post("/createExamPreparation", data);
}

/* =====================================================
   COURSE FINDER - PUBLIC COURSE HIERARCHY
===================================================== */

export async function getHierarchy(params = {}) {
  return get("/hierarchy", params);
}

/* =====================================================
   PUBLIC STREAMS
===================================================== */

// Currently unused by the application.
// export async function getAllStreams() {
//   return get("/getAllStreams");
// }

export async function searchUniversities(query = "") {
  return get("/searchUniversities", { name: query });
}

export async function searchStates(query = "") {
  return get("/searchStates", { name: query });
}

export async function searchCities(query = "") {
  return get("/searchCities", { name: query });
}

export async function searchColleges(query = "") {
  return get("/searchColleges", { name: query });
}

export async function searchCountries(query = "") {
  return get("/searchCountries", { name: query });
}

export async function searchStreams(query = "") {
  return get("/searchStreams", { name: query });
}

/* =====================================================
   STATES
===================================================== */

// Currently unused by the application.
// export async function getAllStates({ countryId } = {}) {
//   return get("/getAllStates", {
//     ...getUserParams(),
//     countryId,
//   });
// }

/* =====================================================
   COUNTRIES
===================================================== */

export async function getAllCountries() {
  return get("/getAllCountries");
}

/* =====================================================
   CITIES
===================================================== */

// Currently unused by the application.
// export async function getAllCities({ stateId } = {}) {
//   return get("/getAllCities", {
//     ...getUserParams(),
//     stateId,
//   });
// }

/* =====================================================
   COLLEGES
===================================================== */

// Currently unused by the application.
// export async function getAllColleges({ universityId } = {}) {
//   return get("/getAllColleges", {
//     ...getUserParams(),
//     universityId,
//   });
// }

/* =====================================================
   STUDY ABROAD
===================================================== */

// Currently unused by the application.
// export async function getAllStudyAbroad() {
//   return get("/getAllStudyAbroad", getUserParams());
// }

/* =====================================================
   JOB FINDER - GET ALL JOBS
===================================================== */

// Public endpoint: role and email are not required.

export async function getAllJobs() {
  const response = await fetch(
    `${API_URL}/admin/jobs/getAllJobs`,
    {
      method: "GET",
      headers: getRequestHeaders(),
      cache: "no-store",
    }
  );

  const data = await handleResponse(response);

  // Backend returns List<AbroadJobResponseDTO>.
  if (Array.isArray(data)) {
    return data;
  }

  // Handle alternative response wrappers if present.
  if (Array.isArray(data?.content)) {
    return data.content;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

/* =====================================================
   JOB FINDER - GET JOB DETAILS
===================================================== */

// Public endpoint: role and email are not required.

export async function getJobById(id) {
  if (id === undefined || id === null || id === "") {
    throw new Error("A valid job ID is required.");
  }

  const response = await fetch(
    `${API_URL}/admin/jobs/${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: getRequestHeaders(),
      cache: "no-store",
    }
  );

  return handleResponse(response);
}

/* =====================================================
   JOB FINDER - APPLY FOR JOB
===================================================== */

// Backend: POST /job-applications/apply
// Multipart fields: application and resume.
// Your backend security configuration currently requires
// authentication for this endpoint.

export async function applyForJob({ application, resume }) {
  if (!application) {
    throw new Error("Application details are required.");
  }

  if (!resume) {
    throw new Error("Please select a resume file.");
  }

  const formData = new FormData();

  formData.append(
    "application",
    new Blob([JSON.stringify(application)], {
      type: "application/json",
    })
  );

  formData.append("resume", resume);

  const response = await fetch(
    `${API_URL}/job-applications/apply`,
    {
      method: "POST",
      headers: getRequestHeaders(),
      body: formData,
    }
  );

  return handleResponse(response);
}

export async function getAllJobCountries() {
  return get("/admin/job-settings/country");
}

export async function getAllJobLocations() {
  return get("/admin/job-settings/location");
}

export async function getAllJobEducations() {
  return get("/admin/job-settings/education");
}

export async function getAllJobSectors() {
  return get("/admin/job-settings/sector");
}

export async function getAllJobTypes() {
  return get("/admin/job-settings/job-type");
}

export async function getAllJobRoles() {
  return get("/admin/job-settings/role");
}

export async function getAllJobWorkTypes() {
  return get("/admin/job-settings/work-type");
}

export async function getAllJobCurrencies() {
  return get("/admin/job-settings/currency");
}
/* =====================================================
   EXPORT API BASE URL
===================================================== */

export { API_URL };