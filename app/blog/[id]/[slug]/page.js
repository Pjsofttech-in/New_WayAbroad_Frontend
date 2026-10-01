// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// import { getBlogById } from "../../../services/api";
// import styles from "../../BlogById.module.css";

// export default function Blog() {
//   const params = useParams();
//   const id = params?.id;

//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!id) return;

//     const fetchBlog = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         console.log("Fetching blog ID:", id);

//         const data = await getBlogById(id);

//         console.log("Single Blog API response:", data);

//         /*
//           Sometimes the backend returns the blog directly:

//           {
//             id: 1,
//             title: "...",
//             content: "..."
//           }

//           Sometimes it can return:

//           {
//             data: {
//               id: 1,
//               title: "...",
//               content: "..."
//             }
//           }

//           This handles both.
//         */
//         const blogData = data?.data || data;

//         setBlog(blogData);
//       } catch (err) {
//         console.error("Error fetching blog:", err);

//         setError(
//           err?.message ||
//             "Failed to load this blog. Please try again later."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   /*
//     Get the actual blog content.

//     Different backend versions can use different field names.
//   */
//   const getBlogContent = () => {
//     if (!blog) {
//       return "";
//     }

//     return (
//       blog.content ||
//       blog.blogContent ||
//       blog.description ||
//       blog.blogDescription ||
//       blog.details ||
//       blog.blogDetails ||
//       ""
//     );
//   };

//   /*
//     The backend content may contain HTML such as:

//     <p>Hello</p>
//     <strong>Bold text</strong>
//     <h2>Heading</h2>

//     Normally we can render it directly.

//     If the backend has escaped the HTML:

//     &lt;p&gt;Hello&lt;/p&gt;

//     we decode it first.
//   */
//   const prepareHtmlContent = (content) => {
//     if (!content) {
//       return "";
//     }

//     let html = String(content);

//     /*
//       If the content already contains real HTML tags,
//       leave it as it is.
//     */
//     const hasRealHtmlTags = /<\s*[a-z][^>]*>/i.test(html);

//     if (hasRealHtmlTags) {
//       return html;
//     }

//     /*
//       If the backend returned escaped HTML such as
//       &lt;p&gt;Hello&lt;/p&gt;, decode it.
//     */
//     if (
//       html.includes("&lt;") ||
//       html.includes("&gt;") ||
//       html.includes("&amp;")
//     ) {
//       const textarea = document.createElement("textarea");
//       textarea.innerHTML = html;
//       return textarea.value;
//     }

//     return html;
//   };

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         Loading blog...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <p className={styles.errorMessage}>
//           {error}
//         </p>

//         <button
//           className={styles.retryButton}
//           onClick={() => window.location.reload()}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className={styles.errorContainer}>
//         <p className={styles.errorMessage}>
//           Blog not found.
//         </p>
//       </div>
//     );
//   }

//   const blogContent = getBlogContent();
//   const htmlContent = prepareHtmlContent(blogContent);

//   return (
//     <section className={styles.blogSection}>
//       {/* =========================
//           BLOG TITLE
//       ========================== */}
//       <h1 className={styles.blogTitle}>
//         {blog.title || blog.name || "Untitled Blog"}
//       </h1>

//       {/* =========================
//           BLOG IMAGE
//       ========================== */}
//       {blog.image && (
//         <div className={styles.blogImageContainer}>
//           <img
//             src={blog.image}
//             alt={
//               blog.title ||
//               blog.name ||
//               "Blog"
//             }
//             className={styles.blogImage}
//             onError={(e) => {
//               e.currentTarget.style.display =
//                 "none";
//             }}
//           />
//         </div>
//       )}

//       {/* =========================
//           BLOG CONTENT
//       ========================== */}
//       {htmlContent ? (
//         <div
//           className={styles.blogContent}
//           dangerouslySetInnerHTML={{
//             __html: htmlContent,
//           }}
//         />
//       ) : (
//         <div className={styles.noContent}>
//           <p>
//             No blog content available.
//           </p>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getBlogById,
  getAllBlogs,
} from "../../../services/api";

import styles from "../../BlogById.module.css";

