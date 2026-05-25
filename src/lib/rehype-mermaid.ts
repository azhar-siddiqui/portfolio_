import type { Plugin } from "unified";
import type { Element, Root, Text } from "hast";
import { visit } from "unist-util-visit";

/**
 * Rehype plugin: find Markdown fenced code blocks tagged `mermaid` and replace
 * the surrounding <pre><code class="language-mermaid">...</code></pre> with a
 * placeholder element that the client-side <MermaidRenderer/> picks up and
 * rasterizes via the mermaid library on mount.
 *
 * We deliberately render mermaid on the client (not at build time) to keep the
 * markdown pipeline dependency-free of headless browsers. The trade-off is a
 * brief flash of unrendered diagram source on first paint — acceptable for a
 * personal blog and noticeably simpler than running playwright at build time.
 */
export const rehypeMermaid: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre") return;
      const code = node.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "code",
      );
      if (!code) return;
      const className = (code.properties?.className ?? []) as string[];
      if (!className.includes("language-mermaid")) return;

      const source = (code.children
        .filter((c): c is Text => c.type === "text")
        .map((c) => c.value)
        .join("")
      ).trim();

      const replacement: Element = {
        type: "element",
        tagName: "div",
        properties: {
          className: ["mermaid-diagram"],
          "data-mermaid-source": source,
        },
        children: [
          {
            type: "element",
            tagName: "pre",
            properties: { className: ["mermaid-fallback"] },
            children: [{ type: "text", value: source }],
          },
        ],
      };

      if (parent && typeof index === "number") {
        parent.children[index] = replacement;
      }
    });
  };
};
