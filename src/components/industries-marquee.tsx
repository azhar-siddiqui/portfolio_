export function IndustriesMarquee({ items }: { items: readonly string[] }) {
  return (
    <section aria-label="Industries shipped in" className="py-8">
      <ul className="mx-auto flex w-full max-w-6xl flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
