import { DATA } from "@/data/resume";
import { getAllPosts } from "@/data/blog";
import { isBlogEnabled } from "@/lib/feature-flags";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: DATA.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${DATA.url}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  if (await isBlogEnabled()) {
    entries.push({
      url: `${DATA.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    const posts = await getAllPosts();
    for (const post of posts) {
      const lastModified = post.frontmatter.updatedAt || post.frontmatter.publishedAt;
      entries.push({
        url: `${DATA.url}/blog/${post.slug}`,
        lastModified: lastModified ? new Date(lastModified) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
