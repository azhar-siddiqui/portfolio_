import Image from "next/image";
import Markdown from "react-markdown";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { TechBadge } from "@/components/tech-badge";
import { LinkButton } from "@/components/link-button";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  resourceLinks?: readonly {
    label: string;
    href: string;
  }[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  impact?: string;
  company?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  resourceLinks,
  link,
  image,
  video,
  links,
  impact,
  company,
}: Props) {
  const hasAnyLink =
    !!href || (resourceLinks && resourceLinks.length > 0) || (links && links.length > 0);

  return (
    <article className="group flex flex-col h-full overflow-hidden rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_hsl(var(--primary)/0.45)]">
      {(video || image) && (
        <div className="relative w-full overflow-hidden aspect-[16/10] bg-muted/40">
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
        </div>
      )}
      <div className="flex flex-col flex-1 gap-3 p-4 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base sm:text-lg font-medium tracking-[-0.01em] text-foreground flex-1 leading-snug">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-1 animated-underline"
              >
                <span>{title}</span>
                <ArrowUpRight className="inline h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              title
            )}
          </h3>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{dates}</span>
          {company && (
            <>
              <span aria-hidden className="text-muted-foreground/40">·</span>
              <span>{company}</span>
            </>
          )}
        </div>
        <div className="prose max-w-full text-pretty font-sans text-[13px] sm:text-sm text-muted-foreground/90 dark:prose-invert leading-relaxed prose-p:my-0">
          <Markdown>{description}</Markdown>
        </div>
        {impact && (
          <div className="flex items-start gap-2 mt-1">
            <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <span className="text-[13px] sm:text-sm text-foreground/85 leading-snug">
              {impact}
            </span>
          </div>
        )}
        <div className="hidden font-sans text-xs underline print:visible">
          {link?.replace("https://", "").replace("www.", "").replace("/", "")}
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 pt-4 border-t border-border/50">
            {tags.map((tag) => (
              <TechBadge key={tag} name={tag} />
            ))}
          </div>
        )}
        {hasAnyLink && (
          <div className="flex flex-row flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/40">
            {href && <LinkButton href={href} />}
            {resourceLinks?.map((l, idx) =>
              l.href !== href ? (
                <LinkButton key={`r-${idx}`} href={l.href} label={l.label} />
              ) : null
            )}
            {links?.map((l, idx) => (
              <LinkButton key={`l-${idx}`} href={l.href} label={l.type} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
