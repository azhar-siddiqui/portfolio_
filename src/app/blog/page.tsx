import type { Metadata } from "next";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { BlogPostCard } from "@/components/blog-post-card";
import { getAllPosts, getAllTags } from "@/data/blog";
import { DATA } from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";
import { ComingSoon } from "./_components/coming-soon";

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
  if (!(await isBlogEnabled())) {
    return <ComingSoon />;
  }
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 pb-32 pt-16 sm:pt-24">
      <div className="mx-auto w-full max-w-6xl">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <SectionEyebrow index="∞" label="Writing" />
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <h1 className="display-heading max-w-3xl">
            <span className="gradient-text-warm">
              Notes from the build
            </span>
            <span className="block mt-2 text-foreground/85 text-2xl sm:text-3xl font-light tracking-[-0.015em] leading-snug">
              shipping product engineering, AI-native workflows, and the
              systems behind reliable software.
            </span>
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
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </BlurFade>
        )}

        <div className="mt-12 sm:mt-16">
          {posts.length === 0 ? (
            <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
              <div className="surface-tinted rounded-2xl p-8 sm:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Coming soon
                </p>
                <h2 className="subsection-heading mt-3">
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
            <div className="bento-grid">
              {posts.map((post, id) => {
                // First post becomes the bento feature; the rest fill half-row cells.
                const span = id === 0 ? "bento-feature" : "bento-half";
                return (
                  <BlurFade
                    key={post.slug}
                    delay={BLUR_FADE_DELAY * (5 + id * 0.4)}
                    inView
                    className={span}
                  >
                    <BlogPostCard post={post} featured={id === 0} />
                  </BlurFade>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
