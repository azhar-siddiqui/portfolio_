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
                accent: '#3b82f6',
              }
            }
          }
        }
      </script>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        html, body {
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: ${isDark ? "#020617" : "#ffffff"};
          color: ${isDark ? "#f8fafc" : "#111827"};
        }
        .resume-container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 10mm;
          box-sizing: border-box;
        }
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
        }
        @media print {
          body { print-color-adjust: exact; }
        }
      </style>
    </head>
    <body class=" text-gray-900 dark:text-slate-50 ${isDark ? "dark" : ""}">
      <div class="resume-container">
        <!-- Header -->
        <header class="flex items-start gap-8 mb-8">
          ${
            avatarBase64
              ? `<img src="${avatarBase64}" alt="${DATA.name}" class="avatar border-4 border-accent flex-shrink-0">`
              : ""
          }
          <div class="flex-1">
            <h1 class="text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-slate-50">${
              DATA.name
            }</h1>
            <div class="flex flex-wrap items-center gap-3 text-sm mb-3 text-gray-600 dark:text-slate-400">
              <span>${DATA.location}</span>
              <span>•</span>
              <a href="mailto:${
                DATA.contact.email
              }" class="text-accent font-medium">${DATA.contact.email}</a>
              ${
                DATA.contact.tel
                  ? `<span>•</span><span>${DATA.contact.tel}</span>`
                  : ""
              }
            </div>
            <div class="flex flex-wrap gap-4 text-sm">
              ${
                DATA.url
                  ? `<a href="${DATA.url}" class="text-accent font-medium">Portfolio</a>`
                  : ""
              }
              ${Object.entries(DATA.contact.social)
                .map(
                  ([key, social]) =>
                    `<a href="${social.url}" class="text-accent font-medium">${social.name}</a>`
                )
                .join("")}
            </div>
          </div>
        </header>

        <!-- Summary -->
        <section class="mb-5">
          <h2 class="text-lg font-bold uppercase tracking-wider text-accent mb-4 pb-2 border-b-2 border-accent">Professional Summary</h2>
          <div class="bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30 dark:from-indigo-700/15 dark:via-purple-700/10 dark:to-pink-700/15 backdrop-blur-sm border border-gray-200/20 dark:border-slate-700/20 rounded-lg p-4">
            <p class="text-sm leading-relaxed text-gray-900 dark:text-slate-50">${
              DATA.summary
            }</p>
          </div>
        </section>

        <!-- Experience -->
        <section class="mb-5">
          <h2 class="text-lg font-bold uppercase tracking-wider text-accent mb-4 pb-2 border-b-2 border-accent">Experience</h2>
          ${DATA.work
            .map(
              (job) => `
            <div class="bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30 dark:from-indigo-700/15 dark:via-purple-700/10 dark:to-pink-700/15 backdrop-blur-sm border border-gray-200/20 dark:border-slate-700/20 rounded-lg p-4 mb-4">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-slate-50">${
                    job.title
                  }</h3>
                  <p class="text-base font-medium text-accent">
                    ${
                      job.href
                        ? `<a href="${job.href}" class="text-accent">${job.company} →</a>`
                        : job.company
                    }
                  </p>
                </div>
                <span class="text-sm italic text-gray-600 dark:text-slate-400">${
                  job.start
                } – ${job.end || "Present"} | ${job.location}</span>
              </div>
              <p class="text-sm leading-relaxed text-gray-900 dark:text-slate-50">${
                job.description
              }</p>
            </div>
          `
            )
            .join("")}
        </section>

        <!-- Education -->
        <section class="mb-5">
          <h2 class="text-lg font-bold uppercase tracking-wider text-accent mb-4 pb-2 border-b-2 border-accent">Education</h2>
          ${DATA.education
            .map(
              (edu) => `
            <div class="bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30 dark:from-indigo-700/15 dark:via-purple-700/10 dark:to-pink-700/15 backdrop-blur-sm border border-gray-200/20 dark:border-slate-700/20 rounded-lg p-4 mb-4">
              <div class="flex justify-between items-start mb-1">
                <div>
                  <h3 class="text-base font-semibold text-gray-900 dark:text-slate-50">${
                    edu.degree
                  }</h3>
                  <p class="text-sm font-medium text-accent">
                    ${
                      edu.href
                        ? `<a href="${edu.href}" class="text-accent">${edu.school} →</a>`
                        : edu.school
                    }
                  </p>
                </div>
                <span class="text-sm italic text-gray-600 dark:text-slate-400">${
                  edu.start
                } – ${edu.end}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </section>

        <!-- Projects -->
        <section class="mb-5">
          <h2 class="text-lg font-bold uppercase tracking-wider text-accent mb-4 pb-2 border-b-2 border-accent">Projects</h2>
          <div class="space-y-4">
            ${DATA.projects
              .filter((project) => project.featured)
              .map(
                (project) => `
              <div class="bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30 dark:from-indigo-700/15 dark:via-purple-700/10 dark:to-pink-700/15 backdrop-blur-sm border border-gray-200/20 dark:border-slate-700/20 rounded-lg p-4">
                <a href="${project.href}" class="text-accent">
                  <h3 class="text-base font-semibold mb-1">${
                    project.title
                  } →</h3>
                </a>
                <p class="text-xs mb-1 text-gray-600 dark:text-slate-400">${
                  project.company
                }</p>
                <p class="text-xs mb-2 text-gray-600 dark:text-slate-400">${
                  project.dates
                }</p>
                <p class="text-sm leading-relaxed mb-2 text-gray-900 dark:text-slate-50">${
                  project.description
                }</p>
                ${
                  project.impact
                    ? `<p class="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">Impact: ${project.impact}</p>`
                    : ""
                }
                <p class="text-xs italic text-gray-600 dark:text-slate-400">Tech: ${project.technologies.join(
                  " • "
                )}</p>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="text-center mt-4">
            <a href="https://zahidshaikh.space/projects" class="inline-block bg-accent text-black dark:bg-gradient-to-r dark:from-accent dark:to-accent/80 dark:text-white px-6 py-2 rounded-lg font-medium border-2 border-accent">View All Projects</a>
          </div>
        </section>

        <!-- Skills -->
        <section class="mb-5">
          <h2 class="text-lg font-bold uppercase tracking-wider text-accent mb-4 pb-2 border-b-2 border-accent">Skills</h2>
          <div class="bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30 dark:from-indigo-700/15 dark:via-purple-700/10 dark:to-pink-700/15 backdrop-blur-sm border border-gray-200/20 dark:border-slate-700/20 rounded-lg p-4">
            <div class="flex flex-wrap gap-2">
              ${Object.values(DATA.skills)
                .flat()
                .map((skill) => {
                  const icon = getIcon(skill.icon);
                  const iconHtml = icon
                    ? `<svg viewBox="0 0 24 24" class="inline w-4 h-4 mr-1" fill="${
                        skill.color && isDark ? skill.color : `#${icon.hex}`
                      }"><path d="${icon.path}"/></svg>`
                    : "";
                  return `<span class="inline-flex items-center bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-50 px-3 py-1 rounded-lg text-sm font-medium border border-gray-300 dark:border-slate-600">${iconHtml}${skill.name}</span>`;
                })
                .join("")}
            </div>
          </div>
        </section>
      </div>
    </body>
    </html>
  `;

  return html;
}
