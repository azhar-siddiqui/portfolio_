import { JsonLd } from "@/components/json-ld";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { ProjectsGrid } from "@/components/projects-grid";
import { SiteFooter } from "@/components/site-footer";
import { DATA } from "@/data/resume";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildProjectsItemListSchema,
} from "@/lib/seo";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  return (
    <main className="flex flex-col min-h-dvh px-4 sm:px-6 py-16 sm:py-24 pb-32">
      <JsonLd
        data={[
          buildCollectionPageSchema({
            path: "/projects",
            name: `${DATA.name} — Projects`,
            description: `Complete portfolio of ${DATA.projects.length} software projects.`,
          }),
          buildProjectsItemListSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <div className="mx-auto w-full max-w-6xl">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <SectionEyebrow index="*" label="Projects archive" />
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h1 className="display-heading max-w-3xl">
            Everything I&apos;ve{" "}
            <span className="serif-accent text-foreground">shipped</span>,
            indexed.
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {DATA.projects.length} projects across maritime, finance, logistics,
            EdTech and more. Filter by stack or search by keyword.
          </p>
        </BlurFade>

        <ProjectsGrid />
      </div>
      <SiteFooter />
    </main>
  );
}
