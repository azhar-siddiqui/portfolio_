"use client";

import { ProjectCard } from "@/components/project-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DATA } from "@/data/resume";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import * as chrono from "chrono-node";
import { useMemo, useState } from "react";

const BLUR_FADE_DELAY = 0.04;

type Filter = "all" | "featured" | string;

const PRIMARY_TECH_FILTERS = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Angular",
];

const PINNED_PROJECT_TITLES = [
  "Tenderd Scout → Equipment Intelligence App",
  "Tenderd OpsPro → Operations Workflow App",
  "Tenderd → Asset Tracking App",
  "Hafnia → Real-Time Fleet Intelligence Platform",
  "OceanPass → Maritime Compliance Desktop Platform",
  "Thinkster → AI Math Coaching for Kids",
];

function parseProjectDate(dates: string): Date {
  const parsed = chrono.parseDate(dates.split(" – ")[0]);
  return parsed ?? new Date(0);
}

export function ProjectsGrid() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  const filteredProjects = useMemo(() => {
    const filtered = DATA.projects.filter((project) => {
      const matchesSearch =
        search === "" ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(search.toLowerCase())
        );

      const matchesFilter =
        filter === "all" ||
        (filter === "featured" && project.featured) ||
        (project.technologies as unknown as string[]).includes(filter);

      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      const aPin = PINNED_PROJECT_TITLES.indexOf(a.title);
      const bPin = PINNED_PROJECT_TITLES.indexOf(b.title);
      const aPersonal = a.company === "Personal Project";
      const bPersonal = b.company === "Personal Project";

      if (aPin !== -1 || bPin !== -1) {
        if (aPin !== -1 && bPin !== -1) return aPin - bPin;
        return aPin !== -1 ? -1 : 1;
      }

      if (aPersonal !== bPersonal) return aPersonal ? 1 : -1;

      if (sortBy === "newest")
        return parseProjectDate(b.dates).getTime() - parseProjectDate(a.dates).getTime();
      if (sortBy === "oldest")
        return parseProjectDate(a.dates).getTime() - parseProjectDate(b.dates).getTime();
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [search, filter, sortBy]);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "featured", label: "Featured" },
    ...PRIMARY_TECH_FILTERS.map((t) => ({ value: t, label: t })),
  ];

  return (
    <>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <div className="mt-12 sm:mt-16 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                placeholder="Search by title, tech, or keyword…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 pl-10 text-sm border-border/60 bg-card/50 backdrop-blur-md rounded-full focus-visible:border-foreground/40"
              />
            </div>
            <Select
              value={sortBy}
              onValueChange={(value) =>
                setSortBy(value as "newest" | "oldest" | "title")
              }
            >
              <SelectTrigger className="w-full sm:w-44 h-11 border-border/60 bg-card/50 backdrop-blur-md rounded-full text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="title">A → Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`h-9 px-4 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200 border ${
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card/50 backdrop-blur-md text-muted-foreground hover:text-foreground border-border/60 hover:border-foreground/30"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </BlurFade>

      <div className="mt-12 sm:mt-16">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-min"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, id) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(id * 0.03, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard
                  href={"href" in project ? project.href : undefined}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  resourceLinks={
                    "resourceLinks" in project ? project.resourceLinks : undefined
                  }
                  impact={project.impact}
                  company={project.company}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="text-center py-24 border-t border-border/60">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                No matches
              </p>
              <p className="mt-3 text-muted-foreground/70 text-sm">
                Try a different search or clear the active filter.
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </>
  );
}
