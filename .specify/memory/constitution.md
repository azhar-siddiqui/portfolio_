<!--
Sync Impact Report
==================
Version change: TEMPLATE (uninitialized) → 1.0.0
Modified principles: N/A (initial ratification — all five principles newly authored)
Added sections:
  - Core Principles (I–V)
  - Technical Standards & Constraints
  - Development Workflow & Quality Gates
  - Governance
Removed sections: None (template placeholders fully replaced)
Templates requiring updates:
  - .specify/templates/plan-template.md   ⚠ pending — "Constitution Check" is a generic placeholder
    ("[Gates determined based on constitution file]"); the next /speckit-plan run MUST
    derive gates from Principles I–V below.
  - .specify/templates/spec-template.md   ✅ aligned — no constitution-specific edits required.
  - .specify/templates/tasks-template.md  ✅ aligned — Setup → Foundational → User Stories → Polish
    structure remains compatible.
  - .specify/templates/checklist-template.md ✅ aligned — generic scaffolding, principle-agnostic.
Follow-up TODOs: None.
-->

# Zaheed Shaikh Portfolio Constitution

This constitution governs the Zaheed Shaikh Portfolio — a Next.js (App Router)
personal site that showcases professional work and publishes long-form technical
writing. It is a content-driven product, not a backend platform, and the rules
below are tuned accordingly.

## Core Principles

### I. Content-as-Code (NON-NEGOTIABLE)

All long-form content (blog posts, project case studies, written notes) MUST live
inside the repository as Markdown/MDX files under a single, well-known content
directory and MUST be versioned in git alongside the code that renders it. No
content lives in an external CMS, database, or third-party service.

**Rationale**: Content velocity, portability, and reviewability all flow from
keeping prose next to code. Posts are reviewed via pull requests, diffable, and
recoverable from git history. This also keeps the deployment surface minimal —
no runtime database or CMS dependency.

**Rules**:

- Markdown frontmatter MUST validate against a typed schema (title, date, slug,
  description, tags, draft flag, optional cover image).
- Images and media referenced by posts MUST live in the repository
  (`public/` or co-located assets) — no hot-linking to external hosts except
  for first-party services (e.g., YouTube embeds).
- Mermaid diagrams and code blocks MUST render at build time, not via untrusted
  client-side scripts pulled at runtime.
- Drafts MUST be excluded from production builds but available in preview/dev.

### II. Strict Type Safety

All application code MUST be TypeScript in `strict` mode. Runtime data crossing
a trust boundary (frontmatter parsed from disk, URL params, form input,
third-party API responses) MUST be parsed through a schema validator before use.
`any` and unchecked type assertions are prohibited except where a third-party
type definition is missing and a narrow, commented escape hatch is unavoidable.

**Rationale**: This is a long-lived personal project maintained intermittently.
Strict types are the cheapest form of regression protection when there are no
unit tests, and they keep refactor cost low across long gaps between sessions.

### III. Responsive & Accessible by Default

Every interactive surface MUST work on viewports from 320px upward and MUST meet
WCAG 2.1 AA at minimum for color contrast, keyboard navigation, focus
visibility, and semantic structure.

**Rules**:

- Mobile-first layouts: design for small viewports first, then progressively
  enhance with `sm:`, `md:`, `lg:` breakpoints (defaults from Tailwind).
- All interactive elements MUST be reachable and operable via keyboard, with a
  visible focus state.
- Images MUST have descriptive `alt` text (or `alt=""` only for purely
  decorative images).
- Color choices MUST clear AA contrast in both light and dark modes; never rely
  on color alone to convey meaning.
- Motion and animation MUST respect `prefers-reduced-motion`.

**Rationale**: This is the public face of a software engineer. Inaccessible or
broken-on-mobile pages reflect on professional credibility — the bar is higher
than for a typical side project.

### IV. Performance Budgets

Production builds MUST meet the following budgets on representative pages
(homepage, project detail, blog index, blog post):

- Largest Contentful Paint (LCP) ≤ 2.5s on a simulated 4G connection.
- Cumulative Layout Shift (CLS) ≤ 0.1.
- Interaction to Next Paint (INP) ≤ 200ms.
- Initial JavaScript payload for a content page (blog post or project page)
  SHOULD stay under 200KB gzipped; new dependencies that breach this require
  written justification in the PR.

**Rules**:

- Content pages MUST be statically generated at build time (or use ISR) — no
  per-request data fetching for blog content.
- All raster images MUST be served through `next/image` (or equivalent) with
  appropriate `sizes` and `priority` hints.
- Web fonts MUST be self-hosted or loaded via `next/font` with `display: swap`.
- Heavy client-only widgets (editors, players, animation toys) MUST be
  dynamically imported and excluded from the initial render path of content
  pages.

**Rationale**: A portfolio that takes 5 seconds to load is a portfolio that
loses readers. Performance is a brand attribute, not a tuning afterthought.

### V. Design System Consistency

