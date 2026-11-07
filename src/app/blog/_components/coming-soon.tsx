import Link from "next/link";

export function ComingSoon() {
  return (
    <main className="mx-auto flex min-h-dvh w-full min-w-0 max-w-3xl flex-col px-4 pb-16 pt-20 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">
        Writing
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        No posts yet. The work is on the projects page.
      </p>
      <div className="mt-8 flex gap-4 text-sm">
        <Link
          href="/"
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          Projects
        </Link>
      </div>
    </main>
  );
}
