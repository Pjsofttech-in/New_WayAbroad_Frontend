"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../jobfinder.module.css";
import { getJobById, getAllJobs, applyForJob } from "../../services/api";
import { getCountryName } from "../job-utils";

const EMPTY_APPLICATION = {
  applicantName: "",
  email: "",
  phone: "",
  coverLetter: "",
};

function unwrapResponse(response) {
  return (
    response?.data?.job ??
    response?.data ??
    response?.job ??
    response
  );
}

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPage() {
      try {
        setLoading(true);
        setError("");

        const [jobResponse, jobsResponse] = await Promise.all([
          getJobById(jobId),
          getAllJobs().catch(() => []),
        ]);

        const jobData = unwrapResponse(jobResponse);

        if (!jobData || typeof jobData !== "object") {
          throw new Error("Job details were not found.");
        }

        const jobsData =
          jobsResponse?.data ??
          jobsResponse?.jobs ??
          jobsResponse;

        if (!cancelled) {
          setJob(jobData);

          const list = Array.isArray(jobsData) ? jobsData : [];

          setRelatedJobs(
            list
              .filter(
                (item) =>
                  item &&
                  String(item.id) !== String(jobData.id ?? jobId) &&
                  item.active !== false
              )
              .slice(0, 4)
          );
        }
      } catch (err) {
        console.error("Job details API failed:", err);

        if (!cancelled) {
          setError(err.message || "Unable to load job details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (jobId) {
      loadPage();
    } else {
      setError("Job ID is missing.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [jobId]);

  const formatSalary = (selectedJob) => {
    if (
      selectedJob.salary == null ||
      selectedJob.salary === ""
    ) {
      return "Salary not specified";
    }

    const amount = Number(selectedJob.salary);

    if (!Number.isFinite(amount)) {
      return String(selectedJob.salary);
    }

    return `${
      selectedJob.currencyName
        ? `${selectedJob.currencyName} `
        : ""
    }${amount.toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <p className={styles.infoMessage}>Loading job details...</p>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className={styles.page}>
        <p className={styles.errorMessage}>
          {error || "Job not found."}
        </p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.detailsHeader}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.back()}
        >
          <span aria-hidden="true">←</span>
          Back
        </button>

        <div className={styles.headerTitleRow}>
          <span className={styles.titleAccent} aria-hidden="true" />
          <h1>{job.jobTitle || "Job Details"}</h1>
        </div>

        <div className={styles.detailsBadge}>
          <span className={styles.badgeIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="14" rx="2" />
              <path d="M8 7V4h8v3M3 12h18" />
            </svg>
          </span>
          <span>JOB DETAILS</span>
        </div>

        <div className={styles.headerDecoration} aria-hidden="true">
          <svg viewBox="0 0 500 300" fill="none">
            <path
              className={styles.heroWave}
              d="M0 258c83-7 125-91 242-75 87 12 111 68 258 43v74H0z"
            />
            <path
              className={styles.heroBuilding}
              d="M367 149h38v92h-38zm48-16h33v108h-33zm-95 48h39v60h-39"
            />
            <path
              className={styles.heroCrane}
              d="M304 78h164m-133 0 50-25 46 25m-66 0 20 18 20-18m-20 0v144m-43-144v26h107V78m-88 26v14m45-14v14m-45 0h45m-26 0-19 104m26-104 19 104m-37-104h28"
            />
            <path className={styles.heroHook} d="M335 104v31m0 0-7 8m7-8 7 8" />
            <path
              className={styles.heroHelmet}
              d="M284 228c2-42 24-67 57-67s55 25 57 67l-10 8h-94z"
            />
            <path
              className={styles.heroHelmetDetail}
              d="M303 224c2-28 15-46 38-52m-30 58h61m-61-10h61m-52-43 9 14m36-14-9 14"
            />
            <path
              className={styles.heroCone}
              d="m407 235 24-65 24 65z"
            />
            <path className={styles.heroConeStripe} d="m417 208 28 0m-34 18h40" />
            <path className={styles.heroGround} d="M275 240h192" />
          </svg>
        </div>
      </header>

      <div className={styles.jobDetailsLayout}>
        <article className={styles.detailsModal}>
          <div className={styles.detailsContent}>
            {/* JOB INFORMATION CARDS */}

            <div className={styles.detailsFacts}>
              <div>
                <span>Location :</span>
                <strong>{job.locationName || "Not specified"}</strong>
              </div>

              <div>
                <span>Salary :</span>
                <strong>{formatSalary(job)}</strong>
              </div>

              <div>
                <span>Job type :</span>
                <strong>{job.jobTypeName || "Not specified"}</strong>
              </div>

              <div>
                <span>Openings :</span>
                <strong>{job.openings ?? "Not specified"}</strong>
              </div>

              <div>
                <span>Education :</span>
                <strong>{job.educationName || "Not specified"}</strong>
              </div>

              <div>
                <span>Sector :</span>
                <strong>{job.sectorName || "Not specified"}</strong>
              </div>

              <div>
                <span>Role :</span>
                <strong>{job.jobRoleName || "Not specified"}</strong>
              </div>

            </div>

            {/* REQUIRED SKILLS */}
            <section className={styles.detailSection}>
              <h2>Required Skills</h2>
              <p className={styles.description}>
                {job.skill || "Not specified"}
              </p>
            </section>

            {/* ABOUT THE JOB */}
            <section className={styles.detailSection}>
              <h2>About the Job</h2>
              <p className={styles.description}>
                {job.description || "No job description has been provided."}
              </p>
            </section>

            {/* APPLICATION FORM */}
            <JobApplicationForm jobId={job.id ?? jobId} />
          </div>
        </article>

        <aside className={styles.relatedJobs}>
          <h2>Related Jobs</h2>

          <p className={styles.relatedSubtitle}>
            Explore other opportunities
          </p>

          {relatedJobs.length > 0 ? (
            <div className={styles.relatedJobsList}>
              {relatedJobs.map((relatedJob) => (
                <article
                  className={styles.relatedJobCard}
                  key={relatedJob.id}
                >
                  <h3>
                    {relatedJob.jobTitle || "Untitled Job"}
                  </h3>

                  <p>
                    {relatedJob.sectorName ||
                      getCountryName(relatedJob) ||
                      "Career opportunity"}
                  </p>

                  <span>
                    {relatedJob.locationName || "Location not specified"}
                  </span>

                  <span>{formatSalary(relatedJob)}</span>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/jobfinder/${encodeURIComponent(
                          String(relatedJob.id)
                        )}`
                      )
                    }
                  >
                    View Job →
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.relatedSubtitle}>
              No other jobs available right now.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}

function JobApplicationForm({ jobId }) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [application, setApplication] = useState({ ...EMPTY_APPLICATION });
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleApplicationChange = (event) => {
    const { name, value } = event.target;

    setApplication((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null;

    setResume(null);
    setMessage("");
    setSuccess(false);

    if (!file) return;

    if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
      event.target.value = "";
      setMessage("Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setMessage("Your resume must be 5 MB or smaller.");
      return;
    }

    setResume(file);
  };

  const closeApplicationForm = () => {
    if (submitting) return;

    setShowApplicationForm(false);
    setMessage("");
  };

  const handleApply = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setMessage("");
    setSuccess(false);

    if (!jobId) {
      setMessage("A valid job ID is required.");
      return;
    }

    const applicantName = application.applicantName.trim();
    const email = application.email.trim();
    const phone = application.phone.trim();
    const coverLetter = application.coverLetter.trim();

    if (!applicantName || !email || !phone) {
      setMessage("Please fill in your name, email, and phone number.");
      return;
    }

    if (!resume) {
      setMessage("Please upload your resume.");
      return;
    }

    try {
      setSubmitting(true);

      await applyForJob({
        application: {
          jobId,
          applicantName,
          email,
          phone,
          coverLetter,
        },
        resume,
      });

      setSuccess(true);
      setMessage("Your application has been submitted successfully!");
      setApplication({ ...EMPTY_APPLICATION });
      setResume(null);
    } catch (err) {
      console.error("Application submission failed:", err);

      setMessage(
        err.message || "Unable to submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.applicationSection}>
      <h2>Apply for this Job</h2>

      <p>
        Interested in this opportunity? Send your application now.
      </p>

      <button
        type="button"
        className={styles.applyButton}
        onClick={() => {
          setMessage("");
          setSuccess(false);
          setShowApplicationForm(true);
        }}
      >
        Apply Now
      </button>

      {message && !showApplicationForm && (
        <p
          className={
            success ? styles.successMessage : styles.errorMessage
          }
          role="status"
        >
          {message}
        </p>
      )}

      {showApplicationForm && (
        <div
          className={styles.modalOverlay}
          onClick={closeApplicationForm}
        >
          <div
            className={styles.applicationModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="applicationModalTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeModal}
              onClick={closeApplicationForm}
              disabled={submitting}
              aria-label="Close application form"
            >
              ×
            </button>

            <h2 id="applicationModalTitle">Apply for this Job</h2>

            <p>
              Enter your details and upload your resume to apply.
            </p>

            {message && (
              <p
                className={
                  success ? styles.successMessage : styles.errorMessage
                }
                role="status"
              >
                {message}
              </p>
            )}

            <form
              className={styles.applicationForm}
              onSubmit={handleApply}
            >
              <label>
                Full Name *
                <input
                  type="text"
                  name="applicantName"
                  value={application.applicantName}
                  onChange={handleApplicationChange}
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                Email Address *
                <input
                  type="email"
                  name="email"
                  value={application.email}
                  onChange={handleApplicationChange}
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Phone Number *
                <input
                  type="tel"
                  name="phone"
                  value={application.phone}
                  onChange={handleApplicationChange}
                  autoComplete="tel"
                  required
                />
              </label>

              <label>
                Cover Letter
                <textarea
                  name="coverLetter"
                  value={application.coverLetter}
                  onChange={handleApplicationChange}
                  rows={4}
                  placeholder="Tell us why you are suitable for this role"
                />
              </label>

              <label>
                Upload Resume (PDF, DOC, or DOCX) *
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  required
                />
              </label>

              {resume && (
                <p className={styles.selectedFile}>
                  Selected file: {resume.name}
                </p>
              )}

              <button
                type="submit"
                className={styles.applyButton}
                disabled={submitting || success}
              >
                {submitting
                  ? "Submitting..."
                  : success
                    ? "Application Submitted"
                    : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}