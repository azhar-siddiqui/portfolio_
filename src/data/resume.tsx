import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Zaheed Shaikh",
  initials: "ZS",
  url: "https://zahidshaik.space",
  location: "Pune, India",
  locationLink: "https://www.google.com/maps/place/pune",
  description:
    "I build software that directly increases revenue, cuts operational costs, ensures regulatory compliance, and scales operations — for maritime giants, logistics operators, banks, EdTech startups, NGOs, e-commerce stores, and everything in between.",
  summary:
    "Over the last 5 years I have delivered 15+ mission-critical products from scratch across 10 completely different industries. Every single one generated measurable ROI: 30–70% faster decisions, 40% less downtime, 3x higher user engagement, or brand-new revenue streams. I work with founders, CXOs and investors who need someone that understands both business problems and how to ship reliable, scalable solutions extremely fast.",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "React Native",
    "TypeScript",
    "Node.js",
    "Electron.js",
    "Angular",
    "Ionic",
    "TanStack Stack",
    "Redux / RTK",
    "TailwindCSS",
    "Shadcn/Radix",
    "Mapbox",
    "AG Grid",
    "HighCharts",
    "PWA",
    "SQLite",
    "Prisma",
    "Docker",
    "GitHub Actions",
    "Cypress",
    "Jest",
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
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
      company: "Centeuno Technologies",
      href: "https://centeuno.com",
      badges: ["Current"],
      location: "Pune, India",
      title: "Co-founder & Lead Product Builder",
      logoUrl: "",
      start: "Nov 2025",
      end: "Present",
      description:
        "Co-building the next profitable software product company from Pune. Currently defining strategic direction and shipping revenue-generating products for Indian and global clients.",
    },
    {
      company: "Kiya.ai",
      href: "https://kiya.ai",
      badges: [],
      location: "Remote",
      title: "Senior Associate Consultant",
      logoUrl: "",
      start: "Feb 2024",
      end: "Nov 2025",
      description:
        "Owned and delivered custom enterprise platforms for global maritime and logistics clients (Hafnia, OceanPass). Enabled offline-first operations across 100+ tankers, automated regulatory reporting (CII, EEDI, Poseidon Principles), cut fleet decision-making time by 30%, reduced downtime 40%, and saved millions in fuel and compliance penalties.",
    },
    {
      company: "Rightbrain Infotech",
      href: "http://rightbraininfotech.in/",
      badges: [],
      location: "Remote",
      title: "Senior Software Engineer",
      logoUrl: "",
      start: "Sep 2021",
      end: "Jan 2024",
      description:
        "Designed and shipped revenue-generating platforms for finance, education, urban logistics, and social-impact organizations. Mentored teams, translated complex stakeholder requirements into working products, and consistently delivered solutions that increased user adoption, operational efficiency, and direct profit.",
    },
    {
      company: "Glixcel",
      href: "",
      badges: [],
      location: "Remote",
      title: "Full-Stack Developer",
      logoUrl: "",
      start: "Aug 2020",
      end: "Sep 2021",
      description:
        "Built and scaled an EdTech marketplace from zero that connected thousands of tutors and students across India, integrated payments, and drove the company’s first profitable quarters.",
    },
  ],

  education: [
    {
      school: "Abeda Inamdar Senior College of Arts, Science and Commerce",
      href: "https://abedainamdarcollege.org.in/",
      degree: "Bachelor of Computer Applications (BCA) — CGPA 9.00/10",
      logoUrl: "",
      start: "2018",
      end: "2021",
    },
  ],

  projects: [
    {
      title: "R Batteries Store",
      href: "https://rbatteries.store/",
      dates: "Nov 2025 – Present",
      active: true,
      description:
        "Built a complete e-commerce platform for Pune’s largest battery retailer. Customers now order Exide, Amaron & Luminous batteries with doorstep delivery in hours. Added reviews, battery-care guides, and instant quotes — driving 3x higher online sales in the first month.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Node.js", "PWA"],
    },
    {
      title: "OceanPass → Emissions Intelligence Platform",
      href: "https://oceanpass.com",
      dates: "Feb 2025 – Jun 2025",
      active: true,
      description:
        "Single-handedly created an offline-first emissions tracking and compliance platform for global shipping fleets. Automated CII, EEDI & Poseidon Principles reporting, reduced manual paperwork by 95%, cut fleet downtime 40%, and made million-dollar penalty avoidance automatic.",
      technologies: [
        "React",
        "Electron.js",
        "TypeScript",
        "SQLite",
        "Prisma",
        "TanStack Query",
      ],
    },
    {
      title: "Hafnia Universe → Global Tanker Operations Platform",
      href: "https://hafnia.com",
      dates: "Feb 2024 – Nov 2025",
      active: true,
      description:
        "Owned end-to-end delivery of a real-time operations dashboard used by one of the world’s largest tanker fleets (100+ vessels). Delivered live maps, weather routing, analytics, and sustainability tracking → accelerated decisions 30%, reduced fuel waste, and improved safety/compliance across oceans.",
      technologies: [
        "React",
        "React Native",
        "TypeScript",
        "Mapbox",
        "AG Grid",
        "HighCharts",
      ],
    },
    {
      title: "SpotFinder → Urban Parking Logistics",
      href: "https://apps.apple.com/in/app/spotfinder-india/id6448868015",
      dates: "Apr 2022 – Oct 2022",
      active: true,
      description:
        "Built a real-time parking reservation system that eliminated 70% of vehicle search time in metro cities and opened a brand-new revenue line for warehouse owners and truck fleet operators. Instant booking + payment + RBAC admin portal, live in 6 months.",
      technologies: [
        "React",
        "React Native",
        "TypeScript",
        "Google Maps",
        "Stripe",
        "Razorpay",
      ],
    },
    {
      title: "Drivers In India → On-demand Verified Chauffeurs",
      href: "http://driversinindia.com/",
      dates: "Oct 2021 – Nov 2021",
      active: true,
      description:
        "Revamped and expanded a professional driver-on-demand booking platform. Delivered new landing pages, responsive web enhancements, and a full cross-platform mobile app — enabling 24/7 verified driver hires, streamlined rental operations, and new revenue from premium services across India.",
      technologies: [
        "WordPress",
        "Angular",
        "Ionic",
        "TypeScript",
        "TailwindCSS",
        "PWA",
      ],
    },
    {
      title: "Thinkster → AI Math Coaching for Kids",
      href: "https://hellothinkster.com",
      dates: "Jan 2023 – Sep 2023",
      active: true,
      description:
        "Created the entire student experience (web + mobile) for an AI-powered math learning platform. Interactive lessons, gamification, and adaptive UX increased student participation 3x and became one of their highest-retention features.",
      technologies: [
        "Angular",
        "React Native",
        "TypeScript",
        "TailwindCSS",
        "RxJS",
      ],
    },
    {
      title: "Safe Water Network → Field Operations Platform",
      href: "https://safewaternetwork.org",
      dates: "Dec 2022 – Sep 2023",
      active: true,
      description:
        "Modernized water-meter reading and consumption tracking for rural & semi-urban India. Upgraded legacy systems into offline-capable mobile + web apps, reduced operational costs, and ensured clean water reached thousands more households reliably.",
      technologies: [
        "Angular",
        "React Native",
        "TypeScript",
        "PWA",
        "Custom UI Library",
      ],
    },
    {
      title: "BrightUp → Personal Financial Wellness",
      href: "https://brightup.life",
      dates: "Jun 2022 – Jul 2023",
      active: true,
      description:
        "Built a subscription and bill management platform that helps users save time and money every month. Mobile-first, beautiful, and instantly showed thousands of users exactly where their money was going.",
      technologies: ["Angular", "TypeScript", "Bootstrap", "RxJS", "PWA"],
    },
    {
      title: "BetaRisk CRM → Banking & Corporate Risk",
      href: "https://www.betarisk.com",
      dates: "Nov 2021 – Nov 2022",
      active: true,
      description:
        "Delivered a full client management and risk analytics platform for banks and large corporates. Risk dashboards, lead tracking, and decision workflows used daily by credit committees.",
      technologies: ["React", "TypeScript", "Material UI", "Cypress", "Jest"],
    },
    {
      title: "Reading Assistant | Gyan AI",
      href: "https://www.gyanai.com",
      dates: "Jun 2022 – Sep 2023",
      active: true,
      description:
        "Built an interactive reading and phonics platform for toddlers and early-school kids. Child-focused design and engagement features significantly improved learning outcomes and parent satisfaction.",
      technologies: ["React", "TypeScript", "TailwindCSS", "Redux", "PWA"],
    },
    {
      title: "North Eastern University → Academic Management",
      href: "https://www.northeastern.edu/",
      dates: "Apr 2022 – Jun 2023",
      active: true,
      description:
        "Created student, teacher, and admin portals that reduced administrative workload by 35% and streamlined course scheduling, attendance, and grading for the entire university.",
      technologies: ["Angular", "TypeScript", "Bootstrap", "RxJS"],
    },
    {
      title: "Glixcel → Tutor Marketplace EdTech",
      href: "https://www.behance.net/gallery/176474575/Glixcel-Online-Class",
      dates: "Aug 2020 – Sep 2021",
      active: true,
      description:
        "Built a tutor-search marketplace from scratch that connected thousands of tutors with students across India, integrated secure payments and real-time scheduling, and drove the company’s first profitable quarters.",
      technologies: [
        "HTML/CSS/JS",
        "jQuery",
        "Bootstrap",
        "Flask",
        "Fetch API",
      ],
    },
  ],
} as const;