export default function Blog() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);

  const [error, setError] = useState("");

  /*
  ============================================================
  FETCH CURRENT BLOG + ALL BLOGS
  ============================================================
  */

  useEffect(() => {
    if (!id) return;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setSidebarLoading(true);
        setError("");

        console.log("Fetching blog ID:", id);

        /*
        --------------------------------------------------------
        CURRENT BLOG
        --------------------------------------------------------
        */

        const data = await getBlogById(id);

        console.log("Single Blog API response:", data);

        /*
        Backend may return:

        {
          id: 1,
          title: "...",
          content: "..."
        }

        OR:

        {
          data: {
            id: 1,
            title: "...",
            content: "..."
          }
        }
        */

        const blogData = data?.data || data;

        setBlog(blogData);

        /*
        --------------------------------------------------------
        ALL BLOGS
        --------------------------------------------------------
        */

        try {
          const blogsResponse = await getAllBlogs();

          console.log(
            "All Blogs API response:",
            blogsResponse
          );

          /*
          Handle different possible backend responses.
          */

          let blogs = [];

          if (Array.isArray(blogsResponse)) {
            blogs = blogsResponse;
          } else if (
            Array.isArray(blogsResponse?.data)
          ) {
            blogs = blogsResponse.data;
          } else if (
            Array.isArray(blogsResponse?.content)
          ) {
            blogs = blogsResponse.content;
          } else if (
            Array.isArray(blogsResponse?.blogs)
          ) {
            blogs = blogsResponse.blogs;
          }

          setAllBlogs(blogs);
        } catch (sidebarError) {
          /*
          Sidebar failure should NOT break
          the main blog page.
          */

          console.error(
            "Error fetching all blogs:",
            sidebarError
          );

          setAllBlogs([]);
        }
      } catch (err) {
        console.error(
          "Error fetching blog:",
          err
        );

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
  }, [id]);

  /*
  ============================================================
  GET BLOG CONTENT
  ============================================================
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
  ============================================================
  PREPARE HTML CONTENT
  ============================================================
  */

  const prepareHtmlContent = (content) => {
    if (!content) {
      return "";
    }

    let html = String(content);

    /*
    If actual HTML tags already exist,
    use them directly.
    */

    const hasRealHtmlTags =
      /<\s*[a-z][^>]*>/i.test(html);

    if (hasRealHtmlTags) {
      return html;
    }

    /*
    Decode escaped HTML.

    Example:

    &lt;p&gt;Hello&lt;/p&gt;

    becomes:

    <p>Hello</p>
    */

    if (
      html.includes("&lt;") ||
      html.includes("&gt;") ||
      html.includes("&amp;")
    ) {
      const textarea =
        document.createElement("textarea");

      textarea.innerHTML = html;

      return textarea.value;
    }

    return html;
  };

  /*
  ============================================================
  GET BLOG IMAGE
  ============================================================
  */

  const getBlogImage = (item) => {
    if (!item) {
      return "";
    }

    return (
      item.image ||
      item.imageUrl ||
      item.blogImage ||
      item.thumbnail ||
      item.thumbnailUrl ||
      ""
    );
  };

  /*
  ============================================================
  GET BLOG ID
  ============================================================
  */

  const getBlogId = (item) => {
    if (!item) {
      return "";
    }

    return (
      item.id ||
      item.blogId ||
      item._id ||
      ""
    );
  };

  /*
  ============================================================
  GET BLOG TITLE
  ============================================================
  */

  const getBlogTitle = (item) => {
    if (!item) {
      return "Untitled Blog";
    }

    return (
      item.title ||
      item.name ||
      item.blogTitle ||
      "Untitled Blog"
    );
  };

  /*
  ============================================================
  GET BLOG DATE
  ============================================================
  */

  const getBlogDate = (item) => {
    if (!item) {
      return "";
    }

    return (
      item.date ||
      item.createdAt ||
      item.createdDate ||
      item.publishDate ||
      item.publishedDate ||
      ""
    );
  };

  /*
  ============================================================
  FORMAT DATE
  ============================================================
  */

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    try {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        return String(date);
      }

      return parsedDate.toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );
    } catch {
      return String(date);
    }
  };

  /*
  ============================================================
  GET CATEGORY
  ============================================================
  */

  const getBlogCategory = (item) => {
    if (!item) {
      return "";
    }

    return (
      item.category ||
      item.blogCategory ||
      item.categoryName ||
      item.type ||
      ""
    );
  };

  /*
  ============================================================
  FILTER CURRENT BLOG
  ============================================================
  */

  const otherBlogs = allBlogs.filter((item) => {
    const currentId = String(id);

    const itemId = String(
      getBlogId(item)
    );

    return (
      itemId &&
      itemId !== currentId
    );
  });

  /*
  ============================================================
  RELATED BLOGS
  ============================================================

  First try to find blogs from the same category.

  If there are not enough category matches,
  fill the remaining spaces with other blogs.
  */

  const currentCategory =
    getBlogCategory(blog);

  const relatedByCategory =
    currentCategory
      ? otherBlogs.filter((item) => {
          return (
            String(
              getBlogCategory(item)
            ).toLowerCase() ===
            String(currentCategory).toLowerCase()
          );
        })
      : [];

  const relatedBlogs = [
    ...relatedByCategory,
    ...otherBlogs.filter(
      (item) =>
        !relatedByCategory.includes(item)
    ),
  ].slice(0, 4);

  /*
  ============================================================
  SUGGESTIONS
  ============================================================

  New/latest blogs.

  We use the first blogs that are not
  already being shown as related.
  */

  const suggestionBlogs = otherBlogs
    .filter(
      (item) =>
        !relatedBlogs.includes(item)
    )
    .slice(0, 4);

  /*
  ============================================================
  LOADING
  ============================================================
  */

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>

        <p>Loading blog...</p>
      </div>
    );
  }

  /*
  ============================================================
  ERROR
  ============================================================
  */

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          {error}
        </p>

        <button
          className={styles.retryButton}
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>
      </div>
    );
  }

  /*
  ============================================================
  BLOG NOT FOUND
  ============================================================
  */

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

  const htmlContent =
    prepareHtmlContent(blogContent);

  const mainImage = getBlogImage(blog);

  const title = getBlogTitle(blog);

  const category =
    getBlogCategory(blog);

  const date = formatDate(
    getBlogDate(blog)
  );

  /*
  ============================================================
  RENDER
  ============================================================
  */

  return (
    <section className={styles.blogPage}>
      <div className={styles.blogLayout}>

        {/* ==================================================
            LEFT SIDE - MAIN BLOG
        ================================================== */}

        <main className={styles.blogMain}>

          {/* Breadcrumb */}
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
              onClick={() =>
                router.push("/blog")
              }
              className={styles.breadcrumbLink}
            >
              Blog
            </span>

            <span className={styles.breadcrumbArrow}>
              ›
            </span>

            <span className={styles.breadcrumbCurrent}>
              {title}
            </span>
          </div>

          {/* Category */}
          {category && (
            <div className={styles.categoryBadge}>
              {category}
            </div>
          )}

          {/* Title */}
          <h1 className={styles.blogTitle}>
            {title}
          </h1>

          {/* Meta Information */}
          <div className={styles.blogMeta}>

            {date && (
              <span className={styles.metaItem}>
                <span className={styles.metaIcon}>
                  📅
                </span>

                {date}
              </span>
            )}

            <span className={styles.metaSeparator}>
              |
            </span>

            <span className={styles.metaItem}>
              <span className={styles.metaIcon}>
                👤
              </span>

              WayAbroad Team
            </span>

            <span className={styles.metaSeparator}>
              |
            </span>

            <span className={styles.metaItem}>
              <span className={styles.metaIcon}>
                ◷
              </span>

              8 min read
            </span>

          </div>

          {/* Main Image */}
          {mainImage && (
            <div
              className={
                styles.blogImageContainer
              }
            >
              <img
                src={mainImage}
                alt={title}
                className={styles.blogImage}
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            </div>
          )}

          {/* Blog Content */}
          {htmlContent ? (
            <article
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

        </main>

        {/* ==================================================
            RIGHT SIDE - SIDEBAR
        ================================================== */}

        <aside
          className={styles.blogSidebar}
        >

          {/* =================================================
              NEW BLOG SUGGESTIONS
          ================================================= */}

          <section
            className={`${styles.sidebarBox} ${styles.suggestionsBox}`}
          >

            <div className={styles.sidebarHeader}>

              <div className={styles.sidebarTitleWrapper}>

                <span
                  className={
                    styles.sidebarIcon
                  }
                >
                  💡
                </span>

                <h2>
                  Suggestions for New Blogs
                </h2>

              </div>

              <button
                className={
                  styles.viewAllButton
                }
                onClick={() =>
                  router.push("/blog")
                }
              >
                View All
                <span>→</span>
              </button>

            </div>

            {sidebarLoading ? (
              <div
                className={
                  styles.sidebarLoading
                }
              >
                Loading...
              </div>
            ) : suggestionBlogs.length > 0 ? (
              <div
                className={
                  styles.sidebarBlogList
                }
              >
                {suggestionBlogs.map(
                  (item, index) => (
                    <div
                      key={
                        getBlogId(item) ||
                        `suggestion-${index}`
                      }
                      className={
                        styles.sidebarBlogCard
                      }
                      onClick={() =>
                        router.push(
                          `/blog/${getBlogId(
                            item
                          )}`
                        )
                      }
                    >

                      <div
                        className={
                          styles.sidebarImageWrapper
                        }
                      >
                        {getBlogImage(
                          item
                        ) ? (
                          <img
                            src={getBlogImage(
                              item
                            )}
                            alt={getBlogTitle(
                              item
                            )}
                            className={
                              styles.sidebarImage
                            }
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div
                            className={
                              styles.sidebarImagePlaceholder
                            }
                          >
                            📚
                          </div>
                        )}
                      </div>

                      <div
                        className={
                          styles.sidebarBlogInfo
                        }
                      >

                        <h3>
                          {getBlogTitle(
                            item
                          )}
                        </h3>

                        {getBlogDate(
                          item
                        ) && (
                          <span
                            className={
                              styles.sidebarDate
                            }
                          >
                            📅{" "}
                            {formatDate(
                              getBlogDate(
                                item
                              )
                            )}
                          </span>
                        )}

                      </div>

                    </div>
                  )
                )}
              </div>
            ) : (
              <div
                className={
                  styles.emptySidebar
                }
              >
                No new blogs available.
              </div>
            )}

          </section>

          {/* =================================================
              RELATED BLOGS
          ================================================= */}

          <section
            className={`${styles.sidebarBox} ${styles.relatedBox}`}
          >

            <div className={styles.sidebarHeader}>

              <div className={styles.sidebarTitleWrapper}>

                <span
                  className={
                    styles.sidebarIcon
                  }
                >
                  📖
                </span>

                <h2>
                  Related Blogs
                </h2>

              </div>

              <button
                className={
                  styles.viewAllButton
                }
                onClick={() =>
                  router.push("/blog")
                }
              >
                View All
                <span>→</span>
              </button>

            </div>

            {sidebarLoading ? (
              <div
                className={
                  styles.sidebarLoading
                }
              >
                Loading...
              </div>
            ) : relatedBlogs.length > 0 ? (
              <div
                className={
                  styles.sidebarBlogList
                }
              >
                {relatedBlogs.map(
                  (item, index) => (
                    <div
                      key={
                        getBlogId(item) ||
                        `related-${index}`
                      }
                      className={
                        styles.sidebarBlogCard
                      }
                      onClick={() =>
                        router.push(
                          `/blog/${getBlogId(
                            item
                          )}`
                        )
                      }
                    >

                      <div
                        className={
                          styles.sidebarImageWrapper
                        }
                      >
                        {getBlogImage(
                          item
                        ) ? (
                          <img
                            src={getBlogImage(
                              item
                            )}
                            alt={getBlogTitle(
                              item
                            )}
                            className={
                              styles.sidebarImage
                            }
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div
                            className={
                              styles.sidebarImagePlaceholder
                            }
                          >
                            📖
                          </div>
                        )}
                      </div>

                      <div
                        className={
                          styles.sidebarBlogInfo
                        }
                      >

                        <h3>
                          {getBlogTitle(
                            item
                          )}
                        </h3>

                        {getBlogDate(
                          item
                        ) && (
                          <span
                            className={
                              styles.sidebarDate
                            }
                          >
                            📅{" "}
                            {formatDate(
                              getBlogDate(
                                item
                              )
                            )}
                          </span>
                        )}

                      </div>

                    </div>
                  )
                )}
              </div>
            ) : (
              <div
                className={
                  styles.emptySidebar
                }
              >
                No related blogs available.
              </div>
            )}

          </section>

        </aside>

      </div>
    </section>
  );
}