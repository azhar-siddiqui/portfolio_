import { SectionEyebrow } from "@/components/section-eyebrow";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.03;

export function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="mx-auto w-full max-w-6xl">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <SectionEyebrow index="05" label="Words" />
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <h2 className="section-heading mb-10 sm:mb-14 max-w-2xl">
            What people I&apos;ve built with say.
          </h2>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {DATA.testimonials.map((t, i) => (
            <BlurFade key={i} delay={BLUR_FADE_DELAY * (3 + i)} inView>
              <figure className="group flex flex-col gap-6 border-t border-border/60 pt-8">
                <span
                  aria-hidden
                  className="font-serif text-7xl leading-none text-primary/30 -mb-4"
                >
                  &ldquo;
                </span>
                <blockquote className="font-serif italic text-xl sm:text-2xl leading-snug text-foreground/90 tracking-[-0.01em]">
                  {t.quote}
                </blockquote>
                <figcaption className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  — {t.name} · {t.role} · {t.company}
                </figcaption>
              </figure>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
