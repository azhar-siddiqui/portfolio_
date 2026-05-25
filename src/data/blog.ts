import fs from "fs";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeMermaid } from "@/lib/rehype-mermaid";

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  cover?: string;
  tags: string[];
  draft: boolean;
  author?: string;
};

export type Heading = {
  /** 2 for h2, 3 for h3, … */
  depth: number;
  text: string;
  /** GitHub-flavoured slug, matches the `id` attribute on the rendered heading. */
  slug: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Pre-rendered HTML — code highlighted, mermaid wrapped in placeholders. */
  html: string;
  /** Raw markdown source, useful for editor preview / re-rendering. */
  raw: string;
  readingTime: { text: string; minutes: number; words: number };
  /** Sequenced headings (depth 2–4) for the in-page TOC. */
  headings: Heading[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

/**
 * Convert raw markdown source to HTML using the project's unified pipeline:
 *  - GFM features (tables, task lists, strikethrough)
 *  - allowDangerousHtml + rehype-raw so authors can inline <a id="…">,
 *    <kbd>, <details>, etc. without losing them at the boundary.
 *  - rehype-slug stamps each heading with a stable GitHub-style id so anchor
 *    links and the TOC sidebar can target them.
 *  - rehype-autolink-headings adds a small ¶ link beside each heading on
 *    hover, the standard convention for documentation-quality blog posts.
 *  - Mermaid placeholder transform (client renders SVG + pan/zoom on mount).
 *  - Shiki via rehype-pretty-code last so code-block transforms run on the
 *    final AST.
 */
export async function markdownToHTML(markdown: string): Promise<string> {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        ariaLabel: "Permalink to this section",
      },
      content: {
        type: "element",
        tagName: "span",
        properties: { className: ["heading-anchor-icon"], ariaHidden: "true" },
        children: [{ type: "text", value: "#" }],
      },
    })
    .use(rehypeMermaid)
    .use(rehypePrettyCode, {
      theme: { light: "min-light", dark: "min-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return processed.toString();
}

/**
 * Extract h2-h4 headings from the markdown source for the in-page TOC. Slugs
 * are produced with GithubSlugger — the same algorithm rehype-slug uses — so
 * the ids in the rendered HTML and the hrefs in the TOC stay in lockstep,
 * including duplicate suffixing (-1, -2, …).
 */
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const lines = markdown.split("\n");
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{2,4})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const depth = m[1].length;
    // Strip basic markdown emphasis / code marks so the TOC reads cleanly.
    const text = m[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
    headings.push({ depth, text, slug: slugger.slug(text) });
  }
  return headings;
}

function normalizeFrontmatter(
  raw: Record<string, unknown>,
  slug: string,
): PostFrontmatter {
  const title = typeof raw.title === "string" ? raw.title : slug;
  const description =
    typeof raw.description === "string"
      ? raw.description
      : typeof raw.summary === "string"
        ? (raw.summary as string)
        : "";
  const publishedAt =
    typeof raw.publishedAt === "string"
      ? raw.publishedAt
      : typeof raw.date === "string"
        ? (raw.date as string)
        : new Date().toISOString().slice(0, 10);
  const updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : undefined;
  const cover =
    typeof raw.cover === "string"
      ? raw.cover
      : typeof raw.image === "string"
        ? (raw.image as string)
        : undefined;
  const tags = Array.isArray(raw.tags)
    ? (raw.tags as unknown[]).filter((t): t is string => typeof t === "string")
    : [];
  const draft = raw.draft === true;
  const author = typeof raw.author === "string" ? raw.author : undefined;

  return { title, description, publishedAt, updatedAt, cover, tags, draft, author };
}

export async function getPost(slug: string): Promise<Post | null> {
  // Guard reserved filenames so requests like /blog/README cannot resolve.
  if (slug.toLowerCase() === "readme" || slug.startsWith("_")) return null;
  const candidates = [
    path.join(BLOG_DIR, `${slug}.mdx`),
    path.join(BLOG_DIR, `${slug}.md`),
  ];
  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: raw, data } = matter(source);
  const frontmatter = normalizeFrontmatter(data, slug);
  const html = await markdownToHTML(raw);
  const headings = extractHeadings(raw);
  const stats = readingTime(raw);

  return {
    slug,
    frontmatter,
    html,
    raw,
    headings,
    readingTime: {
      text: stats.text,
      minutes: Math.max(1, Math.round(stats.minutes)),
      words: stats.words,
    },
  };
}

/** All published (non-draft in production) posts, sorted newest first. */
export async function getAllPosts(): Promise<Post[]> {
  ensureBlogDir();
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    // Skip repository scaffolding files like README.md and _drafts/_template.mdx
    .filter((f) => {
      const base = f.replace(/\.(mdx|md)$/, "");
      return base.toLowerCase() !== "readme" && !base.startsWith("_");
    });

  const posts = (
    await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.(mdx|md)$/, "");
        return getPost(slug);
      }),
    )
  ).filter((p): p is Post => p !== null);

  const filtered =
    process.env.NODE_ENV === "production"
      ? posts.filter((p) => !p.frontmatter.draft)
      : posts;

  return filtered.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime(),
  );
}

/** Unique sorted list of tags across all visible posts. */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
