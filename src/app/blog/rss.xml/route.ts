import { getAllPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";
import { absoluteUrl } from "@/lib/seo";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  if (!(await isBlogEnabled())) {
    return new Response("Blog feed unavailable", { status: 404 });
  }

  const posts = await getAllPosts();
  const feedUrl = absoluteUrl("/blog/rss.xml");
  const blogUrl = absoluteUrl("/blog");

  const items = posts
    .map((post) => {
      const postUrl = absoluteUrl(`/blog/${post.slug}`);
      const pubDate = new Date(post.frontmatter.publishedAt).toUTCString();
      const description = escapeXml(post.frontmatter.description);
      const title = escapeXml(post.frontmatter.title);

      return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      ${
        post.frontmatter.author
          ? `<author>${escapeXml(post.frontmatter.author)}</author>`
          : `<author>${escapeXml(DATA.name)}</author>`
      }
      ${post.frontmatter.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(DATA.name)} — Writing</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(
      "Long-form notes on product engineering, AI-native development, and reliable software systems.",
    )}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}