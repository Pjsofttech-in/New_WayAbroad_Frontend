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
   PUBLIC COURSE NAMES
===================================================== */

export async function getAllCourses() {
  const response = await fetch(
    `${API_URL}/getAllCourseName`
  );

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

/* =====================================================
   COURSE FINDER SEARCH APIS
===================================================== */

export async function searchUniversities(
  query = ""
) {
  const response = await fetch(
    `${API_URL}/searchUniversities?name=${encodeURIComponent(
      query
    )}`
  );

  return handleResponse(response);
}

export async function searchStates(
  query = ""
) {
  const response = await fetch(
    `${API_URL}/searchStates?name=${encodeURIComponent(
      query
    )}`
  );

  return handleResponse(response);
}

export async function searchCities(
  query = ""
) {
  const response = await fetch(
    `${API_URL}/searchCities?name=${encodeURIComponent(
      query
    )}`
  );

  return handleResponse(response);
}

export async function searchColleges(
  query = ""
) {
  const response = await fetch(
    `${API_URL}/searchColleges?name=${encodeURIComponent(
      query
    )}`
  );

  return handleResponse(response);
}

export async function searchCountries(
  query = ""
) {
  const response = await fetch(
    `${API_URL}/searchCountries?name=${encodeURIComponent(
      query
    )}`
  );

  return handleResponse(response);
}

export async function searchStreams(
  query = ""
) {
  const response = await fetch(
    `${API_URL}/searchStreams?name=${encodeURIComponent(
      query
    )}`
  );

  return handleResponse(response);
}