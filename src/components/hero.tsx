"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlurFade } from "@/components/magicui/blur-fade";
import { HeroMeshBackground } from "@/components/hero-mesh-background";
import { useMagnetic } from "@/hooks/use-magnetic";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, MapPin } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export function Hero() {
  const primaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.18 });
  const ghostRef = useMagnetic<HTMLAnchorElement>({ strength: 0.18 });

  return (
    <section
      id="hero"
      className="relative pt-12 sm:pt-16 pb-4 sm:pb-0"
    >
      <HeroMeshBackground />
      <div className="mx-auto w-full max-w-6xl">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-muted-foreground/60 shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-muted-foreground">
              {DATA.location.toUpperCase()}
            </span>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex items-center gap-4 sm:gap-6 mt-5 sm:mt-10">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute inset-[-3px] rounded-full bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-cyan-500/30 blur-sm"
              />
              <Avatar className="relative size-20 sm:size-28 border border-border/60">
                <AvatarImage
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  className="object-cover"
                />
                <AvatarFallback className="text-[10px] font-medium">
                  {DATA.initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-[2rem] sm:text-6xl md:text-7xl xl:text-8xl font-medium tracking-[-0.04em] leading-[1] sm:leading-[0.95] text-foreground max-w-[14ch] break-words">
              {DATA.name}
            </h1>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="mt-4 sm:mt-8 text-lg sm:text-2xl xl:text-3xl font-light tracking-[-0.015em] text-foreground/80 max-w-[22ch] sm:max-w-[24ch] leading-[1.25] sm:leading-[1.2]">
            Senior Product Engineer{" "}
            <span className="font-serif italic text-foreground/95">
              shipping
            </span>{" "}
            software that pays for itself.
          </p>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <p className="mt-6 sm:mt-10 text-sm sm:text-base text-muted-foreground leading-[1.6] sm:leading-relaxed max-w-2xl">
            {DATA.description}
          </p>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="mt-7 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 sm:gap-4">
            <Link
              ref={primaryRef}
              href="#work"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-11 sm:h-12 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/85 active:bg-foreground/75"
            >
              View work
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-y-0.5" />
            </Link>
            <Link
              ref={ghostRef}
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-11 sm:h-12 border border-border rounded-full font-medium text-sm hover:bg-foreground/[0.06] hover:border-foreground/40 active:bg-foreground/[0.1]"
            >
              Get in touch
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
