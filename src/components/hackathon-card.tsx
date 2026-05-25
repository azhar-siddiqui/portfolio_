import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: Props) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
        <Avatar className="size-12 border border-border/60">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1.5">
        {dates && (
          <time className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-muted-foreground tabular-nums">
            {dates}
          </time>
        )}
        <h3 className="text-[15px] sm:text-lg font-medium tracking-[-0.01em] text-foreground leading-snug">
          {title}
        </h3>
        {location && (
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
            {location}
          </p>
        )}
        {description && (
          <p className="text-[13px] sm:text-sm text-muted-foreground/90 leading-relaxed mt-1">
            {description}
          </p>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-3 flex flex-row flex-wrap items-center gap-2">
          {links?.map((link, idx) => (
            <Link key={idx} href={link.href} className="link-pill">
              {link.icon}
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
