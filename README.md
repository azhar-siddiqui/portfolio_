# Azhar Sayyed — Corporate Portfolio

Personal portfolio and professional site for **Azhar Sayyed**, a Product Engineer who builds full-stack software across logistics, maritime, healthcare, and hospitality.

**Live site:** [azharsayyed.in](https://www.azharsayyed.in)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fazhar-siddiqui%2Fdeveloper-corporate-portfolio)

## Overview

A modern, content-driven portfolio built with Next.js. Most site content — bio, experience, projects, skills, and contact links — lives in a single config file, so updates stay fast and predictable. The site includes a bento-style project showcase, an optional MDX blog, downloadable PDF resumes, and production-ready SEO.

## Features

- **Single source of truth** — Edit [`src/data/resume.tsx`](./src/data/resume.tsx) to update profile, work history, education, skills, and projects
- **Homepage sections** — Hero, metrics strip, about, experience, education, skills, featured projects, latest writing, and contact
- **Projects page** — Full project catalog with impact metrics, tech tags, and resource links
- **Writing / blog** — MDX posts with Shiki syntax highlighting, Mermaid diagrams, table of contents, and a local `/blog/editor` preview tool (gated by feature flag)
- **Resume PDFs** — Generate light and dark theme PDFs from the same data via `pnpm generate:resume`
- **Polished UI** — Dark/light themes, animated mesh hero, magnetic CTAs, scroll progress, dock-style navigation, and blur-fade reveals
- **SEO & performance** — JSON-LD structured data, sitemap, Open Graph / Twitter images, Vercel Analytics, and Speed Insights
- **Responsive** — Optimized layouts from mobile through desktop

## Tech Stack

| Layer         | Technologies                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| Framework     | [Next.js 16](https://nextjs.org/), [React 19](https://react.dev/), TypeScript                                      |
| Styling       | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Magic UI](https://magicui.design/) |
| Motion        | [Framer Motion](https://www.framer.com/motion/)                                                                    |
| Content       | MDX, [gray-matter](https://github.com/jonschlinkert/gray-matter), [unified](https://unifiedjs.com/) pipeline       |
| Diagrams      | [Mermaid](https://mermaid.js.org/)                                                                                 |
| Feature flags | [LaunchDarkly](https://launchdarkly.com/) (server-side SDK)                                                        |
| Tooling       | pnpm, ESLint, Puppeteer (resume generation)                                                                        |
| Deployment    | [Vercel](https://vercel.com/)                                                                                      |

## Project Structure

```
corporate-portfolio/
├── content/blog/          # MDX blog posts
├── public/                # Static assets, favicons, resume PDFs
├── scripts/
│   └── generate-resume.ts # Puppeteer script for PDF export
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # UI and section components
│   ├── data/
│   │   ├── resume.tsx     # Main portfolio content config
│   │   └── blog.ts        # Blog post loader and renderer
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities, feature flags, MDX plugins
└── tailwind.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/)

### Local development

```bash
git clone https://github.com/azhar-siddiqui/developer-corporate-portfolio.git
cd developer-corporate-portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy the example env file and fill in values as needed:

```bash
cp .env.local.example .env.local
```

| Variable               | Required | Description                                                                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `LAUNCHDARKLY_SDK_KEY` | No       | Server-side SDK key for feature flags. When unset, the blog defaults to **off** and `/blog` shows a coming-soon page. |

## Customization

### Portfolio content

Edit [`src/data/resume.tsx`](./src/data/resume.tsx) to update:

- Name, title, tagline, summary, and location
- Metrics and industries marquee
- Work experience and education
- Skills grouped by category (AI, frontend, backend, DevOps, testing)
- Projects with technologies, impact, and featured flags
- Navbar items and social links

Replace `public/me.png` with your own avatar.

### Blog posts

Add `.mdx` files under `content/blog/`. Each file becomes a post at `/blog/<slug>`.

Use the built-in editor at `/blog/editor` during development for live preview, then drop the exported file into `content/blog/` to publish. See [`content/blog/README.md`](./content/blog/README.md) for frontmatter and authoring details.

### Resume PDFs

Regenerate downloadable resumes after updating `resume.tsx`:

```bash
pnpm generate:resume
```

Output is written to `public/resumes/` as light and dark theme PDFs.

## Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `pnpm dev`             | Start the development server    |
| `pnpm build`           | Create a production build       |
| `pnpm start`           | Serve the production build      |
| `pnpm lint`            | Run ESLint                      |
| `pnpm generate:resume` | Generate light/dark PDF resumes |

## Deployment

The site is designed for [Vercel](https://vercel.com/). Connect the repository, set `LAUNCHDARKLY_SDK_KEY` if you want the blog enabled in production, and deploy.

## Acknowledgments

This project started from [dillionverma/portfolio](https://github.com/dillionverma/portfolio) and has been customized for Azhar Sayyed's professional brand and project history.

## License

Licensed under the [MIT license](./LICENSE).
