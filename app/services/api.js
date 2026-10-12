// app/services/api.js

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8097";

/* =====================================================
   COMMON RESPONSE HANDLER
===================================================== */

async function handleResponse(response) {
  const contentType =
    response.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.message || "Something went wrong";

    throw new Error(message);
  }

  return data;
}

/* =====================================================
   FORM SUBMISSION
===================================================== */

export async function submitFormSubmission(data) {
  const response = await fetch(
    `${API_URL}/form-submission`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse(response);
}

/* =====================================================
   CONTINENTS
===================================================== */

export async function getAllContinents() {
  const response = await fetch(
    `${API_URL}/getAllContinents`
  );

  return handleResponse(response);
}

/* =====================================================
   COURSE NAMES
===================================================== */

export async function getAllCourseNames() {
  const response = await fetch(
    `${API_URL}/getAllCourseName`
  );

  return handleResponse(response);
}

/* =====================================================
   BECOME PARTNER
===================================================== */

export async function submitPartnerForm(data) {
  const response = await fetch(
    `${API_URL}/createPartner`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse(response);
}

/* =====================================================
   LOGIN
===================================================== */

export async function loginUser(data) {
  const response = await fetch(
    `${API_URL}/userLogin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }
  );

  return handleResponse(response);
}

/* =====================================================
   BLOGS
===================================================== */

export async function getAllBlogs() {
  const response = await fetch(
    `${API_URL}/getAllBlogs`
  );

  return handleResponse(response);
}

export async function getBlogById(id) {
  const response = await fetch(
    `${API_URL}/getBlogById/${id}`
  );

  return handleResponse(response);
}

/* =====================================================
   SCHOLARSHIPS
===================================================== */

export async function getAllScholarships() {
  const response = await fetch(
    `${API_URL}/getAll`
  );

  return handleResponse(response);
}

export async function getScholarshipById(id) {
  const response = await fetch(
    `${API_URL}/getById/${id}`
  );

  return handleResponse(response);
}

export async function getScholarshipLocations() {
  const response = await fetch(
    `${API_URL}/getAllScholarshipStudyLocation`
  );

  return handleResponse(response);
}

export async function submitScholarshipLead(data) {
  const response = await fetch(
    `${API_URL}/leads/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse(response);
}


/*==================================================
universities
===================================================*/

export async function getAllUniversities({ cityId } = {}) {
  const role =
    typeof window !== "undefined"
      ? sessionStorage.getItem("role") || localStorage.getItem("role")
      : null;

  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("email") || localStorage.getItem("email")
      : null;

  const params = new URLSearchParams();

  if (role) params.append("role", role);
  if (email) params.append("email", email);
  if (cityId !== undefined && cityId !== null && cityId !== "") {
    params.append("cityId", cityId);
  }

  const response = await fetch(
    `${API_URL}/getAllUniversities?${params.toString()}`
  );

  return handleResponse(response);
}

/* =====================================================
   EXAM REGISTRATION
===================================================== */

export async function createExamPreparation(data) {
  const response = await fetch(
    `${API_URL}/createExamPreparation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse(response);
}

/* =====================================================
   COURSE FINDER
===================================================== */

/* =====================================================
   PUBLIC COURSE HIERARCHY

   IMPORTANT:
   Do NOT use /getAllCourses here.

   /getAllCourses requires role + email.

   Public Course Finder uses:
   /hierarchy
===================================================== */

export async function getHierarchy(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (
            item !== undefined &&
            item !== null &&
            item !== ""
          ) {
            query.append(key, item);
          }
        });
      } else {
        query.append(key, value);
      }
    }
  });

  const queryString = query.toString();

  const url = queryString
    ? `${API_URL}/hierarchy?${queryString}`
    : `${API_URL}/hierarchy`;

  const response = await fetch(url);

  return handleResponse(response);
}

/* =====================================================
   PUBLIC STREAMS
===================================================== */

export async function getAllStreams() {
  const response = await fetch(
    `${API_URL}/getAllStreams`
  );

  return handleResponse(response);
}

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
/*================================================
get all states
======================================================*/
export async function getAllStates({ countryId } = {}) {
  const role =
    typeof window !== "undefined"
      ? sessionStorage.getItem("role") || localStorage.getItem("role")
      : null;

  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("email") || localStorage.getItem("email")
      : null;

  const params = new URLSearchParams();

  if (role) params.append("role", role);
  if (email) params.append("email", email);

  if (countryId !== undefined && countryId !== null && countryId !== "") {
    params.append("countryId", countryId);
  }

  const response = await fetch(
    `${API_URL}/getAllStates?${params.toString()}`
  );

  return handleResponse(response);
}

/* =====================================================
   GET ALL COUNTRIES
   ===================================================== */

export async function getAllCountries() {
  const role =
    typeof window !== "undefined"
      ? sessionStorage.getItem("role") || localStorage.getItem("role")
      : null;

  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("email") || localStorage.getItem("email")
      : null;

  const params = new URLSearchParams();

  if (role) params.append("role", role);
  if (email) params.append("email", email);

  const response = await fetch(
    `${API_URL}/getAllCountries?${params.toString()}`
  );

  return handleResponse(response);
}


/* =====================================================
   GET ALL CITIES
   ===================================================== */

export async function getAllCities({ stateId } = {}) {
  const role =
    typeof window !== "undefined"
      ? sessionStorage.getItem("role") || localStorage.getItem("role")
      : null;

  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("email") || localStorage.getItem("email")
      : null;

  const params = new URLSearchParams();

  if (role) params.append("role", role);
  if (email) params.append("email", email);

  if (stateId !== undefined && stateId !== null && stateId !== "") {
    params.append("stateId", stateId);
  }

  const response = await fetch(
    `${API_URL}/getAllCities?${params.toString()}`
  );

  return handleResponse(response);
}


/* =====================================================
   GET ALL COLLEGES
   ===================================================== */

export async function getAllColleges({ universityId } = {}) {
  const role =
    typeof window !== "undefined"
      ? sessionStorage.getItem("role") || localStorage.getItem("role")
      : null;

  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("email") || localStorage.getItem("email")
      : null;

  const params = new URLSearchParams();

  if (role) params.append("role", role);
  if (email) params.append("email", email);

  if (
    universityId !== undefined &&
    universityId !== null &&
    universityId !== ""
  ) {
    params.append("universityId", universityId);
  }

  const response = await fetch(
    `${API_URL}/getAllColleges?${params.toString()}`
  );

  return handleResponse(response);
}





async function get(endpoint, params = {}) {
  const queryString = new URLSearchParams(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    ).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : String(value)
    ])
  ).toString();

  const url = `${API_URL}${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(url);

  return handleResponse(response);
}
