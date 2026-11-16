import { cache } from "react";
import { getAllBlogs, getBlogById } from "../../services/api";
import JsonLd from "../../components/JsonLd";
import { BlogDataProvider } from "./BlogDataProvider";
import {
  createBreadcrumbSchema,
  organizationId,
  SITE_URL,
} from "../../structured-data";
import {
  brandedMetadataTitle,
  canonicalMetadata,
  cleanMetadataText,
  isInternalIdentifier,
  humanizeSlug,
  safeMetadataTitle,
} from "../../seo-utils";

function unwrapBlogs(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.content)) return response.content;
  if (Array.isArray(response?.blogs)) return response.blogs;
  return [];
}

function getBlogSlug(blog) {
  return (
    blog.slug ||
    blog.blogSlug ||
    String(blog.title || blog.name || blog.blogTitle || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

const blogSummaryFields = [
  "id",
  "blogId",
  "_id",
  "slug",
  "blogSlug",
  "title",
  "name",
  "blogTitle",
  "image",
  "imageUrl",
  "blogImage",
  "thumbnail",
  "thumbnailUrl",
  "date",
  "createdAt",
  "createdDate",
  "publishDate",
  "publishedDate",
  "category",
  "blogCategory",
  "categoryName",
  "type",
];

function getBlogSummaries(blogs) {
  return blogs.map((blog) =>
    Object.fromEntries(
      blogSummaryFields
        .filter((field) => blog[field] !== undefined)
        .map((field) => [field, blog[field]])
    )
  );
}

const loadBlogRecord = cache(async (currentSlug) => {
  try {
    const blogs = unwrapBlogs(await getAllBlogs());
    const blog = blogs.find((item) => getBlogSlug(item) === currentSlug);
    const blogId = blog?.id || blog?.blogId || blog?._id;

    if (!blog || !blogId) {
      return null;
    }

    const details = await getBlogById(blogId);

    return {
      blog,
      blogs: getBlogSummaries(blogs),
      data: details?.data || details || blog,
    };
  } catch (error) {
    console.error("Failed to load blog structured data:", error);
    return null;
  }
});

function getBlogTitle(blog, data, fallbackTitle) {
  return safeMetadataTitle(
    data?.title ||
      data?.name ||
      data?.blogTitle ||
      blog?.title ||
      blog?.name ||
      blog?.blogTitle,
    fallbackTitle
  );
}

function getBlogDescription(blog, data) {
  return cleanMetadataText(
    data?.metaDescription ||
      data?.description ||
      data?.blogDescription ||
      data?.content ||
      blog?.metaDescription ||
      blog?.description ||
      blog?.blogDescription ||
      blog?.content
  );
}

function getDate(value) {
  if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Date)) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function getAbsoluteImage(value) {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }

  try {
    const image = new URL(value, SITE_URL);
    return ["http:", "https:"].includes(image.protocol)
      ? image.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

function getAuthor(value) {
  const name =
    typeof value === "string"
      ? value.trim()
      : typeof value?.name === "string"
        ? value.name.trim()
        : "";

  return name ? { "@type": "Person", name } : undefined;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const currentSlug = Array.isArray(slug) ? slug[0] : slug;
  const fallbackTitle = isInternalIdentifier(currentSlug)
    ? "Study Abroad Blog Article"
    : humanizeSlug(currentSlug) || "Study Abroad Blog Article";
  const fallbackDescription =
    "Read this Wayabroad article for practical information to support your study abroad research, university application planning and international education decisions.";
  const record = await loadBlogRecord(currentSlug);

  if (!record) {
    return {
      ...canonicalMetadata(`/blog/${encodeURIComponent(currentSlug || "")}`),
      title: brandedMetadataTitle(fallbackTitle),
      description: fallbackDescription,
    };
  }

  const title = getBlogTitle(record.blog, record.data, fallbackTitle);
  const description =
    getBlogDescription(record.blog, record.data) || fallbackDescription;

  return {
    ...canonicalMetadata(`/blog/${encodeURIComponent(currentSlug || "")}`),
    title: brandedMetadataTitle(title),
    description,
  };
}

export default async function Layout({ children, params }) {
  const { slug } = await params;
  const currentSlug = Array.isArray(slug) ? slug[0] : slug;
  const record = await loadBlogRecord(currentSlug);

  if (!record) {
    return children;
  }

  const blogData = {
    slug: currentSlug,
    blogs: record.blogs,
    blog: record.data,
  };
  const fallbackTitle = isInternalIdentifier(currentSlug)
    ? "Study Abroad Blog Article"
    : humanizeSlug(currentSlug) || "Study Abroad Blog Article";
  const rawTitle =
    record.data?.title ||
    record.data?.name ||
    record.data?.blogTitle ||
    record.blog?.title ||
    record.blog?.name ||
    record.blog?.blogTitle;

  if (
    typeof rawTitle !== "string" ||
    !rawTitle.trim() ||
    /^untitled blog$/i.test(rawTitle.trim()) ||
    isInternalIdentifier(rawTitle)
  ) {
    return (
      <BlogDataProvider value={blogData}>
        {children}
      </BlogDataProvider>
    );
  }

  const title = getBlogTitle(record.blog, record.data, fallbackTitle);
  const canonical = `${SITE_URL}/blog/${encodeURIComponent(currentSlug)}`;
  const publishedAt =
    record.data?.date ||
    record.data?.createdAt ||
    record.data?.createdDate ||
    record.data?.publishDate ||
    record.data?.publishedDate ||
    record.blog?.date ||
    record.blog?.createdAt ||
    record.blog?.createdDate ||
    record.blog?.publishDate ||
    record.blog?.publishedDate;
  const modifiedAt =
    record.data?.updatedAt ||
    record.data?.modifiedAt ||
    record.data?.lastModified;
  const image = getAbsoluteImage(
    record.data?.image ||
      record.data?.imageUrl ||
      record.data?.blogImage ||
      record.data?.thumbnail ||
      record.data?.thumbnailUrl ||
      record.blog?.image ||
      record.blog?.imageUrl ||
      record.blog?.blogImage ||
      record.blog?.thumbnail ||
      record.blog?.thumbnailUrl
  );
  const author = getAuthor(
    record.data?.author ||
      record.data?.authorName ||
      record.blog?.author ||
      record.blog?.authorName
  );
  const description = getBlogDescription(record.blog, record.data);
  const datePublished = getDate(publishedAt);
  const dateModified = getDate(modifiedAt);
  const articleSection = [
    record.data?.category,
    record.data?.blogCategory,
    record.data?.categoryName,
    record.blog?.category,
  ].find((value) => typeof value === "string" && value.trim());
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: title,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    url: canonical,
    publisher: { "@id": organizationId },
    ...(description ? { description } : {}),
    ...(image ? { image: [image] } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(author ? { author } : {}),
    ...(articleSection ? { articleSection } : {}),
  };
  const breadcrumbs = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: title, path: `/blog/${encodeURIComponent(currentSlug)}` },
  ]);

  return (
    <BlogDataProvider value={blogData}>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={article} />
      {children}
    </BlogDataProvider>
  );
}
