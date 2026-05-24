import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { ProjectsGrid } from "@/components/projects-grid";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-6 py-16 sm:py-24 pb-32">
      <div className="mx-auto w-full max-w-6xl">
        <BlurFade delay={BLUR_FADE_DELAY * 0.5}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground animated-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <SectionEyebrow index="*" label="Projects archive" />
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.03em] leading-[1] max-w-3xl">
            Everything I&apos;ve shipped, indexed.
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {DATA.projects.length} projects across maritime, finance, logistics,
            EdTech and more. Filter by stack or search by keyword.
          </p>
        </BlurFade>

        <ProjectsGrid />
      </div>
    </main>
  );
}
