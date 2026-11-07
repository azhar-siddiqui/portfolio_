import Link from "next/link";
import type { Post } from "@/data/blog";

function formatDate(iso: string) {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface BlogPostCardProps {
  post: Post;
  featured?: boolean;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="block border-b border-border py-5"
    >
      <h3 className="text-base font-semibold text-foreground">
        {frontmatter.title}
        {frontmatter.draft ? (
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            Draft
          </span>
        ) : null}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {formatDate(frontmatter.publishedAt)} · {readingTime.minutes} min
      </p>
      {frontmatter.description ? (
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {frontmatter.description}
        </p>
      ) : null}
    </Link>
  );
}
