interface Props {
  index: string;
  label: string;
}

/**
 * Section eyebrow — a thin rule, a serif numeral for confident contrast, and
 * a uppercase mono label. Used at the top of every page section to anchor the
 * scroll position visually.
 */
export function SectionEyebrow({ index, label }: Props) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span aria-hidden className="h-px w-8 bg-primary/50" />
      <span className="font-serif text-base sm:text-lg italic leading-none text-primary/80">
        {index}
      </span>
      <span aria-hidden className="text-muted-foreground/50 leading-none">
        ·
      </span>
      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
