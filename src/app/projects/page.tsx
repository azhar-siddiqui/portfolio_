"use client";

import { useState, useMemo } from "react";
import { DATA } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3X3, List, Search } from "lucide-react";
import * as chrono from "chrono-node";

type ViewMode = "grid" | "list";

const BLUR_FADE_DELAY = 0.03;

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
    <main className="flex flex-col min-h-screen px-4 py-12 pb-28">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl xl:text-6xl bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent">
              All Projects
            </h1>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore my complete portfolio of projects across various industries
              and technologies.
            </p>
          </div>
        </BlurFade>

        {/* Filters */}
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 h-12 pl-10 text-base border-border/50 focus:border-primary transition-colors bg-card/50"
                />
              </div>
              <div className="flex gap-3 items-center">
                <Select
                  value={sortBy}
                  onValueChange={(value) =>
                    setSortBy(value as "newest" | "oldest" | "title")
                  }
                >
                  <SelectTrigger className="w-full sm:w-48 h-12 border-border/50 font-medium bg-card/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="title">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-1 p-1 bg-card/50 rounded-lg border border-border/50">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-10 w-10"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-10 w-10"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Projects */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-6"
          }
        >
          {filteredProjects.map((project, id) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 3 + id * 0.02} inView>
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                impact={project.impact}
                company={project.company}
              />
            </BlurFade>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-lg font-medium">
                No projects match your filters.
              </p>
              <p className="text-muted-foreground/60 text-sm mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </main>
  );
}
