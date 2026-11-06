interface Props {
  index: string;
  label: string;
}

export function SectionEyebrow({ label }: Props) {
  return (
    <p className="mb-3 text-sm font-medium text-muted-foreground">{label}</p>
  );
}
