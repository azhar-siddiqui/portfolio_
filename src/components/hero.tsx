"use client";

import { HeroMeshBackground } from "@/components/hero-mesh-background";
import { BlurFade } from "@/components/magicui/blur-fade";
import { HERO_DATA } from "@/data/hero-data";
import { useMagnetic } from "@/hooks/use-magnetic";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function Hero() {
  const primaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.18 });
  const ghostRef = useMagnetic<HTMLAnchorElement>({ strength: 0.18 });

  return (
    <section id="hero" className="relative pt-12 sm:pt-16 pb-4 sm:pb-0">
      <HeroMeshBackground />
      <div className="mx-auto w-full max-w-6xl">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-muted-foreground/60 shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-muted-foreground">
              {HERO_DATA.location.toUpperCase()}
            </span>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex items-center gap-4 sm:gap-6 mt-5 sm:mt-10">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute inset-[-4px] rounded-full bg-primary/15 blur-md"
              />
              <div className="relative size-20 sm:size-28 rounded-full border-2 border-primary/20 shadow-card ring-2 ring-background overflow-hidden">
                <Image
                  src={HERO_DATA.avatarUrl}
                  alt={HERO_DATA.name}
                  width={112}
                  height={112}
                  priority
                  sizes="(max-width: 640px) 80px, 112px"
                  className="size-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-[2rem] sm:text-6xl md:text-7xl xl:text-8xl font-medium tracking-[-0.04em] leading-[1] sm:leading-[0.95] text-foreground max-w-[14ch] break-words">
              {HERO_DATA.name}
            </h1>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
          <p className="mt-2 sm:mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-muted-foreground/55">
            Known as{" "}
            <span className="text-muted-foreground/80">{HERO_DATA.alias}</span>
          </p>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="mt-4 sm:mt-8 text-lg sm:text-2xl xl:text-3xl font-light tracking-[-0.015em] text-foreground/80 max-w-[22ch] sm:max-w-[28ch] leading-[1.25] sm:leading-[1.2]">
            {HERO_DATA.tagline}
          </p>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <p className="mt-6 sm:mt-10 text-sm sm:text-base text-muted-foreground leading-[1.6] sm:leading-relaxed max-w-2xl">
            {HERO_DATA.description}
          </p>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="mt-7 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 sm:gap-4">
            <Link
              ref={primaryRef}
              href="#work"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-11 sm:h-12 bg-primary text-primary-foreground rounded-full font-medium text-sm shadow-soft hover:bg-primary/90 active:bg-primary/80 transition-colors duration-200"
            >
              View work
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-y-0.5" />
            </Link>
            <Link
              ref={ghostRef}
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-11 sm:h-12 border border-border rounded-full font-medium text-sm hover:bg-primary/[0.06] hover:border-primary/35 hover:text-primary active:bg-primary/[0.1] transition-colors duration-200"
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