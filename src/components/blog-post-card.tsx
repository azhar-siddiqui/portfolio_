import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { Post } from "@/data/blog";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogPostCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_hsl(var(--primary)/0.45)]"
    >
      {frontmatter.cover && (
        <div className="relative w-full overflow-hidden aspect-[16/9] bg-muted/40">
          <Image
            src={frontmatter.cover}
            alt={frontmatter.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 gap-3 p-5 sm:p-6">
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border/60 bg-secondary/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/75"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-lg sm:text-xl font-medium tracking-[-0.01em] text-foreground leading-snug">
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
              <span className="inline-flex items-center rounded-full border border-warm/40 bg-warm/10 px-1.5 py-0.5 text-warm">
                Draft
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
