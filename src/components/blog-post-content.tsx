import { MermaidRenderer } from "@/components/mermaid-renderer";

/**
 * Server component that injects pre-rendered post HTML into a styled prose
 * wrapper, while delegating client-side Mermaid hydration to MermaidRenderer.
 * The prose styling is consistent with the rest of the site (see globals.css).
 */
export function BlogPostContent({ html }: { html: string }) {
  return (
    <MermaidRenderer>
      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-medium prose-headings:tracking-[-0.01em] prose-a:no-underline prose-img:rounded-xl prose-img:border prose-img:border-border/60 prose-pre:bg-secondary/60 prose-pre:border prose-pre:border-border/60 prose-code:before:content-none prose-code:after:content-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </MermaidRenderer>
  );
}
