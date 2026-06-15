import { getAllPosts } from "@/data/blog";
import { isBlogEnabled } from "@/lib/feature-flags";
import { SITE_LAST_MODIFIED, SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteModified = new Date(SITE_LAST_MODIFIED);

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: siteModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: siteModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  if (await isBlogEnabled()) {
    entries.push({
      url: `${SITE_URL}/blog`,
      lastModified: siteModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const posts = await getAllPosts();
    for (const post of posts) {
      const lastModified = post.frontmatter.updatedAt || post.frontmatter.publishedAt;
      entries.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: lastModified ? new Date(lastModified) : siteModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}