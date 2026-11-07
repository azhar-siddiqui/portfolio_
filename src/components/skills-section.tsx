"use client";

import { SKILLS_DATA } from "@/data/skills-data";
import { getSimpleIcon } from "@/lib/simple-icon-registry";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type SkillEntry = { name: string; color?: string | null; icon?: string | null };
type CategoryKey = keyof typeof SKILLS_DATA;

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  frontend: "Frontend",
  backend: "Backend",
  testing: "Testing",
  shipping: "Shipping",
  tools: "Coding tools",
};

function SkillChip({ skill, isDark }: { skill: SkillEntry; isDark: boolean }) {
  const icon = skill.icon ? getSimpleIcon(skill.icon) : null;
  const color =
    skill.color && isDark ? skill.color : icon ? `#${icon.hex}` : undefined;

  return (
    <li className="flex items-center gap-2 text-sm text-foreground">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          className="size-3.5 shrink-0"
          fill={color}
          suppressHydrationWarning
          aria-hidden
        >
          <path d={icon.path} />
        </svg>
      ) : null}
      {skill.name}
    </li>
  );
}

export function SkillsSection() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    mounted &&
    (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  return (
    <div>
      <h2 className="text-sm font-medium text-muted-foreground">Stack</h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground">
        What I use on production work. Coding tools speed up the typing. The
        code is still mine.
      </p>
      <div className="mt-6 space-y-6">
        {(Object.keys(SKILLS_DATA) as CategoryKey[]).map((category) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-foreground">
              {CATEGORY_LABELS[category]}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {SKILLS_DATA[category].map((skill) => (
                <SkillChip key={skill.name} skill={skill} isDark={isDark} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
