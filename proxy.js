import { NextResponse } from "next/server";

const redirects = {
  "/visa": "/student-visa",
  "/services/banking": "/useful-links/student-essentials",
  "/services/money-transfer": "/useful-links/student-essentials",
  "/services/sim-card": "/useful-links/student-essentials",
  "/services/health-cover": "/useful-links/student-essentials",
  "/services/accommodation": "/about/living-abroad-support",
  "/exams/duolingo-english-test": "/exams/duolingo",
  "/IELTS/Prepare": "/exams/ielts",
  "/IELTS/Test": "/exams/ielts",
  "/sitemap.html": "/sitemap.xml",
  "/Copyright": "/copyright-policy",
  "/BecomePartner": "/become-partner",
  "/Blog": "/blog",
  "/Courses": "/courses",
};

export function proxy(request) {
  const destination = redirects[request.nextUrl.pathname];

  if (!destination) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = destination;

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: [
    "/visa",
    "/services/banking",
    "/services/money-transfer",
    "/services/sim-card",
    "/services/health-cover",
    "/services/accommodation",
    "/exams/duolingo-english-test",
    "/IELTS/Prepare",
    "/IELTS/Test",
    "/sitemap.html",
    "/Copyright",
    "/BecomePartner",
    "/Blog",
    "/Courses",
  ],
};
