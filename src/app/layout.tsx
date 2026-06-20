import { JsonLd } from "@/components/json-ld";
import Navbar from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  buildPersonSchema,
  buildProfilePageSchema,
  buildRootMetadata,
  buildWebSiteSchema,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import {
  Geist_Mono as FontMono,
  Geist as FontSans,
  Instrument_Serif as FontSerif,
} from "next/font/google";
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

export const metadata = buildRootMetadata();

export const revalidate = 3600;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d;if(s==='dark')d=true;else if(s==='light')d=false;else if(s==='system')d=window.matchMedia('(prefers-color-scheme: dark)').matches;else d=true;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();`,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased max-w-full overflow-x-hidden",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
        )}
      >
        <JsonLd
          data={[
            buildPersonSchema(),
            buildWebSiteSchema(),
            buildProfilePageSchema(),
          ]}
        />
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
