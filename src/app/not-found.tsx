import { JsonLd } from "@/components/json-ld";
import { DATA } from "@/data/resume";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found",
  description: `The page you requested could not be found on ${DATA.name}'s portfolio.`,
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-dvh items-center justify-center px-4 sm:px-6 pb-32 sm:pb-20 pt-16 sm:pt-28 text-center">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Page Not Found", path: "/404" },
        ])}
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-medium tracking-[-0.03em] text-foreground">
        Page not found
      </h1>
      <p className="mt-4 text-base text-muted-foreground max-w-md leading-relaxed">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="btn-fill mt-8 h-11 px-6"
      >
        Back to home
      </Link>
    </main>
  );
}