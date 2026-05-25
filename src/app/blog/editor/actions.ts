"use server";

import { markdownToHTML } from "@/data/blog";

/**
 * Render arbitrary markdown to HTML using the same unified pipeline that powers
 * blog posts in production. Lives as a server action so the editor preview is
 * a perfect visual match for the published rendering (including Shiki highlight
 * themes and the mermaid placeholder transform).
 */
export async function renderMarkdownAction(markdown: string): Promise<string> {
  if (!markdown.trim()) return "";
  return markdownToHTML(markdown);
}
