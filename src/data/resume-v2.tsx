import { Icons } from "@/components/icons";
import { FolderOpen, HomeIcon, NotebookPen } from "lucide-react";

export const DATA = {
  name: "Sayyed Azhar",
  initials: "SA",
  url: "https://www.azharsayyed.in",
  location: "Aurangabad, India",
  locationLink: "https://www.google.com/maps/place/aurangabad",

  description:
    "I don't just write code. I build software that delivers real business impact: boosting revenue, lowering costs, ensuring compliance, and scaling operations for maritime, logistics, healthcare, and hospitality companies.",

  summary:
    "Over the past four years, I've owned the entire development process for products across logistics, maritime, and healthcare — designing interfaces, writing backend logic, managing databases, and automating infrastructure. I lean heavily into modern AI-assisted development tools like Cursor and Claude Code to speed up my workflow, catch bugs early, and ship high-quality features fast.",

  avatarUrl: "/me.png",

  skills: [
    "AI & LLMs — Claude Code CLI, Cursor, GitHub Copilot, Gemini, Codex",
    "Frontend — React, Next.js, React Native, Angular, Ionic, Capacitor.js, TanStack, TanStack Query, Redux/RTK, TailwindCSS, Shadcn, Material UI, Bootstrap, Mapbox, AG Grid, HighCharts, Chart.js, Recharts, PWA, jQuery",
    "Backend & Data — Node.js, TypeScript, Dart, Express.js, NestJS, Flask, Electron.js, SQLite, Prisma, Convex, Firebase, MongoDB, PostgreSQL, Clerk, Stripe, Razorpay, Google Maps, Google Calendar API, OpenAPI, Axios, Dotenv, Zod",
    "DevOps & Cloud — Docker, Kubernetes, GitHub Actions, Azure DevOps CI/CD, pnpm, Vercel, Netlify, AWS, New Relic, PostHog, Sentry, SonarQube",
    "Testing & QA — Jest, Vitest, Testing Library, Postman",
  ],

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
      title: "Hafnia → Real-Time Fleet Intelligence Platform",
      dates: "Mar 2024 - Present",
      href: "https://hafnia.com/",
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
        "Ionic",
      ],
      description:
        "TypeScript-based React web application for maritime pool participants featuring RBAC, interactive dashboards with global filters and DeckGL maps, action item centers, pool point corrections, and performance reporting. Architected a scalable maritime Enterprise SaaS platform with granular RBAC and high-performance dashboards, integrating SonarQube, New Relic, and Azure CI/CD pipelines across dev, test, and prod environments.",
      tools: [
        "React",
        "TypeScript",
        "Vite",
        "AG Grid",
        "DeckGL",
        "Azure Pipelines",
      ],
    },
    {
      title: "Quloi Omni-Channel Supply Chain Platform",
      dates: "Jan 2023 - Sep 2023",
      href: "https://quloi.com",
      technologies: ["React", "TypeScript", "TailwindCSS", "REST API", "RBAC"],
      description:
        "Cloud-native Supply Chain Collaboration platform serving as a centralized command center for global manufacturers and distributors to manage Purchase Orders, shipment bookings, and supplier performance with real-time visibility. Engineered Supplier Management and PO Automation modules with real-time KPI dashboards (OTIF, lead-time accuracy, shipment milestones), eliminating manual spreadsheet tracking and reducing detention/demurrage costs.",
      tools: ["React", "TypeScript", "TailwindCSS", "REST API"],
    },
    {
      title: "HobbyCue",
      dates: "Jan 2022 - Dec 2022",
      href: "https://hobbycue.com/",
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
      description:
        "Developed HobbyCue, a comprehensive community platform that connects hobby enthusiasts with experts, teachers, venues, products, and events. Built a feature-rich marketplace and community platform that simplifies discovering local hobby resources and connecting like-minded people.",
      tools: ["Next.js", "TypeScript", "Firebase", "Mongo DB"],
    },
    {
      title: "Epact - MIS & CRM Platform",
      dates: "Jan 2022 - Dec 2022",
      href: "https://epact.app/",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Firebase",
        "PostgreSQL",
        "Prisma",
      ],
      description:
        "Developed and enhanced Epact, a comprehensive cloud-based Management Information System (MIS) and CRM platform designed for education and training providers. Built a robust, scalable all-in-one platform that serves 30k+ students and handles 9.6M+ successful transactions.",
      tools: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    },
    {
      title: "SalonTreat Web",
      dates: "Jan 2022 - Dec 2022",
      href: "https://salontreat.com/",
      technologies: [
        "GatsbyGatsby",
        "TypeScript",
        "CSS",
        "Firebase",
        "Django",
        "PostgreSQL",
      ],
      description:
        "Developed the web platform for SalonTreat — an on-demand beauty booking service allowing users to browse and book salon professionals for at-home services like haircuts, facials, manicures, and more.",
      tools: ["Gatsby", "TypeScript", "Firebase", "Django"],
    },
    {
      title: "SalonTreat - Mobile App",
      dates: "Jan 2022 - Dec 2022",
      href: "https://play.google.com/store/apps/details?id=com.salontreat.app",
      technologies: ["React Native", "TypeScript"],
      description:
        "Built the Android mobile application for SalonTreat, enabling users to book salon services at home with just a few taps. Launched a production Android app with 50+ downloads, delivering convenient doorstep beauty services.",
      tools: ["React Native", "TypeScript"],
    },
    {
      title: "Casa Architect Interior Design Portfolio Platform",
      dates: "Jan 2022 - Dec 2022",
      href: "https://casa-architects.in/",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "PWA",
        "Django",
      ],
      description:
        "Built a high-performance portfolio engine for an architecture and interior design firm with optimized image galleries, dynamic project storytelling, transparent service pricing matrices, and testimonial synchronization. Improved lead qualification and conversion rates through transparent service offerings and a mobile-first layout.",
      tools: ["React", "Next.js", "TypeScript", "TailwindCSS", "PWA"],
    },
    {
      title: "TableMate → Multi-Tenant Hotel & Restaurant POS PWA",
      dates: "2026 - Present",
      href: "https://table-mate-marketing-page-azhar-siddiquis-projects.vercel.app/",
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
      description:
        "Built a production-ready, offline-first Progressive Web App for restaurants and hotels featuring real-time table management, Kitchen Display System (KDS), granular Permission-Based Access Control (PBAC), multi-tenancy, staff device PIN login, and automated invoicing. Designed full-stack architecture with strict tenant isolation, real-time WebSocket syncing, and robust offline resilience.",
      tools: ["NestJS", "Prisma", "PostgreSQL", "React", "Socket.IO", "Docker"],
    },
    {
      title: "CashCounter Pro",
      dates: "Jan 2026 - Jan 2026",
      href: "https://cash-counter-pro-eta.vercel.app/",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Firebase",
        "PWA",
      ],
      description:
        "Built a fast and accurate cash counting Progressive Web App (PWA) for retail, restaurants, and small businesses. Features real-time denomination calculation, multi-currency support (focused on INR), one-click reset/copy/share, and a clean mobile-first interface.",
      tools: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "PWA"],
    },
    {
      title: "WeCare Healthcare Laboratory SaaS Platform",
      dates: "2023 - Present",
      href: "",
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
      description:
        "Built a comprehensive SaaS-style healthcare platform to digitize laboratory operations — automating the patient lifecycle from registration and secure record management to automated report generation and real-time tracking. Owned 0→1 full-stack architecture with multi-tenant RBAC, AI-powered medical report interpretation, and dynamic PDF generation.",
      tools: ["NestJS", "Prisma", "PostgreSQL", "React", "Docker"],
    },
    {
      title: "Zomato Clone → Food Delivery App",
      dates: "Jan 2022 - Dec 2022",
      href: "",
      technologies: ["React Native", "Firebase", "TypeScript", "REST API"],
      description:
        "Developed a full-featured food delivery application with user registration, social login via Firebase, dynamic home screen with restaurant showcases, sorting/filtering, and a real-time cart with multiple payment options.",
      tools: ["React Native", "Firebase", "TypeScript"],
    },
    {
      title: "SubTrackr",
      dates: "June 2026",
      href: "",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "NativeWind",
        "Clerk",
      ],
      description:
        "Developed SubTrackr, a clean and intuitive mobile application to manage and track subscriptions. Users can add, categorize, monitor renewal dates, view monthly/annual spending, and receive reminders with secure authentication.",
      tools: ["React Native", "Expo", "TypeScript", "Clerk"],
    },
  ],
} as const;
