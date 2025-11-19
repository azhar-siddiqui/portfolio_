import { DATA } from "@/data/resume";

interface ResumeTemplateProps {
  theme: "light" | "dark";
}

export function ResumeTemplate({ theme }: ResumeTemplateProps) {
  const isDark = theme === "dark";

  const colors = {
    light: {
      bg: "#ffffff",
      text: "#1f2937",
      muted: "#6b7280",
      accent: "#2563eb",
      border: "#e5e7eb",
      cardBg: "#f9fafb",
      skillBg: "#f3f4f6",
    },
    dark: {
      bg: "#0f172a",
      text: "#f1f5f9",
      muted: "#94a3b8",
      accent: "#60a5fa",
      border: "#334155",
      cardBg: "#1e293b",
      skillBg: "#1e293b",
    },
  };

  const c = isDark ? colors.dark : colors.light;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${DATA.name} - Resume</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          darkMode: 'class',
          theme: {
            extend: {
              fontFamily: {
                'inter': ['Inter', 'system-ui', 'sans-serif'],
              },
              colors: {
                accent: '${c.accent}',
              }
            }
          }
        }
      </script>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', system-ui, sans-serif;
          background-color: ${c.bg};
          color: ${c.text};
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
        .resume-container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 10mm;
          background-color: ${c.bg};
          box-sizing: border-box;
        }
        .section-title {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: ${c.accent};
          margin-bottom: 12px;
          padding-bottom: 4px;
          border-bottom: 2px solid ${c.accent};
        }
        .skill-tag {
          display: inline-block;
          background-color: ${c.skillBg};
          color: ${c.text};
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          margin: 2px 4px 2px 0;
          border: 1px solid ${c.border};
        }
        .link {
          color: ${c.accent};
          text-decoration: none;
          font-weight: 500;
        }
        .link:hover {
          text-decoration: underline;
        }
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid ${c.accent};
          object-fit: cover;
        }
        @media print {
          body { print-color-adjust: exact; }
        }
      </style>
    </head>
    <body class="${isDark ? 'dark' : ''}">
      <div class="resume-container">
        <!-- Header -->
        <header class="flex justify-between items-start mb-8">
          <div class="flex-1">
            <h1 class="text-4xl font-bold tracking-tight mb-2" style="color: ${c.text};">${DATA.name}</h1>
            <div class="flex flex-wrap items-center gap-3 text-sm mb-3" style="color: ${c.muted};">
              <span>${DATA.location}</span>
              <span>•</span>
              <a href="mailto:${DATA.contact.email}" class="link">${DATA.contact.email}</a>
              ${DATA.contact.tel ? `<span>•</span><span>${DATA.contact.tel}</span>` : ''}
            </div>
            <div class="flex flex-wrap gap-4 text-sm">
              ${DATA.url ? `<a href="${DATA.url}" class="link">Portfolio</a>` : ''}
              ${Object.entries(DATA.contact.social).map(([key, social]) => 
                `<a href="${social.url}" class="link">${social.name}</a>`
              ).join('')}
            </div>
          </div>
          ${DATA.avatarUrl ? `<img src="${DATA.avatarUrl}" alt="${DATA.name}" class="avatar ml-6">` : ''}
        </header>

        <!-- Summary -->
        <section class="mb-8">
          <h2 class="section-title">Professional Summary</h2>
          <p class="text-sm leading-relaxed" style="color: ${c.text};">${DATA.summary}</p>
        </section>

        <!-- Experience -->
        <section class="mb-8">
          <h2 class="section-title">Experience</h2>
          ${DATA.work.map(job => `
            <div class="mb-6">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-semibold" style="color: ${c.text};">${job.title}</h3>
                  <p class="text-base font-medium" style="color: ${c.accent};">
                    ${job.href ? `<a href="${job.href}" class="link">${job.company} →</a>` : job.company}
                  </p>
                </div>
                <span class="text-sm italic" style="color: ${c.muted};">${job.start} – ${job.end || 'Present'} | ${job.location}</span>
              </div>
              <p class="text-sm leading-relaxed" style="color: ${c.text};">${job.description}</p>
            </div>
          `).join('')}
        </section>

        <!-- Education -->
        <section class="mb-8">
          <h2 class="section-title">Education</h2>
          ${DATA.education.map(edu => `
            <div class="mb-4">
              <div class="flex justify-between items-start mb-1">
                <div>
                  <h3 class="text-base font-semibold" style="color: ${c.text};">${edu.degree}</h3>
                  <p class="text-sm font-medium" style="color: ${c.accent};">
                    ${edu.href ? `<a href="${edu.href}" class="link">${edu.school} →</a>` : edu.school}
                  </p>
                </div>
                <span class="text-sm italic" style="color: ${c.muted};">${edu.start} – ${edu.end}</span>
              </div>
            </div>
          `).join('')}
        </section>

        <!-- Skills -->
        <section class="mb-8">
          <h2 class="section-title">Skills</h2>
          <div class="flex flex-wrap gap-1">
            ${DATA.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </section>

        <!-- Projects -->
        <section class="mb-8">
          <h2 class="section-title">Projects</h2>
          ${DATA.projects.map(project => `
            <div class="mb-5">
              <a href="${project.href}" class="link">
                <h3 class="text-base font-semibold mb-1">${project.title} →</h3>
              </a>
              <p class="text-xs mb-2" style="color: ${c.muted};">${project.dates}</p>
              <p class="text-sm leading-relaxed mb-2" style="color: ${c.text};">${project.description}</p>
              <p class="text-xs italic" style="color: ${c.muted};">Tech: ${project.technologies.join(' • ')}</p>
            </div>
          `).join('')}
        </section>
      </div>
    </body>
    </html>
  `;

  return html;
}