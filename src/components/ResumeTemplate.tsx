import { DATA, sortProjectsCompanyFirst } from "@/data/resume";
import { getSimpleIcon } from "@/lib/simple-icon-registry";
import { alpha, palette } from "@/lib/theme";

type CategoryKey = keyof typeof DATA.skills;

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  ai: "AI Native & LLMs",
  frontend: "Frontend",
  backend: "Backend & Data",
  devops: "DevOps & Cloud",
  testing: "Testing & QA",
};

function getIconSvg(
  iconSlug: string | null | undefined,
  overrideColor: string | null | undefined,
  isDark: boolean,
): string {
  if (!iconSlug) return "";
  const icon = getSimpleIcon(iconSlug);
  if (!icon) return "";
  const fill = overrideColor && isDark ? overrideColor : `#${icon.hex}`;
  return `<svg viewBox="0 0 24 24" width="11" height="11" fill="${fill}" style="display:inline-block;flex-shrink:0;vertical-align:middle" aria-hidden="true"><path d="${icon.path}"/></svg>`;
}

interface ResumeTemplateProps {
  theme: "light" | "dark";
  avatarBase64?: string | null;
}

export function ResumeTemplate({ theme, avatarBase64 }: ResumeTemplateProps) {
  const isDark = theme === "dark";

  const p = isDark ? palette.dark : palette.light;
  const c = {
    bg: p.background,
    surface: p.card,
    fg: p.foreground,
    fgDim: p.foreground,
    muted: p.mutedForeground,
    mutedDim: p.mutedForeground,
    border: p.border,
    rule: p.border,
    primary: p.primary,
    primarySoft: p.secondary,
    accent: p.primary,
    success: p.success,
    accentStrip: p.primary,
    primaryTint: alpha(p.primary, 0.08),
    primaryTintStrong: alpha(p.primary, 0.14),
    primaryBorder: alpha(p.primary, 0.36),
    primaryRing: alpha(p.primary, 0.16),
    primaryUnderline: alpha(p.primary, 0.45),
    successTint: alpha(p.success, 0.1),
    successBorder: alpha(p.success, 0.24),
    surfaceMuted: alpha(p.card, 0.9),
  };

  // ── Featured projects: company first, personal last (same as site) ─
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featuredProjects = sortProjectsCompanyFirst(
    (DATA.projects as unknown as any[]).filter((p) => p.featured),
  ).slice(0, 5);

  // ── Helpers ───────────────────────────────────────────────────
  const eyebrow = (index: string, label: string) => `
    <div class="eyebrow">
      <span class="eyebrow-line"></span>
      <span class="eyebrow-text">${index} · ${label}</span>
    </div>`;

  // Section index labels
  const sections = {
    summary: "01",
    experience: "02",
    skills: "03",
    projects: "04",
    education: "05",
  };

  const socialLinks = Object.entries(DATA.contact.social)
    .filter(([key]) => key !== "Email")
    .map(
      ([, social]) =>
        `<a href="${social.url}" class="meta-link">${social.name}<span class="arrow"> ↗</span></a>`,
    )
    .join('<span class="meta-sep">·</span>');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${DATA.name} — Resume</title>
<style>
  /* ── Reset ─────────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Base ──────────────────────────────────────────────── */
  :root {
    --sans: system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, "Liberation Sans", sans-serif;
    --serif: "Iowan Old Style", "Apple Garamond", "Palatino Linotype", Georgia, "Liberation Serif", serif;
    --mono: ui-monospace, "SF Mono", "Menlo", "Consolas", "Liberation Mono", monospace;
  }
  html, body {
    font-family: var(--sans);
    font-size: 13.5px;
    line-height: 1.55;
    background: ${c.bg};
    color: ${c.fg};
    -webkit-font-smoothing: antialiased;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-feature-settings: "ss01", "cv11", "calt", "kern";
  }
  a { color: inherit; text-decoration: none; }

  /* ── Page ──────────────────────────────────────────────── */
  .page {
    position: relative;
    max-width: 210mm;
    margin: 0 auto;
    padding: 16mm 14mm 14mm;
    background: ${c.bg};
  }
  .page::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${c.accentStrip};
  }

  /* ── Top label ─────────────────────────────────────────── */
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${c.mutedDim};
    margin-bottom: 18px;
  }
  .top-row .dash { color: ${c.primary}; margin-right: 6px; }

  /* ── Header ────────────────────────────────────────────── */
  .header {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid ${c.border};
    margin-bottom: 20px;
  }
  .header-info { flex: 1; min-width: 0; }
  .header-name {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.0;
    margin-bottom: 10px;
    color: ${c.fg};
  }
  .header-tagline {
    font-family: var(--serif);
    font-style: italic;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.4;
    color: ${c.fgDim};
    margin-bottom: 14px;
    max-width: 52ch;
  }
  .header-tagline .accent { color: ${c.primary}; font-style: italic; }
  .meta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 9px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.06em;
    color: ${c.muted};
    text-transform: uppercase;
  }
  .meta-row a { color: ${c.fgDim}; }
  .meta-row .meta-link { color: ${c.fgDim}; font-weight: 500; }
  .meta-row .meta-sep { color: ${c.border}; }
  .meta-row .arrow { color: ${c.primary}; }
  .avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .avatar-wrap::before {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: ${c.primaryRing};
    z-index: 0;
  }
  .avatar {
    position: relative;
    z-index: 1;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${c.primaryBorder};
    box-shadow: 0 0 0 2px ${c.bg};
  }

  /* ── Metrics strip ─────────────────────────────────────── */
  .metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid ${c.border};
    border-top: 2px solid ${c.primary};
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .metric {
    padding: 10px 12px;
    border-right: 1px solid ${c.border};
    background: ${c.surface};
  }
  .metric:last-child { border-right: none; }
  .metric-index {
    font-family: var(--serif);
    font-style: italic;
    font-size: 10px;
    letter-spacing: 0.04em;
    color: ${c.primary};
    opacity: 0.7;
    margin-bottom: 4px;
  }
  .metric-value {
    font-family: var(--mono);
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${c.primary};
    line-height: 1.0;
    margin-bottom: 4px;
  }
  .metric-value .suffix { color: ${c.primary}; }
  .metric-label {
    font-size: 10px;
    line-height: 1.35;
    color: ${c.muted};
  }

  /* ── Section ───────────────────────────────────────────── */
  section { margin-bottom: 22px; }
  section:last-child { margin-bottom: 0; }
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    margin-bottom: 14px;
    border-bottom: 1px solid ${c.border};
  }
  .eyebrow-line {
    width: 14px;
    height: 1px;
    background: ${c.primary};
  }
  .eyebrow-text {
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${c.fg};
  }

  /* ── Summary ───────────────────────────────────────────── */
  .summary {
    width: 100%;
    font-family: var(--serif);
    font-style: italic;
    font-size: 14px;
    line-height: 1.6;
    color: ${c.fgDim};
    padding: 8px 14px;
    border-left: 2px solid ${c.primary};
    background: ${c.primaryTint};
    border-radius: 0 4px 4px 0;
  }

  /* ── Entry (experience / project / education) ──────────── */
  .entry {
    display: grid;
    grid-template-columns: 102px 1fr;
    gap: 18px;
    padding: 11px 0;
    border-top: 1px solid ${c.rule};
  }
  .entry:first-of-type { border-top: none; padding-top: 4px; }
  .entry-rail {
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${c.muted};
    line-height: 1.5;
  }
  .entry-period {
    color: ${c.fgDim};
    font-weight: 500;
    display: block;
    margin-bottom: 3px;
  }
  .entry-loc { display: block; color: ${c.mutedDim}; }
  .entry-body { min-width: 0; }
  .entry-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.3;
    color: ${c.fg};
    margin-bottom: 2px;
  }
  .entry-company {
    font-size: 12.5px;
    color: ${c.primary};
    font-weight: 500;
    margin-bottom: 6px;
  }
  .entry-company a,
  .entry-title a,
  .edu-school a,
  .footer a,
  .meta-link {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    text-decoration-color: ${c.primaryUnderline};
    transition: color 0.15s ease, text-decoration-color 0.15s ease, text-underline-offset 0.15s ease;
  }
  .entry-company a:hover,
  .entry-title a:hover,
  .edu-school a:hover,
  .footer a:hover,
  .meta-link:hover {
    color: ${c.primary};
    text-decoration-color: ${c.primary};
  }
  .entry-company .arrow { font-size: 10px; }
  .entry-desc {
    font-size: 12.5px;
    color: ${c.muted};
    line-height: 1.55;
  }
  .entry-badges {
    display: inline-flex;
    gap: 5px;
    margin-left: 8px;
    vertical-align: middle;
  }
  .badge {
    font-family: var(--mono);
    font-size: 8.5px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 2px 5px;
    border: 1px solid ${c.primary};
    color: ${c.primary};
    border-radius: 3px;
    line-height: 1;
    background: ${c.primaryTintStrong};
  }

  /* ── Project specifics ─────────────────────────────────── */
  .project-impact {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-top: 8px;
    padding: 6px 10px;
    background: ${c.successTint};
    border: 1px solid ${c.successBorder};
    border-left: 3px solid ${c.success};
    border-radius: 0 4px 4px 0;
  }
  .project-impact .label {
    font-family: var(--mono);
    font-size: 8.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${c.success};
    white-space: nowrap;
    flex-shrink: 0;
  }
  .project-impact .value {
    font-family: var(--serif);
    font-style: italic;
    font-size: 12px;
    line-height: 1.45;
    color: ${c.fgDim};
  }
  .project-tech {
    margin-top: 7px;
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${c.muted};
    line-height: 1.7;
  }
  .project-tech .label {
    color: ${c.mutedDim};
    margin-right: 4px;
  }
  .project-tech .tech-sep { color: ${c.border}; margin: 0 4px; }
  .projects-cta {
    margin-top: 12px;
    padding: 11px 13px;
    border: 1px solid ${c.border};
    background: ${c.primaryTint};
    border-left: 3px solid ${c.primary};
    border-radius: 6px;
    font-size: 12px;
    color: ${c.fgDim};
  }
  .projects-cta a {
    color: ${c.primary};
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .projects-cta a:hover {
    opacity: 0.85;
  }
  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }
  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--mono);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${c.fgDim};
    border: 1px solid ${c.border};
    border-radius: 999px;
    background: ${c.primaryTint};
    padding: 3.5px 9px;
    text-decoration: none;
    line-height: 1.4;
  }
  .project-link .arrow { color: ${c.primary}; font-size: 10px; }
  .project-link:hover {
    color: ${c.primary};
    border-color: ${c.primaryBorder};
    background: ${c.primaryTintStrong};
  }

  /* ── Skills ────────────────────────────────────────────── */
  .skills-grid {
    display: grid;
    grid-template-columns: 116px 1fr;
    gap: 14px 18px;
    align-items: start;
  }
  .skills-category-label {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${c.muted};
    line-height: 1.6;
    padding-top: 6px;
    display: flex;
    align-items: flex-start;
    gap: 5px;
  }
  .skills-category-label::before {
    content: "";
    display: inline-block;
    width: 4px;
    min-width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${c.primary};
    margin-top: 5px;
  }
  .skills-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 5px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${c.rule};
  }
  .skills-grid > div:nth-last-child(-n+2) .skills-row,
  .skills-grid > .skills-row:last-child { border-bottom: none; padding-bottom: 0; }
  .skill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10.5px;
    font-weight: 500;
    color: ${c.fgDim};
    padding: 3px 8px;
    border: 1px solid ${c.border};
    border-radius: 6px;
    background: ${c.surfaceMuted};
    line-height: 1.45;
    letter-spacing: 0.01em;
  }
  .skill svg { flex-shrink: 0; }

  /* ── Education ─────────────────────────────────────────── */
  .edu-line {
    display: grid;
    grid-template-columns: 102px 1fr;
    gap: 18px;
    align-items: baseline;
  }
  .edu-school {
    font-size: 13.5px;
    font-weight: 600;
    color: ${c.fg};
    margin-bottom: 2px;
    letter-spacing: -0.005em;
  }
  .edu-degree {
    font-size: 12px;
    color: ${c.muted};
  }
  .edu-degree .accent { color: ${c.primary}; font-weight: 500; }

  /* ── Footer ────────────────────────────────────────────── */
  .footer {
    margin-top: 24px;
    padding-top: 14px;
    border-top: 1px solid ${c.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${c.mutedDim};
  }
  .footer a {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: ${c.primary};
    border: 1px solid ${c.primaryBorder};
    border-radius: 999px;
    padding: 3px 9px;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-decoration: none;
    background: ${c.primaryTint};
  }
  .footer .arrow { margin-left: 1px; }

  /* ── Print safety ──────────────────────────────────────── */
  @media print {
    .page { padding: 12mm 12mm; }
    .entry, .skills-grid, section { page-break-inside: avoid; }
    .header { page-break-after: avoid; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- ════ TOP LABEL ════ -->
  <div class="top-row">
    <div><span class="dash">—</span>Curriculum Vitae</div>
    <div>Updated · ${new Date().toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })}</div>
  </div>

  <!-- ════ HEADER ════ -->
  <header class="header">
    <div class="header-info">
      <h1 class="header-name">${DATA.name}</h1>
      <p class="header-tagline">${DATA.tagline.replace(
        /shipping software that pays for itself/,
        '<span class="accent">shipping software that pays for itself</span>',
      )}</p>
      <div class="meta-row">
        <span>${DATA.location}</span>
        <span class="meta-sep">·</span>
        <a class="meta-link" href="mailto:${DATA.contact.email}">${
          DATA.contact.email
        }</a>
        ${
          DATA.contact.tel
            ? `<span class="meta-sep">·</span><span>${DATA.contact.tel}</span>`
            : ""
        }
        <span class="meta-sep">·</span>
        <a class="meta-link" href="${DATA.url}">Portfolio<span class="arrow"> ↗</span></a>
        <span class="meta-sep">·</span>
        ${socialLinks}
      </div>
    </div>
    ${
      avatarBase64
        ? `<div class="avatar-wrap"><img src="${avatarBase64}" alt="${DATA.name}" class="avatar"></div>`
        : ""
    }
  </header>

  <!-- ════ SUMMARY ════ -->
  <section>
    ${eyebrow(sections.summary, "Summary")}
    <p class="summary">${DATA.summary}</p>
  </section>

  <!-- ════ EXPERIENCE ════ -->
  <section>
    ${eyebrow(sections.experience, "Experience")}
    ${DATA.work
      .map(
        (job) => `
      <div class="entry">
        <div class="entry-rail">
          <span class="entry-period">${job.start}<br>${
            job.end || "Present"
          }</span>
          <span class="entry-loc">${job.location}</span>
        </div>
        <div class="entry-body">
          <div class="entry-title">${job.title}${
            job.badges && job.badges.length > 0
              ? `<span class="entry-badges">${job.badges
                  .map((b: string) => `<span class="badge">${b}</span>`)
                  .join("")}</span>`
              : ""
          }</div>
          <div class="entry-company">${
            job.href
              ? `<a href="${job.href}">${job.company}<span class="arrow"> ↗</span></a>`
              : job.company
          }</div>
          <div class="entry-desc">${job.description}</div>
        </div>
      </div>`,
      )
      .join("")}
  </section>

  <!-- ════ SKILLS ════ -->
  <section>
    ${eyebrow(sections.skills, "Skills")}
    <div class="skills-grid">
      ${Object.entries(DATA.skills)
        .map(
          ([category, skills]) => `
        <div class="skills-category-label">${CATEGORY_LABELS[category as CategoryKey] ?? category}</div>
        <div class="skills-row">
          ${skills
            .map((s) => {
              const iconSvg = getIconSvg(s.icon, s.color, isDark);
              return `<span class="skill">${iconSvg}${s.name}</span>`;
            })
            .join("")}
        </div>`,
        )
        .join("")}
    </div>
  </section>

  <!-- ════ FEATURED PROJECTS ════ -->
  <section>
    ${eyebrow(sections.projects, "Featured Projects")}
    ${featuredProjects
      .map(
        (project) => `
      <div class="entry">
        <div class="entry-rail">
          <span class="entry-period">${project.dates}</span>
          <span class="entry-loc">${project.company}</span>
        </div>
        <div class="entry-body">
          <div class="entry-title">${
            project.href
              ? `<a href="${project.href}">${project.title}<span class="arrow" style="color:${c.primary}"> ↗</span></a>`
              : project.title
          }</div>
          <div class="entry-desc">${project.description}</div>
          ${(() => {
            const resourceLinks = Array.isArray(project.resourceLinks)
              ? project.resourceLinks
              : [];
            const links =
              resourceLinks.length > 0
                ? resourceLinks
                : project.href
                  ? [{ label: "Project Link", href: project.href }]
                  : [];
            if (links.length === 0) return "";
            return `<div class="project-links">${links
              .map(
                (l: { label?: string; href: string }, i: number) =>
                  `<a class="project-link" href="${l.href}">${
                    l.label || `Link ${i + 1}`
                  }<span class="arrow">↗</span></a>`,
              )
              .join("")}</div>`;
          })()}
          ${
            project.impact
              ? `<div class="project-impact"><span class="label">Impact ↗</span><span class="value">${project.impact}</span></div>`
              : ""
          }
          <div class="project-tech">
            <span class="label">Stack</span>${project.technologies
              .map(
                (t: string, i: number) =>
                  `${i > 0 ? '<span class="tech-sep">·</span>' : ""}${t}`,
              )
              .join("")}
          </div>
        </div>
      </div>`,
      )
      .join("")}
    <div class="projects-cta">
      Explore all projects, live demos, and platform links on
      <a href="${DATA.url}/projects">${DATA.url}/projects <span class="arrow">↗</span></a>
    </div>
  </section>

  <!-- ════ EDUCATION ════ -->
  <section>
    ${eyebrow(sections.education, "Education")}
    ${DATA.education
      .map(
        (edu) => `
      <div class="edu-line">
        <div class="entry-rail">
          <span class="entry-period">${edu.start}<br>${edu.end}</span>
        </div>
        <div>
          <div class="edu-school">${
            edu.href
              ? `<a href="${edu.href}">${edu.school}<span class="arrow" style="color:${c.primary}"> ↗</span></a>`
              : edu.school
          }</div>
          <div class="edu-degree">${edu.degree}</div>
        </div>
      </div>`,
      )
      .join("")}
  </section>

  <!-- ════ FOOTER ════ -->
  <div class="footer">
    <div>© ${new Date().getFullYear()} · ${DATA.name}</div>
    <div><a href="${DATA.url}/projects">All projects<span class="arrow"> ↗</span></a></div>
  </div>

</div>
</body>
</html>`;

  return html;
}
