"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DATA,
  compareProjectsCompanyFirst,
} from "@/data/resume";
import { Search } from "lucide-react";
import * as chrono from "chrono-node";
import { useMemo, useState } from "react";

type Filter = "all" | "featured" | string;

const PRIMARY_TECH_FILTERS = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
];

function parseProjectDate(dates: string): Date {
  const parsed = chrono.parseDate(dates.split(" - ")[0] ?? dates);
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
          tech.toLowerCase().includes(search.toLowerCase()),
        );

      const matchesFilter =
        filter === "all" ||
        (filter === "featured" && project.featured) ||
        (project.technologies as readonly string[]).includes(filter);

      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      const companyOrder = compareProjectsCompanyFirst(a, b);
      if (companyOrder !== 0) return companyOrder;

      if (sortBy === "newest") {
        return (
          parseProjectDate(b.dates).getTime() -
          parseProjectDate(a.dates).getTime()
        );
      }
      if (sortBy === "oldest") {
        return (
          parseProjectDate(a.dates).getTime() -
          parseProjectDate(b.dates).getTime()
        );
      }
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [search, filter, sortBy]);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "featured", label: "Client work" },
    ...PRIMARY_TECH_FILTERS.map((tech) => ({ value: tech, label: tech })),
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search title or stack"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 border-border bg-background pl-10 text-sm"
          />
        </div>
        <Select
          value={sortBy}
          onValueChange={(value) =>
            setSortBy(value as "newest" | "oldest" | "title")
          }
        >
          <SelectTrigger className="h-10 w-full border-border bg-background text-sm sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="title">A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={
                active
                  ? "h-8 border border-foreground bg-foreground px-3 text-sm text-background"
                  : "h-8 border border-border px-3 text-sm text-muted-foreground hover:text-foreground"
              }
              style={{ borderRadius: "var(--radius)" }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="mt-10 border-t border-border py-10 text-sm text-muted-foreground">
          Nothing matches that search.
        </p>
      ) : (
        <ol className="mt-6 border-t border-border">
          {filteredProjects.map((project) => {
            const href = "href" in project ? project.href : undefined;
            return (
              <li key={project.title} className="border-b border-border py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-base font-semibold text-foreground">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h2>
                  <p className="text-sm text-muted-foreground">{project.dates}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {project.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.impact}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {project.technologies.join(" · ")}
                </p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
