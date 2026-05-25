import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
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

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Pre-rendered HTML — code highlighted, mermaid wrapped in placeholders. */
  html: string;
  /** Raw markdown source, useful for editor preview / re-rendering. */
  raw: string;
  readingTime: { text: string; minutes: number; words: number };
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

/**
 * Convert raw markdown source to HTML using the project's unified pipeline:
 * GFM features, syntax-highlighted code via shiki / rehype-pretty-code, and a
 * Mermaid placeholder transform so the client can render diagrams on mount.
 */
export async function markdownToHTML(markdown: string): Promise<string> {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeMermaid)
    .use(rehypePrettyCode, {
      theme: { light: "min-light", dark: "min-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);
  return processed.toString();
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
  const stats = readingTime(raw);

  return {
    slug,
    frontmatter,
    html,
    raw,
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
