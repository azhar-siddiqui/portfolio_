import { BlurFade } from "@/components/magicui/blur-fade";
import { Hero } from "@/components/hero";
import { IndustriesMarquee } from "@/components/industries-marquee";
import { MetricsStrip } from "@/components/metrics-strip";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SkillsSection } from "@/components/skills-section";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main
      id="resume-content"
      className="flex flex-col min-h-screen px-4 sm:px-6 pb-32"
    >
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
              Engineering at the intersection of code and business outcomes.
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
              Five years of shipping for teams that need outcomes, not output.
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
                key={education.school}
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
              A few projects that moved the numbers.
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DATA.projects
              .filter((project) => project.featured)
              .slice(0, 4)
              .map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * (2 + id * 0.4)}
                  inView
                >
                  <ProjectCard
                    href={project.href}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    impact={project.impact}
                    company={project.company}
                  />
                </BlurFade>
              ))}
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

      <section id="contact" className="mt-24 sm:mt-32">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <SectionEyebrow index="06" label="Contact" />
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16">
            <div>
              <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-foreground max-w-[18ch]">
                  Open to senior engineering and consulting roles.
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
                    className="group inline-flex items-center gap-2 px-5 h-11 bg-foreground text-background rounded-full font-medium text-sm transition-colors duration-200 hover:bg-foreground/85 active:bg-foreground/75"
                  >
                    Connect on LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={`mailto:${DATA.contact.email}`}
                    className="group inline-flex items-center gap-2 px-5 h-11 border border-border rounded-full font-medium text-sm transition-colors duration-200 hover:bg-foreground/[0.06] hover:border-foreground/40 active:bg-foreground/[0.1]"
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
