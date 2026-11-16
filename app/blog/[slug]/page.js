
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getBlogById,
  getAllBlogs,
} from "../../services/api";
import { useBlogData } from "./BlogDataProvider";

import styles from "../BlogById.module.css";

/* ============================================================
   GENERATE SEO-FRIENDLY SLUG
============================================================ */

const generateSlug = (title) => {
  if (!title) return "";

  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/* ============================================================
   BLOG DETAIL COMPONENT
============================================================ */

export default function Blog() {
  const params = useParams();
  const router = useRouter();
  const initialBlogData = useBlogData();

  // New URL: /blog/study-abroad-guide
  const slug = params?.slug;

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);

  const [error, setError] = useState("");

  /* ============================================================
     FETCH CURRENT BLOG USING SLUG
  ============================================================ */

  useEffect(() => {
    if (!slug) return;

    const currentSlug = Array.isArray(slug)
      ? slug[0]
      : slug;

    if (initialBlogData?.slug === currentSlug) {
      setAllBlogs(initialBlogData.blogs || []);
      setBlog(initialBlogData.blog || null);
      setError("");
      setLoading(false);
      setSidebarLoading(false);
      return;
    }

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setSidebarLoading(true);
        setError("");

        /* ----------------------------------------
           FETCH ALL BLOGS
        ---------------------------------------- */

        const blogsResponse = await getAllBlogs();

        let blogs = [];

        if (Array.isArray(blogsResponse)) {
          blogs = blogsResponse;
        } else if (Array.isArray(blogsResponse?.data)) {
          blogs = blogsResponse.data;
        } else if (Array.isArray(blogsResponse?.content)) {
          blogs = blogsResponse.content;
        } else if (Array.isArray(blogsResponse?.blogs)) {
          blogs = blogsResponse.blogs;
        }

        setAllBlogs(blogs);

        /* ----------------------------------------
           FIND BLOG USING URL SLUG
        ---------------------------------------- */

        const matchedBlog = blogs.find((item) => {
          const itemSlug =
            item.slug ||
            item.blogSlug ||
            generateSlug(
              item.title ||
              item.name ||
              item.blogTitle
            );

          return itemSlug === currentSlug;
        });

        /* ----------------------------------------
           BLOG NOT FOUND
        ---------------------------------------- */

        if (!matchedBlog) {
          setBlog(null);
          setError("");
          return;
        }

        /* ----------------------------------------
           GET BLOG ID
        ---------------------------------------- */

        const blogId =
          matchedBlog.id ||
          matchedBlog.blogId ||
          matchedBlog._id;

        if (!blogId) {
          throw new Error(
            "Blog ID not found in API response."
          );
        }

        /* ----------------------------------------
           FETCH COMPLETE BLOG DETAILS
        ---------------------------------------- */

        const data = await getBlogById(blogId);

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
        setSidebarLoading(false);
      }
    };

    fetchBlogs();
  }, [slug, initialBlogData]);

  /* ============================================================
     GET BLOG CONTENT
  ============================================================ */

  const getBlogContent = () => {
    if (!blog) return "";

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

  /* ============================================================
     PREPARE HTML CONTENT
  ============================================================ */

  const prepareHtmlContent = (content) => {
    if (!content) return "";

    let html = String(content);

    // If actual HTML tags already exist, use them directly
    const hasRealHtmlTags = /<\s*[a-z][^>]*>/i.test(html);

    if (hasRealHtmlTags) {
      return html;
    }

    // Decode escaped HTML
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

  /* ============================================================
     REMOVE FIRST H1 FROM BLOG CONTENT
  ============================================================ */

  const removeFirstH1 = (html) => {
    if (!html) return "";

    const container = document.createElement("div");

    container.innerHTML = html;

    const firstH1 = container.querySelector("h1");

    if (firstH1) {
      firstH1.remove();
    }

    return container.innerHTML;
  };

  /* ============================================================
     GET BLOG IMAGE
  ============================================================ */

  const getBlogImage = (item) => {
    if (!item) return "";

    return (
      item.image ||
      item.imageUrl ||
      item.blogImage ||
      item.thumbnail ||
      item.thumbnailUrl ||
      ""
    );
  };

  /* ============================================================
     GET BLOG ID
  ============================================================ */

  const getBlogId = (item) => {
    if (!item) return "";

    return (
      item.id ||
      item.blogId ||
      item._id ||
      ""
    );
  };

  /* ============================================================
     GET BLOG SLUG
  ============================================================ */

  const getBlogSlug = (item) => {
    if (!item) return "";

    return (
      item.slug ||
      item.blogSlug ||
      generateSlug(
        item.title ||
        item.name ||
        item.blogTitle
      )
    );
  };

  /* ============================================================
     GET BLOG TITLE
  ============================================================ */

  const getBlogTitle = (item) => {
    if (!item) return "Untitled Blog";

    return (
      item.title ||
      item.name ||
      item.blogTitle ||
      "Untitled Blog"
    );
  };

  /* ============================================================
     GET BLOG DATE
  ============================================================ */

  const getBlogDate = (item) => {
    if (!item) return "";

    return (
      item.date ||
      item.createdAt ||
      item.createdDate ||
      item.publishDate ||
      item.publishedDate ||
      ""
    );
  };

  const getBlogAuthor = (item) => {
    const author = item?.author || item?.authorName;

    if (typeof author === "string") {
      return author.trim();
    }

    return typeof author?.name === "string"
      ? author.name.trim()
      : "";
  };

  /* ============================================================
     FORMAT DATE
  ============================================================ */

  const formatDate = (date) => {
    if (!date) return "";

    try {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        return String(date);
      }

      return parsedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return String(date);
    }
  };

  const getDateTime = (date) => {
    if (!date) return undefined;
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? undefined
      : parsedDate.toISOString();
  };

  /* ============================================================
     GET CATEGORY
  ============================================================ */

  const getBlogCategory = (item) => {
    if (!item) return "";

    return (
      item.category ||
      item.blogCategory ||
      item.categoryName ||
      item.type ||
      ""
    );
  };

  /* ============================================================
     FILTER CURRENT BLOG
  ============================================================ */

  const otherBlogs = allBlogs.filter((item) => {
    const currentId = String(getBlogId(blog));
    const itemId = String(getBlogId(item));

    return itemId && itemId !== currentId;
  });

  /* ============================================================
     RELATED BLOGS
  ============================================================ */

  const currentCategory = getBlogCategory(blog);

  const relatedByCategory = currentCategory
    ? otherBlogs.filter((item) => {
        return (
          String(getBlogCategory(item)).toLowerCase() ===
          String(currentCategory).toLowerCase()
        );
      })
    : [];

  const relatedBlogs = [
    ...relatedByCategory,
    ...otherBlogs.filter(
      (item) => !relatedByCategory.includes(item)
    ),
  ].slice(0, 4);

  /* ============================================================
     SUGGESTED BLOGS
  ============================================================ */

  const suggestionBlogs = otherBlogs
    .filter((item) => !relatedBlogs.includes(item))
    .slice(0, 6);

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>

        <p>Loading blog...</p>
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

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

  /* ============================================================
     BLOG NOT FOUND
  ============================================================ */

  if (!blog) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          Blog not found.
        </p>

        <button
          className={styles.retryButton}
          onClick={() => router.push("/blog")}
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  /* ============================================================
     BLOG DATA
  ============================================================ */

  const blogContent = getBlogContent();

  const preparedHtml = prepareHtmlContent(blogContent);

  // Remove the first H1 from API blog content
  const htmlContent = removeFirstH1(preparedHtml);

  const mainImage = getBlogImage(blog);

  const title = getBlogTitle(blog);

  const category = getBlogCategory(blog);

  const blogDate = getBlogDate(blog);
  const date = formatDate(blogDate);
  const dateTime = getDateTime(blogDate);
  const author = getBlogAuthor(blog);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <section className={styles.blogPage}>
      <div className={styles.blogLayout}>

        {/* ========================================
            LEFT SIDE - MAIN BLOG
        ======================================== */}

        <main className={styles.blogMain}>

          {/* BREADCRUMB */}

          <div className={styles.breadcrumb}>
            <span
              onClick={() => router.push("/")}
              className={styles.breadcrumbLink}
            >
              Home
            </span>

            <span className={styles.breadcrumbArrow}>
              ›
            </span>

            <span
              onClick={() => router.push("/blog")}
              className={styles.breadcrumbLink}
            >
              Blog
            </span>
          </div>

          {/* CATEGORY */}

          {category && (
            <div className={styles.categoryBadge}>
              {category}
            </div>
          )}

          {/* BLOG TITLE */}

          <h1 className={styles.blogTitle}>
            {title}
          </h1>

          {/* BLOG DATE */}

          {(date || author) && (
            <div className={styles.blogDate}>
              {date && (
                <time dateTime={dateTime}>
                  Published {date}
                </time>
              )}
              {author && (
                <span>
                  {date ? " · " : ""}
                  By {author}
                </span>
              )}
            </div>
          )}

          {/* MAIN IMAGE */}

          {mainImage && (
            <div className={styles.blogImageContainer}>
              <img
                src={mainImage}
                alt={title}
                className={styles.blogImage}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* BLOG CONTENT */}

          {htmlContent ? (
            <article
              className={styles.blogContent}
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
            />
          ) : (
            <div className={styles.noContent}>
              <p>No blog content available.</p>
            </div>
          )}

        </main>

        {/* ========================================
            RIGHT SIDE - SIDEBAR
        ======================================== */}

        <aside className={styles.blogSidebar}>

          {/* ========================================
              SUGGESTED BLOGS
          ======================================== */}

          <section
            className={`${styles.sidebarBox} ${styles.suggestionsBox}`}
          >
            <div className={styles.sidebarHeader}>
              <div className={styles.sidebarTitleWrapper}>
                <h2>Suggested blogs</h2>
              </div>

              <button
                className={styles.viewAllButton}
                onClick={() => router.push("/blog")}
              >
                View All
                <span>→</span>
              </button>
            </div>

            {sidebarLoading ? (
              <div className={styles.sidebarLoading}>
                Loading...
              </div>
            ) : suggestionBlogs.length > 0 ? (
              <div className={styles.sidebarBlogList}>
                {suggestionBlogs.map((item, index) => (
                  <div
                    key={
                      getBlogId(item) ||
                      `suggestion-${index}`
                    }
                    className={styles.sidebarBlogCard}
                    onClick={() =>
                      router.push(
                        `/blog/${getBlogSlug(item)}`
                      )
                    }
                  >
                    {/* IMAGE */}

                    <div className={styles.sidebarImageWrapper}>
                      {getBlogImage(item) ? (
                        <img
                          src={getBlogImage(item)}
                          alt={getBlogTitle(item)}
                          className={styles.sidebarImage}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div
                          className={styles.sidebarImagePlaceholder}
                        >
                          📚
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}

                    <div className={styles.sidebarBlogInfo}>
                      <h3>{getBlogTitle(item)}</h3>

                      {getBlogDate(item) && (
                        <span className={styles.sidebarDate}>
                          📅 {formatDate(getBlogDate(item))}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptySidebar}>
                No new blogs available.
              </div>
            )}
          </section>

          {/* ========================================
              RELATED BLOGS
          ======================================== */}

          <section
            className={`${styles.sidebarBox} ${styles.relatedBox}`}
          >
            <div className={styles.sidebarHeader}>
              <div className={styles.sidebarTitleWrapper}>
                <h2>Related Blogs</h2>
              </div>

              <button
                className={styles.viewAllButton}
                onClick={() => router.push("/blog")}
              >
                View All
                <span>→</span>
              </button>
            </div>

            {sidebarLoading ? (
              <div className={styles.sidebarLoading}>
                Loading...
              </div>
            ) : relatedBlogs.length > 0 ? (
              <div className={styles.sidebarBlogList}>
                {relatedBlogs.map((item, index) => (
                  <div
                    key={
                      getBlogId(item) ||
                      `related-${index}`
                    }
                    className={styles.sidebarBlogCard}
                    onClick={() =>
                      router.push(
                        `/blog/${getBlogSlug(item)}`
                      )
                    }
                  >
                    {/* IMAGE */}

                    <div className={styles.sidebarImageWrapper}>
                      {getBlogImage(item) ? (
                        <img
                          src={getBlogImage(item)}
                          alt={getBlogTitle(item)}
                          className={styles.sidebarImage}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div
                          className={styles.sidebarImagePlaceholder}
                        >
                          📖
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}

                    <div className={styles.sidebarBlogInfo}>
                      <h3>{getBlogTitle(item)}</h3>

                      {getBlogDate(item) && (
                        <span className={styles.sidebarDate}>
                          📅 {formatDate(getBlogDate(item))}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptySidebar}>
                No related blogs available.
              </div>
            )}
          </section>

        </aside>
      </div>
    </section>
  );
}
