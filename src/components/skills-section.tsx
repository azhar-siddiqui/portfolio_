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
        <h2 className="text-3xl font-extrabold mb-6 text-left uppercase tracking-wide bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge
            variant={selectedCategory === "all" ? "default" : "secondary"}
            className="cursor-pointer px-4 py-2 text-base"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2 text-base capitalize"
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
                className="px-4 py-2 text-base transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 hover:border-primary/40 flex items-center gap-2"
              >
                {icon ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
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
