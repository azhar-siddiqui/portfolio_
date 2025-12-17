"use client";

import { useState, useMemo } from "react";
import { DATA } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3X3, List, Filter } from "lucide-react";
import * as chrono from "chrono-node";

type ViewMode = "grid" | "list";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Parse date from project dates string
  const parseProjectDate = (dates: string) => {
    // Extract start date, e.g., "Dec 2025" -> "Dec 2025"
    const startDateStr = dates.split(" – ")[0];
    const parsed = chrono.parseDate(startDateStr);
    return parsed || new Date(0); // fallback
  };

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = DATA.projects.filter((project) => {
      const matchesSearch =
        search === "" ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(search.toLowerCase())
        );

      const matchesTechs =
        selectedTechs.length === 0 ||
        selectedTechs.every((tech) =>
          (project.technologies as unknown as string[]).includes(tech)
        );

      return matchesSearch && matchesTechs;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          parseProjectDate(b.dates).getTime() -
          parseProjectDate(a.dates).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          parseProjectDate(a.dates).getTime() -
          parseProjectDate(b.dates).getTime()
        );
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [search, selectedTechs, sortBy]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <main className="flex flex-col min-h-screen px-4 py-12 pb-24">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl xl:text-7xl uppercase bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            All Projects
          </h1>
          <p className="mt-4 text-muted-foreground/90 text-lg max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Explore my complete portfolio of projects across various industries
            and technologies.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-12 text-base border-2 focus:border-primary transition-colors"
            />
            <div className="flex gap-3 items-center">
              <Select
                value={sortBy}
                onValueChange={(value) =>
                  setSortBy(value as "newest" | "oldest" | "title")
                }
              >
                <SelectTrigger className="w-full sm:w-52 h-12 border-2 font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="lg"
                onClick={() => setViewMode("grid")}
                className="h-12 px-4 transition-all duration-300 hover:scale-105"
              >
                <Grid3X3 className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="lg"
                onClick={() => setViewMode("list")}
                className="h-12 px-4 transition-all duration-300 hover:scale-105"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-500"
              : "space-y-6 animate-in fade-in duration-500"
          }
        >
          {filteredProjects.map((project, id) => (
            <ProjectCard
              key={project.title}
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              impact={project.impact}
              company={project.company}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 animate-in fade-in duration-500">
            <svg className="w-20 h-20 mx-auto mb-4 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-muted-foreground/80 text-lg font-medium">
              No projects match your filters.
            </p>
            <p className="text-muted-foreground/60 text-sm mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
