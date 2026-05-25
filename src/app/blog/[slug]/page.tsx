import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BlogPostContent } from "@/components/blog-post-content";
import { getAllPosts, getAllSlugs, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type RouteParams = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: RouteParams,
): Promise<Metadata> {
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
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || (post.frontmatter.draft && process.env.NODE_ENV === "production")) {
    notFound();
  }
  const { frontmatter, html, readingTime } = post;

  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx >= 0 ? all[idx + 1] : undefined;
  const next = idx >= 0 ? all[idx - 1] : undefined;

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 pb-32 pt-12 sm:pt-20">
      <article className="mx-auto w-full max-w-3xl">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            All writing
          </Link>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          {frontmatter.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-1.5">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border/60 bg-secondary/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
          <h1 className="mt-5 text-3xl sm:text-5xl font-medium tracking-[-0.025em] leading-[1.08] text-foreground gradient-text-warm">
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

        {frontmatter.cover && (
          <BlurFade delay={BLUR_FADE_DELAY * 6} inView>
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-border/60 mt-10 bg-muted/40">
              <Image
                src={frontmatter.cover}
                alt={frontmatter.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </BlurFade>
        )}

        <BlurFade delay={BLUR_FADE_DELAY * 7} inView>
          <div className="mt-12">
            <BlogPostContent html={html} />
          </div>
        </BlurFade>

        {(prev || next) && (
          <nav
            aria-label="More posts"
            className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-border/60 bg-card/60 p-5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5"
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
                className="group flex flex-col items-end gap-1 rounded-xl border border-border/60 bg-card/60 p-5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5 text-right sm:col-start-2"
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
    </main>
  );
}
