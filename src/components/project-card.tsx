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
        "flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 ease-out h-full bg-card/50 backdrop-blur-sm border border-border/50 shadow-md p-3 sm:p-4"
      }
    >
      {video && (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
        />
      )}
      {image && (
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-40 w-full overflow-hidden object-cover object-top"
        />
      )}
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-500"
              >
                {title} <ArrowUpRight className="inline h-4 w-4" />
              </a>
            ) : (
              title
            )}
          </CardTitle>
          {company && (
            <p className="text-sm text-muted-foreground font-medium">{company}</p>
          )}
          <time className="font-sans text-sm">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
          {impact && (
            <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                Impact: {impact}
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[12px]"
                variant="default"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <a href={link?.href} key={idx} target="_blank" rel="noopener noreferrer">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px] text-blue-500 hover:underline">
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
