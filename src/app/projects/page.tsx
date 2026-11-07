import { JsonLd } from "@/components/json-ld";
import { ProjectsGrid } from "@/components/projects-grid";
import { SiteFooter } from "@/components/site-footer";
import { DATA } from "@/data/resume";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildProjectsItemListSchema,
} from "@/lib/seo";

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full min-w-0 max-w-3xl flex-col overflow-x-clip px-4 pb-16 pt-20 sm:px-6">
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
      <div className="w-full min-w-0">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Client work is listed first. Anything marked Personal Project is a
          demo I built to practice. Those demos are not live businesses.
        </p>

        <ProjectsGrid />
      </div>
      <SiteFooter />
    </main>
  );
}
