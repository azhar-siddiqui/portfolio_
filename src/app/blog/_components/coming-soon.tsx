import Link from "next/link";
import { ArrowLeft, NotebookPen } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionEyebrow } from "@/components/section-eyebrow";

const BLUR_FADE_DELAY = 0.04;

/**
 * Fallback surface rendered when the `blog-enabled` LaunchDarkly flag is OFF.
 *
 * Visual language mirrors the rest of the site: section eyebrow, warm
 * gradient headline, muted body copy on a tinted surface, BlurFade entrance.
 */
export function ComingSoon() {
  return (
    <main className="flex flex-col min-h-dvh px-4 sm:px-6 pb-32 sm:pb-20 pt-16 sm:pt-28">
      <div className="mx-auto w-full max-w-3xl">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <SectionEyebrow index="∞" label="Writing" />
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <h1 className="display-heading max-w-2xl">
            <span className="gradient-text-warm">Writing is</span>{" "}
            <span className="serif-accent text-foreground">on the way</span>.
          </h1>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl">
            The writing room is being set up. Long-form notes on shipping
            product engineering, AI-native delivery, and the systems behind
            reliable software will land here soon.
          </p>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
          <div className="bento-card mt-12 p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <NotebookPen className="h-3 w-3" />
              Coming soon
            </div>
            <h2 className="subsection-heading mt-4">
              First drops cover AI-native delivery and maritime-grade reliability.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
              In the meantime, the projects index has the work itself —
              shipped products, decisions, and trade-offs.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                Back home
              </Link>
              <span aria-hidden className="text-muted-foreground/40">
                ·
              </span>
              <Link
                href="/projects"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
              >
                See the projects
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
}
