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
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

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
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl uppercase bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            All Projects
          </h1>
          <p className="mt-4 text-muted-foreground">
            Explore my complete portfolio of projects across various industries
            and technologies.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-4 items-center">
              <Select
                value={sortBy}
                onValueChange={(value) =>
                  setSortBy(value as "newest" | "oldest" | "title")
                }
              >
                <SelectTrigger className="w-full sm:w-48">
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
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
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
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects match your filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
