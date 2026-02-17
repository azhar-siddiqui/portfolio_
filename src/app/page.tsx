import { DownloadResumeButton } from "@/components/download-resume-button";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { SkillsSection } from "@/components/skills-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { BlurFade } from "@/components/magicui/blur-fade";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.03;

export default function Page() {
  return (
    <main
      id="resume-content"
      className="flex flex-col min-h-screen space-y-20 sm:space-y-28 px-4 py-12 pb-28"
    >
      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full" />
        </div>
        <div className="mx-auto w-full max-w-6xl space-y-8 pt-6">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 sm:justify-between sm:items-center">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-32 md:size-48 border-4 border-primary/20 sm:order-last ring-4 ring-primary/10 transition-all duration-500 hover:scale-105 hover:ring-primary/30 hover:border-primary/40">
                <AvatarImage
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                  {DATA.initials}
                </AvatarFallback>
              </Avatar>
            </BlurFade>
            <div className="flex-col flex flex-1 space-y-5 order-last sm:order-first">
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit mb-2 border border-primary/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Building &amp; Shipping Products
                </div>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent">
                    {DATA.name.split(" ")[0]}
                  </span>{" "}
                  <span className="inline-block">👋</span>
                </h1>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <p className="max-w-[640px] text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {DATA.description}
                </p>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <DownloadResumeButton />
              </BlurFade>
            </div>
          </div>
        </div>
      </section>
      {/* ===== ABOUT SECTION ===== */}
      <section id="about">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="section-heading mb-8">
              About
              <div className="section-heading-underline"></div>
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
            <div className="prose prose-lg text-pretty font-sans text-base text-muted-foreground dark:prose-invert max-w-4xl leading-relaxed">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      {/* ===== WORK EXPERIENCE SECTION ===== */}
      <section id="work">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="section-heading mb-8">
              Work Experience
              <div className="section-heading-underline"></div>
            </h2>
          </BlurFade>
          <div className="flex min-h-0 flex-col gap-y-5">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                inView
              >
                <ResumeCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                  location={work.location}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {/* ===== EDUCATION SECTION ===== */}
      <section id="education">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="section-heading mb-8">
              Education
              <div className="section-heading-underline"></div>
            </h2>
          </BlurFade>
          <div className="flex min-h-0 flex-col gap-y-5">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                inView
              >
                <ResumeCard
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {/* ===== FEATURED PROJECTS SECTION ===== */}
      <section id="projects">
        <div className="mx-auto w-full max-w-6xl">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="section-heading mb-8">
              Featured Projects
              <div className="section-heading-underline"></div>
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-6">
            {DATA.projects
              .filter((project) => project.featured)
              .slice(0, 3)
              .map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 2 + id * 0.05}
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
            <div className="mt-10 text-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 font-semibold"
              >
                View All Projects
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
      {/* ===== SKILLS SECTION ===== */}
      <SkillsSection />
      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="relative">
        <div className="relative mx-auto max-w-4xl rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-8 sm:p-12">
          {/* Subtle top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="grid items-center justify-center gap-6 text-center w-full">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Let&apos;s Talk
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-base sm:text-lg leading-relaxed">
                I&apos;m always open to discussing new opportunities, innovative
                projects, or partnerships. Feel free to reach out on{" "}
                <a
                  href={DATA.contact.social.LinkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-accent font-semibold transition-colors underline decoration-primary/30 hover:decoration-primary underline-offset-4"
                >
                  LinkedIn
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>{" "}
                for professional inquiries.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <a
                  href={DATA.contact.social.LinkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 font-semibold"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </a>
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-primary/30 hover:border-primary text-foreground rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Send Email
                </a>
              </div>
            </div>
          </BlurFade>
          </div>
        </div>
      </section>
    </main>
  );
}
