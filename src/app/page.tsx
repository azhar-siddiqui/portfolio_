import { DownloadResumeButton } from "@/components/download-resume-button";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { SkillsSection } from "@/components/skills-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

export default function Page() {
  return (
    <main
      id="resume-content"
      className="flex flex-col min-h-screen space-y-16 px-4 py-12"
    >
      <section id="hero">
        <div className="mx-auto w-full max-w-6xl space-y-8 pt-6">
          <div className="flex flex-col sm:flex-row gap-8 sm:justify-between sm:items-center">
            <Avatar className="size-32 md:size-52 border-4 border-primary/20 shadow-2xl sm:order-last ring-4 ring-primary/10 transition-all duration-300 hover:scale-105 hover:ring-primary/30">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-white">{DATA.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-col flex flex-1 space-y-4 order-last sm:order-first">
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl xl:text-7xl/none bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent">
                Hi, I&apos;m{" "}
                <span className="inline-block hover:scale-105 transition-transform">
                  {DATA.name.split(" ")[0]}
                </span>{" "}
                <span className="inline-block">👋</span>
              </h1>
              <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground/90 leading-relaxed">
                {DATA.description}
              </p>
            </div>
          </div>
          <DownloadResumeButton />
        </div>
      </section>
      <section id="about">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-4xl font-black mb-8 text-left uppercase tracking-tight bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent relative inline-block">
            About
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          </h2>
          <div className="prose prose-lg text-pretty font-sans text-base text-muted-foreground/90 dark:prose-invert max-w-4xl leading-relaxed">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </div>
      </section>
      <section id="work">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-4xl font-black mb-8 text-left uppercase tracking-tight bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent relative inline-block">
            Work Experience
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          </h2>
          <div className="flex min-h-0 flex-col gap-y-5">
            {DATA.work.map((work, id) => (
              <ResumeCard
                key={work.company}
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
            ))}
          </div>
        </div>
      </section>
      <section id="education">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-4xl font-black mb-8 text-left uppercase tracking-tight bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent relative inline-block">
            Education
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          </h2>
          <div className="flex min-h-0 flex-col gap-y-5">
            {DATA.education.map((education, id) => (
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-4xl font-black mb-8 text-left uppercase tracking-tight bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent relative inline-block">
            Featured Projects
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          </h2>
          <div className="flex flex-col gap-6">
            {DATA.projects
              .filter((project) => project.featured)
              .slice(0, 3)
              .map((project, id) => (
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  impact={project.impact}
                  company={project.company}
                />
              ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
            >
              View All Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      <SkillsSection />
      <section id="contact" className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-3xl"></div>
        <div className="relative grid items-center justify-center gap-6 px-4 text-center md:px-6 w-full py-16 mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact
            </div>
            <h2 className="text-5xl font-black tracking-tight sm:text-6xl uppercase bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent">
              Let&apos;s Connect
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground/90 text-lg md:text-xl leading-relaxed">
              I&apos;m always open to discussing new opportunities, innovative projects, or partnerships. 
              Feel free to reach out on{" "}
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:text-accent font-semibold transition-colors group"
              >
                LinkedIn
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              {" "}for professional inquiries.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
              <a
                href={`mailto:${DATA.contact.email}`}
                className="inline-flex items-center gap-2 px-6 py-2 border-2 border-primary text-primary dark:text-white rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
