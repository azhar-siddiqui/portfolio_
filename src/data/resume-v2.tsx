import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Zaheed Shaikh",
  initials: "ZS",
  url: "https://zahidshaik.space",
  location: "Pune, Maharashtra, India",
  locationLink: "https://www.google.com/maps/place/pune",

  description:
    "Certified TallyPrime with GST professional with over six years of practical experience managing complete accounting, inventory, billing, and credit operations for an established battery retail and distribution business in Pune.",

  summary:
    "From January 2019 to November 2024, managed the entire back-office of R Batteries Group — a leading retailer and distributor of automotive and inverter batteries with multiple outlets across Pune. Implemented and maintained daily accounting using Tally ERP 9 and later migrated to TallyPrime. Handled GST-compliant billing through Vyapar, stock tracking, purchase entries, party ledgers, credit monitoring, bank reconciliation, and monthly financial reports. Ensured smooth GST filing and zero compliance issues throughout the tenure.",

  avatarUrl: "/me.png",

  skills: [
    "TallyPrime with GST (Certified)",
    "Tally ERP 9 – Complete accounting & inventory",
    "Vyapar – GST billing, barcode invoicing & stock management",
    "GST compliance & return filing",
    "Inventory control & stock reconciliation",
    "Purchase & sales accounting",
    "Party ledger maintenance & outstanding tracking",
    "Bank reconciliation",
    "Preparation of Profit & Loss and Balance Sheet",
    "MS Excel – Advanced formulas, pivot tables & reports",
  ],

  certifications: [
    { name: "TallyPrime with GST", issuer: "Official Tally Education", year: "2023" },
    { name: "Tally ERP 9 – Accounting & Inventory", issuer: "Tally Institute of Learning", year: "2020" },
  ],

  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],

  contact: {
    email: "reachtozahid@gmail.com",
    tel: "+91 8806544670",
    social: {
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
      company: "R Batteries Group",
      location: "Pune, Maharashtra",
      title: "Finance & Operations Manager",
      logoUrl: "",
      href: "",
      start: "January 2019",
      end: "November 2024",
      badges: [],
      description:
        "Managed complete day-to-day accounting, inventory, billing, and credit operations for a well-established battery retail and distribution business with multiple outlets. Used Tally ERP 9 and later TallyPrime for ledger maintenance, stock entries, purchase & sales recording, GST invoicing, and monthly closing. Handled Vyapar for fast counter billing and barcode-based stock movement. Ensured accurate GST returns and timely bank reconciliation.",
    },
  ],

  education: [
    {
      school: "Abeda Inamdar Senior College of Arts, Science and Commerce",
      href: "https://abedainamdarcollege.org.in/",
      degree: "Bachelor of Computer Applications (BCA) – CGPA 9.00/10",
      logoUrl: "",
      start: "2018",
      end: "2021",
    },
  ],

  projects: [
    {
      title: "Migration from Tally ERP 9 to TallyPrime",
      dates: "2023",
      href: "",
      technologies: [],
      description:
        "Successfully migrated the entire company data from Tally ERP 9 to TallyPrime. Reconfigured all ledgers, stock items, GST settings, and outstanding balances. Ensured zero data loss and smooth continuation of daily operations.",
      tools: ["TallyPrime", "Tally ERP 9 Data Migration Tool"],
    },
    {
      title: "Vyapar Implementation for Counter Billing & Stock",
      dates: "2022 – 2023",
      href: "",
      technologies: [],
      description:
        "Rolled out Vyapar software across all retail counters for instant GST invoicing and barcode-based stock entry. Created complete product catalogue with HSN codes and set up sync with TallyPrime for accounting. Enabled faster billing and accurate daily stock updates.",
      tools: ["Vyapar Desktop & Mobile", "Barcode System", "TallyPrime Sync"],
    },
    {
      title: "Monthly GST Return & Reconciliation Process",
      dates: "2019 – 2024 (Ongoing responsibility)",
      href: "",
      technologies: [],
      description:
        "Managed monthly preparation and filing of GSTR-1 and GSTR-3B. Performed regular reconciliation of ITC from GSTR-2A/2B, maintained purchase-sales registers in Tally, and resolved mismatches. Achieved consistent on-time filing with no penalties.",
      tools: ["TallyPrime GST Module", "GST Portal", "Vyapar Reports"],
    },
  ],
} as const;