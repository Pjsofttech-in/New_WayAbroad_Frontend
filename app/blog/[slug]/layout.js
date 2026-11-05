import { getAllBlogs, getBlogById } from "../../services/api";
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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const currentSlug = Array.isArray(slug) ? slug[0] : slug;
  const fallbackTitle = isInternalIdentifier(currentSlug)
    ? "Study Abroad Blog Article"
    : humanizeSlug(currentSlug) || "Study Abroad Blog Article";
  const fallbackDescription = cleanMetadataText(
    `Read this Wayabroad article for practical information to support your study abroad research, university application planning and international education decisions.`
  );

  try {
    const blogs = unwrapBlogs(await getAllBlogs());
    const blog = blogs.find((item) => getBlogSlug(item) === currentSlug);

    if (!blog) {
      return {
        ...canonicalMetadata(`/blog/${encodeURIComponent(currentSlug || "")}`),
        title: brandedMetadataTitle(fallbackTitle),
        description: fallbackDescription,
      };
    }

    const blogId = blog.id || blog.blogId || blog._id;
    const details = blogId ? await getBlogById(blogId) : blog;
    const data = details?.data || details || blog;
    const title = safeMetadataTitle(
      data.title || data.name || data.blogTitle ||
        blog.title || blog.name || blog.blogTitle,
      fallbackTitle
    );
    const description = cleanMetadataText(
      data.metaDescription ||
        data.description ||
        data.blogDescription ||
        data.content ||
        blog.metaDescription ||
        blog.description ||
        blog.blogDescription ||
        blog.content
    );

    return {
      ...canonicalMetadata(`/blog/${encodeURIComponent(currentSlug || "")}`),
      title: brandedMetadataTitle(title),
      description: description || fallbackDescription,
    };
  } catch (error) {
    console.error("Failed to generate blog metadata:", error);
    return {
      ...canonicalMetadata(`/blog/${encodeURIComponent(currentSlug || "")}`),
      title: brandedMetadataTitle(fallbackTitle),
      description: fallbackDescription,
    };
  }
}

export default function Layout({ children }) {
  return children;
}
