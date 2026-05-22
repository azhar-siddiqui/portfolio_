import Navbar from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import {
  Geist as FontSans,
  Geist_Mono as FontMono,
  Instrument_Serif as FontSerif,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} — Senior Product Engineer`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Senior Product Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    DATA.name,
    "Portfolio",
    "Software Engineer",
    "Web Developer",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  openGraph: {
    title: `${DATA.name} — Senior Product Engineer`,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} — Senior Product Engineer`,
    card: "summary_large_image",
    description: DATA.description,
    creator: "@zaheedshaikh",
  },
  alternates: {
    canonical: DATA.url,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
  width: "device-width",
  initialScale: 1,
};

function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${DATA.url}/#person`,
    name: DATA.name,
    url: DATA.url,
    email: DATA.contact.email,
    image: `${DATA.url}/me.png`,
    description: DATA.description,
    jobTitle: "Senior Product Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Shurutech",
      url: "https://shurutech.com",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Abeda Inamdar Senior College",
      url: "https://abedainamdarcollege.org.in/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressCountry: "IN",
    },
    sameAs: Object.values(DATA.contact.social)
      .map((s) => s.url)
      .filter((url) => !url.startsWith("mailto:")),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full Stack Development",
      "React Native",
      "Angular",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "AWS",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DATA.url}/#website`,
    url: DATA.url,
    name: `${DATA.name} — Senior Product Engineer`,
    description: DATA.description,
    publisher: { "@id": `${DATA.url}/#person` },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${DATA.url}/#profilepage`,
    url: DATA.url,
    name: `${DATA.name} — Portfolio`,
    mainEntity: { "@id": `${DATA.url}/#person` },
    dateCreated: "2024-01-01",
    dateModified: "2026-05-23",
  };

  const payload = JSON.stringify([
    personSchema,
    websiteSchema,
    profilePageSchema,
  ]).replace(/</g, "\\u003c");

  return (
    <div
      hidden
      aria-hidden
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `<script type="application/ld+json">${payload}</script>`,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-full overflow-x-hidden",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable
        )}
      >
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
        >
          <TooltipProvider delayDuration={0}>
            <ScrollProgress />
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
