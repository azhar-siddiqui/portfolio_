"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
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
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Removed expand functionality to allow direct navigation
  };

  return (
    <Card className="flex flex-col bg-primary/5 p-3 sm:p-4">
      <div className="flex flex-row gap-2">
        {logoUrl && (
          <div className="flex justify-center sm:flex-none">
            <Avatar className="border size-8 sm:size-12 m-auto bg-muted-background dark:bg-foreground">
              <AvatarImage
                src={logoUrl}
                alt={altText}
                className="object-contain"
              />
              <AvatarFallback>{altText[0]}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <div
          className={`flex-grow ${
            logoUrl ? "mt-2 sm:ml-4 sm:mt-0" : ""
          } flex flex-col`}
        >
          <div className="flex items-center justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center font-semibold leading-none text-base">
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  className="flex items-center gap-1 hover:underline text-blue-500"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-1 items-center">
            <div className="text-sm tabular-nums text-muted-foreground text-right">
              {period}
            </div>
            {badges && badges.length > 0
              ? badges.map((badge, index) => (
                  <Badge variant="secondary" className="text-xs" key={index}>
                    {badge}
                  </Badge>
                ))
              : null}
          </div>
          {subtitle && <div className="font-sans text-sm mt-1">{subtitle}</div>}
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
          className="mt-4 text-sm"
        >
          {description}
        </motion.div>
      )}
    </Card>
  );
};
