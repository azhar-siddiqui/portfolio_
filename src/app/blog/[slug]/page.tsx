import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BlogPostContent } from "@/components/blog-post-content";
import { BlogShare } from "@/components/blog-share";
import { BlogToc } from "@/components/blog-toc";
import { BackToTop } from "@/components/back-to-top";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts, getAllSlugs, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";

const BLUR_FADE_DELAY = 0.04;

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
    ? new URL(frontmatter.cover, DATA.url).toString()
    : `${DATA.url}/me.png`;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url: `${DATA.url}/blog/${slug}`,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      tags: frontmatter.tags,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${DATA.url}/blog/${slug}`,
    },
  };
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
    <main className="flex flex-col min-h-dvh px-4 sm:px-6 pb-32 pt-12 sm:pt-20">
      {/* xl+ : 2-column grid — TOC left rail, article fills the right. */}
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-12 xl:items-start">
        {/* TOC on the left — the component handles sticky + mobile drawer. */}
        <BlogToc headings={headings} />

        <article className="mx-auto w-full max-w-3xl xl:max-w-none min-w-0">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground animated-underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All writing
            </Link>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
            {frontmatter.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-1.5">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
            <h1 className="mt-5 text-3xl sm:text-5xl font-medium tracking-[-0.025em] leading-[1.08] gradient-text-warm">
              {frontmatter.title}
            </h1>
          </BlurFade>

          {frontmatter.description && (
            <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
              <p className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {frontmatter.description}
              </p>
            </BlurFade>
          )}

          <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/85">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3" />
                {formatDate(frontmatter.publishedAt)}
              </span>
              <span aria-hidden className="text-muted-foreground/40">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3 w-3" />
                {readingTime.minutes} min read
              </span>
              {frontmatter.author && (
                <>
                  <span aria-hidden className="text-muted-foreground/40">·</span>
                  <span>by {frontmatter.author}</span>
                </>
              )}
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 6} inView>
            <div className="mt-6">
              <BlogShare
                title={frontmatter.title}
                description={frontmatter.description}
                url={postUrl}
              />
            </div>
          </BlurFade>

          {frontmatter.cover && (
            <BlurFade delay={BLUR_FADE_DELAY * 7} inView>
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-border/60 mt-10 bg-muted/40 shadow-card">
                <Image
                  src={frontmatter.cover}
                  alt={frontmatter.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
            </BlurFade>
          )}

          <BlurFade delay={BLUR_FADE_DELAY * 8} inView>
            <div className="mt-12">
              <BlogPostContent html={html} />
            </div>
          </BlurFade>

          <div className="mt-16 pt-10 border-t border-border/60">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Liked this? Share it.
            </p>
            <BlogShare
              title={frontmatter.title}
              description={frontmatter.description}
              url={postUrl}
            />
          </div>

          {(prev || next) && (
            <nav
              aria-label="More posts"
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {prev && (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="bento-card group flex flex-col gap-1 p-5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground inline-flex items-center gap-1.5">
                    <ArrowLeft className="h-3 w-3" />
                    Previous
                  </span>
                  <span className="text-sm sm:text-base font-medium text-foreground leading-snug">
                    {prev.frontmatter.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="bento-card group flex flex-col items-end gap-1 p-5 text-right sm:col-start-2"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground inline-flex items-center gap-1.5">
                    Next
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                  <span className="text-sm sm:text-base font-medium text-foreground leading-snug">
                    {next.frontmatter.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </article>
      </div>

      <SiteFooter />
      <BackToTop />
    </main>
  );
}
