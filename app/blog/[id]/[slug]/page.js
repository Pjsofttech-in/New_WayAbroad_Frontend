"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getBlogById } from "../../../services/api";
import styles from "../../BlogById.module.css";

export default function Blog() {
  const params = useParams();
  const id = params?.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching blog ID:", id);

        const data = await getBlogById(id);

        console.log("Single Blog API response:", data);

        /*
          Sometimes the backend returns the blog directly:

          {
            id: 1,
            title: "...",
            content: "..."
          }

          Sometimes it can return:

          {
            data: {
              id: 1,
              title: "...",
              content: "..."
            }
          }

          This handles both.
        */
        const blogData = data?.data || data;

        setBlog(blogData);
      } catch (err) {
        console.error("Error fetching blog:", err);

        setError(
          err?.message ||
            "Failed to load this blog. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  /*
    Get the actual blog content.

    Different backend versions can use different field names.
  */
  const getBlogContent = () => {
    if (!blog) {
      return "";
    }

    return (
      blog.content ||
      blog.blogContent ||
      blog.description ||
      blog.blogDescription ||
      blog.details ||
      blog.blogDetails ||
      ""
    );
  };

  /*
    The backend content may contain HTML such as:

    <p>Hello</p>
    <strong>Bold text</strong>
    <h2>Heading</h2>

    Normally we can render it directly.

    If the backend has escaped the HTML:

    &lt;p&gt;Hello&lt;/p&gt;

    we decode it first.
  */
  const prepareHtmlContent = (content) => {
    if (!content) {
      return "";
    }

    let html = String(content);

    /*
      If the content already contains real HTML tags,
      leave it as it is.
    */
    const hasRealHtmlTags = /<\s*[a-z][^>]*>/i.test(html);

    if (hasRealHtmlTags) {
      return html;
    }

    /*
      If the backend returned escaped HTML such as
      &lt;p&gt;Hello&lt;/p&gt;, decode it.
    */
    if (
      html.includes("&lt;") ||
      html.includes("&gt;") ||
      html.includes("&amp;")
    ) {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = html;
      return textarea.value;
    }

    return html;
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading blog...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          {error}
        </p>

        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          Blog not found.
        </p>
      </div>
    );
  }

  const blogContent = getBlogContent();
  const htmlContent = prepareHtmlContent(blogContent);

  return (
    <section className={styles.blogSection}>
      {/* =========================
          BLOG TITLE
      ========================== */}
      <h1 className={styles.blogTitle}>
        {blog.title || blog.name || "Untitled Blog"}
      </h1>

      {/* =========================
          BLOG IMAGE
      ========================== */}
      {blog.image && (
        <div className={styles.blogImageContainer}>
          <img
            src={blog.image}
            alt={
              blog.title ||
              blog.name ||
              "Blog"
            }
            className={styles.blogImage}
            onError={(e) => {
              e.currentTarget.style.display =
                "none";
            }}
          />
        </div>
      )}

      {/* =========================
          BLOG CONTENT
      ========================== */}
      {htmlContent ? (
        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{
            __html: htmlContent,
          }}
        />
      ) : (
        <div className={styles.noContent}>
          <p>
            No blog content available.
          </p>
        </div>
      )}
    </section>
  );
}