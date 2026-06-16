import { BlogPostCard } from "@/components/blog-post-card";
import { Hero } from "@/components/hero";
import { IndustriesMarquee } from "@/components/industries-marquee";
import { JsonLd } from "@/components/json-ld";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MetricsStrip } from "@/components/metrics-strip";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SkillsSection } from "@/components/skills-section";
import { getAllPosts } from "@/data/blog";
import {
  DATA,
  getProjectResourceLinks,
  sortProjectsCompanyFirst,
} from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

export const metadata = buildPageMetadata({
  title: `${DATA.name} — ${DATA.title} Portfolio`,
  description: `${DATA.tagline} Explore ${DATA.metrics[1].value}${DATA.metrics[1].suffix} shipped products across ${DATA.industries.join(", ")}. ${DATA.description}`,
  path: "/",
  keywords: [
    "product engineer portfolio",
    "full stack developer India",
    "React Next.js TypeScript engineer",
    "SaaS developer for hire",
    ...DATA.industries.map((industry) => `${industry} software developer`),
  ],
});

const BLUR_FADE_DELAY = 0.04;

const FEATURED_PROJECT_COUNT = 5;

export default async function Page() {
  const blogEnabled = await isBlogEnabled();
  const latestPosts = blogEnabled ? (await getAllPosts()).slice(0, 3) : [];
  return (
    <main
      id="resume-content"
      className="flex flex-col min-h-dvh px-4 sm:px-6 pb-32"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${DATA.url}/#webpage`,
          url: DATA.url,
          name: `${DATA.name} — ${DATA.title} Portfolio`,
          description: DATA.description,
          inLanguage: "en-US",
          isPartOf: { "@id": `${DATA.url}/#website` },
          about: { "@id": `${DATA.url}/#person` },
          primaryImageOfPage: `${DATA.url}/opengraph-image`,
        }}
      />
      <Hero />

      <div className="mt-24 sm:mt-32">
        <MetricsStrip metrics={DATA.metrics} />
      </div>

      <section id="about" className="mt-24 sm:mt-32">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <SectionEyebrow index="01" label="About" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
            <h2 className="section-heading mb-6 max-w-2xl">
              I build software that{" "}
              <span className="serif-accent text-primary">works</span> in
              production.
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
            <div className="prose prose-lg text-pretty font-sans text-base text-muted-foreground dark:prose-invert max-w-2xl leading-relaxed">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
          {DATA.work[0] && (
            <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
              <p className="mt-8 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Currently · {DATA.work[0].title} at {DATA.work[0].company}
              </p>
            </BlurFade>
          )}
        </div>
      </section>

      <div className="mt-16 sm:mt-24">
        <IndustriesMarquee items={DATA.industries} />
      </div>

      <section id="work" className="mt-16 sm:mt-24">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <SectionEyebrow index="02" label="Experience" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
            <h2 className="section-heading mb-10 sm:mb-14 max-w-2xl">
              Four years of shipping production software.
            </h2>
          </BlurFade>
          <div className="flex flex-col">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * (2 + id * 0.5)}
                inView
              >
                <ResumeCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} — ${work.end ?? "Present"}`}
                  description={work.description}
                  location={work.location}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="mt-24 sm:mt-32">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <SectionEyebrow index="03" label="Education" />
          </BlurFade>
          <div className="flex flex-col">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={`${education.school}-${education.degree}-${education.start}`}
                delay={BLUR_FADE_DELAY * (2 + id * 0.5)}
                inView
              >
                <ResumeCard
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} — ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="mt-24 sm:mt-32">
        <SkillsSection />
      </section>

      <section id="projects" className="mt-24 sm:mt-32">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <SectionEyebrow index="05" label="Selected work" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
            <h2 className="section-heading mb-10 sm:mb-14 max-w-2xl">
              Selected work from recent years.
            </h2>
          </BlurFade>
          <div className="bento-grid">
            {sortProjectsCompanyFirst(
              DATA.projects.filter((project) => project.featured),
            )
              .slice(0, FEATURED_PROJECT_COUNT)
              .map((project, id) => {
                // First card is the bento "feature" hero (large, 2-row tall on lg+).
                // Next two are wide half-rows; the last two fill the bottom row.
                const span =
                  id === 0
                    ? "bento-feature"
                    : id === 1 || id === 2
                      ? "bento-half"
                      : "bento-half";
                return (
                  <BlurFade
                    key={project.title}
                    delay={BLUR_FADE_DELAY * (2 + id * 0.4)}
                    inView
                    className={span}
                  >
                    <ProjectCard
                      href={"href" in project ? project.href : undefined}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies}
                      resourceLinks={getProjectResourceLinks(project)}
                      impact={project.impact}
                      company={project.company}
                      featured={id === 0}
                    />
                  </BlurFade>
                );
              })}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
            <div className="mt-12">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground animated-underline"
              >
                View all projects
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section id="writing" className="mt-24 sm:mt-32">
          <div className="mx-auto w-full max-w-6xl">
            <BlurFade delay={BLUR_FADE_DELAY} inView>
              <SectionEyebrow index="06" label="Latest writing" />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
              <h2 className="section-heading mb-10 sm:mb-14 max-w-2xl">
                Notes from the build.
              </h2>
            </BlurFade>
            {latestPosts.length === 1 ? (
              <BlurFade delay={BLUR_FADE_DELAY * 2.5} inView>
                <BlogPostCard post={latestPosts[0]} featured />
              </BlurFade>
            ) : (
              <div
                className={`grid grid-cols-1 gap-4 sm:gap-5 ${
                  latestPosts.length === 2
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {latestPosts.map((post, id) => (
                  <BlurFade
                    key={post.slug}
                    delay={BLUR_FADE_DELAY * (2 + id * 0.5)}
                    inView
                  >
                    <BlogPostCard post={post} />
                  </BlurFade>
                ))}
              </div>
            )}
            <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
              <div className="mt-10">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground animated-underline"
                >
                  Read all posts
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>
      )}

      <section id="contact" className="mt-24 sm:mt-32">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <SectionEyebrow index="07" label="Contact" />
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16">
            <div>
              <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-foreground max-w-[18ch]">
                  Let&apos;s build{" "}
                  <span className="serif-accent text-primary">
                    something
                  </span>{" "}
                  together.
                </h2>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
                <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-md">
                  If you&apos;re building something where engineering decisions
                  meet business outcomes, I&apos;d like to hear about it.
                </p>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
                <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                  <a
                    href={DATA.contact.social.LinkedIn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 h-11 bg-primary text-primary-foreground rounded-full font-medium text-sm shadow-soft transition-colors duration-200 hover:bg-primary/90 active:bg-primary/80"
                  >
                    Connect on LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={`mailto:${DATA.contact.email}`}
                    className="group inline-flex items-center gap-2 px-5 h-11 border border-border rounded-full font-medium text-sm transition-colors duration-200 hover:bg-primary/[0.06] hover:border-primary/35 hover:text-primary active:bg-primary/[0.1]"
                  >
                    Send email
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
              <dl className="grid grid-cols-1 gap-6 sm:gap-8 border-t md:border-t-0 md:border-l border-border/60 pt-8 md:pt-0 md:pl-10">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
                    Response time
                  </dt>
                  <dd className="text-sm sm:text-base text-foreground">
                    Usually within 24 hours
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
                    Timezone
                  </dt>
                  <dd className="text-sm sm:text-base text-foreground">
                    IST · UTC+5:30
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${DATA.contact.email}`}
                      className="text-sm sm:text-base text-foreground animated-underline"
                    >
                      {DATA.contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </BlurFade>
          </div>
        </div>
      </section>
    </main>
  );
}
