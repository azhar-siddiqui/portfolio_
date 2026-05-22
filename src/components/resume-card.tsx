"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  location?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  location,
}: ResumeCardProps) => {
  return (
    <article className="group relative border-t border-border/60 first:border-t-0 py-6 sm:py-7 -mx-3 px-3 rounded-md transition-colors hover:bg-foreground/[0.015]">
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4 sm:gap-x-10">
        {/* Period — eyebrow on mobile, left rail on desktop */}
        <div className="flex items-center gap-2 sm:block sm:pt-1">
          <span
            aria-hidden
            className="sm:hidden h-1.5 w-1.5 rounded-full bg-foreground/40"
          />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.14em] text-muted-foreground tabular-nums">
            {period}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-start gap-3">
            {logoUrl && (
              <Avatar className="border border-border/60 size-8 sm:size-9 mt-0.5 bg-muted shrink-0">
                <AvatarImage
                  src={logoUrl}
                  alt={altText}
                  className="object-contain"
                />
                <AvatarFallback className="text-[10px] font-medium">
                  {altText[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] sm:text-lg font-medium tracking-[-0.01em] text-foreground inline-flex items-center flex-wrap gap-x-2 gap-y-1 leading-snug">
                {href ? (
                  <Link
                    href={href}
                    target="_blank"
                    className="inline-flex items-center gap-1 animated-underline"
                  >
                    {title}
                    <ArrowUpRight className="inline h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ) : (
                  title
                )}
                {badges && badges.length > 0 && (
                  <span className="inline-flex flex-wrap gap-1.5">
                    {badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-sm border border-primary/40 text-primary"
                      >
                        {badge}
                      </span>
                    ))}
                  </span>
                )}
              </h3>
              {subtitle && (
                <p className="text-[13px] sm:text-sm text-muted-foreground mt-1 leading-snug">
                  {subtitle}
                </p>
              )}
              {location && (
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70 mt-1.5">
                  {location}
                </p>
              )}
            </div>
          </div>
          {description && (
            <p className="text-[13px] sm:text-base text-muted-foreground/90 leading-relaxed mt-2 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};
