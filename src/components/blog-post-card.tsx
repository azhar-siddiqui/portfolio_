import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { Post } from "@/data/blog";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface BlogPostCardProps {
  post: Post;
  /** Bento-only: scale the title up for the featured hero card. */
  featured?: boolean;
}

export function BlogPostCard({ post, featured }: BlogPostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  const horizontalHero = !!(featured && frontmatter.cover);

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "bento-card group flex h-full",
        horizontalHero ? "flex-col lg:flex-row" : "flex-col",
      )}
    >
      {frontmatter.cover && (
        <div
          className={cn(
            "relative overflow-hidden bg-muted/40",
            horizontalHero
              ? "w-full aspect-[16/9] lg:w-[55%] lg:aspect-auto lg:self-stretch"
              : "w-full aspect-[16/9]",
          )}
        >
          <Image
            src={frontmatter.cover}
            alt={frontmatter.title}
            fill
            sizes={
              horizontalHero
                ? "(max-width: 1024px) 100vw, 600px"
                : "(max-width: 768px) 100vw, 600px"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div
        className={cn(
          "flex flex-col flex-1 gap-3 p-5 sm:p-6",
          horizontalHero && "lg:p-7 lg:justify-center",
        )}
      >
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3
          className={
            "font-medium tracking-[-0.01em] text-foreground leading-snug " +
            (featured
              ? "text-2xl sm:text-3xl"
              : "text-lg sm:text-xl")
          }
        >
          <span className="inline-flex items-baseline gap-1.5">
            <span className="animated-underline">{frontmatter.title}</span>
            <ArrowUpRight className="inline h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </h3>
        {frontmatter.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {frontmatter.description}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3" />
            {formatDate(frontmatter.publishedAt)}
          </span>
          <span aria-hidden className="text-muted-foreground/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3 w-3" />
            {readingTime.minutes} min read
          </span>
          {frontmatter.draft && (
            <>
              <span aria-hidden className="text-muted-foreground/40">·</span>
              <span className="chip-warm chip">Draft</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
