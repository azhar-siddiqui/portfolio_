import { Icons } from "@/components/icons";
import { HERO_DATA } from "@/data/hero-data";
import { SKILLS_DATA } from "@/data/skills-data";
import { FolderOpen, HomeIcon, NotebookPen } from "lucide-react";

export const DATA = {
  ...HERO_DATA,
  url: "https://www.azharsayyed.in",
  locationLink: "https://www.google.com/maps/place/aurangabad",
  title: "Full Stack Engineer",
  summary: `Full stack engineer based in Aurangabad, open to on-site roles in Pune, anywhere in India, or remote.

I have shipped production software since 2023 across logistics, maritime, banking, and healthcare. I own a feature end to end: find out what the user actually needs, write the plan before the code, build the screen and the API behind it, test it, and release it. The stack I use most is TypeScript, React, Next.js, Node.js, Prisma, and PostgreSQL.

Since April 2026 I have been building CentLabs Pro, a fully offline Electron app for a pathology lab's daily work. A lab registers patients, enters results, locks a signed report, bills, and keeps an encrypted backup on its own PC. In a lab, a result that is mostly right is wrong, so correctness comes before speed. About 10 to 15 labs use it on a working day.

I use Claude Code and Cursor every day, and I review what they write as carefully as a colleague's pull request.`,
  metrics: [
    {
      value: 10,
      suffix: "–15",
      label: "Labs using CentLabs Pro on a working day",
    },
  ],
  industries: ["Logistics", "Maritime", "Healthcare", "Banking", "Hospitality", "Education"],
  testimonials: [] as ReadonlyArray<{
    quote: string;
    name: string;
    role: string;
    company: string;
  }>,
  skills: SKILLS_DATA,
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: FolderOpen, label: "Projects" },
    { href: "/blog", icon: NotebookPen, label: "Writing" },
  ],
  contact: {
    email: "azhartsiddiqui@gmail.com",
    tel: "+91 7558380826",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/azhar-siddiqui",
        icon: Icons.github,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:azhartsiddiqui@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Self-employed",
      href: "https://centlabspro.com",
      badges: [],
      location: "Aurangabad",
      title: "Product Engineer",
      logoUrl: "",
      start: "Apr 2026",
      end: "Present",
      description:
        "CentLabs Pro is a product I am building, not a company. It is a fully offline Electron app for a pathology lab's daily work: register patients, enter results, lock a signed report, bill, and keep an encrypted backup on the lab's own PC. A separate Next.js and Firebase tool reads a cell-counter photo and fills the readings. The two apps do not sync. About 10 to 15 labs use it on a working day, and more features are in progress.",
    },
    {
      company: "Kiya.ai",
      href: "https://kiya.ai",
      badges: [],
      location: "Remote",
      title: "Associate Consultant",
      logoUrl: "",
      start: "Mar 2024",
      end: "Apr 2026",
      description:
        "Frontend on an internal product for tanker pool operators. I built React and TypeScript screens: fleet dashboards, filters, tables, charts, and maps, with role-based views so each person sees their own data. I worked with the people using those screens and turned the workflow into the product. I also built the frontend of BetaRisk CRM, a client platform for banks and corporates: client records, lead management, risk screens, and decision dashboards, with Redux Toolkit, RTK Query, Material UI, Jest, and Cypress.",
    },
    {
      company: "Freelance",
      href: "",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "",
      start: "Oct 2023",
      end: "Feb 2024",
      description:
        "Freelance frontend on three client products: HobbyCue (Next.js, and part of the Node.js API), the ePact marketing site (GSAP and Framer Motion), and the SalonTreat Android app (React Native).",
    },
    {
      company: "Quloi",
      href: "https://app.quloi.com/login",
      badges: [],
      location: "Hybrid",
      title: "Full Stack Developer",
      logoUrl: "",
      start: "Apr 2023",
      end: "Sep 2023",
      description:
        "Full stack on the product at app.quloi.com, not the marketing site. I built purchase order, supplier, and shipment tracking features end to end: React and TypeScript screens on the front, and the GraphQL and REST APIs behind them. Shipments show on Google Maps, so a buyer can follow an order from booking through delivery.",
    },
  ],
  education: [
    {
      school: "Savitribai Phule Pune University",
      href: "https://www.unipune.ac.in/",
      degree: "Master of Computer Science",
      logoUrl: "",
      start: "2021",
      end: "2023",
    },
    {
      school: "Savitribai Phule Pune University",
      href: "https://www.unipune.ac.in/",
      degree: "Bachelor of Computer Science",
      logoUrl: "",
      start: "2018",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "CentLabs Pro",
      href: "https://centlabspro.com",
      dates: "Apr 2026 - Present",
      company: "Self-employed",
      active: true,
      description:
        "Offline Windows app for a pathology lab's daily work. A lab registers patients, enters results, locks a signed report, bills, and keeps an encrypted backup on its own PC. A separate web tool reads a cell-counter photo and fills the readings. The desktop app and the web tool do not sync. This is a product, not a company.",
      technologies: [
        "Electron",
        "React",
        "TypeScript",
        "Next.js",
        "Firebase",
        "Node.js",
      ],
      impact:
        "About 10 to 15 labs use it on a working day. Once a report is signed it is locked, so the result a doctor reads is the result that was approved. I build it with Claude Code and review every change myself. The code and the product are mine.",
      featured: true,
    },
    {
      title: "Hafnia fleet platform",
      dates: "Mar 2024 - Apr 2026",
      company: "Kiya.ai",
      active: false,
      description:
        "Internal web app for tanker pool operators, built at Kiya.ai. React and TypeScript screens for fleet status, filters, tables, charts, and maps. Each role sees only its own data. The public company website is a different site, and this project does not link to it.",
      technologies: [
        "React",
        "TypeScript",
        "React Native",
        "TanStack Query",
        "TanStack Table",
        "Tailwind CSS",
        "Mapbox",
        "WeatherLayers",
        "Highcharts",
        "AG Grid",
        "Vite",
      ],
      impact:
        "Pool operators see fleet status, the map, and the numbers in one app. My part was the frontend.",
      featured: true,
    },
    {
      title: "BetaRisk CRM",
      dates: "Jan 2025 - Dec 2025",
      company: "Kiya.ai",
      active: false,
      description:
        "Client platform for banks and corporates. I owned the frontend: client records, lead management, risk screens, and decision dashboards. The Figma design system became a Material UI theme. Screen data goes through Redux Toolkit and RTK Query. There is no public URL.",
      technologies: [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "RTK Query",
        "Material UI",
        "Jest",
        "Cypress",
      ],
      impact:
        "Jest and Cypress cover opening a client, updating a lead, and reading a risk screen.",
      featured: true,
    },
    {
      title: "Quloi",
      href: "https://app.quloi.com/login",
      dates: "Apr 2023 - Sep 2023",
      company: "Quloi",
      active: false,
      description:
        "Logistics product for buyers and suppliers. I worked across the stack: React and TypeScript screens for purchase orders, suppliers, and shipment visibility, and the GraphQL and REST APIs that serve them. This is the product at app.quloi.com, not the marketing website.",
      technologies: [
        "React",
        "TypeScript",
        "Apollo GraphQL",
        "REST API",
        "Google Maps",
        "Tailwind CSS",
      ],
      impact:
        "A buyer can follow an order from booking through delivery, with the data and the screens built by the same person.",
      featured: true,
    },
    {
      title: "HobbyCue",
      href: "https://hobbycue.com/",
      dates: "Oct 2023 - Nov 2023",
      company: "Freelance",
      active: false,
      description:
        "Community product for hobbyists. I owned the Next.js frontend and part of the Node.js and MongoDB API. A person can look through People, Place, Product, and Program, and sign in with email, Google, or Facebook. I did not own the whole server. Purple Cues Private Limited owns the product.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
      ],
      impact:
        "A hobbyist can find people, places, products, and events for one interest, and a seller can publish a listing.",
      featured: true,
    },
    {
      title: "ePact marketing site",
      href: "https://epact.app/",
      dates: "Dec 2023 - Jan 2024",
      company: "Freelance",
      active: false,
      description:
        "Marketing site for Envelope, an MIS and CRM for education and training providers. I owned the public pages: homepage, adult education, levy employers, recovery colleges, cycle training, and skills bootcamps. Each page ended in Book a demo. Motion used GSAP and Framer Motion. The live site has since moved to a different build, so this link is the product, not my original pages. I did not build the MIS product.",
      technologies: ["Next.js", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS"],
      impact:
        "A college or training provider could see which Envelope product fit them and book a demo. Student and transaction numbers published by the company are not my impact.",
      featured: true,
    },
    {
      title: "SalonTreat Android",
      href: "https://play.google.com/store/apps/details?id=com.salontreat.app",
      dates: "Jan 2024 - Feb 2024",
      company: "Freelance",
      active: false,
      description:
        "React Native Android app for at-home salon booking. A customer browses treatments, chooses a professional, and books a visit. I owned the frontend screens. I did not build the backend, and I am not claiming the marketing website.",
      technologies: ["React Native", "TypeScript"],
      impact:
        "A customer books a professional to their home from the app. The Play Store listing is under Routinekart.",
      featured: true,
    },
    {
      title: "CASA Architects",
      href: "https://casa-architects.in/",
      dates: "Independent",
      company: "Independent",
      active: false,
      description:
        "I built a React frontend and a FastAPI and PostgreSQL backend for an architecture studio. The public site today is a static page, so this link is the studio, not that build.",
      technologies: ["React", "FastAPI", "PostgreSQL"],
      impact: "A client project. The live site is no longer the app I built.",
      featured: false,
    },
    {
      title: "TableMate",
      href: "https://table-mate-marketing-page-azhar-siddiquis-projects.vercel.app/",
      dates: "2026",
      company: "Personal Project",
      active: false,
      description:
        "Personal demo of restaurant tables, a kitchen screen, and billing. No restaurant is running on it.",
      technologies: [
        "React",
        "TypeScript",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
      ],
      impact: "Practice build. Not a client product.",
      featured: false,
    },
    {
      title: "CashCounter Pro",
      href: "https://cash-counter-pro-eta.vercel.app/",
      dates: "Jan 2026",
      company: "Personal Project",
      active: false,
      description:
        "Personal demo that totals Indian currency notes. Not a product a shop is running.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      impact: "Practice build. Not a client product.",
      featured: false,
    },
    {
      title: "Zomato Clone",
      dates: "2023",
      company: "Personal Project",
      active: false,
      description:
        "Practice food-delivery screens. Not affiliated with Zomato, and not a live delivery service.",
      technologies: ["React Native", "TypeScript", "Firebase"],
      impact: "Practice build. Not a client product.",
      featured: false,
    },
    {
      title: "SubTrackr",
      dates: "Jun 2026",
      company: "Personal Project",
      active: false,
      description:
        "Practice app for listing subscriptions. It uses sample data, not a live billing account.",
      technologies: ["React Native", "TypeScript", "Expo", "Clerk"],
      impact: "Practice build. Not a client product.",
      featured: false,
    },
    {
      title: "Marriage Hall Booking",
      href: "https://marriage-hall-booking.vercel.app/",
      dates: "May 2026",
      company: "Personal Project",
      active: false,
      description:
        "Personal demo for browsing halls and an admin listing screen. No hall is taking bookings through it.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      impact: "Practice build. Not a client product.",
      featured: false,
    },
    {
      title: "WeCare lab demo",
      href: "https://we-care-lab-app.vercel.app/",
      dates: "2026",
      company: "Personal Project",
      active: false,
      description:
        "Personal lab demo for case entry and printed reports. Pathology labs use CentLabs Pro, not this app.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      impact: "Practice build. Not in use by labs.",
      featured: false,
    },
    {
      title: "GoldVault",
      href: "https://goldflow-pro.vercel.app",
      dates: "Jun 2026",
      company: "Personal Project",
      active: false,
      description:
        "Personal demo of jewellery-shop billing and stock screens. Not used by a shop.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      impact: "Practice build. Not a client product.",
      featured: false,
    },
    {
      title: "TireBiz",
      href: "https://tire-biz.vercel.app",
      dates: "Jul 2026",
      company: "Personal Project",
      active: false,
      description:
        "Personal demo of tyre-shop stock and GST billing screens. Not used by a shop.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      impact: "Practice build. Not a client product.",
      featured: true,
    },
    {
      title: "ElectroHub",
      href: "https://electronixbiz-alpha.vercel.app",
      dates: "Jul 2026",
      company: "Personal Project",
      active: false,
      description:
        "Personal demo of an electronics-shop counter: stock, IMEI, and billing screens. Not used by a shop.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      impact: "Practice build. Not a client product.",
      featured: false,
    },
  ],
} as const;

