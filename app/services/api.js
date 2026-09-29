const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8097";

const CONTINENT_ROLE =
  process.env.NEXT_PUBLIC_CONTINENT_ROLE || "";

const CONTINENT_EMAIL =
  process.env.NEXT_PUBLIC_CONTINENT_EMAIL || "";

async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";

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
   CONTACT_US
   COUNSELLING
   SIGNUP
===================================================== */

export async function submitFormSubmission(data) {
  const response = await fetch(`${API_URL}/form-submission`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
}

/* =====================================================
   CONTINENTS
===================================================== */

export async function getAllContinents() {
  if (!CONTINENT_ROLE || !CONTINENT_EMAIL) {
    throw new Error(
      "Continent API credentials are not configured. Set NEXT_PUBLIC_CONTINENT_ROLE and NEXT_PUBLIC_CONTINENT_EMAIL."
    );
  }

  const response = await fetch(
    `${API_URL}/getAllContinents?role=${encodeURIComponent(
      CONTINENT_ROLE
    )}&email=${encodeURIComponent(CONTINENT_EMAIL)}`
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
  const response = await fetch(`${API_URL}/createPartner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
}

/* =====================================================
   LOGIN
===================================================== */

export async function loginUser(data) {
  const response = await fetch(`${API_URL}/userLogin`, {
    method: "POST",
    headers: {
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
  const response = await fetch(`${API_URL}/getAllBlogs`);
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
  const response = await fetch(`${API_URL}/getAll`);
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