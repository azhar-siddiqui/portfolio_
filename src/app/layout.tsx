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
import { palette, themeCss } from "@/lib/theme";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = buildRootMetadata();

export const revalidate = 3600;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: palette.light.background },
    { media: "(prefers-color-scheme: dark)", color: palette.dark.background },
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
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d;if(s==='dark')d=true;else if(s==='light')d=false;else if(s==='system')d=window.matchMedia('(prefers-color-scheme: dark)').matches;else d=false;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}})();`,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased max-w-full overflow-x-hidden",
          fontSans.variable,
          fontMono.variable,
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
          defaultTheme="light"
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