export type ProjectResourceLink = {
  readonly label: string;
  readonly href: string;
};

export type Project = (typeof DATA)["projects"][number];

export const PERSONAL_PROJECT_COMPANY = "Personal Project" as const;

const PROJECT_ORDER = new Map(
  DATA.projects.map((project, index) => [project.title, index]),
);

export function isPersonalProject(project: Project): boolean {
  return project.company === PERSONAL_PROJECT_COMPANY;
}

/** Company projects first, personal projects last — matches DATA.projects order within each group. */
export function compareProjectsCompanyFirst(a: Project, b: Project): number {
  const aPersonal = isPersonalProject(a);
  const bPersonal = isPersonalProject(b);
  if (aPersonal !== bPersonal) return aPersonal ? 1 : -1;
  return (PROJECT_ORDER.get(a.title) ?? 0) - (PROJECT_ORDER.get(b.title) ?? 0);
}

export function sortProjectsCompanyFirst<T extends Project>(
  projects: readonly T[],
): T[] {
  return [...projects].sort(compareProjectsCompanyFirst);
}

export function getProjectResourceLinks(
  project: Project,
): readonly ProjectResourceLink[] | undefined {
  if (!("resourceLinks" in project)) {
    return undefined;
  }

  return (
    project as Project & { resourceLinks: readonly ProjectResourceLink[] }
  ).resourceLinks;
}
