import { DATA } from "@/data/resume";
import * as SimpleIcons from "simple-icons";

interface ResumeTemplateProps {
  theme: "light" | "dark";
  avatarBase64?: string | null;
}

export function ResumeTemplate({ theme, avatarBase64 }: ResumeTemplateProps) {
  const isDark = theme === "dark";

  const getIcon = (iconSlug: string | null) => {
    if (!iconSlug) return null;
    const iconKey = `si${iconSlug.charAt(0).toUpperCase()}${iconSlug.slice(
      1
    )}` as keyof typeof SimpleIcons;
    return SimpleIcons[iconKey] || null;
  };

  // ── Color tokens ──────────────────────────────────────────────
  const c = isDark
    ? {
        bg: "#0a0f1e",
        bgCard: "#111827",
        text: "#f1f5f9",
        textSecondary: "#94a3b8",
        accent: "#3b82f6",
        accentLight: "rgba(59,130,246,0.12)",
        border: "#1e293b",
        borderAccent: "rgba(59,130,246,0.30)",
        skillBg: "#1e293b",
        skillBorder: "#334155",
        impactBg: "rgba(16,185,129,0.10)",
        impactBorder: "rgba(16,185,129,0.25)",
        impactText: "#6ee7b7",
        linkHover: "#60a5fa",
      }
    : {
        bg: "#ffffff",
        bgCard: "#f8fafc",
        text: "#111827",
        textSecondary: "#6b7280",
        accent: "#2563eb",
        accentLight: "rgba(37,99,235,0.06)",
        border: "#e5e7eb",
        borderAccent: "rgba(37,99,235,0.25)",
        skillBg: "#f1f5f9",
        skillBorder: "#e2e8f0",
        impactBg: "rgba(16,185,129,0.06)",
        impactBorder: "rgba(16,185,129,0.20)",
        impactText: "#059669",
        linkHover: "#1d4ed8",
      };

  // ── Skills grouped by category ────────────────────────────────
  const skillCategories = Object.entries(DATA.skills).map(
    ([category, skills]) => ({
      category,
      skills: skills.map((skill) => {
        const icon = getIcon(skill.icon);
        const iconSvg = icon
          ? `<svg viewBox="0 0 24 24" style="width:13px;height:13px;margin-right:4px;flex-shrink:0;vertical-align:middle" fill="${
              skill.color && isDark ? skill.color : `#${icon.hex}`
            }"><path d="${icon.path}"/></svg>`
          : "";
        return { name: skill.name, iconSvg };
      }),
    })
  );

  // ── Featured projects ─────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featuredProjects = (DATA.projects as unknown as any[]).filter(
    (p) => p.featured
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${DATA.name} — Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  /* ── Reset & Base ────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    line-height: 1.55;
    background: ${c.bg};
    color: ${c.text};
    -webkit-font-smoothing: antialiased;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  a { color: ${c.accent}; text-decoration: none; }
  a:hover { color: ${c.linkHover}; }

  /* ── Layout ──────────────────────────────────────────────── */
  .page {
    max-width: 210mm;
    margin: 0 auto;
    padding: 10mm 12mm;
  }

  /* ── Header ──────────────────────────────────────────────── */
  .header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 22px;
    padding-bottom: 18px;
    border-bottom: 2px solid ${c.accent};
  }
  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid ${c.borderAccent};
    flex-shrink: 0;
  }
  .header-info { flex: 1; }
  .header-name {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .header-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 12px;
    font-size: 12px;
    color: ${c.textSecondary};
    margin-bottom: 6px;
  }
  .header-meta .dot { color: ${c.border}; }
  .header-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 12px;
    font-weight: 500;
  }

  /* ── Section ─────────────────────────────────────────────── */
  .section { margin-bottom: 18px; }
  .section-title {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: ${c.accent};
    padding-bottom: 6px;
    border-bottom: 2px solid ${c.borderAccent};
    margin-bottom: 12px;
  }

  /* ── Card (reusable block) ───────────────────────────────── */
  .card {
    background: ${c.bgCard};
    border: 1px solid ${c.border};
    border-left: 3px solid ${c.borderAccent};
    border-radius: 6px;
    padding: 12px 14px;
    margin-bottom: 10px;
  }
  .card:last-child { margin-bottom: 0; }

  /* ── Experience / Education row ──────────────────────────── */
  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 4px;
  }
  .entry-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
  }
  .entry-company {
    font-size: 13px;
    font-weight: 500;
    color: ${c.accent};
  }
  .entry-meta {
    font-size: 11.5px;
    color: ${c.textSecondary};
    white-space: nowrap;
    text-align: right;
    flex-shrink: 0;
  }
  .entry-desc {
    font-size: 12.5px;
    color: ${c.textSecondary};
    line-height: 1.55;
    margin-top: 4px;
  }

  /* ── Projects ────────────────────────────────────────────── */
  .project-title {
    font-size: 13.5px;
    font-weight: 600;
    line-height: 1.3;
  }
  .project-company {
    font-size: 11.5px;
    color: ${c.textSecondary};
  }
  .project-desc {
    font-size: 12px;
    color: ${c.textSecondary};
    line-height: 1.5;
    margin-top: 4px;
  }
  .project-impact {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    margin-top: 6px;
    padding: 6px 8px;
    background: ${c.impactBg};
    border: 1px solid ${c.impactBorder};
    border-radius: 4px;
    font-size: 11.5px;
    font-weight: 500;
    color: ${c.impactText};
  }
  .project-impact svg { flex-shrink: 0; margin-top: 1px; }
  .project-tech {
    font-size: 11px;
    color: ${c.textSecondary};
    margin-top: 6px;
    font-style: italic;
  }

  /* ── Skills ──────────────────────────────────────────────── */
  .skill-category {
    margin-bottom: 10px;
  }
  .skill-category:last-child { margin-bottom: 0; }
  .skill-category-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: capitalize;
    color: ${c.text};
    margin-bottom: 6px;
    padding-left: 2px;
  }
  .skill-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .skill-badge {
    display: inline-flex;
    align-items: center;
    background: ${c.skillBg};
    border: 1px solid ${c.skillBorder};
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 11px;
    font-weight: 500;
    color: ${c.text};
    line-height: 1.3;
  }

  /* ── Summary card ────────────────────────────────────────── */
  .summary-text {
    font-size: 12.5px;
    color: ${c.textSecondary};
    line-height: 1.6;
  }

  /* ── Footer link ─────────────────────────────────────────── */
  .portfolio-link {
    display: block;
    text-align: center;
    margin-top: 8px;
    font-size: 11.5px;
    font-weight: 600;
    color: ${c.accent};
    letter-spacing: 0.3px;
  }

  /* ── Print ───────────────────────────────────────────────── */
  @media print {
    body { font-size: 13px; }
    .page { padding: 8mm 10mm; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- ════ HEADER ════ -->
  <header class="header">
    ${
      avatarBase64
        ? `<img src="${avatarBase64}" alt="${DATA.name}" class="avatar">`
        : ""
    }
    <div class="header-info">
      <h1 class="header-name">${DATA.name}</h1>
      <div class="header-meta">
        <span>${DATA.location}</span>
        <span class="dot">•</span>
        <a href="mailto:${DATA.contact.email}">${DATA.contact.email}</a>
        ${
          DATA.contact.tel
            ? `<span class="dot">•</span><span>${DATA.contact.tel}</span>`
            : ""
        }
      </div>
      <div class="header-links">
        ${DATA.url ? `<a href="${DATA.url}">Portfolio ↗</a>` : ""}
        ${Object.entries(DATA.contact.social)
          .filter(([key]) => key !== "Email")
          .map(([, social]) => `<a href="${social.url}">${social.name} ↗</a>`)
          .join("")}
      </div>
    </div>
  </header>

  <!-- ════ SUMMARY ════ -->
  <section class="section">
    <h2 class="section-title">Professional Summary</h2>
    <div class="card">
      <p class="summary-text">${DATA.summary}</p>
    </div>
  </section>

  <!-- ════ EXPERIENCE ════ -->
  <section class="section">
    <h2 class="section-title">Experience</h2>
    ${DATA.work
      .map(
        (job) => `
    <div class="card">
      <div class="entry-header">
        <div>
          <div class="entry-title">${job.title}</div>
          <div class="entry-company">${
            job.href
              ? `<a href="${job.href}">${job.company} ↗</a>`
              : job.company
          }</div>
        </div>
        <div class="entry-meta">${job.start} – ${
          job.end || "Present"
        }<br>${job.location}</div>
      </div>
      <div class="entry-desc">${job.description}</div>
    </div>`
      )
      .join("")}
  </section>

  <!-- ════ EDUCATION ════ -->
  <section class="section">
    <h2 class="section-title">Education</h2>
    ${DATA.education
      .map(
        (edu) => `
    <div class="card">
      <div class="entry-header">
        <div>
          <div class="entry-title">${edu.degree}</div>
          <div class="entry-company">${
            edu.href
              ? `<a href="${edu.href}">${edu.school} ↗</a>`
              : edu.school
          }</div>
        </div>
        <div class="entry-meta">${edu.start} – ${edu.end}</div>
      </div>
    </div>`
      )
      .join("")}
  </section>

  <!-- ════ FEATURED PROJECTS ════ -->
  <section class="section">
    <h2 class="section-title">Featured Projects</h2>
    ${featuredProjects
      .map(
        (project) => `
    <div class="card">
      <div class="entry-header">
        <div>
          <div class="project-title">${
            project.href
              ? `<a href="${project.href}">${project.title} ↗</a>`
              : project.title
          }</div>
          <div class="project-company">${project.company} · ${
          project.dates
        }</div>
        </div>
      </div>
      <div class="project-desc">${project.description}</div>
      ${
        project.impact
          ? `<div class="project-impact">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="${c.impactText}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
        <span>${project.impact}</span>
      </div>`
          : ""
      }
      <div class="project-tech">Tech: ${project.technologies.join(
        " · "
      )}</div>
    </div>`
      )
      .join("")}
    <div class="portfolio-link">
      <a href="${DATA.url}/projects">View all projects at ${
    DATA.url
  }/projects</a>
    </div>
  </section>

  <!-- ════ SKILLS ════ -->
  <section class="section">
    <h2 class="section-title">Skills</h2>
    <div class="card">
      ${skillCategories
        .map(
          ({ category, skills }) => `
      <div class="skill-category">
        <div class="skill-category-title">${category}</div>
        <div class="skill-grid">
          ${skills
            .map(
              (s) =>
                `<span class="skill-badge">${s.iconSvg}${s.name}</span>`
            )
            .join("")}
        </div>
      </div>`
        )
        .join("")}
    </div>
  </section>

</div>
</body>
</html>`;

  return html;
}
