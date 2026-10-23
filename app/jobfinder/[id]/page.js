
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../jobfinder.module.css";
import { getJobById, getAllJobs, applyForJob } from "../../services/api";

const EMPTY_APPLICATION = {
  applicantName: "",
  email: "",
  phone: "",
  coverLetter: "",
};

function unwrapResponse(response) {
  return response?.data?.job ??
    response?.data ??
    response?.job ??
    response;
}

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;

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
        if (!cancelled) setLoading(false);
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
      <div className={styles.jobDetailsLayout}>
        {/* LEFT: FULL JOB DETAILS */}
        <article className={styles.detailsModal}>
          <div className={styles.detailsHeader}>
            <div>
              <p className={styles.detailsEyebrow}>JOB DETAILS</p>

              <h1>{job.jobTitle || "Job Details"}</h1>

              <p className={styles.companyName}>
                {job.sectorName || "Career opportunity"}
              </p>
            </div>
          </div>

          <div className={styles.detailsContent}>
            <div className={styles.detailsFacts}>
              <div>
                <span>Location</span>
                <strong>{job.locationName || "Not specified"}</strong>
              </div>

              <div>
                <span>Salary</span>
                <strong>{formatSalary(job)}</strong>
              </div>

              <div>
                <span>Job type</span>
                <strong>{job.jobTypeName || "Not specified"}</strong>
              </div>

              <div>
                <span>Openings</span>
                <strong>{job.openings ?? "Not specified"}</strong>
              </div>

              <div>
                <span>Education</span>
                <strong>{job.educationName || "Not specified"}</strong>
              </div>

              <div>
                <span>Role</span>
                <strong>{job.jobRoleName || "Not specified"}</strong>
              </div>
            </div>


            <section className={styles.detailSection}>
              <h2>Required Skills</h2>
              <p className={styles.description}>
                {job.skill || "Not specified"}
              </p>
            </section>

            <section className={styles.detailSection}>
              <h2>Sector</h2>
              <p className={styles.description}>
                {job.sectorName || "Not specified"}
              </p>
            </section>

            <section className={styles.detailSection}>
              <h2>About the Job</h2>
              <p className={styles.description}>
                {job.description || "No job description has been provided."}
              </p>
            </section>

            <JobApplicationForm jobId={job.id ?? jobId} />
          </div>
        </article>

        {/* RIGHT: RELATED JOBS */}
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
                    {relatedJob.sectorName || "Career opportunity"}
                  </p>

                  <span>
                    {relatedJob.locationName || "Location not specified"}
                  </span>

                  <span>
                    {formatSalary(relatedJob)}
                  </span>

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
    setApplication((previous) => ({ ...previous, [name]: value }));
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
      <p>Interested in this opportunity? Send your application now.</p>

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
            <p>Enter your details and upload your resume to apply.</p>

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
