import { Icons } from "@/components/icons";
import { FolderOpen, HomeIcon, NotebookPen } from "lucide-react";

export const DATA = {
  name: "Sayyed Azhar",
  alias: "Azhar",
  initials: "SA",
  url: "https://sayyedazhar.dev",
  location: "Aurangabad, India",
  locationLink: "https://www.google.com/maps/place/aurangabad",
  title: "Product Engineer",
  tagline: "Product Engineer building and launching products from scratch.",
  description:
    "I don't just write code. I build software that delivers real business impact: boosting revenue, lowering costs, ensuring compliance, and scaling operations for maritime, logistics, healthcare, and hospitality companies.",
  summary:
    "Over the past four years, I've owned the entire development process for products across logistics, maritime, and healthcare — designing interfaces, writing backend logic, managing databases, and automating infrastructure. I lean heavily into modern AI-assisted development tools like Cursor and Claude Code to speed up my workflow, catch bugs early, and ship high-quality features fast.",
  metrics: [
    { value: 4, suffix: "+", label: "Years building production software" },
    { value: 15, suffix: "+", label: "Mission-critical products delivered" },
    { value: 5, suffix: "", label: "Industries · logistics to healthcare" },
    { value: 40, suffix: "%", label: "Avg. page load time improvement" },
  ],
  industries: [
    "Logistics",
    "Maritime",
    "Healthcare",
    "Supply Chain",
    "EdTech",
    "Architecture",
  ],
  testimonials: [] as ReadonlyArray<{
    quote: string;
    name: string;
    role: string;
    company: string;
  }>,
  avatarUrl: "/me.png",
  skills: {
    ai: [
      { name: "Claude Code CLI", color: "#CC785C", icon: "anthropic" },
      { name: "Cursor", color: "#ffffff", icon: "cursor" },
      { name: "GitHub Copilot", color: "#ffffff", icon: "githubcopilot" },
      { name: "Gemini", color: "#4285F4", icon: "googlegemini" },
      { name: "Codex", color: null, icon: null },
    ],
    frontend: [
      { name: "React", color: null, icon: "react" },
      { name: "Next.js", color: "#ffffff", icon: "nextdotjs" },
      { name: "React Native", color: null, icon: "react" },
      { name: "Angular", color: "#dd0031", icon: "angular" },
      // { name: "Vue.js", color: null, icon: "vuedotjs" },
      // { name: "Svelte", color: null, icon: "svelte" },
      { name: "Ionic", color: null, icon: "ionic" },
      { name: "Capacitor.js", color: null, icon: "capacitor" },
      { name: "TanStack", color: "#ffffff", icon: "tanstack" },
      { name: "TanStack Query", color: "#ffffff", icon: "tanstack" },
      { name: "Redux/RTK", color: null, icon: "redux" },
      // { name: "RxJS", color: null, icon: "reactivex" },
      { name: "TailwindCSS", color: null, icon: "tailwindcss" },
      { name: "Shadcn", color: "#ffffff", icon: "radixui" },
      { name: "Material UI", color: null, icon: "mui" },
      { name: "Bootstrap", color: null, icon: "bootstrap" },
      { name: "Mapbox", color: "#ffffff", icon: "mapbox" },
      { name: "AG Grid", color: null, icon: null },
      { name: "HighCharts", color: null, icon: null },
      { name: "Chart.js", color: null, icon: "chartdotjs" },
      { name: "Recharts", color: null, icon: null },
      { name: "PWA", color: null, icon: "pwa" },
      { name: "jQuery", color: null, icon: "jquery" },
      // { name: "WordPress", color: "#ffffff", icon: "wordpress" },
    ],
    backend: [
      { name: "Node.js", color: null, icon: "nodedotjs" },
      { name: "TypeScript", color: null, icon: "typescript" },
      { name: "Dart", color: null, icon: "dart" },
      { name: "Express.js", color: "#ffffff", icon: "express" },
      { name: "NestJS", color: null, icon: "nestjs" },
      { name: "Flask", color: "#ffffff", icon: "flask" },
      { name: "Electron.js", color: null, icon: "electron" },
      { name: "SQLite", color: null, icon: "sqlite" },
      { name: "Prisma", color: null, icon: "prisma" },
      { name: "Convex", color: null, icon: "convex" },
      { name: "Firebase", color: null, icon: "firebase" },
      { name: "MongoDB", color: null, icon: "mongodb" },
      { name: "PostgreSQL", color: null, icon: "postgresql" },
      { name: "Clerk", color: null, icon: "clerk" },
      { name: "Stripe", color: null, icon: "stripe" },
      { name: "Razorpay", color: null, icon: "razorpay" },
      { name: "Google Maps", color: null, icon: "googlemaps" },
      { name: "Google Calendar API", color: null, icon: "googlecalendar" },
      { name: "OpenAPI", color: null, icon: "openapiinitiative" },
      { name: "Axios", color: null, icon: "axios" },
      // { name: "Commander", color: null, icon: "gnubash" },
      { name: "Dotenv", color: null, icon: "dotenv" },
      // { name: "Handlebars", color: "#ffffff", icon: "handlebarsdotjs" },
      // { name: "Winston", color: null, icon: "gnubash" },
      { name: "Zod", color: null, icon: "zod" },
      // { name: "Novu", color: "#ffffff", icon: "novu" },
    ],
    devops: [
      { name: "Docker", color: null, icon: "docker" },
      { name: "Kubernetes", color: null, icon: "kubernetes" },
      { name: "GitHub Actions", color: null, icon: "githubactions" },
      { name: "Azure DevOps CI/CD", color: null, icon: null },
      { name: "pnpm", color: null, icon: "pnpm" },
      { name: "Vercel", color: "#ffffff", icon: "vercel" },
      { name: "Netlify", color: null, icon: "netlify" },
      { name: "AWS", color: null, icon: null },
      { name: "New Relic", color: null, icon: "newrelic" },
      { name: "PostHog", color: "#ffffff", icon: "posthog" },
      // { name: "Last9", color: null, icon: null },
      { name: "Sentry", color: null, icon: "sentry" },
      { name: "SonarQube", color: null, icon: null },
      // { name: "Bitrise", color: null, icon: "bitrise" },
    ],
    testing: [
      // { name: "Cypress", color: null, icon: "cypress" },
      { name: "Jest", color: null, icon: "jest" },
      // { name: "Playwright", color: null, icon: null },
      { name: "Vitest", color: null, icon: "vitest" },
      { name: "Testing Library", color: null, icon: "testinglibrary" },
      // { name: "Appium", color: null, icon: "appium" },
      // { name: "WebdriverIO", color: null, icon: "webdriverio" },
      { name: "Postman", color: null, icon: "postman" },
      // { name: "AWS Device Farm", color: null, icon: null },
    ],
  },
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
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sayyed-azhar-673147179/",
        icon: Icons.linkedin,
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
      company: "Kiya.ai",
      href: "https://kiya.ai",
      badges: ["Current"],
      location: "Remote",
      title: "Associate Consultant",
      logoUrl: "",
      start: "Mar 2024",
      end: "Apr 2026",
      description:
        "Architected a scalable maritime Enterprise SaaS platform with granular Role-Based Access Control (RBAC), integrating complex multi-tier stakeholder permissions for secure data isolation. Translated ambiguous business requirements directly into interactive, high-performance dashboards for the Global Tanker Fleet Management System, working straight with key stakeholders.",
    },
    {
      company: "Quloi",
      href: "https://quloi.com",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer",
      logoUrl: "",
      start: "Jan 2023",
      end: "Sep 2023",
      description:
        "Built frontend architecture for the Omni-Channel Supply Chain Collaboration platform — a cloud-native logistics SaaS digitizing first-mile operations. Engineered Supplier Management and Purchase Order automation modules, real-time KPI dashboards (OTIF, lead-time accuracy), and granular RBAC for admins, buyers, suppliers, and freight forwarders.",
    },
    {
      company: "Banao Tech (ATG World)",
      href: "",
      badges: [],
      location: "Remote",
      title: "Sr. Frontend Developer",
      logoUrl: "",
      start: "Jan 2022",
      end: "Dec 2022",
      description:
        "Contributed to 10+ web applications across client projects. Reduced page load time on 10 client websites by 30% through optimization techniques, becoming the company expert on load time and web vitals. Implemented responsive design for improved mobile experience and collaborated with UX designers on conversion-focused interfaces.",
    },
    {
      company: "RightBrain InfoTech",
      href: "http://rightbraininfotech.in/",
      badges: [],
      location: "Remote",
      title: "Associate Software Engineer",
      logoUrl: "",
      start: "Jan 2021",
      end: "Dec 2021",
      description:
        "Translated complex design mock-ups and wireframes into functional, pixel-perfect web pages. Optimized application performance, improving page load times by 20%. Spearheaded peer code reviews and drove technical problem-solving discussions on architecture challenges.",
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
      title: "Global Tanker Fleet Management System",
      href: "https://hafnia.com/",
      dates: "Mar 2024 - Present",
      company: "Kiya.ai",
      active: true,
      tags: ["Confidential", "NDA Protected"],
      description:
        "TypeScript-based React web application for maritime pool participants featuring RBAC, interactive dashboards with global filters and DeckGL maps, action item centers, pool point corrections, and performance reporting.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "TailwindCSS",
        "Vitest",
        "AG Grid",
        "DeckGL",
        "SonarQube",
        "New Relic",
        "Azure Pipelines",
      ],
      impact:
        "Architected a scalable maritime Enterprise SaaS platform with granular RBAC and high-performance dashboards, integrating SonarQube, New Relic, and Azure CI/CD pipelines across dev, test, and prod environments.",
      featured: true,
    },
    {
      title: "Quloi Omni-Channel Supply Chain Platform",
      href: "https://quloi.com",
      dates: "Jan 2023 - Sep 2023",
      company: "Quloi",
      active: true,
      description:
        "Cloud-native Supply Chain Collaboration platform serving as a centralized command center for global manufacturers and distributors to manage Purchase Orders, shipment bookings, and supplier performance with real-time visibility.",
      technologies: ["React", "TypeScript", "TailwindCSS", "REST API", "RBAC"],
      impact:
        "Engineered Supplier Management and PO Automation modules with real-time KPI dashboards (OTIF, lead-time accuracy, shipment milestones), eliminating manual spreadsheet tracking and reducing detention/demurrage costs.",
      featured: true,
    },
    {
      title: "HobbyCue",
      href: "https://hobbycue.com/",
      dates: "Jan 2022 - Dec 2022",
      company: "ATG Word (Banao Tech)",
      active: true,
      description:
        "Developed HobbyCue, a comprehensive community platform that connects hobby enthusiasts with experts, teachers, venues, products, and events. The platform enables users to discover, connect, book classes/workshops, buy/rent equipment, and build a vibrant hobby-based community across various interests like arts, sports, music, cooking, and more.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node Js",
        "Mongo DB",
        "Firebase",
        "Google Auth",
        "Facebook Auth",
      ],
      impact:
        "Built a feature-rich marketplace and community platform that simplifies discovering local hobby resources and connecting like-minded people. Delivered core modules for People, Places, Products, and Programs with seamless search, booking, and listing functionalities, helping users easily explore and engage in their passions.",
      featured: true,
    },
    {
      title: "Epact - MIS & CRM Platform",
      href: "https://epact.app/",
      dates: "Jan 2022 - Dec 2022",
      company: "ATG Word (Banao Tech)",
      active: true,
      description:
        "Developed and enhanced Epact, a comprehensive cloud-based Management Information System (MIS) and CRM platform designed for education and training providers. The system streamlines learner management, enrolment, attendance, funding compliance, reporting, and operations for adult learning colleges, apprenticeship programs, recovery colleges, and cycle training providers.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Firebase",
        "PostgreSQL",
        "Prisma",
      ],
      impact:
        "Built a robust, scalable all-in-one platform that serves 30k+ students and handles 9.6M+ successful transactions. Significantly reduced administrative burden, improved compliance with funding bodies, enabled real-time insights, and delivered seamless enrolment, attendance tracking, and reporting workflows for multiple education sectors.",
      featured: true,
    },
    {
      title: "SalonTreat Web",
      href: "https://salontreat.com/",
      dates: "Jan 2022 - Dec 2022",
      company: "ATG Word (Banao Tech)",
      active: true,
      description:
        "Developed the web platform for SalonTreat - an on-demand beauty booking service allowing users to browse and book salon professionals for at-home services like haircuts, facials, manicures, and more.",
      technologies: [
        "GatsbyGatsby",
        "TypeScript",
        "CSS",
        "Firebase",
        "Django",
        "PostgreSQL",
      ],
      impact:
        "Created a responsive, user-friendly web application that provides easy access to premium beauty services with seamless booking experience.",
      featured: false,
    },
    {
      title: "SalonTreat - Mobile App",
      href: "https://play.google.com/store/apps/details?id=com.salontreat.app",
      dates: "Jan 2022 - Dec 2022",
      company: "ATG Word (Banao Tech)",
      active: true,
      description:
        "Built the Android mobile application for SalonTreat, enabling users to book salon services at home with just a few taps. Features service browsing, professional selection, booking management, and a premium user experience.",
      technologies: ["React Native", "TypeScript"],
      impact:
        "Launched a production Android app with 50+ downloads, delivering convenient doorstep beauty services and improving customer accessibility.",
      featured: true,
    },
    {
      title: "Casa Architect Interior Design Portfolio Platform",
      href: "https://casa-architects.in/",
      dates: "Jan 2022 - Dec 2022",
      company: "Banao Tech (ATG World)",
      active: true,
      description:
        "Built a high-performance portfolio engine for an architecture and interior design firm with optimized image galleries, dynamic project storytelling, transparent service pricing matrices, and testimonial synchronization.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "PWA",
        "Django",
      ],
      impact:
        "Improved lead qualification and conversion rates through transparent service offerings, lazy-loaded high-resolution renders, and a mobile-first layout consistent across all device sizes.",
      featured: true,
    },
    {
      title: "TableMate → Multi-Tenant Hotel & Restaurant POS PWA",
      href: "https://table-mate-marketing-page-azhar-siddiquis-projects.vercel.app/",
      dates: "2026 - Present",
      company: "Personal Project",
      active: true,
      description:
        "Built a production-ready, offline-first Progressive Web App for restaurants/hotels featuring real-time table management, Kitchen Display System (KDS), granular Permission-Based Access Control (PBAC), multi-tenancy, staff device PIN login, and automated invoicing. Optimized for touch-friendly Android use by waiters, chefs, and owners.",
      technologies: [
        "NestJS",
        "Prisma",
        "PostgreSQL",
        "Redis",
        "Socket.IO",
        "React",
        "TypeScript",
        "Vite",
        "TanStack Query",
        "Zustand",
        "Tailwind CSS",
        "ShadCN UI",
        "Dexie.js",
        "Workbox",
        "Docker",
      ],
      impact:
        "Designed full-stack architecture with strict tenant isolation, real-time WebSocket syncing via Redis adapter, robust offline resilience with conflict resolution, Argon2-hashed credentials + JWT/refresh tokens, dynamic PBAC, and automated username generation. Enables zero-downtime operations for busy hospitality environments.",
      featured: true,
    },
    {
      title: "CashCounter Pro",
      href: "https://cash-counter-pro-eta.vercel.app/",
      dates: "Jan 2026 - Jan 2026",
      company: "Personal Project",
      active: true,
      description:
        "Built a fast and accurate cash counting Progressive Web App (PWA) for retail, restaurants, and small businesses. Features real-time denomination calculation, multi-currency support (focused on INR), one-click reset/copy/share, and a clean mobile-first interface.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Firebase",
        "PWA",
      ],
      impact:
        "Created a practical cash management tool that significantly reduces manual counting time and errors. Delivered a production-ready, installable PWA with smooth real-time calculations, responsive design, and excellent UX optimized for daily cash handling workflows.",
      featured: true,
    },
    {
      title: "WeCare Healthcare Laboratory SaaS Platform",
      dates: "2023 - Present",
      company: "Personal Project",
      active: true,
      description:
        "Built a comprehensive SaaS-style healthcare platform to digitize laboratory operations — automating the patient lifecycle from registration and secure record management to automated report generation and real-time tracking.",
      technologies: [
        "NestJS",
        "Prisma",
        "PostgreSQL",
        "Redis",
        "Socket.IO",
        "React",
        "TypeScript",
        "Vite",
        "Vitest",
        "TanStack Query",
        "Zustand",
        "Tailwind CSS",
        "ShadCN UI",
        "Dexie.js",
        "Workbox",
        "Docker",
      ],
      impact:
        "Owned 0→1 full-stack architecture with multi-tenant RBAC, AI-powered medical report interpretation via LLM orchestration, dynamic PDF generation, and real-time inventory tracking — shipping weekly with zero-downtime CI/CD.",
      featured: true,
    },
    {
      title: "Zomato Clone → Food Delivery App",
      dates: "Jan 2022 - Dec 2022",
      company: "Personal Project",
      active: true,
      description:
        "Developed a full-featured food delivery application with user registration, social login via Firebase, dynamic home screen with restaurant showcases, sorting/filtering, and a real-time cart with multiple payment options.",
      technologies: ["React Native", "Firebase", "TypeScript", "REST API"],
      impact:
        "Delivered end-to-end food ordering flows — from restaurant discovery and filtering to real-time cart updates and multi-payment checkout — with Firebase-powered authentication and onboarding.",
      featured: true,
    },
    {
      title: "SubTrackr",
      href: null,
      dates: "June 2026",
      company: "Personal Project",
      active: false,
      description:
        "Developed SubTrackr, a clean and intuitive mobile application to manage and track all your subscriptions. Users can add, categorize, monitor renewal dates, view monthly/annual spending, and receive reminders with secure authentication.",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "NativeWind",
        "Clerk",
      ],
      impact:
        "Built a fully functional subscription management app using modern React Native stack with secure Clerk authentication. Implemented dummy data architecture for quick prototyping, clean UI with NativeWind, and effective tracking features helping users avoid unwanted charges and stay on top of their recurring expenses.",
      featured: true,
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
