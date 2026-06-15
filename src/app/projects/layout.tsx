import { DATA } from "@/data/resume";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Projects — Software Portfolio",
  description: `Explore ${DATA.projects.length} mission-critical products by ${DATA.name} across maritime, logistics, healthcare, hospitality, EdTech, and supply chain — with measurable business impact.`,
  path: "/projects",
  ogImage: ogImageUrl("/projects/opengraph-image"),
  keywords: [
    "software projects portfolio",
    "enterprise SaaS projects",
    "maritime fleet management software",
    "healthcare laboratory platform",
    "supply chain collaboration platform",
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