All UI MUST be built from the established design system: Tailwind utility
classes driven by the HSL color variables in `src/app/globals.css`, the Geist /
Geist Mono / Instrument Serif font stack, and the reusable primitives under
`src/components/` and `src/components/ui/`.

**Rules**:

- Colors MUST come from the CSS variable palette (`bg-background`, `text-foreground`,
  `text-primary`, `text-accent`, etc.) — never raw hex or rgb values inline.
- Spacing, radii, and typography scales MUST come from Tailwind tokens — no
  ad-hoc magic numbers.
- New visual patterns SHOULD be expressed as a reusable component when used in
  two or more places; copy-paste of complex JSX trees is grounds for refactor.
- Both light and dark themes MUST be supported and visually verified for any
  new surface.
- Established patterns (`.section-eyebrow`, `.section-heading`, `BlurFade`
  staggered animation, `glass-effect`) SHOULD be reused for any new homepage
  or content section to keep visual rhythm consistent.

**Rationale**: Visual cohesion is what separates a "site" from a "product".
Drifting into bespoke styling per section produces an inconsistent, amateur
feel — exactly the opposite of the portfolio's purpose.

## Technical Standards & Constraints

- **Framework**: Next.js (App Router) on Node.js 24 LTS. Deployed on Vercel.
- **Language**: TypeScript in `strict` mode. JavaScript files are prohibited
  outside of generated artifacts and minimal config shims.
- **Styling**: Tailwind CSS with the project's custom theme tokens; no parallel
  CSS-in-JS or competing CSS framework.
- **Content pipeline**: Markdown/MDX parsed via the existing `gray-matter` +
  unified (`remark` / `rehype`) stack, with Shiki for syntax highlighting and
  Mermaid rendered at build time where possible.
- **Rendering strategy**: Content pages default to Static Generation; ISR is
  acceptable when content updates need to propagate without a rebuild. Edge
  runtimes are not the default — prefer Node.js / Fluid Compute.
- **Dependencies**: New runtime dependencies require a one-line justification
  in the PR (what it does, why an existing library cannot). Dev-only tools are
  unconstrained.
- **Security**: No secrets in the repository. Environment variables flow through
  Vercel project settings and `vercel env`. External user input (e.g., a future
  comment form) MUST be validated server-side.

## Development Workflow & Quality Gates

- **Branching**: Feature work happens on short-lived branches off `main`. Direct
  pushes to `main` are reserved for trivial doc fixes.
- **Commits**: Conventional, present-tense, lower-case subject lines
  (`feat: …`, `fix: …`, `chore: …`, `docs: …`). Co-author footers are added
  when AI assistance materially shaped the commit.
- **Pre-merge gates** (in priority order):
  1. `next build` MUST pass — no TypeScript or build errors.
  2. `next lint` (or the configured linter) MUST pass with zero warnings on
     touched files.
  3. New or changed UI MUST be visually verified in both light and dark mode
     and at a mobile viewport before the PR is opened.
  4. Any new content page MUST be checked against the Performance Budget
     (Principle IV) using Lighthouse or Vercel Analytics; regressions outside
     budget MUST be addressed or explicitly justified.
- **Reviewability**: Each PR SHOULD do one thing. Large refactors are split
  from feature work.
- **Spec-Kit workflow**: Non-trivial features (anything that touches multiple
  files or introduces a new user-facing surface) go through `/speckit-specify
  → /speckit-plan → /speckit-tasks → /speckit-implement`. Trivial fixes can
  skip the spec phase.

## Governance

This constitution supersedes ad-hoc preferences and prior conventions. It is
the source of truth for the "Constitution Check" gate in
`/speckit-plan` and for code review.

**Amendment procedure**:

1. Open a PR that edits `.specify/memory/constitution.md` with the proposed
   change, a rationale, and the version bump.
2. Versioning follows semver:
   - **MAJOR** — a principle is removed or redefined in a backward-incompatible
     way (e.g., relaxing Strict Type Safety).
   - **MINOR** — a new principle is added, or an existing principle is
     materially expanded.
   - **PATCH** — clarifications, typo fixes, wording refinements that do not
     change the meaning of any rule.
3. Update the Sync Impact Report at the top of this file and re-validate the
   dependent templates listed there.
4. Update the `Last Amended` date in the footer.
5. Merge once the PR is reviewed and the change is reflected in any in-flight
   plans/specs that depend on the changed principle.

**Compliance review**:

- Every `/speckit-plan` run MUST include a Constitution Check section that
  evaluates the proposed design against Principles I–V. Violations require a
  written justification in the plan's Complexity Tracking table.
- Pull request reviewers SHOULD reject changes that violate a principle without
  a justification recorded in the PR description or linked plan.
- This file is read at the start of every Spec Kit workflow; if it is
  out-of-date relative to the codebase, opening an amendment PR takes
  precedence over feature work.

**Runtime guidance**: For day-to-day implementation context (tech stack
specifics, file locations, command snippets), see `CLAUDE.md` at the
repository root.

**Version**: 1.0.0 | **Ratified**: 2026-05-25 | **Last Amended**: 2026-05-25
