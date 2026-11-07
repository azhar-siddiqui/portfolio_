"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Download, RefreshCw, FileText } from "lucide-react";
import { MermaidRenderer } from "@/components/mermaid-renderer";
import { renderMarkdownAction } from "./actions";

const STORAGE_KEY = "blog-editor-draft-v1";

const STARTER = `---
title: A new post
description: One-line summary that shows up in the index and OpenGraph.
publishedAt: ${new Date().toISOString().slice(0, 10)}
tags: [engineering, notes]
draft: true
---

# Heading

Write your post here. Markdown is fully supported, including:

- **GFM** features (tables, task lists, strikethrough)
- Syntax-highlighted code blocks via Shiki
- Mermaid diagrams (fenced as \\\`mermaid\\\`)

\`\`\`ts
export function add(a: number, b: number) {
  return a + b;
}
\`\`\`

\`\`\`mermaid
flowchart LR
  Editor[Markdown source] --> Pipeline[Unified + Shiki]
  Pipeline --> HTML[HTML]
  HTML --> Reader([Reader])
\`\`\`
`;

function suggestedSlug(source: string): string {
  const match = source.match(/^title:\s*(.+)$/m);
  const title = match ? match[1].trim().replace(/^['"]|['"]$/g, "") : "post";
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "post"
  );
}

export default function BlogEditorClient() {
  const [source, setSource] = useState<string>(STARTER);
  const [html, setHtml] = useState<string>("");
  const [pending, startTransition] = useTransition();
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load saved draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.trim()) setSource(saved);
    } catch {}
  }, []);

  // Persist + render on change (debounced)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, source);
        setLastSavedAt(Date.now());
      } catch {}
      startTransition(async () => {
        const rendered = await renderMarkdownAction(source);
        setHtml(rendered);
      });
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [source]);

  const slug = useMemo(() => suggestedSlug(source), [source]);

  const onDownload = useCallback(() => {
    const blob = new Blob([source], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.mdx`;
    a.click();
    URL.revokeObjectURL(url);
  }, [source, slug]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [source]);

  const onReset = useCallback(() => {
    if (confirm("Reset editor to the starter template? Your draft will be lost.")) {
      setSource(STARTER);
    }
  }, []);

  return (
    <main className="flex min-h-dvh flex-col px-4 pb-16 pt-20 sm:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            Back to writing
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="link-pill"
              aria-label="Copy markdown to clipboard"
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy MDX"}
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="link-pill"
              aria-label="Download as MDX file"
            >
              <Download className="h-3.5 w-3.5" />
              {slug}.mdx
            </button>
            <button
              type="button"
              onClick={onReset}
              className="link-pill"
              aria-label="Reset editor"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        <header className="mt-8 sm:mt-10">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <FileText className="h-3 w-3" />
            Editor
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground">
            Write a post. Preview as you type.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Drafts persist in your browser. When you&apos;re happy with the
            output, download as <span className="font-mono">.mdx</span> and drop
            it into <span className="font-mono">content/blog/</span> in the
            repo. The preview uses the exact same renderer as production posts.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <section
            aria-label="Markdown source"
            className="flex flex-col rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-secondary/40">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Markdown
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                {lastSavedAt ? "saved locally" : "not yet saved"}
              </span>
            </div>
            <textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              spellCheck={false}
              className="min-h-[60vh] lg:min-h-[70vh] w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-6 text-foreground outline-none placeholder:text-muted-foreground/60"
              placeholder="# Start writing…"
            />
          </section>

          <section
            aria-label="Live preview"
            className="flex flex-col rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-secondary/40">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Preview
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                {pending ? "rendering…" : "live"}
              </span>
            </div>
            <div className="p-4 sm:p-6 overflow-x-auto">
              <MermaidRenderer>
                <div
                  key={html}
                  className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-medium prose-headings:tracking-[-0.01em] prose-a:no-underline prose-img:rounded-xl prose-img:border prose-img:border-border/60 prose-pre:bg-secondary/60 prose-pre:border prose-pre:border-border/60 prose-code:before:content-none prose-code:after:content-none"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </MermaidRenderer>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
