import { JsonLd } from "@/components/json-ld";
import { BlogPostCard } from "@/components/blog-post-card";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts, getAllTags } from "@/data/blog";
import { DATA } from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildPageMetadata,
} from "@/lib/seo";
import type { Metadata } from "next";
import { ComingSoon } from "./_components/coming-soon";

const BLOG_DESCRIPTION =
  "Notes on the products I ship: React, Next.js, TypeScript, and the decisions behind them.";

export async function generateMetadata(): Promise<Metadata> {
  const blogEnabled = await isBlogEnabled();

  return buildPageMetadata({
    title: "Writing",
    description: BLOG_DESCRIPTION,
    path: "/blog",
    keywords: [
      "software engineering notes",
      "product engineering",
      "React TypeScript",
    ],
    noIndex: !blogEnabled,
  });
}

export default async function BlogIndexPage() {
  if (!(await isBlogEnabled())) {
    return <ComingSoon />;
  }
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <main className="mx-auto flex min-h-dvh w-full min-w-0 max-w-3xl flex-col overflow-x-clip px-4 pb-16 pt-20 sm:px-6">
      <JsonLd
        data={[
          buildCollectionPageSchema({
            path: "/blog",
            name: `${DATA.name} — Writing`,
            description: BLOG_DESCRIPTION,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
          ]),
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">
        Writing
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        Notes on the products I ship and the decisions behind them.
      </p>

      {tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      <div className="mt-8 border-t border-border">
        {posts.length === 0 ? (
          <p className="py-10 text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          posts.map((post) => <BlogPostCard key={post.slug} post={post} />)
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
