import { BlogPostCard } from "@/components/blog-post-card";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { SkillsSection } from "@/components/skills-section";
import { getAllPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import Markdown from "react-markdown";

export const metadata = buildPageMetadata({
  title: `${DATA.name} — ${DATA.title} Portfolio`,
  description: `${DATA.tagline} ${DATA.description}`,
  path: "/",
  keywords: [
    "product engineer portfolio",
    "React Next.js TypeScript engineer",
    "frontend developer Aurangabad",
    "CentLabs Pro",
  ],
});

export default async function Page() {
  const blogEnabled = await isBlogEnabled();
  const latestPosts = blogEnabled ? (await getAllPosts()).slice(0, 3) : [];
  const selectedWork = DATA.projects.filter((project) => project.featured);

  return (
    <main
      id="resume-content"
      className="mx-auto flex min-h-dvh w-full min-w-0 max-w-3xl flex-col overflow-x-clip px-4 pb-16 pt-20 sm:px-6"
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

      <section id="about" className="mt-16 w-full min-w-0 border-t border-border pt-10">
        <h2 className="text-sm font-medium text-muted-foreground">About</h2>
        <div className="mt-4 max-w-full space-y-4 text-base leading-relaxed text-foreground [&_p]:max-w-full">
          <Markdown>{DATA.summary}</Markdown>
        </div>
      </section>

      <section id="work" className="mt-16 border-t border-border pt-10">
        <h2 className="text-sm font-medium text-muted-foreground">Work</h2>
        <ol className="mt-2">
          {DATA.work.map((job) => (
            <li
              key={`${job.company}-${job.start}`}
              className="grid gap-2 border-b border-border py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8"
            >
              <p className="text-sm text-muted-foreground">
                {job.start} — {job.end ?? "Present"}
              </p>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {job.href && job.company !== "Self-employed" ? (
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.title} · {job.location}
                </p>
                {job.company === "Self-employed" && job.href ? (
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    centlabspro.com
                  </a>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {job.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="education" className="mt-10">
        <h2 className="text-sm font-medium text-muted-foreground">Education</h2>
        <ul className="mt-4 space-y-4">
          {DATA.education.map((education) => (
            <li key={`${education.degree}-${education.start}`}>
              <p className="text-sm font-medium text-foreground">
                {education.degree}
              </p>
              <p className="text-sm text-muted-foreground">
                {education.school} · {education.start} — {education.end}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="skills" className="mt-16 border-t border-border pt-10">
        <SkillsSection />
      </section>

      <section id="projects" className="mt-16 border-t border-border pt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            All projects
          </Link>
        </div>
        <ol className="mt-2">
          {selectedWork.map((project, index) => {
            const href = "href" in project ? project.href : undefined;
            const lead = index === 0;
            return (
              <li
                key={project.title}
                className={
                  lead
                    ? "my-4 border border-border bg-card p-5 sm:p-6"
                    : "border-b border-border py-6"
                }
                style={lead ? { borderRadius: "var(--radius)" } : undefined}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{project.dates}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {project.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.impact}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {project.technologies.join(" · ")}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {latestPosts.length > 0 && (
        <section id="writing" className="mt-16 border-t border-border pt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Writing
            </h2>
            <Link
              href="/blog"
              className="text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              All posts
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section id="contact" className="mt-16 border-t border-border pt-10">
        <h2 className="text-sm font-medium text-muted-foreground">Contact</h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-foreground">
          Open to full-time roles: on-site in Pune, anywhere in India, or remote.
        </p>
        <ul className="mt-6 space-y-2 text-sm">
          <li>
            <a
              href={`mailto:${DATA.contact.email}`}
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {DATA.contact.email}
            </a>
          </li>
          <li>
            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              GitHub
            </a>
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Aurangabad, India · IST (UTC+5:30)
        </p>
      </section>
    </main>
  );
}
