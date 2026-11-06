"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { HERO_DATA } from "@/data/hero-data";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function Hero() {
  return (
    <section id="hero" className="relative pb-4 pt-8 sm:pt-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_240px] lg:gap-16">
          <div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <p className="text-sm text-muted-foreground">{HERO_DATA.location}</p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h1 className="mt-3 text-5xl font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[3.5rem]">
                {HERO_DATA.name}
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="mt-4 max-w-xl text-lg leading-snug text-foreground sm:text-xl">
                {HERO_DATA.tagline}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {HERO_DATA.description}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <Link href="#work" className="btn-fill h-11">
                  View work
                  <ArrowDown className="h-3.5 w-3.5" />
                </Link>
                <Link href="#contact" className="btn-line h-11">
                  Get in touch
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </BlurFade>
          </div>

          <BlurFade
            delay={BLUR_FADE_DELAY * 3}
            className="w-full max-w-[220px] lg:justify-self-end"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-card">
              <Image
                src={HERO_DATA.avatarUrl}
                alt={HERO_DATA.name}
                fill
                priority
                sizes="220px"
                className="object-cover"
              />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
