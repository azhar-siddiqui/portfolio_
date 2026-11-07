import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const SITE_URL = DATA.url;
export const SITE_NAME = DATA.name;
export const SITE_LAST_MODIFIED = "2026-06-15";

const SKILL_KEYWORDS = Object.values(DATA.skills)
  .flat()
  .map((s) => s.name)
  .slice(0, 24);

export const DEFAULT_KEYWORDS = [
  DATA.name,
  DATA.alias,
  DATA.title,
  "Product Engineer",
  "Full Stack Developer",
  "Software Engineer",
  "React Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "Node.js Developer",
  "Portfolio",
  ...DATA.industries,
  ...SKILL_KEYWORDS,
];

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function ogImageUrl(path = "/opengraph-image"): string {
  return absoluteUrl(path);
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  authors?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = ogImageUrl(),
  ogType = "website",
  publishedTime,
  modifiedTime,
  tags,
  authors,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const mergedKeywords = [...new Set([...DEFAULT_KEYWORDS, ...keywords])];

  const openGraph = {
    title,
    description,
    url,
    siteName: SITE_NAME,
    locale: "en_US" as const,
    type: ogType,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    ...(ogType === "article" && publishedTime
      ? {
          publishedTime,
          ...(modifiedTime ? { modifiedTime } : {}),
          ...(tags?.length ? { tags } : {}),
        }
      : {}),
  } satisfies NonNullable<Metadata["openGraph"]>;

  return {
    title,
    description,
    keywords: mergedKeywords,
    authors: (authors ?? [DATA.name]).map((name) => ({
      name,
      url: SITE_URL,
    })),
    creator: DATA.name,
    publisher: DATA.name,
    applicationName: SITE_NAME,
    category: "technology",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/blog/rss.xml"),
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function buildRootMetadata(): Metadata {
  const title = `${DATA.name} — ${DATA.title}`;
  const description = `${DATA.tagline} ${DATA.description}`;

  const { title: _pageTitle, ...pageMetadata } = buildPageMetadata({
    title,
    description,
    path: "/",
    keywords: [
      "hire product engineer",
      "remote software engineer India",
      "React TypeScript developer",
      "CentLabs Pro",
      "frontend engineer India",
    ],
  });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${DATA.name}`,
    },
    description,
    ...pageMetadata,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
  };
}

// ── JSON-LD schema builders ────────────────────────────────────────────────

type JsonLd = Record<string, unknown>;

export function buildPersonSchema(): JsonLd {
  const [city] = DATA.location.split(",").map((s) => s.trim());

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: DATA.name,
    alternateName: [DATA.alias, `Sayyed ${DATA.alias}`],
    url: SITE_URL,
    email: DATA.contact.email,
    telephone: DATA.contact.tel,
    image: absoluteUrl(DATA.avatarUrl),
    description: DATA.description,
    jobTitle: DATA.title,
    alumniOf: DATA.education.map((edu) => ({
      "@type": "CollegeOrUniversity",
      name: edu.school,
      url: edu.href,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: Object.values(DATA.contact.social)
      .map((s) => s.url)
      .filter((url) => !url.startsWith("mailto:")),
    knowsAbout: [
      ...DATA.industries,
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full Stack Development",
      "Product Engineering",
      "Electron",
      "React Native",
    ],
  };
}

export function buildWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${DATA.name} — ${DATA.title}`,
    description: DATA.description,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

export function buildProfilePageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${DATA.name} — Portfolio`,
    description: DATA.summary,
    inLanguage: "en-US",
    mainEntity: { "@id": `${SITE_URL}/#person` },
    dateCreated: "2024-01-01",
    dateModified: SITE_LAST_MODIFIED,
  };
}

export function buildBreadcrumbSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildProjectsItemListSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${DATA.name} — Projects`,
    description: `Portfolio of ${DATA.projects.length} software projects by ${DATA.name}.`,
    numberOfItems: DATA.projects.length,
    itemListElement: DATA.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        ...( "href" in project && project.href
          ? { url: project.href }
          : { url: absoluteUrl("/projects") }),
        author: { "@id": `${SITE_URL}/#person` },
        keywords: project.technologies.join(", "),
      },
    })),
  };
}

export function buildBlogPostingSchema({
  slug,
  title,
  description,
  publishedAt,
  updatedAt,
  cover,
  author,
  tags,
}: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  cover?: string;
  author?: string;
  tags: string[];
}): JsonLd {
  const url = absoluteUrl(`/blog/${slug}`);
  const image = cover ? absoluteUrl(cover) : absoluteUrl(DATA.avatarUrl);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    image,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    inLanguage: "en-US",
    keywords: tags.join(", "),
    author: {
      "@type": "Person",
      name: author ?? DATA.name,
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function buildCollectionPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: { "@id": `${SITE_URL}/#person` },
  };
}

export function serializeJsonLd(schemas: JsonLd | JsonLd[]): string {
  const payload = JSON.stringify(schemas).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${payload}</script>`;
}