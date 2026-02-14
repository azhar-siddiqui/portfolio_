import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore ${DATA.name}'s complete portfolio — 15+ mission-critical products across maritime, logistics, fintech, EdTech, e-commerce, and more.`,
  openGraph: {
    title: `Projects | ${DATA.name}`,
    description: `Explore ${DATA.name}'s complete portfolio — 15+ mission-critical products across maritime, logistics, fintech, EdTech, e-commerce, and more.`,
    url: `${DATA.url}/projects`,
    type: "website",
  },
  twitter: {
    title: `Projects | ${DATA.name}`,
    description: `Explore ${DATA.name}'s complete portfolio — 15+ mission-critical products across maritime, logistics, fintech, EdTech, e-commerce, and more.`,
  },
  alternates: {
    canonical: `${DATA.url}/projects`,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
