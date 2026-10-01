"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getAllBlogs } from "../services/api";

import styles from "./Blog.module.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 12;

  /* ========================================
     CREATE BLOG SLUG
  ======================================== */

  const slugify = (text) => {
    return text
      ?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  /* ========================================
     GET ALL BLOGS
  ======================================== */

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllBlogs();

        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error(
          "Error fetching blogs:",
          err
        );

        setError(
          err.message ||
            "Failed to load blogs."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  /* ========================================
     PAGINATION
  ======================================== */

  const totalPages = Math.ceil(
    blogs.length / blogsPerPage
  );

  const startIndex =
    (currentPage - 1) * blogsPerPage;

  const currentBlogs = blogs.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  /* ========================================
     CHANGE PAGE
  ======================================== */

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ========================================
     LOADING
  ======================================== */

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading blogs...
      </div>
    );
  }

  /* ========================================
     ERROR
  ======================================== */

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          {error}
        </p>
      </div>
    );
  }

  /* ========================================
     NO BLOGS
  ======================================== */

  if (blogs.length === 0) {
    return (
      <div className={styles.loading}>
        No blogs found.
      </div>
    );
  }

  /* ========================================
     BLOG LIST
  ======================================== */

  return (
    <section className={styles.blogSection}>

      {/* ================================
          PAGE TITLE
      ================================= */}

      <div className={styles.blogTitle}>
        <h1>Blogs</h1>
        <p>
          Explore our latest articles,
          guides and updates.
        </p>
      </div>

      {/* ================================
          BLOG GRID
      ================================= */}

      <div className={styles.blogGrid}>

        {currentBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}/${slugify(
              blog.title
            )}`}
            className={styles.blogCard}
          >

            {/* BLOG IMAGE */}

            {blog.image && (
              <div className={styles.blogImageWrapper}>
                <img
                  src={blog.image}
                  alt={
                    blog.title ||
                    "Blog"
                  }
                  className={styles.blogImage}
                />
              </div>
            )}

            {/* BLOG CONTENT */}

            <div className={styles.blogCaption}>
              <h2>
                {blog.title ||
                  "Untitled Blog"}
              </h2>

              {blog.description && (
                <p>
                  {blog.description
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 120)}
                  {blog.description.length > 120
                    ? "..."
                    : ""}
                </p>
              )}
            </div>

          </Link>
        ))}

      </div>

      {/* ================================
          PAGINATION
      ================================= */}

      {totalPages > 1 && (
        <div className={styles.pagination}>

          {/* PREVIOUS */}

          <button
            type="button"
            onClick={() =>
              handlePageChange(
                currentPage - 1
              )
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* PAGE NUMBERS */}

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() =>
                handlePageChange(page)
              }
              className={
                currentPage === page
                  ? styles.activePage
                  : ""
              }
            >
              {page}
            </button>
          ))}

          {/* NEXT */}

          <button
            type="button"
            onClick={() =>
              handlePageChange(
                currentPage + 1
              )
            }
            disabled={
              currentPage === totalPages
            }
          >
            Next
          </button>

        </div>
      )}

    </section>
  );
}