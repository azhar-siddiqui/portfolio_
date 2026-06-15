"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { DATA } from "@/data/resume";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import * as SimpleIcons from "simple-icons";

const BLUR_FADE_DELAY = 0.03;

type SkillEntry = { name: string; color?: string | null; icon?: string | null };
type CategoryKey = keyof typeof DATA.skills;

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  ai: "AI Native & LLMs",
  frontend: "Frontend",
  backend: "Backend & Data",
  devops: "DevOps & Cloud",
  testing: "Testing & QA",
};

function getIcon(iconSlug?: string | null) {
  if (!iconSlug) return null;
  const iconKey = `si${iconSlug.charAt(0).toUpperCase()}${iconSlug.slice(
    1,
  )}` as keyof typeof SimpleIcons;
  return (SimpleIcons[iconKey] as { path: string; hex: string }) || null;
}

function SkillChip({
  skill,
  isDark,
  delay,
}: {
  skill: SkillEntry;
  isDark: boolean;
  delay: number;
}) {
  const icon = getIcon(skill.icon);
  const color =
    skill.color && isDark ? skill.color : icon ? `#${icon.hex}` : undefined;

  return (
    <BlurFade delay={delay} inView>
      <div className="group flex items-center gap-2 rounded-lg border border-border/70 bg-card/70 backdrop-blur-sm px-3 py-2 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.04]">
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
            fill={color}
            suppressHydrationWarning
            aria-hidden
          >
            <path d={skill.icon ? icon.path : ""} />
          </svg>
        ) : null}
        <span className="text-xs sm:text-sm font-medium text-foreground/85">
          {skill.name}
        </span>
      </div>
    </BlurFade>
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
    <section id="skills">
      <div className="mx-auto w-full max-w-6xl">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <SectionEyebrow index="04" label="Toolkit" />
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <h2 className="section-heading mb-10 sm:mb-12 max-w-2xl">
            The stack I reach for, by problem space.
          </h2>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/70 border border-border/70 rounded-xl overflow-hidden shadow-card">
          {(Object.keys(DATA.skills) as CategoryKey[]).map((cat, ci, all) => {
            const skills = DATA.skills[cat] as readonly SkillEntry[];
            const isOrphan = all.length % 2 !== 0 && ci === all.length - 1;
            return (
              <BlurFade
                key={cat}
                delay={BLUR_FADE_DELAY * (3 + ci)}
                inView
                className={isOrphan ? "md:col-span-2" : undefined}
              >
                <div className="bg-card/80 backdrop-blur-md p-6 sm:p-8 h-full flex flex-col gap-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground/60 tabular-nums">
                      {String(skills.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <SkillChip
                        key={skill.name}
                        skill={skill}
                        isDark={isDark}
                        delay={BLUR_FADE_DELAY * (4 + ci) + i * 0.01}
                      />
                    ))}
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
