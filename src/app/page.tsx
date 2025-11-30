import { DownloadResumeButton } from "@/components/download-resume-button";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { SkillsSection } from "@/components/skills-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";

export default function Page() {
  return (
    <main
      id="resume-content"
      className="flex flex-col min-h-screen space-y-12 px-4"
    >
      <section id="hero">
        <div className="mx-auto w-full max-w-6xl space-y-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:justify-between sm:items-center">
            <Avatar className="size-24 border-2 shadow-lg sm:order-last">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-col flex flex-1 space-y-3 order-last sm:order-first">
              <span className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {DATA.name.split(" ")[0]}
                </span>{" "}
                👋
              </span>
              <span className="max-w-[700px] md:text-xl text-muted-foreground leading-relaxed">
                {DATA.description}
              </span>
            </div>
          </div>
          <DownloadResumeButton />
        </div>
      </section>
      <section id="about">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-3xl font-extrabold mb-6 text-left uppercase tracking-wide bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">About</h2>
          <div className="prose prose-lg text-pretty font-sans text-sm text-muted-foreground dark:prose-invert max-w-4xl">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </div>
      </section>
      <section id="work">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-3xl font-extrabold mb-6 text-left uppercase tracking-wide bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Work Experience</h2>
          <div className="flex min-h-0 flex-col gap-y-4">
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
      <section id="education" className="py-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-3xl font-extrabold mb-6 text-left uppercase tracking-wide bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Education</h2>
          <div className="flex min-h-0 flex-col gap-y-4">
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
      <SkillsSection />
      <section id="projects" className="py-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-3xl font-extrabold mb-6 text-left uppercase tracking-wide bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Projects</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DATA.projects.map((project, id) => (
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
        </div>
      </section>
      <section id="contact" className="py-6">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12 mx-auto max-w-4xl">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
              Contact
            </div>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl uppercase bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Feel free to connect with me on{" "}
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium"
              >
                LinkedIn
              </a>{" "}
              for opportunities and discussions. I respond to direct messages
              promptly and focus exclusively on relevant professional inquiries.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
