import { DATA } from "@/data/resume";

interface ResumeTemplateProps {
  theme: "light" | "dark";
  avatarBase64?: string | null;
}

export function ResumeTemplate({ theme, avatarBase64 }: ResumeTemplateProps) {
  const isDark = theme === "dark";

  // ── Color tokens (aligned with portfolio HSL system) ──────────
  const c = isDark
    ? {
        bg: "#0a0f1e",
        surface: "#111724",
        fg: "#fafbfc",
        fgDim: "#e5e7eb",
        muted: "#9ca3af",
        mutedDim: "#6b7385",
        border: "#1e2533",
        rule: "#161d2a",
        primary: "#5b9eff",
        primarySoft: "#1c2a47",
        secondary: "#b488ff",
        accentStrip: "#5b9eff",
      }
    : {
        bg: "#ffffff",
        surface: "#fafbfc",
        fg: "#0b1020",
        fgDim: "#1f2937",
        muted: "#5b6473",
        mutedDim: "#8a92a0",
        border: "#e3e5ed",
        rule: "#eef0f5",
        primary: "#3b5ff7",
        primarySoft: "#eef2ff",
        secondary: "#7c3aed",
        accentStrip: "#3b5ff7",
      };

  // ── Featured projects only ────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featuredProjects = (DATA.projects as unknown as any[]).filter(
    (p) => p.featured
  );

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
        `<a href="${social.url}" class="meta-link">${social.name}<span class="arrow"> ↗</span></a>`
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
  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid ${c.border};
    flex-shrink: 0;
  }

  /* ── Metrics strip ─────────────────────────────────────── */
  .metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid ${c.border};
    margin-bottom: 24px;
  }
  .metric {
    padding: 10px 12px;
    border-right: 1px solid ${c.border};
  }
  .metric:last-child { border-right: none; }
  .metric-index {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${c.mutedDim};
    margin-bottom: 4px;
  }
  .metric-value {
    font-family: var(--mono);
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${c.fg};
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
    font-family: var(--serif);
    font-style: italic;
    font-size: 14px;
    line-height: 1.6;
    color: ${c.fgDim};
    padding-left: 14px;
    border-left: 2px solid ${c.primary};
    max-width: 76ch;
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
  }

  /* ── Project specifics ─────────────────────────────────── */
  .project-impact {
    font-family: var(--serif);
    font-style: italic;
    font-size: 12.5px;
    line-height: 1.45;
    color: ${c.fgDim};
    margin-top: 7px;
    padding-left: 10px;
    border-left: 2px solid ${c.secondary};
  }
  .project-impact .label {
    font-family: var(--mono);
    font-style: normal;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${c.secondary};
    margin-right: 6px;
  }
  .project-tech {
    margin-top: 8px;
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${c.muted};
    line-height: 1.7;
  }
  .project-tech .label {
    color: ${c.mutedDim};
    margin-right: 4px;
  }
  .project-tech .tech-sep { color: ${c.border}; margin: 0 5px; }

  /* ── Skills ────────────────────────────────────────────── */
  .skills-grid {
    display: grid;
    grid-template-columns: 102px 1fr;
    gap: 18px 18px;
    align-items: baseline;
  }
  .skills-category-label {
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${c.muted};
    line-height: 1.6;
    padding-top: 5px;
  }
  .skills-row {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${c.rule};
  }
  .skills-grid > .skills-row:last-child { border-bottom: none; padding-bottom: 0; }
  .skill {
    font-size: 11px;
    font-weight: 500;
    color: ${c.fgDim};
    padding: 3px 8px;
    border: 1px solid ${c.border};
    border-radius: 4px;
    background: ${c.surface};
    line-height: 1.4;
    letter-spacing: 0.01em;
  }

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
  .footer a { color: ${c.primary}; }
  .footer .arrow { margin-left: 2px; }

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
        '<span class="accent">shipping software that pays for itself</span>'
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
        ? `<img src="${avatarBase64}" alt="${DATA.name}" class="avatar">`
        : ""
    }
  </header>

  <!-- ════ METRICS ════ -->
  <div class="metrics">
    ${DATA.metrics
      .map(
        (m, i) => `
      <div class="metric">
        <div class="metric-index">${String(i + 1).padStart(2, "0")}</div>
        <div class="metric-value">${m.value}<span class="suffix">${
          m.suffix
        }</span></div>
        <div class="metric-label">${m.label}</div>
      </div>`
      )
      .join("")}
  </div>

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
      </div>`
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
        <div class="skills-category-label">${category}</div>
        <div class="skills-row">
          ${skills
            .map((s) => `<span class="skill">${s.name}</span>`)
            .join("")}
        </div>`
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
          ${
            project.impact
              ? `<div class="project-impact"><span class="label">Impact</span>${project.impact}</div>`
              : ""
          }
          <div class="project-tech">
            <span class="label">Stack</span>${project.technologies
              .map(
                (t: string, i: number) =>
                  `${i > 0 ? '<span class="tech-sep">·</span>' : ""}${t}`
              )
              .join("")}
          </div>
        </div>
      </div>`
      )
      .join("")}
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
      </div>`
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
