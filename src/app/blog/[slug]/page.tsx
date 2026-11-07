import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BlogPostContent } from "@/components/blog-post-content";
import { BlogShare } from "@/components/blog-share";
import { BlogToc } from "@/components/blog-toc";
import { BackToTop } from "@/components/back-to-top";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts, getAllSlugs, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";
import {
  absoluteUrl,
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildPageMetadata,
} from "@/lib/seo";

export async function generateStaticParams() {
  // When the blog feature flag is off, we don't pre-render any posts.
  // Runtime requests still hit notFound() via the gate inside the page.
  if (!(await isBlogEnabled())) return [];
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type RouteParams = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: RouteParams,
): Promise<Metadata> {
  if (!(await isBlogEnabled())) return { title: "Post not found" };
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  const { frontmatter } = post;
  const ogImage = frontmatter.cover
    ? absoluteUrl(frontmatter.cover)
    : absoluteUrl(DATA.avatarUrl);

  return buildPageMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/blog/${slug}`,
    keywords: frontmatter.tags,
    ogImage,
    ogType: "article",
    publishedTime: frontmatter.publishedAt,
    modifiedTime: frontmatter.updatedAt,
    tags: frontmatter.tags,
    authors: [frontmatter.author ?? DATA.name],
  });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: RouteParams) {
  if (!(await isBlogEnabled())) {
    notFound();
  }
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || (post.frontmatter.draft && process.env.NODE_ENV === "production")) {
    notFound();
  }
  const { frontmatter, html, readingTime, headings } = post;
  const postUrl = `${DATA.url}/blog/${slug}`;

  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx >= 0 ? all[idx + 1] : undefined;
  const next = idx >= 0 ? all[idx - 1] : undefined;

  return (
    <main className="mx-auto flex min-h-dvh w-full min-w-0 max-w-3xl flex-col overflow-x-clip px-4 pb-16 pt-20 sm:px-6">
      <JsonLd
        data={[
          buildBlogPostingSchema({
            slug,
            title: frontmatter.title,
            description: frontmatter.description,
            publishedAt: frontmatter.publishedAt,
            updatedAt: frontmatter.updatedAt,
            cover: frontmatter.cover,
            author: frontmatter.author,
            tags: frontmatter.tags,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: frontmatter.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      {/* xl+ : 2-column grid — TOC left rail, article fills the right. */}
      <article
        className="w-full min-w-0"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <Link
          href="/blog"
          className="text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          All writing
        </Link>

        {frontmatter.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {frontmatter.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          {frontmatter.title}
        </h1>

        {frontmatter.description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {frontmatter.description}
          </p>
        )}

        <p className="mt-4 text-sm text-muted-foreground">
          <time dateTime={frontmatter.publishedAt}>
            {formatDate(frontmatter.publishedAt)}
          </time>
          <span aria-hidden> · </span>
          <span>{readingTime.minutes} min</span>
          {frontmatter.author ? (
            <>
              <span aria-hidden> · </span>
              <span>{frontmatter.author}</span>
            </>
          ) : null}
        </p>

        <div className="mt-4">
          <BlogShare
            title={frontmatter.title}
            description={frontmatter.description}
            url={postUrl}
          />
        </div>

        {frontmatter.cover && (
          <div
            className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-border bg-muted"
            style={{ borderRadius: "var(--radius)" }}
          >
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
        )}

        <BlogToc headings={headings} />

        <div className="mt-10">
          <BlogPostContent html={html} />
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">Share</p>
          <div className="mt-3">
            <BlogShare
              title={frontmatter.title}
              description={frontmatter.description}
              url={postUrl}
            />
          </div>
        </div>

        {(prev || next) && (
          <nav aria-label="More posts" className="mt-10 grid gap-4 sm:grid-cols-2">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="border border-border p-4 text-sm"
                style={{ borderRadius: "var(--radius)" }}
              >
                <span className="text-muted-foreground">Previous</span>
                <span className="mt-1 block font-medium text-foreground">
                  {prev.frontmatter.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="border border-border p-4 text-sm sm:text-right"
                style={{ borderRadius: "var(--radius)" }}
              >
                <span className="text-muted-foreground">Next</span>
                <span className="mt-1 block font-medium text-foreground">
                  {next.frontmatter.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>

      <SiteFooter />
      <BackToTop />
    </main>
  );
}
