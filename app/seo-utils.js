export function cleanMetadataText(value, maxLength = 160) {
  const text = String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

  if (!text || /^(undefined|null|n\/a|none)$/i.test(text)) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  const shortened = text.slice(0, maxLength - 3);
  const lastSpace = shortened.lastIndexOf(" ");
  const readable = lastSpace > maxLength * 0.7
    ? shortened.slice(0, lastSpace)
    : shortened;

  return `${readable.trimEnd()}...`;
}

export function humanizeSlug(value) {
  return String(value ?? "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function isInternalIdentifier(value) {
  const text = String(value ?? "").trim();

  return (
    !text ||
    /^(undefined|null|n\/a|none)$/i.test(text) ||
    /^\d+$/.test(text) ||
    /^[\da-f]{24}$/i.test(text) ||
    /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(text)
  );
}

export function safeMetadataTitle(value, fallback) {
  const title = cleanMetadataText(value, 120);

  return isInternalIdentifier(title) ? fallback : title;
}

export function brandedMetadataTitle(value) {
  const title = String(value ?? "")
    .replace(/\s*\|\s*Wayabroad$/i, "")
    .trim();

  if (!title || /^(undefined|null|n\/a|none)$/i.test(title)) {
    return {
      absolute: "Study Abroad Information | Wayabroad",
    };
  }

  return {
    absolute: `${title} | Wayabroad`,
  };
}

export function canonicalUrl(pathname) {
  const path = String(pathname ?? "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, "https://www.wayabroad.in").toString();
}

export function canonicalMetadata(pathname) {
  return {
    alternates: {
      canonical: canonicalUrl(pathname),
    },
  };
}
