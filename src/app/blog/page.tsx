import type { Metadata } from "next";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { BlogPostCard } from "@/components/blog-post-card";
import { getAllPosts, getAllTags } from "@/data/blog";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Long-form notes on shipping product engineering, AI-native development, and the systems behind reliable software.",
  openGraph: {
    title: `Writing · ${DATA.name}`,
    description:
      "Long-form notes on shipping product engineering, AI-native development, and the systems behind reliable software.",
    url: `${DATA.url}/blog`,
    type: "website",
  },
  alternates: {
    canonical: `${DATA.url}/blog`,
  },
};

export default async function BlogIndexPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 pb-32 pt-16 sm:pt-24">
      <div className="mx-auto w-full max-w-6xl">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <SectionEyebrow index="∞" label="Writing" />
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <h1 className="section-heading max-w-3xl gradient-text-warm">
            Notes from the build — shipping product engineering, AI-native
            workflows, and the systems behind reliable software.
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl">
            Long-form posts on the patterns, decisions, and trade-offs behind
            the products I work on. Code, diagrams, and the occasional opinion.
          </p>
        </BlurFade>

        {tags.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </BlurFade>
        )}

        <div className="mt-12 sm:mt-16">
          {posts.length === 0 ? (
            <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
              <div className="surface-tinted rounded-xl p-8 sm:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Coming soon
                </p>
                <h2 className="mt-3 text-2xl font-medium tracking-[-0.01em] text-foreground">
                  The writing room is being set up.
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                  No posts published yet. Check back shortly — the first set of
                  notes covers AI-native delivery and maritime-grade
                  reliability.
                </p>
              </div>
            </BlurFade>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {posts.map((post, id) => (
                <BlurFade
                  key={post.slug}
                  delay={BLUR_FADE_DELAY * (5 + id * 0.4)}
                  inView
                >
                  <BlogPostCard post={post} />
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
