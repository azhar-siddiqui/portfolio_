import { Icons } from "@/components/icons";
import { HomeIcon, FolderOpen } from "lucide-react";

export const DATA = {
  name: "Zaheed Shaikh",
  initials: "ZS",
  url: "https://zahidshaikh.space",
  location: "Pune, India",
  locationLink: "https://www.google.com/maps/place/pune",
  tagline: "Senior Product Engineer shipping software that pays for itself.",
  description:
    "I understand business, not just code, and I build software that directly increases revenue, cuts operational costs, ensures regulatory compliance, and scales operations — for maritime giants, logistics operators, banks, EdTech startups, NGOs, e-commerce stores, and everything in between.",
  summary:
    "Over the last 5 years, I've delivered 15+ mission-critical products from scratch across 10 diverse industries, generating measurable ROI like 30–70% faster decisions, 40% less downtime, 3x user engagement, or new revenue streams. I collaborate with founders, CXOs, and investors to translate business challenges into reliable, scalable solutions shipped at high velocity.",
  metrics: [
    { value: 5, suffix: "+", label: "Years shipping production software" },
    { value: 15, suffix: "+", label: "Mission-critical products delivered" },
    { value: 10, suffix: "", label: "Industries · maritime to fintech" },
    { value: 40, suffix: "%", label: "Avg. operational downtime cut" },
  ],
  industries: [
    "Maritime",
    "Banking",
    "EdTech",
    "Logistics",
    "Energy",
    "Healthcare",
    "E-commerce",
    "NGO",
    "Compliance",
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
      { name: "Anthropic API", color: "#CC785C", icon: "anthropic" },
      { name: "Cursor", color: null, icon: null },
      { name: "GitHub Copilot", color: "#ffffff", icon: "githubcopilot" },
      { name: "Gemini", color: "#4285F4", icon: "googlegemini" },
      { name: "ChatGPT", color: null, icon: null },
      { name: "v0 by Vercel", color: "#ffffff", icon: "vercel" },
      { name: "Perplexity", color: null, icon: "perplexity" },
      { name: "Vercel AI SDK", color: "#ffffff", icon: "vercel" },
      { name: "LangChain", color: null, icon: "langchain" },
      { name: "Prompt Engineering", color: null, icon: null },
      { name: "LLM Orchestration", color: null, icon: null },
      { name: "RAG Pipelines", color: null, icon: null },
      { name: "AI-assisted TDD", color: null, icon: null },
    ],
    frontend: [
      { name: "React", color: null, icon: "react" },
      { name: "Next.js", color: "#ffffff", icon: "nextdotjs" },
      { name: "React Native", color: null, icon: "react" },
      { name: "Angular", color: "#dd0031", icon: "angular" },
      { name: "Vue.js", color: null, icon: "vuedotjs" },
      { name: "Svelte", color: null, icon: "svelte" },
      { name: "Ionic", color: null, icon: "ionic" },
      { name: "Capacitor.js", color: null, icon: "capacitor" },
      { name: "TanStack", color: "#ffffff", icon: "tanstack" },
      { name: "TanStack Query", color: "#ffffff", icon: "tanstack" },
      { name: "Redux/RTK", color: null, icon: "redux" },
      { name: "TailwindCSS", color: null, icon: "tailwindcss" },
      { name: "Shadcn", color: "#ffffff", icon: "radixui" },
      { name: "Material UI", color: null, icon: "mui" },
      { name: "Bootstrap", color: null, icon: "bootstrap" },
      { name: "Mapbox", color: "#ffffff", icon: "mapbox" },
      { name: "AG Grid", color: null, icon: null },
      { name: "HighCharts", color: null, icon: null },
      { name: "Chart.js", color: null, icon: "chartdotjs" },
      { name: "PWA", color: null, icon: "pwa" },
    ],
    backend: [
      { name: "Node.js", color: null, icon: "nodedotjs" },
      { name: "TypeScript", color: null, icon: "typescript" },
      { name: "Express.js", color: "#ffffff", icon: "express" },
      { name: "NestJS", color: null, icon: "nestjs" },
      { name: "Electron.js", color: null, icon: "electron" },
      { name: "SQLite", color: null, icon: "sqlite" },
      { name: "Prisma", color: null, icon: "prisma" },
      { name: "Convex", color: null, icon: null },
      { name: "Firebase", color: null, icon: "firebase" },
      { name: "MongoDB", color: null, icon: "mongodb" },
      { name: "PostgreSQL", color: null, icon: "postgresql" },
      { name: "Axios", color: null, icon: "axios" },
      { name: "Commander", color: null, icon: "gnubash" },
      { name: "Dotenv", color: null, icon: "dotenv" },
      { name: "Handlebars", color: "#ffffff", icon: "handlebarsdotjs" },
      { name: "Winston", color: null, icon: "gnubash" },
      { name: "Zod", color: null, icon: "zod" },
      { name: "Novu", color: "#ffffff", icon: "novu" },
    ],
    devops: [
      { name: "Docker", color: null, icon: "docker" },
      { name: "Kubernetes", color: null, icon: "kubernetes" },
      { name: "GitHub Actions", color: null, icon: "githubactions" },
      { name: "Azure DevOps CI/CD", color: null, icon: null },
      { name: "Vercel", color: "#ffffff", icon: "vercel" },
      { name: "Netlify", color: null, icon: "netlify" },
      { name: "AWS", color: null, icon: null },
      { name: "New Relic", color: null, icon: "newrelic" },
      { name: "PostHog", color: "#ffffff", icon: "posthog" },
      { name: "Last9", color: null, icon: null },
      { name: "Sentry", color: null, icon: "sentry" },
      { name: "SonarQube", color: null, icon: null },
      { name: "Bitrise", color: null, icon: "bitrise" },
    ],
    testing: [
      { name: "Cypress", color: null, icon: "cypress" },
      { name: "Jest", color: null, icon: "jest" },
      { name: "Playwright", color: null, icon: null },
      { name: "Vitest", color: null, icon: "vitest" },
      { name: "Testing Library", color: null, icon: "testinglibrary" },
      { name: "Appium", color: null, icon: "appium" },
      { name: "WebdriverIO", color: null, icon: "webdriverio" },
      { name: "AWS Device Farm", color: null, icon: null },
    ],
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: FolderOpen, label: "Projects" },
  ],
  contact: {
    email: "reachtozahid@gmail.com",
    tel: "+91 8806544670",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/The-Lone-Druid",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/zahid-shaikh-7a4843178/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:reachtozahid@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Shurutech",
      href: "https://shurutech.com",
      badges: ["Current"],
      location: "Remote",
      title: "Senior AI Native Product Engineer",
      logoUrl: "", // Add logo if available
      start: "Dec 2025",
      end: "Present",
      description:
        "Driving AI-native product delivery at Shurutech with a focus on measurable business outcomes, not experimentation. Leading cross-platform execution for logistics and heavy-equipment workflows, including production mobile products shipped to Play Store and App Store, while embedding quality gates, observability, and release discipline to sustain high-velocity delivery.",
    },
    {
      company: "Kiya.ai",
      href: "https://kiya.ai",
      badges: [],
      location: "Remote",
      title: "Senior Associate Consultant",
      logoUrl: "", // Add logo if available
      start: "Feb 2024",
      end: "Nov 2025",
      description:
        "Led enterprise maritime product delivery for global shipping stakeholders, turning fragmented vessel workflows into decision-grade operational platforms. Delivered fleet intelligence and emissions-compliance solutions used across 100+ vessels, helping reduce decision latency by 30%, operational downtime by 40%, and compliance-processing overhead at scale.",
    },
    {
      company: "Rightbrain Infotech",
      href: "http://rightbraininfotech.in/",
      badges: [],
      location: "Remote",
      title: "Senior Software Engineer",
      logoUrl: "", // Add logo if available
      start: "Sep 2021",
      end: "Jan 2024",
      description:
        "Built and scaled multi-domain digital products across finance, logistics, EdTech, and social impact, consistently converting ambiguous business asks into shipping software with clear ROI. Delivered high-retention user experiences, operational workflow automation, and offline-capable systems that improved adoption, reliability, and commercial outcomes.",
    },
    {
      company: "Glixcel",
      href: "", // Add if available
      badges: [],
      location: "Remote",
      title: "Full-Stack Developer",
      logoUrl: "", // Add logo if available
      start: "Aug 2020",
      end: "Sep 2021",
      description:
        "Built an EdTech marketplace from the ground up and helped take it from concept to commercial traction. Delivered core booking, payment, and scheduling flows that connected thousands of tutors and learners and contributed to the company reaching its first profitable quarters.",
    },
  ],
  education: [
    {
      school: "Abeda Inamdar Senior College of Arts, Science and Commerce",
      href: "https://abedainamdarcollege.org.in/",
      degree: "Bachelor of Computer Applications (BCA) — CGPA 9.00/10",
      logoUrl: "", // Add logo if available
      start: "2018",
      end: "2021",
    },
  ],
  projects: [
    // ── MARITIME ────────────────────────────────────────────────────────────
    {
      title: "Hafnia → Real-Time Fleet Intelligence Platform",
      href: "https://hafnia.com/",
      dates: "Feb 2024 – Nov 2025",
      company: "Kiya.ai",
      active: true,
      tags: ["Confidential", "NDA Protected"],
      description:
        "Delivered a unified fleet decision platform for global operations, enabling faster voyage planning, emissions decisions, and day-to-day performance monitoring for shore-side stakeholders.",
      technologies: [
        "React",
        "React Native",
        "TypeScript",
        "Mapbox",
        "AG Grid",
        "HighCharts",
      ],
      impact:
        "Contributed to 30% faster operational decisions for one of the world's largest tanker companies, with measurable fuel-efficiency gains and stronger compliance execution across 100+ vessels.",
      featured: true,
    },
    {
      title: "OceanPass → Maritime Compliance Desktop Platform",
      href: "https://oceanpass.com/",
      dates: "Feb 2025 – Jun 2025",
      company: "Kiya.ai",
      active: true,
      tags: ["Confidential", "NDA Protected"],
      description:
        "Unified fragmented vessel emissions workflows into a validated reporting flow, enabling shipowners, charterers, banks, and investors to act on compliance risk with clearer and faster operational visibility.",
      technologies: [
        "React",
        "Electron.js",
        "TypeScript",
        "SQLite",
        "Prisma",
        "TanStack Query",
      ],
      impact:
        "Drove a 95% reduction in compliance paperwork and 40% lower operational downtime, with outcomes aligned to OceanPass's mission of validated, real-time emissions intelligence for entire fleets.",
      featured: true,
    },
    // ── LOGISTICS ───────────────────────────────────────────────────────────
    {
      title: "SpotFinder → Urban Parking Logistics",
      dates: "Apr 2022 – Oct 2022",
      company: "Rightbrain Infotech",
      active: true,
      description:
        "Created a real-time parking reservation app with instant bookings and payments. Built RBAC admin portal; addressed urban scalability with geolocation APIs and payment gateways, handling high-traffic metro scenarios.",
      technologies: [
        "React",
        "React Native",
        "TypeScript",
        "Google Maps",
        "Stripe",
        "Razorpay",
      ],
      impact:
        "70% less vehicle search time, new revenue for operators; launched in 6 months.",
      featured: false,
    },
    {
      title: "Drivers In India → On-demand Verified Chauffeurs",
      href: "http://driversinindia.com/",
      dates: "Oct 2021 – Nov 2021",
      company: "Rightbrain Infotech",
      active: true,
      description:
        "Revamped the chauffeur booking experience and launched premium service journeys that made 24/7 bookings faster and more reliable for customers and operators.",
      technologies: [
        "WordPress",
        "Angular",
        "Ionic",
        "TypeScript",
        "TailwindCSS",
        "PWA",
      ],
      impact:
        "Improved conversion and service throughput for a chauffeur platform publicly operating since 2007 across major Indian metros (Mumbai, Pune, Delhi NCR, Bangalore, Kolkata, Hyderabad, Thane, Navi Mumbai).",
      featured: false,
    },
    // ── BANKING & FINANCE ───────────────────────────────────────────────────
    {
      title: "BetaRisk CRM → Banking & Corporate Risk",
      href: "https://www.betarisk.com",
      dates: "Nov 2021 – Nov 2022",
      company: "Rightbrain Infotech",
      active: true,
      description:
        "Improved risk-governance execution for institutional users, giving decision-makers more consistent visibility across risk workflows, controls, and reporting.",
      technologies: ["React", "TypeScript", "Material UI", "Cypress", "Jest"],
      impact:
        "Supported institutional risk operations for regulated segments highlighted by BetaRisk (banks, payment providers, pensions, asset managers, and MFIs), improving consistency and confidence in daily committee decisions.",
      featured: false,
    },
    {
      title: "BrightUp → Personal Financial Wellness",
      href: "https://brightup.life",
      dates: "Jun 2022 – Jul 2023",
      company: "Rightbrain Infotech",
      active: true,
      description:
        "Simplified early home-affordability qualification into a guided, low-friction journey so users with strong payment behavior could be evaluated beyond a single credit-score snapshot.",
      technologies: ["Angular", "TypeScript", "Bootstrap", "RxJS", "PWA"],
      impact:
        "Enabled a faster pre-qualification flow with a ~30-second initial estimate and support for users with 12+ months of on-time rent history, helping lenders and applicants move from uncertainty to action sooner.",
      featured: false,
    },
    // ── EDTECH & SOCIAL IMPACT ──────────────────────────────────────────────
    {
      title: "Thinkster → AI Math Coaching for Kids",
      href: "https://hellothinkster.com",
      dates: "Jan 2023 – Sep 2023",
      company: "Rightbrain Infotech",
      active: true,
      description:
        "Built the full student experience for an AI math platform, including interactive lessons and gamification. Used adaptive UX with state management; resolved cross-device compatibility for web/mobile to boost retention.",
      technologies: [
        "Angular",
        "React Native",
        "TypeScript",
        "TailwindCSS",
        "RxJS",
      ],
      impact: "3x student participation, highest-retention feature.",
      featured: true,
    },
    {
      title: "Reading Assistant | Gyan AI",
      href: "https://www.gyanai.com",
      dates: "Jun 2022 – Sep 2023",
      company: "Rightbrain Infotech",
      active: true,
      description:
        "Built a reading-learning experience centered on trust and clarity, making it easier for learners and educators to rely on grounded outputs and structured assistance.",
      technologies: ["React", "TypeScript", "TailwindCSS", "Redux", "PWA"],
      impact:
        "Aligned with Gyan's enterprise-safe positioning and explainable AI direction, contributing to a product experience designed for high-trust use cases where accuracy and traceability are critical.",
      featured: false,
    },
    {
      title: "Safe Water Network → Field Operations Platform",
      href: "https://safewaternetwork.org",
      dates: "Dec 2022 – Sep 2023",
      company: "Rightbrain Infotech",
      active: true,
      description:
        "Modernized field operations so distributed staff could run day-to-day water service workflows with higher reliability in low-connectivity regions and stronger reporting consistency.",
      technologies: [
        "Angular",
        "React Native",
        "TypeScript",
        "PWA",
        "Custom UI Library",
      ],
      impact:
        "Enabled digital operations for a water nonprofit that publicly reports 2M+ people directly reached across 600+ communities (and 60M indirectly reached) by end-2025.",
      featured: false,
    },
    {
      title: "North Eastern University → Academic Management",
      href: "https://www.northeastern.edu/",
      dates: "Apr 2022 – Jun 2023",
      company: "Rightbrain Infotech",
      active: true,
      description:
        "Built portals for students, teachers, and admins to streamline university operations. Automated scheduling and grading; addressed scalability for large user bases with efficient state management.",
      technologies: ["Angular", "TypeScript", "Bootstrap", "RxJS"],
      impact: "35% reduced administrative workload.",
      featured: false,
    },
    {
      title: "Glixcel → Tutor Marketplace EdTech",
      href: "https://www.behance.net/gallery/176474575/Glixcel-Online-Class",
      dates: "Aug 2020 – Sep 2021",
      company: "Glixcel",
      active: true,
      description:
        "Launched a tutor marketplace from zero, with secure payments and scheduling. Scaled to thousands of users; handled integration challenges with legacy tech to achieve profitability.",
      technologies: [
        "HTML/CSS/JS",
        "jQuery",
        "Bootstrap",
        "Flask",
        "Fetch API",
      ],
      impact: "Connected thousands, first profitable quarters for company.",
      featured: false,
    },
    // ── SHURUTECH PRODUCTS ──────────────────────────────────────────────────
    {
      title: "Tenderd Scout → Equipment Intelligence App",
      href: "https://play.google.com/store/apps/details?id=com.tenderd.scout",
      resourceLinks: [
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.tenderd.scout",
        },
        {
          label: "App Store",
          href: "https://apps.apple.com/in/app/tenderd-scout/id6758004007",
        },
      ],
      dates: "Dec 2025 – Present",
      company: "Shurutech",
      active: true,
      description:
        "Delivered a production mobile experience that improved asset visibility, utilization tracking, and decision speed for field operations and management workflows.",
      technologies: [
        "React Native",
        "TypeScript",
        "TanStack Query",
        "Firebase",
        "Novu",
        "PostHog",
        "Last9",
        "Bitrise CI/CD",
        "Appium",
        "WebdriverIO",
        "Jest",
      ],
      impact:
        "Shipped and published across major app stores, giving operations teams a unified and accessible field workflow across both Android and iOS.",
      featured: true,
    },
    {
      title: "Tenderd OpsPro → Operations Workflow App",
      href: "https://play.google.com/store/apps/details?id=com.tenderd.opspro",
      resourceLinks: [
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.tenderd.opspro",
        },
      ],
      dates: "Dec 2025 – Present",
      company: "Shurutech",
      active: true,
      description:
        "Streamlined day-to-day operational execution through a mobile-first flow, reducing coordination friction for tasks, status updates, and on-ground actions.",
      technologies: [
        "React Native",
        "TypeScript",
        "TanStack Query",
        "Firebase",
        "Novu",
        "PostHog",
        "Last9",
        "Bitrise CI/CD",
        "Appium",
        "WebdriverIO",
        "Jest",
      ],
      impact:
        "Enabled faster rollout of standardized on-ground operations through a dedicated app channel built for real-world team usage.",
      featured: true,
    },
    {
      title: "Tenderd → Asset Tracking App",
      href: "https://play.google.com/store/apps/details?id=com.tenderdai.track",
      resourceLinks: [
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.tenderdai.track",
        },
        {
          label: "App Store",
          href: "https://apps.apple.com/in/app/tenderd/id6762028798",
        },
      ],
      dates: "Dec 2025 – Present",
      company: "Shurutech",
      active: true,
      description:
        "Enabled near real-time operational asset tracking and monitoring, reducing delayed updates and improving actionability for distributed field operations.",
      technologies: [
        "React Native",
        "TypeScript",
        "TanStack Query",
        "Firebase",
        "Novu",
        "PostHog",
        "Last9",
        "Bitrise CI/CD",
        "Appium",
        "WebdriverIO",
        "Jest",
      ],
      impact:
        "Deployed as a cross-platform app presence on both Play Store and App Store, improving accessibility and adoption pathways for distributed teams.",
      featured: true,
    },
    // ── PERSONAL PROJECTS ───────────────────────────────────────────────────
    {
      title: "BizDro → AI-Powered Business Card Scanner & CRM",
      href: "https://play.google.com/store/apps/details?id=com.bizdro.businesscardscanner",
      resourceLinks: [
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.bizdro.businesscardscanner",
        },
      ],
      dates: "Nov 2025 – Nov 2025",
      company: "Personal Project",
      active: true,
      description:
        "Shipped to Google Play to help professionals turn business cards into structured contacts quickly, reduce manual follow-up effort, and keep networking workflows organized in one place.",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Firebase Cloud Functions",
        "Gemini GenKit",
        "Google ML Kit",
        "Google Calendar API",
      ],
      impact:
        "100+ downloads on Google Play with 60–70 active users daily; eliminated manual business card transcription with AI extraction, turning paper contacts into structured, searchable CRM data in seconds.",
      featured: true,
    },
    {
      title: "openapi-normalizer → Postman-to-OpenAPI Converter & Normalizer (NPM)",
      href: "https://www.npmjs.com/package/openapi-normalizer",
      dates: "Apr 2026 – Present",
      company: "Personal Project",
      active: true,
      description:
        "Built for API teams that need cleaner handoffs from Postman to production workflows, delivering normalized specs with clearer examples and significantly smaller files so documentation, review, and client generation become more reliable.",
      technologies: [
        "TypeScript",
        "Node.js",
        "OpenAPI",
        "Postman",
        "CLI",
        "pnpm",
      ],
      impact:
        "Bridged Postman-to-OpenAPI workflows with measurable early adoption (7 weekly npm downloads as of May 2026), reducing spec bloat and improving codegen reliability for CI-driven SDK generation.",
      featured: true,
    },
    {
      title: "Kharcha → Personal Expense Tracker",
      href: "https://kharcha.space/",
      dates: "Dec 2025 – Dec 2025",
      company: "Personal Project",
      active: true,
      description:
        "Delivered a clear, low-friction expense tracking experience that helps everyday users monitor subscriptions and stay financially organized without ads or paywalls.",
      technologies: [
        "React",
        "TypeScript",
        "TanStack Stack",
        "Convex",
        "Clerk",
        "TailwindCSS",
        "Recharts",
        "Vitest",
        "PWA",
      ],
      impact:
        "Launched in 3 days and positioned for broad adoption with a free, no-ads experience; supports the platform's public claim of serving thousands of users seeking simpler money tracking.",
      featured: true,
    },
    {
      title: "SonarQube Issues Exporter → NPM Package for Code Quality Metrics",
      href: "https://www.npmjs.com/package/sonarqube-issues-exporter",
      dates: "Aug 2025 – Sep 2025",
      company: "Personal Project",
      active: true,
      description:
        "Created for engineering teams with limited DevOps capacity, enabling faster and more consistent code-quality reporting so stakeholders can review issues, track trends, and act on release risk earlier.",
      technologies: [
        "Node.js",
        "TypeScript",
        "SonarQube API",
        "CLI",
        "Axios",
        "Chart.js",
        "Commander",
        "Dotenv",
        "Handlebars",
        "Winston",
        "Zod",
      ],
      impact:
        "Delivered practical code-quality reporting automation with measurable ongoing adoption (21 weekly npm downloads as of May 2026), reducing friction for teams without dedicated SonarQube infrastructure.",
      featured: false,
    },
    {
      title: "Battery Tools",
      dates: "May 2026 – Present",
      company: "Personal Project",
      active: true,
      description:
        "Built a daily operations platform for my father's battery shop to centralize customer handling, quotations, inventory lookup, service workflows, and billing into one fast, installable web experience.",
      technologies: [
        "React",
        "TypeScript",
        "Firebase",
        "PWA",
        "CRM",
        "RBAC",
        "WCAG",
      ],
      impact:
        "Reduced manual coordination and day-to-day friction through workflow automation, faster lookup tools, and offline-capable operations, improving service speed, accuracy, and repeat-customer experience at the shop.",
      featured: false,
    },
    {
      title: "R Batteries Auto Electrical Works → Local SEO Landing Page",
      href: "https://rbatteries.store/",
      dates: "Nov 2025 – Nov 2025",
      company: "Personal Project",
      active: true,
      description:
        "Improved high-intent local discovery and customer conversion through area-targeted pages and direct booking flows that scaled inbound demand across Pune neighborhoods.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "PWA"],
      impact:
        "Driving 500+ customer calls per month (and growing), significantly boosted Google Maps visibility and local search rankings across 21 Pune neighbourhoods.",
      featured: false,
    },
  ],
} as const;
