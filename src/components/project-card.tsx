import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
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
  link,
  image,
  video,
  links,
  className,
  impact,
  company,
}: Props) {
  return (
    <Card
      className={
        "group flex flex-col overflow-hidden transition-all duration-300 ease-out h-full bg-card dark:bg-card/60 backdrop-blur-xl border-l-[3px] border border-l-accent/40 border-border/60 dark:border-border/50 hover:border-primary/30 hover:bg-accent/[0.03] dark:hover:bg-accent/[0.06]"
      }
    >
      {/* Subtle top gradient accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary/60 via-accent/60 to-primary/30" />
      {video && (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none mx-auto h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
      )}
      {image && (
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-48 w-full overflow-hidden object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
      )}
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="space-y-2">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline inline-flex items-center gap-1 group/link"
              >
                {title}
                <ArrowUpRight className="inline h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ) : (
              title
            )}
          </CardTitle>
          {company && (
            <p className="text-sm text-muted-foreground/80 font-medium flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {company}
            </p>
          )}
          <time className="font-sans text-sm text-muted-foreground/70 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {dates}
          </time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground/80 dark:prose-invert leading-relaxed">
            <Markdown>
              {description}
            </Markdown>
          </div>
          {impact && (
            <div className="mt-3 p-3 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/20 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50 transition-all duration-300">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-0.5">Impact</p>
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">{impact}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-4 pb-2">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <Badge
                className="px-2 py-1 text-[11px] font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                variant="outline"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-2">
            {links?.map((link, idx) => (
              <a href={link?.href} key={idx} target="_blank" rel="noopener noreferrer">
                <Badge className="flex gap-1.5 px-3 py-1.5 text-xs font-medium hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105">
                  {link.icon}
                  {link.type}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
