import { HERO_DATA } from "@/data/hero-data";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="w-full min-w-0 pt-6 sm:pt-2">
      <div className="flex w-full min-w-0 items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">
            {HERO_DATA.location}
            <span className="px-2" aria-hidden>
              /
            </span>
            Open to full-time
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
            {HERO_DATA.name}
          </h1>
          <p className="mt-3 max-w-md text-lg leading-snug text-foreground">
            {HERO_DATA.tagline}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {HERO_DATA.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="#work" className="btn-fill h-10">
              Work
            </Link>
            <a
              href="https://centlabspro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line h-10"
            >
              CentLabs Pro
            </a>
            <Link href="#contact" className="btn-line h-10">
              Contact
            </Link>
          </div>
        </div>
        <div className="relative size-16 shrink-0 overflow-hidden rounded-md border border-border sm:size-20">
          <Image
            src={HERO_DATA.avatarUrl}
            alt={HERO_DATA.name}
            fill
            priority
            sizes="80px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
