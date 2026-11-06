import { Icons } from "@/components/icons";
import { HERO_DATA } from "@/data/hero-data";
import { SKILLS_DATA } from "@/data/skills-data";
import { FolderOpen, HomeIcon, NotebookPen } from "lucide-react";

export const DATA = {
  ...HERO_DATA,
  url: "https://www.azharsayyed.in",
  locationLink: "https://www.google.com/maps/place/aurangabad",
  title: "Product Engineer",
  summary: `Product Engineer based in Aurangabad, open to full-time roles in India and remote.

I have shipped production frontend since 2021. Since April 2026 I have been building CentLabs Pro with AI coding tools. It is a fully offline Electron app for a pathology lab's daily work, and it is a product, not a company. A lab can register patients, enter results, lock a signed report, bill, and keep an encrypted backup on its own PC. A separate web tool reads a cell-counter photo and fills the readings. About 10 to 15 labs use it on a working day, and more features are in progress.

I take a feature from the screen, through the API, to production, and I use AI tools to ship that work faster. The stack I work in every week is React, Next.js, TypeScript, React Native, Node.js, and Electron.`,
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
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/azhar-sayyed-673147179/",
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
      badges: [],
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
      end: "Feb 2024",
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
      href: "https://hafnia.com/",
      dates: "Mar 2024 - Apr 2026",
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
        "Ionic",
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
      technologies: [
        "React Native",
        "TypeScript",
        "Firebase",
        "Django",
        "PostgreSQL",
      ],
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
    {
      title: "Marriage Hall Booking Platform",
      href: "https://marriage-hall-booking.vercel.app/",
      dates: "May 2026",
      company: "Personal Project",
      active: true,
      description:
        "A modern, full-featured marriage hall booking platform that allows users to browse venues, check availability, view photos, pricing, and amenities. Includes admin dashboard for hall owners to manage bookings and listings.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Prisma",
        "Supabase",
        "TanStack Query",
        "ShadCN UI",
        "Zustand",
        "PWA",
      ],
      impact:
        "Built a complete end-to-end booking system with real-time availability checking, smooth user experience, and admin management tools. Helps customers easily find and book marriage halls while giving owners better control over their listings and bookings.",
      featured: true,
    },
    {
      title: "WeCare Healthcare Laboratory SaaS Platform",
      href: "https://we-care-lab-app.vercel.app/", // replace with live URL
      dates: "Mar 2026 - June 2026", // adjust to your real timeline
      company: "Personal Project", // or your company name
      active: true,
      tags: ["SaaS", "Healthcare", "Full-Stack"],
      description:
        "Full-stack Next.js platform for diagnostic pathology labs covering patient/case registration, hierarchical test catalogs with gender-specific reference ranges, billing & collections, multi-template print-ready reports with QR codes, and business analytics for daily revenue, expenses, dues, and referral commissions.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Better Auth",
        "TailwindCSS",
        "shadcn/ui",
        "TanStack Table",
        "TipTap",
        "Zod",
        "React Hook Form",
        "Resend",
        "ImageKit",
        "kbar",
      ],
      impact:
        "Built an end-to-end lab operations SaaS that unifies case intake, result entry, branded report printing, and financial reporting—with server actions, tag-based caching, email-verified auth, and multi-theme UI designed for real diagnostic lab workflows.",
      featured: true,
    },
    {
      title: "GoldVault → Gold & Silver Shop Management Platform",
      href: "https://goldflow-pro.vercel.app", // live URL
      dates: "Jun 2026 - Jun 2026",
      company: "Personal Project", // or your company name
      active: true,
      tags: ["SaaS", "Retail / Jewellery", "Full-Stack"],
      description:
        "Full-stack Next.js platform for Indian gold & silver jewellery shops covering inventory (gold/silver/platinum with SKU, purity & weight), flexible GST billing with manual rate-per-gram and making charges, customer CRM with phone lookup, daily rate board, branded print-ready invoice PDFs, invoice cancel/return with credit notes, and sales analytics for revenue, bill count, and metal weight sold.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "JWT + bcrypt",
        "TailwindCSS",
        "shadcn/ui",
        "TanStack Table",
        "Recharts",
        "React Hook Form",
        "Zod",
        "Resend",
        "@react-pdf/renderer",
        "nuqs",
        "PWA",
      ],
      impact:
        "Built an end-to-end jewellery shop operations SaaS that unifies stock, counter billing, customer history, and GST invoicing—with server-side Decimal math, Prisma transactions for stock-safe sales, email-verified auth, letterhead PDF printing, and a luxury dark UI designed for real shop-counter workflows.",
      featured: true,
    },
    {
      title: "TireBiz → Tire Shop Management Platform",
      href: "https://tire-biz.vercel.app", // replace with live URL
      dates: "Jul 2026 - Jul 2026",
      company: "Personal Project", // or your company name
      active: true,
      tags: ["SaaS", "Retail / Wholesale Tyres", "Full-Stack"],
      description:
        "Full-stack Next.js platform for Indian tire wholesalers and retailers covering inventory (brand, size, SKU, retail/wholesale pricing & low-stock alerts), GST-compliant billing with auto CGST/SGST/IGST (intra/inter-state), customer CRM with retail vs wholesale types, manual udhaar/credit tracking (Cash/UPI/Bank), QR-shareable public invoices with branded PDF downloads, and sales/GST reports exportable for GSTR-1, GSTR-3B, and ITR.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Supabase Auth",
        "TailwindCSS",
        "shadcn/ui",
        "TanStack Table",
        "React Hook Form",
        "Zod",
        "Resend",
        "@react-pdf/renderer",
        "qrcode",
        "Arcjet",
        "date-fns",
        "PWA",
      ],
      impact:
        "Built an end-to-end tire shop operations SaaS that unifies stock, GST counter billing, customer history, and udhaar collections—with Prisma-backed multi-tenant data isolation (RLS), server-side GST math for CGST/SGST/IGST, stock-aware invoicing, email-verified Supabase auth, print-ready invoice PDFs + public QR links, tablecn-style advanced data tables with CSV export, Arcjet abuse protection, and a responsive PWA UI designed for real shop-floor workflows in India.",
      featured: true,
    },
    {
      title: "ElectroHub → Mobile & Electronics Shop Management Platform",
      href: "https://electronixbiz-alpha.vercel.app", // replace with live URL
      dates: "Jul 2026 - July 2026",
      company: "Personal Project", // or your company name
      active: true,
      tags: ["SaaS", "Retail / Electronics", "Full-Stack"],
      description:
        "Full-stack Next.js platform for Indian mobile, laptop, and electronics retailers covering inventory (category, brand, model, variant, condition, retail/wholesale pricing & low-stock alerts), IMEI/serial unit tracking with bulk import, GST-compliant billing with auto CGST/SGST/IGST (intra/inter-state) and HSN codes, customer CRM with retail vs wholesale types, manual udhaar/credit tracking (Cash/UPI/Bank/Card), repair job workflow (Received → Delivered), warranty tracking, QR-shareable public invoices with branded PDF downloads, and sales/GST reports exportable for GSTR-1, GSTR-3B, and ITR.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Neon",
        "Better Auth",
        "TailwindCSS",
        "shadcn/ui",
        "TanStack Table",
        "React Hook Form",
        "Zod",
        "Resend",
        "@react-pdf/renderer",
        "qrcode.react",
        "Recharts",
        "date-fns",
        "PWA",
      ],
      impact:
        "Built an end-to-end electronics shop operations SaaS that unifies stock, IMEI/serial lifecycle, GST counter billing, warranty dates, repair jobs, and udhaar collections—with Prisma-backed multi-tenant data isolation, Luhn-validated IMEI capture at sale time, server-side GST math for CGST/SGST/IGST, stock- and serial-aware invoicing, email-verified Better Auth + Resend, print-ready invoice PDFs + public QR links, tablecn-style advanced data tables with CSV export, warranty-expiry and category sales reporting, and a responsive PWA UI designed for real counter and service-floor workflows in India.",
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
