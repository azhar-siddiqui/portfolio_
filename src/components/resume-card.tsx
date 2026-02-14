"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

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
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Removed expand functionality to allow direct navigation
  };

  return (
    <Card className="group flex flex-col bg-card dark:bg-card/60 backdrop-blur-xl border-l-[3px] border border-l-primary/40 border-border/60 dark:border-border/50 transition-all duration-300 p-5 sm:p-6 hover:border-primary/30 hover:bg-primary/[0.03] dark:hover:bg-primary/[0.06]">
      <div className="flex flex-row gap-4">
        {logoUrl && (
          <div className="flex justify-center sm:flex-none">
            <Avatar className="border-2 border-border/50 size-10 sm:size-14 m-auto bg-muted transition-all duration-300 group-hover:border-primary/50 group-hover:scale-110">
              <AvatarImage
                src={logoUrl}
                alt={altText}
                className="object-contain"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 font-semibold">{altText[0]}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <div
          className={`flex-grow ${
            logoUrl ? "sm:ml-2" : ""
          } flex flex-col`}
        >
          <div className="flex items-start justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center font-bold leading-none text-base sm:text-lg group-hover:text-primary transition-colors">
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  className="hover:underline inline-flex items-center gap-1 group/link"
                >
                  {title}
                  <ArrowUpRight className="inline h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              ) : (
                title
              )}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 items-center">
            <div className="text-sm font-medium tabular-nums text-muted-foreground/80">
              {period}
            </div>
            {badges && badges.length > 0
              ? badges.map((badge, index) => (
                  <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20" key={index}>
                    {badge}
                  </Badge>
                ))
              : null}
          </div>
          {subtitle && <div className="font-sans text-sm sm:text-base mt-2 font-medium text-foreground/90">{subtitle}</div>}
          {location && <div className="font-sans text-sm text-muted-foreground/70 mt-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>}
        </div>
      </div>
      {description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-4 text-sm sm:text-base text-muted-foreground/80 leading-relaxed"
        >
          {description}
        </motion.div>
      )}
    </Card>
  );
};
