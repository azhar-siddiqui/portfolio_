"use client";

import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { useTheme } from "next-themes";
import { useState } from "react";
import * as SimpleIcons from "simple-icons";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { theme } = useTheme();

  const categories = Object.keys(DATA.skills);
  const allSkills =
    selectedCategory === "all"
      ? Object.entries(DATA.skills).flatMap(([cat, skills]) =>
          skills.map((skill) => ({ skill, category: cat }))
        )
      : DATA.skills[selectedCategory as keyof typeof DATA.skills]?.map(
          (skill) => ({ skill, category: selectedCategory })
        ) || [];

  const getIcon = (iconSlug: string | null) => {
    if (!iconSlug) return null;
    const iconKey = `si${iconSlug.charAt(0).toUpperCase()}${iconSlug.slice(
      1
    )}` as keyof typeof SimpleIcons;
    return SimpleIcons[iconKey] || null;
  };

  return (
    <section id="skills">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl font-black mb-8 text-left uppercase tracking-tight bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent relative inline-block">
          Skills
          <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </h2>
        <div className="flex flex-wrap gap-3 mb-8">
          <Badge
            variant={selectedCategory === "all" ? "default" : "secondary"}
            className={`cursor-pointer px-5 py-2.5 text-base font-semibold transition-all duration-300 rounded-lg ${
              selectedCategory === "all"
                ? "bg-primary hover:bg-primary/90 text-white shadow-lg scale-105 border-0"
                : "hover:scale-105 hover:bg-primary/10"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              className={`cursor-pointer px-5 py-2.5 text-base font-semibold capitalize transition-all duration-300 rounded-lg ${
                selectedCategory === cat
                  ? "bg-primary hover:bg-primary/90 text-white shadow-lg scale-105 border-0"
                  : "hover:scale-105 hover:bg-primary/10"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {allSkills.map(({ skill, category }, id) => {
            const icon = getIcon(skill.icon);
            return (
              <Badge
                key={id}
                variant="outline"
                className="px-4 py-3 text-base font-medium transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 hover:border-primary/50 hover:shadow-lg flex items-center gap-2.5 cursor-default group"
              >
                {icon ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                    fill={
                      skill.color && theme === "dark"
                        ? skill.color
                        : `#${icon.hex}`
                    }
                  >
                    <path d={icon.path} />
                  </svg>
                ) : null}
                {skill.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </section>
  );
}
