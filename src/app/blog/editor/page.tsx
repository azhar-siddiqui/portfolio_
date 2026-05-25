import { notFound } from "next/navigation";
import { isBlogEnabled } from "@/lib/feature-flags";
import BlogEditorClient from "./editor-client";

export default async function BlogEditorPage() {
  if (!(await isBlogEnabled())) {
    notFound();
  }
  return <BlogEditorClient />;
}
