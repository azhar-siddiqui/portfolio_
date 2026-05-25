import { cn } from "@/lib/utils";
import {
  getLinkMeta,
  metaForLabel,
  type LinkIcon,
  type LinkKind,
} from "@/lib/link-meta";

interface Props {
  href: string;
  /** Override the auto-derived label. */
  label?: string;
  /** Force a specific link kind regardless of URL detection. */
  kind?: LinkKind;
  className?: string;
}

/**
 * Compact outline pill used for project / solution links — Play Store, App
 * Store, GitHub, live demo, etc. Icons come from simple-icons for branded
 * destinations and Lucide for generics, so brand recognition is instant while
 * the surrounding style stays consistent with the rest of the site.
 */
export function LinkButton({ href, label, kind, className }: Props) {
  // Resolve meta: explicit kind > URL sniffing > label sniffing.
  const meta = kind
    ? { kind, label: label ?? "Link", icon: undefined }
    : label && !/^https?:/i.test(href)
      ? metaForLabel(label)
      : getLinkMeta(href, label);

  const displayLabel = label ?? meta.label;
  const icon =
    "icon" in meta && meta.icon ? meta.icon : getLinkMeta(href).icon;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${displayLabel} (opens in new tab)`}
      className={cn("link-pill", className)}
    >
      <LinkIconGlyph icon={icon} />
      <span className="truncate">{displayLabel}</span>
    </a>
  );
}

function LinkIconGlyph({ icon }: { icon: LinkIcon }) {
  if (icon.kind === "lucide") {
    const C = icon.Component;
    return <C className="h-3.5 w-3.5 shrink-0" aria-hidden />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
