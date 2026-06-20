"use client";

import { getSimpleIconByKey } from "@/lib/simple-icon-registry";
import { useEffect, useState } from "react";
import { Check, Link as LinkIcon, Share2 } from "lucide-react";

interface Props {
  title: string;
  url: string;
  description?: string;
}

/**
 * Inline share toolbar for blog posts. Renders four affordances:
 *  - Twitter/X intent
 *  - LinkedIn share-offsite
 *  - Copy link (with brief "Copied" confirmation)
 *  - Native share via navigator.share() — shown only if the API is supported
 *    so we never display an inert button.
 *
 * Visual style matches the project link pill used on ProjectCard so the same
 * vocabulary carries across the whole site.
 */
export function BlogShare({ title, url, description }: Props) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const onNativeShare = async () => {
    try {
      await navigator.share({ title, text: description, url });
    } catch {
      // user cancelled or unsupported — no-op
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <div
      role="group"
      aria-label="Share this post"
      className="flex flex-wrap items-center gap-2"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mr-1">
        Share
      </span>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="link-pill"
        aria-label="Share on X / Twitter (opens in new tab)"
      >
        <BrandGlyph slug="siX" title="X" />
        <span>X</span>
      </a>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className="link-pill"
        aria-label="Share on LinkedIn (opens in new tab)"
      >
        <LinkedInGlyph />
        <span>LinkedIn</span>
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="link-pill"
        aria-label={copied ? "Link copied to clipboard" : "Copy link to clipboard"}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-success" aria-hidden />
        ) : (
          <LinkIcon className="h-3.5 w-3.5" aria-hidden />
        )}
        <span>{copied ? "Copied" : "Copy link"}</span>
      </button>
      {canNativeShare && (
        <button
          type="button"
          onClick={onNativeShare}
          className="link-pill"
          aria-label="Open device share sheet"
        >
          <Share2 className="h-3.5 w-3.5" aria-hidden />
          <span>Share…</span>
        </button>
      )}
    </div>
  );
}

function BrandGlyph({ slug, title }: { slug: string; title: string }) {
  const entry = getSimpleIconByKey(slug);
  if (!entry) return null;
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden>
      <title>{title}</title>
      <path d={entry.path} />
    </svg>
  );
}

function LinkedInGlyph() {
  // LinkedIn was removed from simple-icons; reuse the in-house mark.
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden>
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
