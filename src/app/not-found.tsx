import { JsonLd } from "@/components/json-ld";
import { DATA } from "@/data/resume";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Page not found",
  description: `That page is not on ${DATA.name}'s site.`,
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pb-16 pt-24 sm:px-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Page not found", path: "/404" },
        ])}
      />
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        That address is not on this site.
      </p>
      <Link href="/" className="btn-fill mt-8 h-10 w-fit">
        Back home
      </Link>
    </main>
  );
}
