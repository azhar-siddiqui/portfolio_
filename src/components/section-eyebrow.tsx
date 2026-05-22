interface Props {
  index: string;
  label: string;
}

export function SectionEyebrow({ index, label }: Props) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span aria-hidden className="h-px w-8 bg-border" />
      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-foreground">
        {index} · {label}
      </span>
    </div>
  );
}
