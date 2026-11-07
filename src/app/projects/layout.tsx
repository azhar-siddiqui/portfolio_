import { DATA } from "@/data/resume";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Projects — Software Portfolio",
  description: `Production work and personal demos by ${DATA.name}. Client frontends, CentLabs Pro, and practice builds are labeled separately.`,
  path: "/projects",
  ogImage: ogImageUrl("/projects/opengraph-image"),
  keywords: [
    "software projects portfolio",
    "CentLabs Pro",
    "React TypeScript frontend",
    "pathology lab software",
    "product engineer projects",
    ...DATA.projects.map((project) => project.title),
  ],
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}