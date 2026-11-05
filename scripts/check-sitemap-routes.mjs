
const publicRoutes = [
  "/",
  "/mbbs",
  "/courses",
  "/exams",
  "/scholarships",
  "/blog",
  "/about",
  "/contact",
  "/counselling",
  "/counselling-office",
  "/become-partner",
  "/exam-registration",
  "/instant-offer",
  "/organization",
  "/student-visa",
  "/student-testimonial",
  "/trusted-students",
  "/useful-links/ask-wayabroad",
  "/useful-links/cost-of-living",
  "/useful-links/how-to-find-course",
  "/useful-links/how-to-find-scholarships",
  "/useful-links/letter-of-recommendation",
  "/useful-links/statement-of-purpose",
  "/useful-links/student-essentials",
  "/useful-links/study-abroad-courses",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
  "/copyright-policy",
  "/data-protection-addendum",
];

const examRoutes = [
  "act",
  "sat",
  "gre",
  "gmat",
  "ielts",
  "toefl",
  "lsat",
  "mcat",
  "pte",
  "duolingo",
];

const siteUrl = "https://www.wayabroad.in";

const routes = [
  ...publicRoutes,
  ...examRoutes.map((slug) => `/exams/${slug}`),
];

async function checkRoute(route) {
  const url = `${siteUrl}${route}`;

  try {
    let response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    signal: AbortSignal.timeout(30000),
    });

    // Some servers do not support HEAD.
    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
      });
    }

    return {
      route,
      status: response.status,
      finalUrl: response.url,
    };
  } catch (error) {
    return {
      route,
      status: "ERROR",
      error: error.message,
    };
  }
}

async function main() {
  const results = await Promise.all(
    routes.map((route) => checkRoute(route))
  );

  const working = results.filter(
    (item) => item.status === 200
  );

  const broken = results.filter(
    (item) => item.status === 404
  );

  const otherErrors = results.filter(
    (item) => item.status !== 200 && item.status !== 404
  );

  console.log("\n========== WORKING URLS (200) ==========");
  working.forEach((item) => console.log(item.route));

  console.log("\n========== 404 URLS ==========");
  broken.forEach((item) => console.log(item.route));

  console.log("\n========== OTHER STATUS / ERRORS ==========");
  otherErrors.forEach((item) =>
    console.log(item.route, item.status, item.error || "")
  );

  console.log("\n========== SUMMARY ==========");
  console.log("Total URLs:", routes.length);
  console.log("Working:", working.length);
  console.log("404:", broken.length);
  console.log("Other:", otherErrors.length);
}

main();
