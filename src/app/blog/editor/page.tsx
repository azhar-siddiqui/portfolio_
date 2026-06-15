import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isBlogEnabled } from "@/lib/feature-flags";
import BlogEditorClient from "./editor-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog Editor",
  description: "Internal blog editor preview.",
  path: "/blog/editor",
  noIndex: true,
});

export default async function BlogEditorPage() {
  if (!(await isBlogEnabled())) {
    notFound();
  }
  return <BlogEditorClient />;
}
